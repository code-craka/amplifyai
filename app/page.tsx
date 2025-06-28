import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { FeaturesShowcase } from "@/components/features-showcase";
import { PricingSection } from "@/components/pricing-section";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { AnimatedButton } from "@/components/ui/animated-button";
import { WaitlistForm } from "@/components/waitlist-form";
import { ArrowRight, CheckCircle, Clock, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Showcase */}
      <FeaturesShowcase />

      {/* How It Works */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <ScrollReveal direction="up">
              <Badge variant="secondary" className="mb-4 px-3 py-1">
                <Clock className="w-4 h-4 mr-2" />
                Simple Process
              </Badge>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                How{" "}
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  AmplifyAI
                </span>{" "}
                works
              </h2>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.4}>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                From idea to viral content in three simple steps. No expertise required.
              </p>
            </ScrollReveal>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <ScrollReveal direction="up" delay={0.6}>
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-110">
                    1
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4 group-hover:text-blue-600 transition-colors">
                  Describe Your Vision
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Tell us about your brand, campaign goals, target audience, and desired tone. 
                  Our AI understands context and nuance.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.8}>
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-110">
                    2
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4 group-hover:text-purple-600 transition-colors">
                  AI Creates Magic
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Advanced AI models generate platform-optimized content, complete with 
                  captions, hashtags, and visual suggestions.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={1.0}>
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto shadow-lg group-hover:shadow-green-500/25 transition-all duration-300 group-hover:scale-110">
                    3
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4 group-hover:text-green-600 transition-colors">
                  Publish & Analyze
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Review, edit, and schedule your content. Track performance with 
                  AI-powered analytics and optimization suggestions.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={1.2}>
            <div className="text-center mt-16">
              <AnimatedButton 
                variant="gradient" 
                size="lg" 
                animation="glow"
                asChild
              >
                <Link href="/auth/sign-up">
                  Start Creating Now <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </AnimatedButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal direction="up">
            <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
              <Users className="w-4 h-4 mr-2" />
              Join 500+ Brands
            </Badge>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to transform your
              <br />
              <span className="text-yellow-300">content strategy?</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.4}>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of brands already using AmplifyAI to create better content 
              faster. Start your free trial today and see the difference AI can make.
            </p>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <WaitlistForm variant="white" />
              <AnimatedButton 
                variant="outline" 
                size="lg" 
                animation="glow"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                asChild
              >
                <Link href="/campaigns">
                  <ArrowRight className="mr-2 w-4 h-4" />
                  Try Demo
                </Link>
              </AnimatedButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}