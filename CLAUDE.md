Claude Memory - AmplifyAI Project

... (existing content preserved)

✅ Completed Tasks|Phase 8"
- Implemented Content Calendar View with interactive month/week/day modes
- Created Bulk Operations interface with multi-select functionality
- Developed Content Templates library with performance tracking
- Enhanced mobile responsiveness across new components
- Integrated new components into main dashboard with 5-tab interface
- Prepared infrastructure for Brand Voice Training AI integration

✅ Completed Tasks|Phase 10: React Server Components & UI Stability"
- Fixed authentication flow redirects from `/protected` to `/dashboard`
- Resolved cursor jumping issue in brand management forms with complete component rewrite
- Eliminated React Server Components hydration issues and registerClientReference errors
- Performed complete environment reset (cache clearing, pnpm store prune, fresh install)
- Updated BrandsManager with individual state variables instead of complex formData object
- Achieved zero authentication errors and optimal form input stability

# 🔧 PROJECT INSTRUCTIONS & REQUIREMENTS

## Package Management

- **Use pnpm as package manager** - Never use npm or yarn
- Commands: `pnpm install`, `pnpm dev`, `pnpm build`, `pnpm lint`

## Development Tools

- **Use Supabase CLI instead of Docker** - Never try to run Docker
- Commands: `supabase start`, `supabase db reset`, `supabase functions deploy`
- **Do not attempt Docker operations** - Project uses Supabase CLI exclusively

## Documentation & Memory Updates

- **Always update CLAUDE.md** when making code changes
- **Always update README.md** to reflect new features/changes
- **Always update CHANGELOG.md** with version increments and detailed changes
- **Always update GEMINI.md** for Gemini synchronization
- **Maintain project memory** - Document all technical decisions and solutions

## Git Workflow Requirements

- **Always run `git pull`** before making any changes
- **Test and verify all changes** before committing
- **Commit to project git** after every update/fix
- **Use conventional commits**: `git commit -m "feat(scope): description"`
- **Ensure clean working directory** before starting new work

## Code Quality Standards

- **Run linting and type checking** before commits: `pnpm lint`, `pnpm build`
- **Zero ESLint warnings/errors** requirement
- **TypeScript compilation must succeed**
- **Test all functionality** after changes

## Project Context Reminders

- **Supabase Auth** (NOT Clerk - user explicitly postponed Clerk)
- **Dual AI Provider System** (OpenAI + Vertex AI)
- **Enterprise Security** with GitHub push protection
- **Next.js 15 + React 19** with App Router
- **Individual state variables** for forms (avoid complex state objects)
- **React Server Components compatible** code patterns