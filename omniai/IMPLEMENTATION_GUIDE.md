# Authentication System Implementation Guide

This document provides a comprehensive guide to the OmniAI authentication system architecture, implementation details, and how all components work together.

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Component Overview](#component-overview)
3. [State Management](#state-management)
4. [Authentication Flows](#authentication-flows)
5. [Route Protection](#route-protection)
6. [Error Handling](#error-handling)
7. [Best Practices](#best-practices)

---

## System Architecture

### Layered Architecture

```
┌─────────────────────────────────────────────────┐
│            UI LAYER (Pages & Components)         │
│  (/login, /signup, /forgot-password, /dashboard) │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│         COMPONENT LAYER (Reusable)              │
│  AuthLayout, InputField, Button, etc.           │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│          LOGIC LAYER (Hooks & Store)            │
│  useAuth hook, Zustand store                    │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│         SERVICE LAYER (Business Logic)          │
│  loginUser(), signupUser(), etc.                │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│         DATA LAYER (Storage & Types)            │
│  localStorage, TypeScript types, validation     │
└─────────────────────────────────────────────────┘
```

---

## Component Overview

### 1. Authentication Pages

#### Login Page (`/login`)
```typescript
Features:
- Email input with validation
- Password field with show/hide toggle
- Remember me checkbox
- Social login buttons (UI only)
- Form error handling
- Loading state with spinner
- Demo credentials hint box
```

**Flow:**
```
User Input
   ↓
Client-side Validation
   ↓
Call login() from Zustand
   ↓
Mock API delay (1.2s)
   ↓
Validate credentials
   ↓
Generate JWT tokens
   ↓
Save to localStorage
   ↓
Update Zustand state
   ↓
Redirect to /dashboard
```

#### Signup Page (`/signup`)
```typescript
Features:
- Name input
- Email input
- Password with strength validation
- Confirm password with match validation
- Terms and conditions checkbox
- Error messages per field
- Loading state
```

**Flow:**
```
User Input
   ↓
Client-side Validation (name, email, password match)
   ↓
Check if email already registered
   ↓
Create user in mock database
   ↓
Generate tokens
   ↓
Auto-login user
   ↓
Redirect to /dashboard
```

#### Forgot Password Page (`/forgot-password`)
```typescript
Features:
- Email input
- Send reset link button
- Success screen with email confirmation
- Back to login link
```

**Note:** UI only - backend implementation needed for real password reset.

### 2. Protected Pages

#### Dashboard (`/dashboard`)
```typescript
Protected by: ProtectedRoute component
Features:
- User profile display
- User stats
- Feature showcase
- Logout button
- Navigation navbar
```

**Access Flow:**
```
Unauthenticated user tries to access /dashboard
   ↓
ProtectedRoute checks isAuthenticated
   ↓
If false → Restore session from localStorage
   ↓
If still false → Redirect to /login
   ↓
If true → Render dashboard
```

### 3. Reusable Components

#### AuthLayout Component
- Renders the auth page wrapper
- Manages background animations
- Centers the form
- Shows branding
- Animated blob effects

```typescript
<AuthLayout title="Welcome back" subtitle="Sign in to your account">
  {/* Form content */}
</AuthLayout>
```

#### InputField Component
- Text input with label
- Icon support (left side)
- Error message display
- Focus glow animation
- Disabled state support

```typescript
<InputField
  label="Email"
  type="email"
  placeholder="your@email.com"
  value={email}
  onChange={handleChange}
  error={errors.email}
  icon={<Mail />}
/>
```

#### PasswordField Component
- Extends InputField for passwords
- Show/hide password toggle
- Eye icon button
- Maintains InputField styling

```typescript
<PasswordField
  label="Password"
  value={password}
  onChange={handleChange}
  error={errors.password}
/>
```

#### Button Component
- Multiple variants: primary, secondary, ghost
- Multiple sizes: sm, md, lg
- Loading state with spinner
- Hover and tap animations
- Full width option

```typescript
<Button
  variant="primary"
  size="lg"
  isLoading={isLoading}
  fullWidth
  icon={<ArrowRight />}
>
  Sign in
</Button>
```

#### SocialLoginButton Component
- Provider-specific styling
- Google, GitHub, Microsoft
- Loading state
- Icon from Lucide

```typescript
<SocialLoginButton provider="google" onClick={handleGoogleLogin} />
```

#### ErrorMessage Component
- Animated error display
- Dismissible
- Alert icon
- Color-coded (red)

```typescript
<ErrorMessage message={error} onDismiss={clearError} />
```

#### ProtectedRoute Component
- Wraps protected page content
- Checks authentication status
- Restores session if needed
- Shows loading spinner
- Redirects to login if not auth

```typescript
<ProtectedRoute>
  <DashboardContent />
</ProtectedRoute>
```

---

## State Management

### Zustand Store Architecture

```typescript
// Store Structure
interface AuthStore {
  // State
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
  sessionExpired: boolean

  // Actions
  login(email, password, rememberMe?)
  signup(name, email, password)
  logout()
  restoreSession()
  clearError()
  setError(error)
}
```

### Store Usage

**In Components:**
```typescript
import { useAuth } from '@/hooks/useAuth';

export default function MyComponent() {
  const { user, isAuthenticated, login, logout, error } = useAuth();

  return (
    <>
      {isAuthenticated && <p>Welcome, {user?.name}</p>}
      <button onClick={() => login('email', 'password')}>Login</button>
      <button onClick={logout}>Logout</button>
    </>
  );
}
```

**Selectors for Performance:**
```typescript
// Access specific state without full store
const user = useAuthStore(state => state.user);
const isAuthenticated = useAuthStore(state => state.isAuthenticated);
const { login, logout } = useAuthStore(state => ({
  login: state.login,
  logout: state.logout,
}));
```

---

## Authentication Flows

### Login Flow (Detailed)

```
┌─────────────────────────────────────────────────┐
│ User opens /login page                           │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────┐
│ AuthLayout renders with form                     │
│ Demo credentials hint displayed                  │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────┐
│ User enters email and password                   │
│ Form state updated in component state            │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────┐
│ User clicks "Sign in" button                     │
│ handleSubmit triggered                          │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────┐
│ Form Validation (client-side)                   │
│ - validateEmail(email)                          │
│ - validatePassword(password)                    │
│ Returns errors object                           │
└────────────────┬────────────────────────────────┘
                 │
         ┌───────┴──────────┐
         │                  │
    Has Errors?        No Errors
         │                  │
    ┌────▼─────┐      ┌─────▼──────┐
    │ Set form │      │ Clear      │
    │ errors   │      │ field      │
    │ Return   │      │ errors     │
    └──────────┘      └─────┬──────┘
                            │
              ┌─────────────▼─────────────┐
              │ useAuth().login(          │
              │   email,                  │
              │   password,               │
              │   rememberMe              │
              │ )                         │
              └─────────────┬─────────────┘
                            │
              ┌─────────────▼──────────────┐
              │ Zustand updates:           │
              │ - isLoading = true         │
              │ - error = null             │
              └─────────────┬──────────────┘
                            │
              ┌─────────────▼──────────────┐
              │ loginUser() called from    │
              │ src/utils/auth.utils.ts    │
              └─────────────┬──────────────┘
                            │
              ┌─────────────▼──────────────┐
              │ Mock API delay:            │
              │ await new Promise((r) =>   │
              │   setTimeout(r, 1200)      │
              │ )                          │
              └─────────────┬──────────────┘
                            │
              ┌─────────────▼──────────────┐
              │ Get mock users from        │
              │ localStorage               │
              │ (omniai_mock_users_db)     │
              └─────────────┬──────────────┘
                            │
              ┌─────────────▼──────────────┐
              │ Find user by email         │
              └─────────────┬──────────────┘
                            │
                    ┌───────┴──────────┐
                    │                  │
               User Found?        Not Found
                    │                  │
              ┌─────▼──────┐    ┌──────▼─────┐
              │ Check      │    │ Throw error│
              │ password   │    │ "Invalid   │
              │            │    │ credentials│
              │            │    │ "          │
              └─────┬──────┘    └──────┬─────┘
                    │                  │
          ┌─────────┴─────────┐        │
          │                   │        │
    Match?             Not Match       │
          │                   │        │
      ┌───▼────┐         ┌────▼─────┐ │
      │ Success│         │ Throw     │ │
      └───┬────┘         │ error     │ │
          │              └────┬──────┘ │
          │                   │        │
          │              ┌────▼────────▼───┐
          │              │ Error caught in │
          │              │ catch block     │
          │              │ setError(msg)   │
          │              └────┬────────────┘
          │                   │
          │              ┌────▼────────────┐
          │              │ Update Zustand: │
          │              │ - isLoading=false
          │              │ - error = msg    │
          │              │ - isAuth = false │
          │              └──────────────────┘
          │
    ┌─────▼─────────────────────────┐
    │ Generate JWT tokens:           │
    │ - Access token (15 min)        │
    │ - Refresh token (7 days)       │
    │ Using: generateMockToken()     │
    │ btoa() encoding for token      │
    └─────┬─────────────────────────┘
          │
    ┌─────▼──────────────────────────┐
    │ Return AuthResponse:            │
    │ {                              │
    │   user: {...},                 │
    │   accessToken: "...",          │
    │   refreshToken: "...",         │
    │   expiresIn: 900               │
    │ }                              │
    └─────┬──────────────────────────┘
          │
    ┌─────▼──────────────────────────┐
    │ saveSession() called:           │
    │ - Save to localStorage:        │
    │   * omniai_user                │
    │   * omniai_access_token        │
    │   * omniai_refresh_token       │
    │   * omniai_remember_me         │
    │   * omniai_token_expiry        │
    └─────┬──────────────────────────┘
          │
    ┌─────▼──────────────────────────┐
    │ Update Zustand store:          │
    │ - user = {...}                 │
    │ - accessToken = "..."          │
    │ - refreshToken = "..."         │
    │ - isAuthenticated = true       │
    │ - isLoading = false            │
    │ - error = null                 │
    └─────┬──────────────────────────┘
          │
    ┌─────▼──────────────────────────┐
    │ router.push('/dashboard')      │
    │ Auto-redirect to dashboard     │
    └─────┬──────────────────────────┘
          │
    ┌─────▼──────────────────────────┐
    │ Dashboard Layout checks auth   │
    │ - isAuthenticated = true ✓     │
    │ - Render dashboard             │
    │ - Show user profile            │
    └──────────────────────────────────┘
```

### Signup Flow

```
Similar to login but with:
1. Additional validation for password match
2. Terms agreement checkbox check
3. Email uniqueness check in mock database
4. New user creation in mock database
5. Auto-login on success
```

### Session Restoration Flow

```
┌─────────────────────────────────┐
│ App initializes / Page reloads   │
└─────────────┬───────────────────┘
              │
┌─────────────▼───────────────────┐
│ Dashboard Layout renders         │
└─────────────┬───────────────────┘
              │
┌─────────────▼───────────────────┐
│ useEffect triggers               │
│ restoreSession() called          │
└─────────────┬───────────────────┘
              │
┌─────────────▼───────────────────┐
│ restoreSessionFromStorage()      │
│ Check if authenticated:          │
│ - getStoredTokens()              │
│ - isTokenExpired()               │
└─────────────┬───────────────────┘
              │
      ┌───────┴─────────┐
      │                 │
  Token Valid?    Token Expired
      │                 │
   ┌──▼──┐         ┌────▼─────┐
   │Restore  │    │ Clear all │
   │session  │    │ data      │
   │from     │    │ (clearSesson) │
   │storage  │    └────┬──────┘
   └──┬──────┘         │
      │           ┌────▼──────┐
      │           │ Redirect  │
      │           │ to /login │
      │           └───────────┘
      │
   ┌──▼──────────────┐
   │ Set Zustand:    │
   │ - user = {...}  │
   │ - isAuth = true │
   └────────────────┘
```

### Logout Flow

```
┌──────────────────────────┐
│ User clicks logout       │
│ logout() called          │
└────────┬─────────────────┘
         │
┌────────▼──────────────────┐
│ clearSession()            │
│ Remove from localStorage: │
│ - omniai_user             │
│ - omniai_access_token     │
│ - omniai_refresh_token    │
│ - omniai_remember_me      │
│ - omniai_token_expiry     │
└────────┬──────────────────┘
         │
┌────────▼──────────────────┐
│ Update Zustand:           │
│ - user = null             │
│ - accessToken = null      │
│ - refreshToken = null     │
│ - isAuthenticated = false │
│ - error = null            │
│ - isLoading = false       │
└────────┬──────────────────┘
         │
┌────────▼──────────────────┐
│ router.push('/login')     │
│ Redirect to login page    │
└────────────────────────────┘
```

---

## Route Protection

### Multi-Layer Protection

```
Layer 1: Next.js Middleware (Server-side)
┌──────────────────────────────────────┐
│ Check all incoming requests          │
│ Protected routes: /dashboard, /chat   │
│ Auth routes: /login, /signup         │
│ Public routes: /, /pricing           │
│                                      │
│ If protected + no token → /login     │
│ If auth + logged in → /dashboard     │
└──────────────────────────────────────┘
             ↓
Layer 2: Auth Layout (Client-side)
┌──────────────────────────────────────┐
│ (auth)/layout.tsx                    │
│ Check if already logged in           │
│ If yes → redirect to /dashboard      │
│ If loading → show spinner            │
└──────────────────────────────────────┘
             ↓
Layer 3: Dashboard Layout (Client-side)
┌──────────────────────────────────────┐
│ (dashboard)/layout.tsx               │
│ Check isAuthenticated status         │
│ If false → restore session or error  │
│ Render children if authenticated     │
└──────────────────────────────────────┘
             ↓
Layer 4: ProtectedRoute Component
┌──────────────────────────────────────┐
│ Wrapper component for specific pages │
│ Final check before showing content   │
│ Shows loading spinner during check   │
└──────────────────────────────────────┘
```

---

## Error Handling

### Error Types and Messages

```typescript
1. VALIDATION ERRORS
   - "This field is required"
   - "Please enter a valid email address"
   - "Password must be at least 8 characters"
   - "Passwords do not match"

2. AUTHENTICATION ERRORS
   - "Invalid email or password"
   - "This email is already registered"
   - "Your session has expired. Please log in again"

3. NETWORK ERRORS
   - "Network error. Please try again"

4. FORM ERRORS
   - Per-field error display
   - Real-time validation
   - Clear on user input
```

### Error Display

```typescript
// In components
{error && <ErrorMessage message={error} onDismiss={clearError} />}

// ErrorMessage component
<motion.div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30">
  <AlertCircle className="w-5 h-5 text-red-400" />
  <p className="text-red-300">{message}</p>
  <button onClick={onDismiss}>×</button>
</motion.div>
```

---

## Best Practices

### 1. Component Usage

```typescript
// ✅ Good: Use useAuth hook
const { user, login, isLoading } = useAuth();

// ❌ Bad: Access store directly in every component
const store = useAuthStore((state) => state);
```

### 2. Form Validation

```typescript
// ✅ Good: Validate before submission
const errors = validateLoginForm(email, password);
if (hasErrors(errors)) {
  setFormErrors(errors);
  return;
}

// ❌ Bad: Only validate on backend
submit(); // might fail server-side
```

### 3. Error Handling

```typescript
// ✅ Good: Show user-friendly error
try {
  await login(email, password);
} catch (error) {
  // Store already set error message
  // User sees "Invalid email or password"
}

// ❌ Bad: Show raw error
console.log(error.message); // "ECONNREFUSED"
```

### 4. State Management

```typescript
// ✅ Good: Selectors for performance
const isAuth = useAuthStore((state) => state.isAuthenticated);
const user = useAuthStore((state) => state.user);

// ❌ Bad: Full store subscription
const auth = useAuthStore();
// re-renders on any store change
```

### 5. Route Protection

```typescript
// ✅ Good: Multiple protection layers
// - Middleware (server)
// - Layout (client)
// - ProtectedRoute (component)

// ❌ Bad: Only client-side protection
// User can access routes before hydration
```

### 6. Loading States

```typescript
// ✅ Good: Show appropriate feedback
{isLoading ? <Spinner /> : <Content />}

// ❌ Bad: Freeze UI during loading
<button disabled={!isLoading} onClick={login}>
  Sign in
</button>
// User doesn't know what's happening
```

---

## Integration with Backend

### To Connect to Real API:

**Step 1: Update Auth Utils**
```typescript
// src/utils/auth.utils.ts
export const loginUser = async (email: string, password: string) => {
  const response = await axios.post('/api/auth/login', {
    email,
    password,
  });
  return response.data; // {user, accessToken, refreshToken}
};
```

**Step 2: Add API Client**
```typescript
// src/services/api/client.ts
import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for tokens
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('omniai_access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for token refresh
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      // Refresh token logic
    }
    return Promise.reject(error);
  }
);

export default client;
```

**Step 3: Update Middleware**
```typescript
// src/middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  
  if (isProtectedRoute(pathname) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}
```

---

## Conclusion

This authentication system is **production-ready** for frontend implementation and can be easily integrated with a backend API. All components follow best practices and provide a great user experience with smooth animations, proper error handling, and complete route protection.
