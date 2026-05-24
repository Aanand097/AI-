# Authentication System - OmniAI Frontend

A complete, production-quality authentication system for the OmniAI SaaS application built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

### Pages
- **Login Page** (`/login`) - User authentication with email and password
- **Signup Page** (`/signup`) - User registration with validation
- **Forgot Password** (`/forgot-password`) - Password reset UI (mock flow)
- **Protected Dashboard** (`/dashboard`) - User profile and authenticated area

### Components
- **AuthLayout** - Glassmorphism design with animated backgrounds
- **InputField** - Reusable text input with focus states and icons
- **PasswordField** - Password input with show/hide toggle
- **Button** - Animated button with loading states
- **SocialLoginButton** - Social provider buttons (Google, GitHub, Microsoft)
- **ErrorMessage** - Error display with animations
- **ProtectedRoute** - Client-side route protection wrapper

### Authentication Features
- ✅ Email/password login and signup
- ✅ Form validation (email, password strength, password match)
- ✅ Remember me functionality
- ✅ Auto-login on page reload (session persistence)
- ✅ Mock JWT token generation and validation
- ✅ Local storage session management
- ✅ Smooth page transitions with Framer Motion
- ✅ Loading states and animations
- ✅ Error handling with user-friendly messages
- ✅ Responsive design (mobile, tablet, desktop)

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── chat/page.tsx
│   │   └── layout.tsx
│   ├── page.tsx (landing)
│   ├── layout.tsx
│   ├── globals.css
│   └── middleware.ts
│
├── components/
│   └── auth/
│       ├── AuthLayout.tsx
│       ├── InputField.tsx
│       ├── PasswordField.tsx
│       ├── Button.tsx
│       ├── SocialLoginButton.tsx
│       ├── ErrorMessage.tsx
│       ├── ProtectedRoute.tsx
│       └── index.ts
│
├── hooks/
│   └── useAuth.ts
│
├── store/
│   ├── slices/
│   │   └── authSlice.ts
│   └── index.ts
│
├── services/
│   └── auth/ (placeholder for future API integration)
│
├── types/
│   ├── auth.types.ts
│   └── index.ts
│
├── constants/
│   ├── auth.constants.ts
│   ├── routes.constants.ts
│   └── index.ts
│
├── utils/
│   ├── auth.utils.ts
│   ├── validation.ts
│   └── index.ts
│
└── middleware.ts
```

## 🔐 Authentication Flow

### Login Flow
```
User enters credentials
    ↓
Form validation (client-side)
    ↓
POST to mock auth function
    ↓
Simulate API delay (1.2s)
    ↓
Verify credentials against mock database
    ↓
Generate JWT tokens (mock)
    ↓
Save user & tokens to localStorage
    ↓
Update Zustand store
    ↓
Redirect to /dashboard
```

### Session Persistence
```
Page reload
    ↓
Check localStorage for tokens
    ↓
Validate tokens (client-side check)
    ↓
If valid → Restore Zustand state
    ↓
If invalid → Clear session & redirect to /login
```

### Protected Routes
```
Access /dashboard
    ↓
ProtectedRoute wrapper checks auth state
    ↓
If authenticated → Show page
    ↓
If not → Show loading → Restore session
    ↓
If still not auth → Redirect to /login
```

## 💾 Mock Database

The authentication system uses `localStorage` to simulate a backend database:

**Demo User:**
```
Email: demo@omniai.com
Password: Demo@12345
```

You can create new accounts through the signup page, and they will be stored in the mock database.

## 🎨 Design System

### Colors
- **Background**: `#0B0F19` (Dark navy)
- **Card**: `rgba(17, 24, 39, 0.7)` (Semi-transparent gray)
- **Primary**: `#3B82F6` (Blue)
- **Accent**: `#10B981` (Green)
- **Error**: `#EF4444` (Red)

