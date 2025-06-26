import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // This function is called by pg_cron, so no user auth needed
    console.log('Checking for posts ready to publish...')

    // Get posts that are ready to post
    const { data: readyPosts, error: fetchError } = await supabase
      .from('generated_posts')
      .select(`
        id,
        platform,
        generated_text,
        generated_media_urls,
        content_briefs!inner(
          user_id,
          brands!inner(
            brand_name
          )
        )
      `)
      .eq('status', 'ready_to_post')
      .limit(10) // Process in batches

    if (fetchError) {
      throw new Error(`Failed to fetch ready posts: ${fetchError.message}`)
    }

    if (!readyPosts || readyPosts.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No posts ready to publish' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Found ${readyPosts.length} posts ready to publish`)

    const publishResults = []

    for (const post of readyPosts) {
      try {
        // Simulate posting to social media platform
        // In a real implementation, you would integrate with:
        // - LinkedIn API for LinkedIn posts
        // - Twitter API for Twitter posts
        // - Facebook Graph API for Facebook posts
        // - Instagram Basic Display API for Instagram posts
        
        const postResult = await simulatePostToSocialMedia(post)
        
        // Update post status based on result
        if (postResult.success) {
          await supabase
            .from('generated_posts')
            .update({
              status: 'posted',
              posted_at: new Date().toISOString(),
              post_url: postResult.post_url
            })
            .eq('id', post.id)
          
          publishResults.push({
            post_id: post.id,
            platform: post.platform,
            success: true,
            post_url: postResult.post_url
          })
        } else {
          await supabase
            .from('generated_posts')
            .update({
              status: 'error',
              posting_error: postResult.error
            })
            .eq('id', post.id)
          
          publishResults.push({
            post_id: post.id,
            platform: post.platform,
            success: false,
            error: postResult.error
          })
        }
        
      } catch (error) {
        console.error(`Failed to publish post ${post.id}:`, error)
        
        await supabase
          .from('generated_posts')
          .update({
            status: 'error',
            posting_error: error.message
          })
          .eq('id', post.id)
        
        publishResults.push({
          post_id: post.id,
          platform: post.platform,
          success: false,
          error: error.message
        })
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        processed: publishResults.length,
        results: publishResults
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in publish-post function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

// Simulate posting to social media platforms
// In production, replace this with actual API integrations
async function simulatePostToSocialMedia(post: any) {
  const platform = post.platform.toLowerCase()
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Simulate success/failure (90% success rate for demo)
  const isSuccess = Math.random() > 0.1
  
  if (isSuccess) {
    // Generate a mock post URL
    const mockPostUrl = generateMockPostUrl(platform, post.id)
    
    return {
      success: true,
      post_url: mockPostUrl,
      platform_response: {
        id: `${platform}_${Date.now()}`,
        created_time: new Date().toISOString()
      }
    }
  } else {
    return {
      success: false,
      error: `Failed to post to ${platform}: Platform API error (simulated)`,
      platform_response: null
    }
  }
}

function generateMockPostUrl(platform: string, postId: string): string {
  const baseUrls = {
    linkedin: 'https://linkedin.com/posts/',
    twitter: 'https://twitter.com/user/status/',
    instagram: 'https://instagram.com/p/',
    facebook: 'https://facebook.com/posts/'
  }
  
  const baseUrl = baseUrls[platform] || 'https://example.com/posts/'
  const mockId = postId.slice(0, 8) + Date.now()
  
  return baseUrl + mockId
}

// Note: To implement real social media posting, you would need to:
// 1. Store user's social media access tokens securely
// 2. Implement OAuth flows for each platform
// 3. Use platform-specific APIs:
//    - LinkedIn: https://docs.microsoft.com/en-us/linkedin/marketing/integrations/community-management/shares/share-api
//    - Twitter: https://developer.twitter.com/en/docs/twitter-api/tweets/manage-tweets/api-reference/post-tweets
//    - Facebook: https://developers.facebook.com/docs/pages/publishing
//    - Instagram: https://developers.facebook.com/docs/instagram-api/guides/content-publishing