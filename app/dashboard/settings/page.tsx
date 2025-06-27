
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { SettingsManager } from './SettingsManager'

export default async function SettingsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ 
    tab?: string
    connection?: string
    status?: string
    message?: string
    success?: string
    canceled?: string
  }> 
}) {
  const params = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const { data: connections } = await supabase
    .from('social_connections')
    .select('*')
    .eq('user_id', user.id)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your account, billing, and integrations
          </p>
        </div>

        <SettingsManager 
          initialConnections={connections || []} 
          searchParams={params}
        />
      </div>
    </div>
  )
}
