# Contributing to OmniAI

## Code Standards

### TypeScript
- Use strict mode (`strict: true`)
- Define explicit return types for functions
- Use interfaces for object shapes
- Avoid `any` type

### Components
- Use functional components with hooks
- Memoize components when necessary
- Extract reusable logic into custom hooks
- Add PropTypes or TypeScript interfaces

### Naming Conventions
- Components: PascalCase (e.g., `UserProfile.tsx`)
- Hooks: camelCase starting with `use` (e.g., `useAuth.ts`)
- Services: camelCase with `.service.ts` suffix (e.g., `auth.service.ts`)
- Types: PascalCase with `.types.ts` suffix (e.g., `chat.types.ts`)

### Folder Structure
- Keep components and their tests together
- Use barrel exports (`index.ts`) for cleaner imports
- Organize by feature, not by file type

## Commit Guidelines

- Use semantic commit messages:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `refactor:` for code restructuring
  - `test:` for test additions
  - `docs:` for documentation
  - `style:` for formatting changes

Example:
```
feat: add chat message export functionality
fix: resolve sidebar collapse animation lag
refactor: extract API client to service layer
```

## Pull Request Process

1. Create feature branch: `git checkout -b feature/description`
2. Make changes following code standards
3. Write/update tests
4. Run type checking: `npm run type-check`
5. Run linting: `npm run lint`
6. Submit PR with clear description

## Testing Requirements

- Unit tests for utilities and hooks
- Component tests for interactive components
- Integration tests for API flows
- Maintain >80% code coverage

## Documentation

- Update README.md for user-facing changes
- Update ARCHITECTURE.md for structural changes
- Add JSDoc comments for public functions
- Include examples for complex features
