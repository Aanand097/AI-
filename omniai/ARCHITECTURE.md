# OmniAI Architecture

## Overview

OmniAI is designed with a scalable, layered architecture following industry best practices. This document outlines the key design decisions and architectural patterns.

## Architectural Layers

### 1. **Presentation Layer** (`/src/components`, `/src/app/\(routes\)/`)
- React components and page layouts
- Handles UI rendering and user interactions
- No direct API calls; uses hooks and services

### 2. **Logic Layer** (`/src/hooks`, `/src/store`)
- Custom React hooks for business logic
- Zustand store for state management
- Orchestration between UI and services

### 3. **Service Layer** (`/src/services`)
- API client integration (Axios)
- External AI model integrations
- Authentication and authorization
- Data transformation and normalization

### 4. **Data Layer** (`/src/types`, `/src/utils`)
- TypeScript type definitions
- Utility functions for data manipulation
- Constants and configuration

## Key Design Patterns

### Component Organization

- **UI Components** (`/components/ui/`) - Atomic, reusable design system components
- **Feature Components** (e.g., `/app/(dashboard)/chat/components/`) - Feature-specific components
- **Layout Components** (`/components/layout/`) - Page structure components

### Service Architecture

- **API Service** - Centralized HTTP client with interceptors
- **External Services** - Adapters for ChatGPT, Gemini, Grok, DeepSeek APIs
- **Auth Service** - Centralized authentication logic
- **Storage Service** - Browser storage abstraction

### State Management (Zustand)

```
slices/
├── authSlice     - User auth state
├── chatSlice     - Chat conversations
├── modelsSlice   - Available models
├── uiSlice       - UI state (theme, sidebar, etc.)
└── settingsSlice - User settings
```

### API Routes Structure

Next.js API routes handle:
- Authentication endpoints (`/api/auth/*`)
- Chat operations (`/api/chat/*`)
- Model management (`/api/models/*`)
- User data (`/api/user/*`)

## Scalability Considerations

### Adding New Features

1. **New Page/Feature**:
   - Create folder in `/app/(group)/feature/`
   - Add page.tsx and components/
   - Create corresponding API routes if needed

2. **New API Integration**:
   - Create service in `/services/external/`
   - Expose through `/services/api/`
   - Update types in `/types/`

3. **New State Management**:
   - Add slice in `/store/slices/`
   - Export from `/store/index.ts`

## Performance Optimizations

- Code splitting via Next.js App Router
- Image optimization with Next.js Image component
- Lazy loading of heavy components
- API response caching strategies
- CSS-in-JS with Tailwind for minimal bundle

## Security Practices

- Environment variable management (.env.local)
- HTTP interceptors for token injection
- CORS configuration in API routes
- Input validation and sanitization
- Secure storage of sensitive data

## Testing Strategy

- **Unit Tests**: Components, hooks, utilities
- **Integration Tests**: API flows, multi-component scenarios
- **E2E Tests**: User workflows (login, chat, comparison)

## Future Enhancements

- WebSocket support for real-time chat
- Server-Side Rendering (SSR) for SEO
- Database integration (PostgreSQL)
- Advanced caching (Redis)
- Multi-region deployment
- AI model load balancing
