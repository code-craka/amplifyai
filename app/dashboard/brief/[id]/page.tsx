import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { BriefDetailView } from './BriefDetailView'

interface PageProps {
  params: { id: string }
}

export default async function BriefDetailPage({ params }: PageProps) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  // Fetch brief with all related data
  const { data: brief, error } = await supabase
    .from('content_briefs')
    .select(`
      *,
      brands (
        id,
        brand_name,
        brand_description,
        tone_of_voice,
        logo_url
      ),
      generated_posts (
        id,
        platform,
        generated_text,
        generated_media_urls,
        status,
        schedule_time,
        post_url
      )
    `)
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single()

  if (error || !brief) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BriefDetailView brief={brief} />
      </div>
    </div>
  )
}