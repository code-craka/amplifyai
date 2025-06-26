import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { STRATEGY_PROMPT, COPYWRITING_PROMPT, type Platform } from '../_shared/prompts.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Verify user authentication
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Parse request body
    const { brandId, topic, goal, cta } = await req.json()

    if (!brandId || !topic) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: brandId, topic' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Fetch brand information
    const { data: brand, error: brandError } = await supabase
      .from('brands')
      .select('*')
      .eq('id', brandId)
      .eq('user_id', user.id)
      .single()

    if (brandError || !brand) {
      return new Response(
        JSON.stringify({ error: 'Brand not found or unauthorized' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create content brief record
    const { data: brief, error: briefError } = await supabase
      .from('content_briefs')
      .insert({
        user_id: user.id,
        brand_id: brandId,
        topic,
        goal: goal || 'Generate engagement',
        cta_text: cta,
        status: 'processing'
      })
      .select()
      .single()

    if (briefError) {
      throw new Error(`Failed to create brief: ${briefError.message}`)
    }

    // STEP 1: Generate content strategy using Gemini
    console.log('Generating content strategy...')
    
    const strategyPrompt = STRATEGY_PROMPT(brand, { topic, goal, cta_text: cta })
    
    const strategyResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a strategic social media planner. Always respond with valid JSON.' },
          { role: 'user', content: strategyPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    })

    if (!strategyResponse.ok) {
      throw new Error(`Strategy generation failed: ${strategyResponse.statusText}`)
    }

    const strategyData = await strategyResponse.json()
    const strategyContent = strategyData.choices[0].message.content
    
    let strategies
    try {
      strategies = JSON.parse(strategyContent)
    } catch (e) {
      throw new Error('Failed to parse strategy response as JSON')
    }

    if (!Array.isArray(strategies) || strategies.length === 0) {
      throw new Error('Invalid strategy response format')
    }

    // STEP 2: Generate actual content for each strategy using Claude (via OpenAI API for now)
    console.log('Generating content for each strategy...')
    
    const generatedPosts = []
    
    for (const strategy of strategies) {
      const copywritingPrompt = COPYWRITING_PROMPT(brand, { topic, goal, cta_text: cta }, strategy)
      
      const copyResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: 'You are an expert social media copywriter. Create engaging, platform-optimized content.' },
            { role: 'user', content: copywritingPrompt }
          ],
          temperature: 0.8,
          max_tokens: 800
        })
      })

      if (!copyResponse.ok) {
        console.error(`Copy generation failed for ${strategy.platform}: ${copyResponse.statusText}`)
        continue
      }

      const copyData = await copyResponse.json()
      const generatedText = copyData.choices[0].message.content

      // Save generated post to database
      const { data: post, error: postError } = await supabase
        .from('generated_posts')
        .insert({
          brief_id: brief.id,
          platform: strategy.platform,
          generated_text: generatedText,
          generated_media_urls: null,
          status: 'draft'
        })
        .select()
        .single()

      if (postError) {
        console.error(`Failed to save post for ${strategy.platform}:`, postError)
        continue
      }

      generatedPosts.push(post)
    }

    // Update brief status
    const finalStatus = generatedPosts.length > 0 ? 'completed' : 'error'
    await supabase
      .from('content_briefs')
      .update({ status: finalStatus })
      .eq('id', brief.id)

    return new Response(
      JSON.stringify({ 
        success: true, 
        brief_id: brief.id,
        posts_generated: generatedPosts.length,
        message: `Successfully generated ${generatedPosts.length} posts for your campaign!`
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in create-brief function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred',
        details: 'Check function logs for more information'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})