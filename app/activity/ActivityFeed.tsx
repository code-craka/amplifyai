"use client";

import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import {
	Calendar,
	CheckCircle,
	ChevronDown,
	ChevronUp,
	Clock,
	CreditCard,
	Filter,
	Loader2,
	TrendingUp,
	Users,
	Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStatusIcon, getStatusColor } from "@/lib/status-utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GeneratedPost {
	id: string;
	platform: string;
	generated_text: string;
	status: string;
	created_at: string;
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

interface Subscription {
	id: string;
	plan_name: string;
	status: string;
	created_at: string;
	current_period_end: string;
}

interface Usage {
	id: string;
	action: string;
	metadata: Record<string, unknown>;
	created_at: string;
}

interface ActivityFeedProps {
	briefs: ContentBrief[];
	subscription: Subscription | null;
	usage: Usage[];
	userId: string;
}

export function ActivityFeed({
	briefs,
	subscription,
	usage,
}: ActivityFeedProps) {
	const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
	const [filterStatus, setFilterStatus] = useState<string>("all");

	const toggleExpanded = (id: string) => {
		const newExpanded = new Set(expandedItems);
		if (newExpanded.has(id)) {
			newExpanded.delete(id);
		} else {
			newExpanded.add(id);
		}
		setExpandedItems(newExpanded);
	};

	const filteredBriefs = useMemo(() => {
		if (filterStatus === "all") return briefs;
		return briefs.filter((brief) => brief.status === filterStatus);
	}, [briefs, filterStatus]);


	// Calculate stats
	const stats = useMemo(() => {
		const totalPosts = briefs.reduce(
			(sum, brief) => sum + brief.generated_posts.length,
			0,
		);
		const completedCampaigns = briefs.filter(
			(b) => b.status === "completed",
		).length;
		const processingCampaigns = briefs.filter(
			(b) => b.status === "processing",
		).length;

		return {
			totalCampaigns: briefs.length,
			completedCampaigns,
			processingCampaigns,
			totalPosts,
		};
	}, [briefs]);

	// Create timeline activities
	const timelineActivities = useMemo(() => {
		const activities = [];

		// Add brief activities
		briefs.forEach((brief) => {
			activities.push({
				id: brief.id,
				type: "campaign",
				title: `Campaign "${brief.topic}" ${brief.status === "completed" ? "completed" : brief.status === "processing" ? "started" : "created"}`,
				description: brief.goal,
				timestamp: brief.created_at,
				status: brief.status,
				metadata: { brief },
			});

			// Add post generation activities
			brief.generated_posts.forEach((post) => {
				activities.push({
					id: post.id,
					type: "post",
					title: `${post.platform} post generated`,
					description: post.generated_text.substring(0, 100) + "...",
					timestamp: post.created_at,
					status: post.status,
					metadata: { post, brief },
				});
			});
		});

		// Add subscription activities
		if (subscription) {
			activities.push({
				id: subscription.id,
				type: "subscription",
				title: `Subscribed to ${subscription.plan_name} plan`,
				description: "Plan activated and billing started",
				timestamp: subscription.created_at,
				status: "completed",
				metadata: { subscription },
			});
		}

		// Add usage activities
		usage.forEach((use) => {
			activities.push({
				id: use.id,
				type: "usage",
				title: use.action,
				description: JSON.stringify(use.metadata),
				timestamp: use.created_at,
				status: "completed",
				metadata: { usage: use },
			});
		});

		return activities.sort(
			(a, b) =>
				new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
		);
	}, [briefs, subscription, usage]);

	return (
		<div className="max-w-6xl space-y-8">
			{/* Stats Overview */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Card>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
									Total Campaigns
								</p>
								<p className="text-2xl font-bold">{stats.totalCampaigns}</p>
							</div>
							<Zap className="w-8 h-8 text-blue-500" />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
									Completed
								</p>
								<p className="text-2xl font-bold text-green-600">
									{stats.completedCampaigns}
								</p>
							</div>
							<CheckCircle className="w-8 h-8 text-green-500" />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
									Processing
								</p>
								<p className="text-2xl font-bold text-blue-600">
									{stats.processingCampaigns}
								</p>
							</div>
							<Loader2 className="w-8 h-8 text-blue-500" />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
									Posts Generated
								</p>
								<p className="text-2xl font-bold text-purple-600">
									{stats.totalPosts}
								</p>
							</div>
							<TrendingUp className="w-8 h-8 text-purple-500" />
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Main Content */}
			<Tabs defaultValue="timeline" className="space-y-6">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="timeline" className="flex items-center gap-2">
						<Clock className="w-4 h-4" />
						Timeline
					</TabsTrigger>
					<TabsTrigger value="campaigns" className="flex items-center gap-2">
						<Zap className="w-4 h-4" />
						Campaigns
					</TabsTrigger>
					<TabsTrigger value="subscription" className="flex items-center gap-2">
						<CreditCard className="w-4 h-4" />
						Subscription
					</TabsTrigger>
				</TabsList>

				<TabsContent value="timeline" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Calendar className="w-5 h-5" />
								Recent Activity
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{timelineActivities.slice(0, 20).map((activity, index) => (
									<motion.div
										key={activity.id}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: index * 0.05 }}
										className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
									>
										<div className="flex-shrink-0">
											{getStatusIcon(activity.status)}
										</div>
										<div className="flex-1 min-w-0">
											<div className="flex items-center justify-between">
												<p className="text-sm font-medium text-gray-900 dark:text-white truncate">
													{activity.title}
												</p>
												<Badge className={getStatusColor(activity.status)}>
													{activity.status}
												</Badge>
											</div>
											<p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
												{formatDistanceToNow(new Date(activity.timestamp), {
													addSuffix: true,
												})}
											</p>
											{activity.description && (
												<p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
													{activity.description}
												</p>
											)}
										</div>
									</motion.div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="campaigns" className="space-y-4">
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<CardTitle className="flex items-center gap-2">
									<Zap className="w-5 h-5" />
									Campaign History
								</CardTitle>
								<div className="flex items-center gap-2">
									<Filter className="w-4 h-4" />
									<select
										value={filterStatus}
										onChange={(e) => setFilterStatus(e.target.value)}
										className="text-sm border rounded px-2 py-1 bg-white dark:bg-gray-800"
									>
										<option value="all">All Status</option>
										<option value="pending">Pending</option>
										<option value="processing">Processing</option>
										<option value="completed">Completed</option>
										<option value="error">Error</option>
									</select>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{filteredBriefs.map((brief, index) => (
									<motion.div
										key={brief.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.05 }}
										className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
									>
										<div className="flex items-center justify-between">
											<div className="flex-1">
												<div className="flex items-center gap-3">
													{getStatusIcon(brief.status)}
													<h3 className="font-medium text-gray-900 dark:text-white">
														{brief.topic}
													</h3>
													<Badge className={getStatusColor(brief.status)}>
														{brief.status}
													</Badge>
												</div>
												<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
													{brief.brands.brand_name} •{" "}
													{formatDistanceToNow(new Date(brief.created_at), {
														addSuffix: true,
													})}
												</p>
												<p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
													{brief.goal}
												</p>
											</div>
											<Button
												variant="ghost"
												size="sm"
												onClick={() => toggleExpanded(brief.id)}
												className="ml-4"
											>
												{expandedItems.has(brief.id) ? (
													<ChevronUp className="w-4 h-4" />
												) : (
													<ChevronDown className="w-4 h-4" />
												)}
											</Button>
										</div>

										{expandedItems.has(brief.id) &&
											brief.generated_posts.length > 0 && (
												<motion.div
													initial={{ height: 0, opacity: 0 }}
													animate={{ height: "auto", opacity: 1 }}
													exit={{ height: 0, opacity: 0 }}
													className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
												>
													<h4 className="text-sm font-medium mb-3">
														Generated Posts ({brief.generated_posts.length})
													</h4>
													<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
														{brief.generated_posts.map((post) => (
															<div
																key={post.id}
																className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
															>
																<div className="flex items-center justify-between mb-2">
																	<span className="text-xs font-medium text-gray-700 dark:text-gray-300">
																		{post.platform}
																	</span>
																	<Badge variant="outline" className="text-xs">
																		{post.status}
																	</Badge>
																</div>
																<p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3">
																	{post.generated_text}
																</p>
															</div>
														))}
													</div>
												</motion.div>
											)}
									</motion.div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="subscription" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<CreditCard className="w-5 h-5" />
								Subscription Details
							</CardTitle>
						</CardHeader>
						<CardContent>
							{subscription ? (
								<div className="space-y-4">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
											<h4 className="font-medium text-blue-900 dark:text-blue-400">
												Current Plan
											</h4>
											<p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
												{subscription.plan_name}
											</p>
											<p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
												Status: {subscription.status}
											</p>
										</div>
										<div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
											<h4 className="font-medium text-green-900 dark:text-green-400">
												Next Billing
											</h4>
											<p className="text-lg font-semibold text-green-600 dark:text-green-400 mt-1">
												{new Date(
													subscription.current_period_end,
												).toLocaleDateString()}
											</p>
											<p className="text-sm text-green-700 dark:text-green-300 mt-1">
												Auto-renewal enabled
											</p>
										</div>
									</div>
								</div>
							) : (
								<div className="text-center py-8">
									<Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
									<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
										No Active Subscription
									</h3>
									<p className="text-gray-600 dark:text-gray-400 mb-4">
										Upgrade to a paid plan to unlock additional features
									</p>
									<Button>View Plans</Button>
								</div>
							)}
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
