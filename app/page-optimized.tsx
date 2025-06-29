import type { Metadata } from "next";
import { ComparisonSection } from "@/components/comparison-section";
import { FAQSection } from "@/components/faq-section";
import { EnhancedFeaturesShowcase } from "@/components/aceternity/enhanced-features-showcase";
import { Footer } from "@/components/footer";
import { EnhancedHeroSection } from "@/components/aceternity/enhanced-hero-section";
import { AnimatedProcessFlow } from "@/components/aceternity/animated-process-flow";
import { Navigation } from "@/components/navigation";
import { EnhancedPricingSection } from "@/components/aceternity/enhanced-pricing-section";
import { SocialProofSection } from "@/components/social-proof-section";
import { AnimatedTestimonialsCarousel } from "@/components/aceternity/animated-testimonials-carousel";
import { StatsGrid, statSets } from "@/components/ui/stat-card";
import { CTASections } from "@/components/ui/cta-system";

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



export default function Home() {
	return (
		<div className="min-h-screen">
			{/* Navigation */}
			<Navigation />

			{/* Hero Section */}
			<EnhancedHeroSection />

			{/* Trust Signals */}
			<StatsGrid
				stats={statSets.trustSignals}
				title="Join the AI content revolution"
				subtitle="Backed by real results from real businesses"
				badge={{
					text: "Trusted by Industry Leaders",
					iconName: "shield",
				}}
				variant="featured"
				columns={4}
			/>

			{/* Social Proof */}
			<SocialProofSection />

			{/* How It Works */}
			<AnimatedProcessFlow />

			{/* Features Showcase */}
			<EnhancedFeaturesShowcase />

			{/* Testimonials */}
			<AnimatedTestimonialsCarousel />

			{/* Comparison Table */}
			<ComparisonSection />

			{/* Urgency/Scarcity */}
			{CTASections.urgency}

			{/* Pricing Section */}
			<EnhancedPricingSection />

			{/* FAQ Section */}
			<FAQSection />

			{/* Final CTA Section */}
			{CTASections.final}

			{/* Footer */}
			<Footer />
		</div>
	);
}
