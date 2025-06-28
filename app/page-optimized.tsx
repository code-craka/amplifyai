import {
	ArrowRight,
	CheckCircle,
	Clock,
	Shield,
	Users,
	Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ComparisonSection } from "@/components/comparison-section";
import { FAQSection } from "@/components/faq-section";
import { FeaturesShowcase } from "@/components/features-showcase";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section-optimized";
import { Navigation } from "@/components/navigation";
import { PricingSection } from "@/components/pricing-section";
import { SocialProofSection } from "@/components/social-proof-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { WaitlistForm } from "@/components/waitlist-form";

export const metadata: Metadata = {
	title: "AmplifyAI - AI-Powered Social Media Content Creation | Save 95% Time",
	description:
		"Transform your social media strategy with AI. Create professional content campaigns in minutes, not hours. Trusted by 1200+ brands worldwide. Free trial available.",
	keywords: [
		"AI content creation",
		"social media marketing",
		"content automation",
		"social media tools",
		"AI copywriting",
	],
	openGraph: {
		title: "AmplifyAI - AI-Powered Social Media Content Creation",
		description:
			"Create professional social media content in minutes with AI. Save 95% time on content creation.",
		images: [
			{
				url: "/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "AmplifyAI - AI Content Creation Platform",
			},
		],
		type: "website",
		locale: "en_US",
		siteName: "AmplifyAI",
	},
	twitter: {
		card: "summary_large_image",
		title: "AmplifyAI - AI-Powered Social Media Content Creation",
		description: "Create professional social media content in minutes with AI",
		images: ["/og-image.jpg"],
	},
	alternates: {
		canonical: "https://amplifyai.com",
	},
};

const trustSignals = [
	{
		metric: "1200+",
		label: "Happy Customers",
		description: "Businesses trust AmplifyAI for their content needs",
	},
	{
		metric: "95%",
		label: "Time Saved",
		description: "Average time reduction in content creation",
	},
	{
		metric: "4.9/5",
		label: "Customer Rating",
		description: "Based on 500+ verified reviews",
	},
	{
		metric: "99.9%",
		label: "Uptime",
		description: "Enterprise-grade reliability and performance",
	},
];

const HowItWorksSection = () => (
	<section className="py-24 bg-gray-50 dark:bg-gray-800/50" id="how-it-works">
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="text-center mb-20">
				<ScrollReveal direction="up">
					<Badge
						variant="secondary"
						className="mb-6 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
					>
						<Clock className="w-4 h-4 mr-2" />
						Simple 3-Step Process
					</Badge>
				</ScrollReveal>

				<ScrollReveal direction="up" delay={0.2}>
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						From idea to{" "}
						<span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
							viral content
						</span>{" "}
						in minutes
					</h2>
				</ScrollReveal>

				<ScrollReveal direction="up" delay={0.4}>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						No design skills, no copywriting experience, no marketing degree
						required. Just describe your vision and let our AI do the heavy
						lifting.
					</p>
				</ScrollReveal>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
				{[
					{
						step: 1,
						title: "Describe Your Vision",
						description:
							"Tell us your brand story, target audience, and campaign goals. Our AI understands context, tone, and industry-specific requirements.",
						details: [
							"Brand voice analysis",
							"Audience targeting",
							"Goal optimization",
							"Tone customization",
						],
						color: "blue",
						delay: 0.6,
					},
					{
						step: 2,
						title: "AI Creates Magic",
						description:
							"Advanced AI models generate platform-optimized content with captions, hashtags, and visual suggestions in seconds.",
						details: [
							"Multi-platform optimization",
							"SEO-friendly hashtags",
							"Visual suggestions",
							"A/B test variants",
						],
						color: "purple",
						delay: 0.8,
					},
					{
						step: 3,
						title: "Publish & Optimize",
						description:
							"Review, schedule, and track performance. Get AI-powered insights to continuously improve your content strategy.",
						details: [
							"Smart scheduling",
							"Performance tracking",
							"Optimization tips",
							"ROI analytics",
						],
						color: "green",
						delay: 1.0,
					},
				].map((item) => (
					<ScrollReveal key={item.step} direction="up" delay={item.delay}>
						<div className="relative group">
							<div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group-hover:border-blue-200 dark:group-hover:border-blue-700">
								<div className="relative mb-8">
									<div
										className={`w-16 h-16 bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg group-hover:shadow-${item.color}-500/25 transition-all duration-300 group-hover:scale-110`}
									>
										{item.step}
									</div>
									<div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
										<CheckCircle className="w-4 h-4 text-white" />
									</div>
								</div>

								<h3
									className={`text-2xl font-semibold mb-4 group-hover:text-${item.color}-600 transition-colors`}
								>
									{item.title}
								</h3>

								<p className="text-muted-foreground leading-relaxed mb-6">
									{item.description}
								</p>

								<ul className="space-y-2">
									{item.details.map((detail, index) => (
										<li
											key={index}
											className="flex items-center text-sm text-muted-foreground"
										>
											<div
												className={`w-1.5 h-1.5 bg-${item.color}-500 rounded-full mr-3 flex-shrink-0`}
											/>
											{detail}
										</li>
									))}
								</ul>
							</div>

							{/* Connecting line for desktop */}
							{item.step < 3 && (
								<div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-700" />
							)}
						</div>
					</ScrollReveal>
				))}
			</div>

			<ScrollReveal direction="up" delay={1.2}>
				<div className="text-center mt-16">
					<div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 max-w-md mx-auto">
						<h4 className="text-lg font-semibold mb-4">
							Ready to get started?
						</h4>
						<p className="text-muted-foreground mb-6">
							Join 1200+ businesses already creating better content with AI
						</p>
						<AnimatedButton
							variant="gradient"
							size="lg"
							animation="glow"
							className="w-full"
							asChild
						>
							<Link href="/auth/sign-up">
								Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
							</Link>
						</AnimatedButton>
						<p className="text-xs text-muted-foreground mt-3">
							No credit card required • Cancel anytime
						</p>
					</div>
				</div>
			</ScrollReveal>
		</div>
	</section>
);

