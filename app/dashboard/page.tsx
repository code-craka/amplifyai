import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { RealtimeDashboard } from './RealtimeDashboard'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  // Fetch initial data
  const { data: briefs } = await supabase
    .from('content_briefs')
    .select(`
      *,
      brands (brand_name, logo_url),
      generated_posts (*)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const { data: brands } = await supabase
    .from('brands')
    .select('*')
    .eq('user_id', user.id)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Content Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Monitor your AI-generated content campaigns in real-time
          </p>
        </div>

        <RealtimeDashboard 
          initialBriefs={briefs || []}
          brands={brands || []}
          userId={user.id}
        />
      </div>
    </div>
  )
}