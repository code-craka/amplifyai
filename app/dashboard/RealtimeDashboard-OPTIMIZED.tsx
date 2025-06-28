"use client";

import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Eye, 
  Calendar,
  BarChart3,
  Zap,
  List,
  Grid,
  Bookmark,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { ContentCalendar } from '@/components/ContentCalendar';
import { BulkOperations } from '@/components/BulkOperations';
import { ContentTemplates } from '@/components/ContentTemplates';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';

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

// Memoized components for performance
const StatsCard = memo(({ title, value, icon: Icon }: { 
  title: string; 
  value: number; 
  icon: any;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
));

const BriefCard = memo(({ brief, onView }: { 
  brief: ContentBrief; 
  onView: (id: string) => void;
}) => {
  const getStatusIcon = useCallback((status: string) => {
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
  }, []);

  const getStatusColor = useCallback((status: string) => {
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
  }, []);

  return (
    <Card className="hover:shadow-md transition-shadow">
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
            <Button size="sm" variant="outline" onClick={() => onView(brief.id)}>
              <Eye className="w-3 h-3 mr-1" />
              View Details
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
  );
});

// Pagination constants
const BRIEFS_PER_PAGE = 10;

export function RealtimeDashboard({ initialBriefs, userId }: RealtimeDashboardProps) {
  const [briefs, setBriefs] = useState<ContentBrief[]>(initialBriefs);
  const [isConnected, setIsConnected] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBriefs, setTotalBriefs] = useState(initialBriefs.length);
  const [loading, setLoading] = useState(false);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = createClient();

  // Get active tab from URL or default to 'overview'
  const activeTab = searchParams?.get('tab') || 'overview';

  // Optimized pagination
  const paginatedBriefs = useMemo(() => {
    const startIndex = (currentPage - 1) * BRIEFS_PER_PAGE;
    const endIndex = startIndex + BRIEFS_PER_PAGE;
    return briefs.slice(startIndex, endIndex);
  }, [briefs, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(totalBriefs / BRIEFS_PER_PAGE);
  }, [totalBriefs]);

  // Optimized brief fetching with pagination
  const fetchBriefsPage = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const startIndex = (page - 1) * BRIEFS_PER_PAGE;
      
      // Optimized query - fetch briefs first, then posts separately
      const { data: briefsData, error: briefsError, count } = await supabase
        .from('content_briefs')
        .select(`
          *,
          brands (brand_name, logo_url)
        `, { count: 'exact' })
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(startIndex, startIndex + BRIEFS_PER_PAGE - 1);

      if (briefsError) throw briefsError;

      // Fetch posts separately for better performance
      if (briefsData) {
        const briefIds = briefsData.map(brief => brief.id);
        const { data: postsData } = await supabase
          .from('generated_posts')
          .select('*')
          .in('brief_id', briefIds);

        // Combine data efficiently
        const briefsWithPosts = briefsData.map(brief => ({
          ...brief,
          generated_posts: postsData?.filter(post => post.brief_id === brief.id) || []
        }));

        if (page === 1) {
          setBriefs(briefsWithPosts);
        } else {
          setBriefs(prev => [...prev, ...briefsWithPosts]);
        }
        
        if (count !== null) {
          setTotalBriefs(count);
        }
      }
    } catch (error) {
      console.error('Error fetching briefs:', error);
    } finally {
      setLoading(false);
    }
  }, [supabase, userId]);

  // Optimized real-time subscription with filtering
  useEffect(() => {
    // Single subscription with better filtering
    const briefsChannel = supabase
      .channel('dashboard_updates')
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
          
          // Optimized state updates
          setBriefs(prev => {
            if (payload.eventType === 'INSERT') {
              return [payload.new as ContentBrief, ...prev];
            } else if (payload.eventType === 'UPDATE') {
              return prev.map(brief => 
                brief.id === payload.new.id 
                  ? { ...brief, ...payload.new }
                  : brief
              );
            } else if (payload.eventType === 'DELETE') {
              return prev.filter(brief => brief.id !== payload.old.id);
            }
            return prev;
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'generated_posts'
        },
        (payload) => {
          console.log('Post change received:', payload);
          
          // Optimized post updates
          setBriefs(prev => prev.map(brief => {
            if (payload.new?.brief_id === brief.id) {
              if (payload.eventType === 'INSERT') {
                const exists = brief.generated_posts.find(p => p.id === payload.new.id);
                if (!exists) {
                  return {
                    ...brief,
                    generated_posts: [...brief.generated_posts, payload.new as GeneratedPost]
                  };
                }
              } else if (payload.eventType === 'UPDATE') {
                return {
                  ...brief,
                  generated_posts: brief.generated_posts.map(post =>
                    post.id === payload.new.id 
                      ? { ...post, ...payload.new }
                      : post
                  )
                };
              }
            }
            return brief;
          }));
        }
      )
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
      });

    return () => {
      briefsChannel.unsubscribe();
    };
  }, [userId, supabase]);

  // Memoized stats calculation
  const stats = useMemo(() => {
    return {
      totalCampaigns: totalBriefs,
      completedCampaigns: briefs.filter(b => b.status === 'completed').length,
      totalPosts: briefs.reduce((sum, brief) => sum + brief.generated_posts.length, 0),
      processingCampaigns: briefs.filter(b => b.status === 'processing').length
    };
  }, [briefs, totalBriefs]);

  const scheduledPostsCount = useMemo(() => {
    return briefs.reduce((sum, brief) => 
      sum + brief.generated_posts.filter(post => post.schedule_time && post.status === 'scheduled').length, 0
    );
  }, [briefs]);

  // Memoized event handlers
  const handleViewBrief = useCallback((briefId: string) => {
    router.push(`/dashboard/brief/${briefId}`);
  }, [router]);

  const handlePageChange = useCallback((newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      if (newPage * BRIEFS_PER_PAGE > briefs.length) {
        fetchBriefsPage(newPage);
      }
    }
  }, [totalPages, briefs.length, fetchBriefsPage]);

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
        <StatsCard title="Total Campaigns" value={stats.totalCampaigns} icon={BarChart3} />
        <StatsCard title="Completed" value={stats.completedCampaigns} icon={CheckCircle} />
        <StatsCard title="Posts Generated" value={stats.totalPosts} icon={Zap} />
        <StatsCard title="Scheduled Posts" value={scheduledPostsCount} icon={Calendar} />
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => {
        const newUrl = value === 'overview' ? '/dashboard' : `/dashboard?tab=${value}`;
        router.push(newUrl);
      }} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="bulk" className="flex items-center gap-2">
            <Grid className="h-4 w-4" />
            Bulk Ops
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Bookmark className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
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
            <>
              <div className="grid gap-4">
                {paginatedBriefs.map((brief) => (
                  <BriefCard key={brief.id} brief={brief} onView={handleViewBrief} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-700">
                    Showing {((currentPage - 1) * BRIEFS_PER_PAGE) + 1} to {Math.min(currentPage * BRIEFS_PER_PAGE, totalBriefs)} of {totalBriefs} campaigns
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1 || loading}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <span className="text-sm">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages || loading}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="calendar">
          <ContentCalendar briefs={briefs} />
        </TabsContent>

        <TabsContent value="bulk">
          <BulkOperations briefs={briefs} />
        </TabsContent>

        <TabsContent value="templates">
          <ContentTemplates />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}

StatsCard.displayName = 'StatsCard';
BriefCard.displayName = 'BriefCard';