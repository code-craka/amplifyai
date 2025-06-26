"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Eye, 
  Calendar,
  BarChart3,
  Zap
} from 'lucide-react';
import Link from 'next/link';

interface GeneratedPost {
  id: string;
  platform: string;
  generated_text: string;
  status: string;
  schedule_time: string | null;
}

interface ContentBrief {
  id: string;
  topic: string;
  goal: string;
  status: string;
  created_at: string;
  brands: { brand_name: string; logo_url?: string };
  generated_posts: GeneratedPost[];
}

interface Brand {
  id: string;
  brand_name: string;
  logo_url?: string;
}

interface RealtimeDashboardProps {
  initialBriefs: ContentBrief[];
  brands: Brand[];
  userId: string;
}

export function RealtimeDashboard({ initialBriefs, brands, userId }: RealtimeDashboardProps) {
  const [briefs, setBriefs] = useState<ContentBrief[]>(initialBriefs);
  const [isConnected, setIsConnected] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    // Set up real-time subscription for content briefs
    const briefsChannel = supabase
      .channel('content_briefs_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'content_briefs',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          console.log('Brief change received:', payload);
          
          if (payload.eventType === 'INSERT') {
            // Fetch the complete brief with relations
            fetchBriefWithPosts(payload.new.id);
          } else if (payload.eventType === 'UPDATE') {
            setBriefs(prev => prev.map(brief => 
              brief.id === payload.new.id 
                ? { ...brief, ...payload.new }
                : brief
            ));
          }
        }
      )
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
      });

    // Set up real-time subscription for generated posts
    const postsChannel = supabase
      .channel('generated_posts_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'generated_posts'
        },
        (payload) => {
          console.log('Post change received:', payload);
          
          if (payload.eventType === 'INSERT') {
            // Add new post to the corresponding brief
            setBriefs(prev => prev.map(brief => {
              if (brief.generated_posts.some(post => 
                // Check if this post belongs to this brief
                payload.new.brief_id === brief.id
              )) {
                return {
                  ...brief,
                  generated_posts: [...brief.generated_posts, payload.new as GeneratedPost]
                };
              }
              return brief;
            }));
          } else if (payload.eventType === 'UPDATE') {
            // Update existing post
            setBriefs(prev => prev.map(brief => ({
              ...brief,
              generated_posts: brief.generated_posts.map(post =>
                post.id === payload.new.id 
                  ? { ...post, ...payload.new }
                  : post
              )
            })));
          }
        }
      )
      .subscribe();

    return () => {
      briefsChannel.unsubscribe();
      postsChannel.unsubscribe();
    };
  }, [userId, supabase]);

  const fetchBriefWithPosts = async (briefId: string) => {
    const { data } = await supabase
      .from('content_briefs')
      .select(`
        *,
        brands (brand_name, logo_url),
        generated_posts (*)
      `)
      .eq('id', briefId)
      .single();

    if (data) {
      setBriefs(prev => [data, ...prev]);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-gray-500" />;
      case 'processing':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const stats = {
    totalCampaigns: briefs.length,
    completedCampaigns: briefs.filter(b => b.status === 'completed').length,
    totalPosts: briefs.reduce((sum, brief) => sum + brief.generated_posts.length, 0),
    processingCampaigns: briefs.filter(b => b.status === 'processing').length
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="flex items-center gap-2 text-sm">
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className={isConnected ? 'text-green-600' : 'text-red-600'}>
          {isConnected ? 'Real-time connected' : 'Connecting...'}
        </span>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCampaigns}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedCampaigns}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Posts Generated</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPosts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Loader2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.processingCampaigns}</div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Recent Campaigns</h2>
          <Button asChild>
            <Link href="/campaigns">Create New Campaign</Link>
          </Button>
        </div>

        {briefs.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Zap className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No campaigns yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                Create your first AI-powered content campaign to get started
              </p>
              <Button asChild>
                <Link href="/campaigns">Create Campaign</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {briefs.map((brief) => (
              <Card key={brief.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        {getStatusIcon(brief.status)}
                        <span className="truncate">{brief.topic}</span>
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {brief.brands.brand_name}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-400">
                          {new Date(brief.created_at).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(brief.status)}>
                      {brief.status}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Goal: {brief.goal}
                    </p>
                    
                    {brief.generated_posts.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          Generated Posts ({brief.generated_posts.length})
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {brief.generated_posts.map((post) => (
                            <div 
                              key={post.id}
                              className="text-xs bg-gray-50 dark:bg-gray-800 rounded px-2 py-1 flex items-center justify-between"
                            >
                              <span>{post.platform}</span>
                              <Badge variant="outline" className="text-xs">
                                {post.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/dashboard/brief/${brief.id}`}>
                          <Eye className="w-3 h-3 mr-1" />
                          View Details
                        </Link>
                      </Button>
                      {brief.status === 'completed' && (
                        <Button size="sm" variant="outline">
                          <Calendar className="w-3 h-3 mr-1" />
                          Schedule Posts
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}