### Components
- Glassmorphism cards with backdrop blur
- Gradient backgrounds with animated blobs
- Smooth transitions and hover effects
- Loading animations (spinners)
- Error messages with icons

## 🔧 How to Use

### Login
1. Navigate to `/login`
2. Enter email: `demo@omniai.com`
3. Enter password: `Demo@12345`
4. Check "Remember me" (optional)
5. Click "Sign in"

### Create Account
1. Navigate to `/signup`
2. Fill in all fields
3. Agree to terms
4. Click "Create account"
5. Auto-redirect to dashboard

### Logout
1. Click logout button in the navbar
2. Redirects to `/login`
3. Session cleared from localStorage

## 🎯 State Management (Zustand)

The authentication state is managed using Zustand:

```typescript
// Access auth state
const { user, isAuthenticated, error, isLoading } = useAuth();

// Auth actions
const { login, signup, logout, restoreSession, clearError } = useAuth();

// Example usage
await login('email@example.com', 'password123', true);
logout();
```

## 📱 Responsive Design

- Mobile-first approach
- Works on all screen sizes
- Touch-friendly buttons and inputs
- Optimized for small screens

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm start
```

## 🧪 Testing

### Test the Authentication
1. Visit the landing page (/)
2. Click "Get started" → Goes to signup
3. Create a new account
4. Auto-redirect to dashboard
5. Click logout → Back to login
6. Login with demo credentials

### Test Session Persistence
1. Login with demo@omniai.com
2. Refresh the page
3. You stay logged in (localStorage)
4. Open DevTools → Application → Local Storage
5. See `omniai_user`, `omniai_access_token`, `omniai_refresh_token`

## 🔄 Integration with Backend

When connecting to a real backend:

1. **Update `loginUser()` function** in `src/utils/auth.utils.ts`
   - Remove mock delay
   - Call real API endpoint
   - Return actual JWT tokens

2. **Update `signupUser()` function** in `src/utils/auth.utils.ts`
   - Remove mock user database check
   - Call real API endpoint
   - Handle backend validation errors

3. **Add API client** in `src/services/api/`
   - Configure Axios with base URL
   - Add request/response interceptors
   - Handle token refresh

4. **Update middleware** in `src/middleware.ts`
   - Validate tokens on server-side
   - Check token expiry
   - Handle unauthorized requests

## 📚 Dependencies

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management
- **Lucide Icons** - Icons

## 🛡️ Security Notes

⚠️ **This is a frontend-only implementation:**
- Tokens are stored in localStorage (not as secure as httpOnly cookies)
- Passwords are validated client-side only
- Mock database has plain-text passwords (never do this in production!)
- No HTTPS enforcement in development

**In production, you need:**
- Secure backend authentication
- httpOnly cookies for tokens
- HTTPS enforcement
- Password hashing (bcrypt, argon2)
- CSRF protection
- Rate limiting on auth endpoints
- Email verification
- 2FA support

## 📖 File Documentation

### `src/utils/auth.utils.ts`
Mock authentication functions:
- `loginUser(email, password)` - Authenticate user
- `signupUser(name, email, password)` - Create new account
- `getCurrentUser()` - Get logged-in user
- `saveSession()` - Persist auth to localStorage
- `clearSession()` - Clear authentication
- `isAuthenticated()` - Check if user is logged in

### `src/store/slices/authSlice.ts`
Zustand store for auth state:
- `login()` - Login action
- `signup()` - Signup action
- `logout()` - Logout action
- `restoreSession()` - Restore from localStorage
- `clearError()` - Clear error message
- `setError()` - Set error message

### `src/hooks/useAuth.ts`
Custom hook for accessing auth state:
- Returns all auth state and actions
- Use in components for authentication

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://github.com/pmndrs/zustand)

## 📝 License

MIT License - feel free to use this for your projects!

## 🤝 Support

For questions or issues, please refer to the project documentation or create an issue in the repository.
