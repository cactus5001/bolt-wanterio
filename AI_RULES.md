# AI Rules & Tech Stack Guidelines

## Tech Stack Overview

- **Frontend Framework**: Next.js 13+ with App Router and TypeScript
- **Styling**: Tailwind CSS with custom healthcare theme and shadcn/ui components
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **UI Components**: shadcn/ui library with Radix UI primitives
- **Icons**: Lucide React for consistent iconography
- **State Management**: React hooks with Zustand for complex state
- **Form Handling**: React Hook Form with Zod validation
- **Notifications**: Sonner for toast notifications
- **Charts**: Recharts for data visualization
- **Date Handling**: date-fns for date manipulation

## Library Usage Rules

### 1. UI Components
- **Always use shadcn/ui components** when available
- Use Radix UI primitives for accessibility when shadcn doesn't have the component
- Never create custom components that duplicate shadcn functionality
- Extend shadcn components via composition, not modification

### 2. Styling
- **Tailwind CSS is mandatory** for all styling
- Use the custom healthcare theme colors defined in `globals.css`
- Follow the design system with consistent spacing (4px increments)
- Mobile-first responsive design is required

### 3. State Management
- Use React hooks (`useState`, `useReducer`) for component state
- Use Zustand for global state that needs persistence
- Use React Query for server state and caching
- Avoid Redux - it's overkill for this application

### 4. Forms
- **React Hook Form + Zod** for all form validation
- Use shadcn form components when available
- Implement proper error handling and user feedback
- Always validate on both client and server

### 5. API & Data Fetching
- Use Supabase client for all database operations
- Implement proper error handling with toast notifications
- Use React Query for caching and optimistic updates
- Always handle loading states gracefully

### 6. Authentication
- Use Supabase Auth for all authentication needs
- Implement proper role-based access control
- Use the existing AuthProvider context
- Never store sensitive data in local state

### 7. File Structure
- Components go in `src/components/` with proper categorization
- Pages go in `app/` directory using Next.js App Router
- Utilities go in `src/lib/` 
- Types go in `src/types/`
- Keep files small and focused (max 150 lines)

### 8. Performance
- Use Next.js Image component for all images
- Implement proper code splitting with dynamic imports
- Use React.memo and useCallback where appropriate
- Optimize database queries with proper indexing

### 9. Error Handling
- Use Sonner toasts for user notifications
- Implement proper error boundaries
- Log errors to appropriate services
- Never show raw error messages to users

### 10. Testing
- Write unit tests for utilities and hooks
- Write integration tests for critical user flows
- Use Jest and React Testing Library
- Aim for 80%+ test coverage on core functionality

## Prohibited Patterns

- ❌ Never use inline styles
- ❌ Avoid using any other UI library besides shadcn
- ❌ Don't use CSS-in-JS solutions
- ❌ Avoid complex state management libraries
- ❌ Don't create custom authentication solutions

## Recommended Patterns

- ✅ Use TypeScript strictly with proper typing
- ✅ Follow the component composition pattern
- ✅ Implement proper loading and error states
- ✅ Use the existing design system consistently
- ✅ Write descriptive commit messages

## Code Quality Standards

- ESLint must pass on all commits
- Prettier formatting is mandatory
- TypeScript strict mode is required
- No unused imports or variables
- Proper JSDoc comments for complex functions

This document should be reviewed and updated quarterly to reflect changes in best practices and library updates.