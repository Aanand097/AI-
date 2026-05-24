# OmniAI

A modern AI SaaS web application that compares responses from multiple AI models (ChatGPT, Gemini, Grok, DeepSeek).

## 🚀 Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Testing**: Jest + React Testing Library

## 📁 Project Structure

```
omniai/
├── public/              # Static assets (icons, images, fonts)
├── src/
│   ├── app/            # Next.js App Router pages & API routes
│   ├── components/     # Reusable React components
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API & external service integrations
│   ├── store/          # State management (Zustand)
│   ├── types/          # TypeScript type definitions
│   ├── constants/      # Application constants
│   ├── config/         # Configuration files
│   ├── utils/          # Utility functions
│   ├── middleware/     # Next.js middleware
│   ├── lib/            # Library initializations
│   └── styles/         # Global styles
├── tests/              # Test suite (unit, integration, e2e)
└── [config files]      # tsconfig.json, next.config.js, etc.
```

## 🏃 Getting Started

### Prerequisites
- Node.js 18+ (or Bun)
- npm, yarn, or pnpm

### Installation

```bash
# Clone repository
git clone <repo-url>
cd omniai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📊 Features

- ✅ Chat interface with multiple AI models
- ✅ AI response comparison grid
- ✅ User authentication (login/signup)
- ✅ Settings & preferences
- ✅ Pricing page
- ✅ Responsive design
- ✅ Type-safe with TypeScript

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run type-check` - Run TypeScript check

## 📝 License

MIT License
