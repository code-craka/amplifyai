import { WaitlistForm } from "@/components/waitlist-form";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Target, Clock, BarChart3, Sparkles, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">AmplifyAI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link href="#pricing" className="text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link href="/brands" className="text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            🚀 AI-Powered Content Creation
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            From 6 hours to{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              6 minutes
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Transform your social media strategy with AI that creates engaging content campaigns 
            in minutes, not hours. Professional-quality posts across all platforms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <WaitlistForm />
            <Button variant="outline" size="lg" asChild>
              <Link href="/campaigns">
                Try Demo <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500">99%</div>
              <div className="text-sm text-muted-foreground">Time Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500">10x</div>
              <div className="text-sm text-muted-foreground">Content Output</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">100+</div>
              <div className="text-sm text-muted-foreground">Brands Trusting Us</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need for social media success
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI understands your brand voice and creates content that converts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>AI Content Generation</CardTitle>
                <CardDescription>
                  Generate engaging posts with advanced AI that understands your brand voice
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Multi-Platform Optimization</CardTitle>
                <CardDescription>
                  Content optimized for Instagram, Twitter, LinkedIn, and Facebook automatically
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>Smart Scheduling</CardTitle>
                <CardDescription>
                  AI-powered posting times for maximum engagement and reach
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>
                  Track engagement, reach, and ROI with comprehensive analytics
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <CardTitle>Brand Consistency</CardTitle>
                <CardDescription>
                  Maintain your unique brand voice across all content and platforms
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>
                  Review, approve, and collaborate on content with your team
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How AmplifyAI works
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple, powerful, and incredibly fast
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Describe Your Campaign</h3>
              <p className="text-muted-foreground">
                Tell us about your brand, campaign goals, and target audience
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Creates Content</h3>
              <p className="text-muted-foreground">
                Our AI generates engaging posts optimized for each platform
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Review & Schedule</h3>
              <p className="text-muted-foreground">
                Review, edit, and schedule your content for maximum impact
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to transform your content strategy?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of brands already using AmplifyAI to create better content faster
          </p>
          <WaitlistForm variant="white" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">AmplifyAI</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 AmplifyAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}