
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { SocialConnectionsManager } from './SocialConnectionsManager'
import { toast } from 'sonner'

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ connection?: string, status?: string, message?: string }> }) {
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

  // Display toast notification based on query parameters
  if (params.connection && params.status) {
    const connectionName = params.connection.charAt(0).toUpperCase() + params.connection.slice(1);
    if (params.status === 'success') {
      toast.success(`${connectionName} connected successfully!`);
    } else if (params.status === 'error') {
      toast.error(`${connectionName} connection failed: ${params.message || 'Unknown error'}`);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your account and social media connections
          </p>
        </div>

        <SocialConnectionsManager initialConnections={connections || []} />
      </div>
    </div>
  )
}
