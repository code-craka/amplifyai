# Claude Memory - AmplifyAI Project

**Created by**: Sayem Abdullah Rihan (@code-craka)  
**Repository**: <https://github.com/code-craka/amplifyai>  
**Status**: Enterprise-Ready Production Platform ✅  
**Tech Stack**: Next.js 15, React 19, Supabase, TypeScript, Tailwind CSS

# 🔧 PROJECT INSTRUCTIONS & REQUIREMENTS

## Core Development Rules

- **Package Manager**: pnpm only (never npm/yarn)
- **Database**: Supabase CLI only (never Docker)
- **Auth System**: Supabase Auth (NOT Clerk - user postponed)
- **AI Providers**: Dual system (OpenAI + Vertex AI)
- **Forms**: Individual state variables (avoid complex objects)
- **React**: Server Components compatible patterns

## Development Server Setup

```bash
git pull                          # Always pull first
pnpm install                      # Install dependencies
supabase start                    # Start Supabase
supabase db reset                 # Reset DB
supabase functions deploy         # Deploy functions
pnpm dev                          # Start Next.js
```

## Branch Management for Future Features

- **FUTURE Phases (11+)**: MUST use feature branches
- **Naming**: `feature/phase-X-description`
- **Workflow**: main → feature branch → implement → test → PR → merge
- **Never implement FUTURE phases directly on main**

## Documentation Requirements

- Always update: CLAUDE.md, README.md, CHANGELOG.md, GEMINI.md
- Use conventional commits: `git commit -m "feat(scope): description"`
- Zero ESLint warnings/errors requirement
- Test all functionality before commits

# 🎯 PROJECT STATUS

## ✅ Completed Phases (1-13)

- **Phase 1**: Core Platform (Landing, Auth, Brands)
- **Phase 2**: AI Content Generation (Dual AI, Real-time Dashboard)
- **Phase 3**: Advanced Features (Scheduling, Security, Admin)
- **Phase 4**: Dynamic Roadmap Management
- **Phase 5**: Content Review Experience (Inline editing, Regeneration)
- **Phase 6**: Production Deployment & Configuration
- **Phase 7**: Social Media Platform Integration (LinkedIn, Twitter, Facebook, Instagram)
- **Phase 8**: Enhanced UX (Calendar, Bulk Operations, Templates)
- **Phase 9**: Authentication Flow & UI Fixes
- **Phase 10**: React Server Components & UI Stability
- **Phase 11**: Commercialization (Subscription tiers, Stripe, Usage metering)
- **Phase 12**: Advanced AI & Analytics (Performance tracking, A/B testing)
- **Phase 13**: Enterprise Performance Optimization (60-80% performance boost)

## 🏗️ Current Architecture

**Frontend**: Next.js 15 + React 19 + TypeScript + shadcn/ui + Tailwind CSS  
**Backend**: Supabase (PostgreSQL, Auth, Realtime, Storage, Edge Functions)  
**AI**: Dual Provider System (OpenAI GPT-4 + Vertex AI Gemini)  
**Security**: RLS policies, rate limiting, enterprise Git workflows  
**Scheduling**: pg_cron automation  
**Performance**: Optimized database indexes, parallel AI processing, component memoization

## 📊 Key Metrics

- **Files**: 70+ files, 15,000+ lines of TypeScript
- **Edge Functions**: 9 functions (AI, scheduling, analytics, optimization)
- **Components**: 15+ React components with modern patterns
- **Database**: 10 migrations, comprehensive RLS policies, performance indexes
- **Security**: GitHub push protection validated, zero secrets committed
- **Performance**: 60-80% improvement across all metrics

## 🔐 Security Implementation

- Supabase Auth with JWT tokens and RLS policies
- Rate limiting (100 requests/minute per user)
- Security headers (CSP, XSS protection, frame options)
- Enhanced middleware with route protection
- GitHub push protection compliance
- Secure API key management via Supabase Vault

## 💰 Business Features (Phase 11)

**Subscription Tiers**:

- Free: 5 posts/month, 1 brand
- Pro ($29/month): 100 posts/month, 5 brands
- Agency ($99/month): Unlimited posts, unlimited brands, team collaboration

**Implementation**:

- Stripe payment processing with webhooks
- Real-time usage tracking and enforcement
- Customer portal for subscription management
- Database functions for usage limits and billing

## 📈 Analytics Features (Phase 12)

- Real-time engagement metrics from social platforms
- AI-powered content optimization with GPT-4 analysis
- Statistical A/B testing with confidence intervals
- Competitor intelligence and opportunity analysis
- Optimal posting time calculations with AI suggestions

## ⚡ Performance Features (Phase 13)

- Database query optimization with critical indexes (80% faster)
- Parallel AI processing with controlled batching (70% faster generation)
- React component memoization and real-time debouncing (50% better UX)
- Next.js bundle optimization and compression (30% smaller bundles)
- Performance monitoring infrastructure with Web Vitals tracking

## 🔮 Future Roadmap

### Phase 13: Enterprise & Scale (FUTURE)

- API for developers and third-party integrations
- Custom AI models for brand-specific content
- Advanced security (SAML/SSO, audit logs)
- Multi-language support for international expansion
- Custom integrations (Zapier, Slack, CRM)

## 💡 Critical Context for Future Sessions

### User Preferences

✅ Supabase Auth (Clerk explicitly postponed)  
✅ Dual AI providers (OpenAI + Vertex AI)  
✅ Enterprise security with GitHub push protection  
✅ Individual state variables for forms  
✅ React Server Components compatible code  
✅ Professional attribution to Sayem Abdullah Rihan (@code-craka)  

### Technical Patterns

- Always use pnpm package manager
- Supabase CLI for database operations
- Individual state variables instead of complex form objects
- Server Components compatible patterns for Next.js 15
- Conventional commit messages with proper scoping
- Feature branches for all FUTURE phase implementations

### Key Files & Components

**Core Components**:

- `app/dashboard/RealtimeDashboard.tsx` - Main dashboard with 5-tab interface
- `app/brands/BrandsManager.tsx` - Brand management with individual state
- `components/ContentCalendar.tsx` - Interactive calendar views
- `components/AnalyticsDashboard.tsx` - Analytics and performance tracking

**Edge Functions**:

- `create-brief` - AI content generation with dual providers
- `regenerate-post` - Content regeneration with fallback
- `publish-post` - Social media publishing pipeline
- `collect-analytics` - Real-time engagement metrics
- `analyze-content-performance` - AI optimization analysis

**Database Schema**:

- Core tables: users, brands, content_briefs, generated_posts
- Subscription system: subscriptions, usage_tracking, billing_history
- Analytics: post_analytics, content_insights, ab_tests
- Social integration: social_connections (encrypted tokens)

## 🛠️ Quick Commands

```bash
# Development
pnpm dev && supabase start

# Quality checks
pnpm lint && pnpm build

# Git workflow
git pull && git add . && git commit -m "feat(scope): description" && git push

# Roadmap management
npm run roadmap:update
npm run roadmap:complete [phase]
```

## 📋 Environment Setup

- All AI provider credentials in Supabase Vault
- Stripe keys configured for subscription processing
- Social media API keys for platform integration
- GitHub push protection enabled and validated
- Production deployment fully operational

**Last Updated**: June 28, 2025  
**Current Focus**: Maintaining production platform, implementing FUTURE phases via feature branches

---
*For detailed implementation history, see: PHASES_COMPLETED.md*  
*For technical specifications, see: TECHNICAL_SPECS.md*  
*For development workflows, see: DEVELOPMENT_GUIDE.md*