const TrustSignalsSection = () => (
	<section className="py-16 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<ScrollReveal direction="up">
				<div className="text-center mb-12">
					<Badge variant="secondary" className="mb-4 px-4 py-2">
						<Shield className="w-4 h-4 mr-2" />
						Trusted by Industry Leaders
					</Badge>
					<h3 className="text-2xl font-semibold mb-2">
						Join the AI content revolution
					</h3>
					<p className="text-muted-foreground">
						Backed by real results from real businesses
					</p>
				</div>
			</ScrollReveal>

			<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
				{trustSignals.map((signal, index) => (
					<ScrollReveal key={signal.label} direction="up" delay={index * 0.1}>
						<div className="text-center group">
							<div className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-200">
								{signal.metric}
							</div>
							<div className="font-semibold text-gray-900 dark:text-white mb-1">
								{signal.label}
							</div>
							<div className="text-sm text-muted-foreground">
								{signal.description}
							</div>
						</div>
					</ScrollReveal>
				))}
			</div>
		</div>
	</section>
);

const UrgencySection = () => (
	<section className="py-16 bg-gradient-to-r from-orange-500 to-red-500 relative overflow-hidden">
		<div className="absolute inset-0">
			<div className="absolute inset-0 bg-black/10" />
			<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
		</div>

		<div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<ScrollReveal direction="up">
				<Badge
					variant="secondary"
					className="mb-6 bg-white/20 text-white border-white/30"
				>
					<Zap className="w-4 h-4 mr-2" />
					Limited Time Offer
				</Badge>
			</ScrollReveal>

			<ScrollReveal direction="up" delay={0.2}>
				<h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
					Get 50% off your first 3 months
				</h2>
			</ScrollReveal>

			<ScrollReveal direction="up" delay={0.4}>
				<p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
					Join before the end of this month and save big. Over 200 businesses
					signed up this week alone.
				</p>
			</ScrollReveal>

			<ScrollReveal direction="up" delay={0.6}>
				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<AnimatedButton
						variant="outline"
						size="lg"
						animation="glow"
						className="bg-white text-orange-600 hover:bg-orange-50 border-white"
						asChild
					>
						<Link href="/auth/sign-up">
							Claim 50% Discount <ArrowRight className="ml-2 w-4 h-4" />
						</Link>
					</AnimatedButton>
				</div>
			</ScrollReveal>

			<ScrollReveal direction="up" delay={0.8}>
				<p className="text-sm text-orange-200 mt-4">
					🔥 Offer expires in 6 days • No credit card required
				</p>
			</ScrollReveal>
		</div>
	</section>
);

export default function Home() {
	return (
		<div className="min-h-screen">
			{/* Navigation */}
			<Navigation />

			{/* Hero Section */}
			<HeroSection />

			{/* Trust Signals */}
			<TrustSignalsSection />

			{/* Social Proof */}
			<SocialProofSection />

			{/* How It Works */}
			<HowItWorksSection />

			{/* Features Showcase */}
			<FeaturesShowcase />

			{/* Testimonials */}
			<TestimonialsSection />

			{/* Comparison Table */}
			<ComparisonSection />

			{/* Urgency/Scarcity */}
			<UrgencySection />

			{/* Pricing Section */}
			<PricingSection />

			{/* FAQ Section */}
			<FAQSection />

			{/* Final CTA Section */}
			<section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
				<div className="absolute inset-0 bg-black/20" />
				<div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<ScrollReveal direction="up">
						<Badge
							variant="secondary"
							className="mb-6 bg-white/20 text-white border-white/30"
						>
							<Users className="w-4 h-4 mr-2" />
							Join 1200+ Successful Brands
						</Badge>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.2}>
						<h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
							Ready to 10x your
							<br />
							<span className="text-yellow-300">content output?</span>
						</h2>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.4}>
						<p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
							Join the AI content revolution today. Create professional
							campaigns in minutes, save 95% of your time, and watch your
							engagement soar.
						</p>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.6}>
						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
							<WaitlistForm variant="white" />
							<AnimatedButton
								variant="outline"
								size="lg"
								animation="glow"
								className="bg-white/10 border-white/30 text-white hover:bg-white/20 min-w-[140px]"
								asChild
							>
								<Link href="/campaigns">
									<ArrowRight className="mr-2 w-4 h-4" />
									Try Demo
								</Link>
							</AnimatedButton>
						</div>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.8}>
						<div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
							<div className="text-center">
								<div className="text-2xl font-bold text-white">✅</div>
								<div className="text-sm text-blue-100 mt-2">No credit card</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-white">⚡</div>
								<div className="text-sm text-blue-100 mt-2">
									Setup in 60 seconds
								</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-white">🔒</div>
								<div className="text-sm text-blue-100 mt-2">Cancel anytime</div>
							</div>
						</div>
					</ScrollReveal>
				</div>
			</section>

			{/* Footer */}
			<Footer />
		</div>
	);
}
