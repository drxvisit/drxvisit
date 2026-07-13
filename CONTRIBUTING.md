# Contributing to DrxVisit

Thank you for your interest in contributing to DrxVisit! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/drxvisit.git`
3. Create a feature branch: `git checkout -b feature/amazing-feature`
4. Install dependencies: `pnpm install`
5. Make your changes
6. Run tests: `pnpm test`
7. Commit changes: `git commit -m 'Add amazing feature'`
8. Push to branch: `git push origin feature/amazing-feature`
9. Open a Pull Request

## Development Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run linter
pnpm lint

# Run type checking
pnpm check

# Run tests
pnpm test

# Build for production
pnpm build
```

## Coding Standards

### TypeScript
- Use strict mode
- Avoid `any` type
- Use interfaces for object types
- Use enums for constants

### React Native
- Use functional components
- Use hooks for state management
- Use NativeWind for styling
- Avoid inline styles when possible

### File Structure
```
feature/
├── components/
│   ├── feature-card.tsx
│   └── feature-modal.tsx
├── screens/
│   ├── index.tsx
│   └── detail.tsx
├── services/
│   └── feature-api.ts
└── types/
    └── feature.ts
```

### Naming Conventions
- Components: PascalCase (e.g., `FeatureCard`)
- Functions: camelCase (e.g., `handleSubmit`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`)
- Files: kebab-case (e.g., `feature-card.tsx`)

## Commit Message Format

```
type(scope): subject

body

footer
```

### Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Code change that improves performance
- `test`: Adding missing tests
- `chore`: Changes to build process or dependencies

### Examples
```
feat(auth): add biometric authentication
fix(appointments): resolve booking time conflict
docs(readme): update installation instructions
```

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass: `pnpm test`
4. Ensure code is formatted: `pnpm format`
5. Update CHANGELOG.md
6. Link related issues
7. Request review from maintainers

## Testing

- Write tests for all new features
- Maintain >80% code coverage
- Use descriptive test names
- Test edge cases and error scenarios

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run specific test file
pnpm test -- auth.test.ts
```

## Documentation

- Update README.md for user-facing changes
- Update API.md for API changes
- Add JSDoc comments for functions
- Include examples for complex features

## Security

- Never commit secrets or API keys
- Use environment variables for sensitive data
- Review security implications of changes
- Report security vulnerabilities privately

## Performance

- Minimize bundle size
- Optimize images and assets
- Use memoization for expensive operations
- Profile before and after changes

## Accessibility

- Ensure keyboard navigation works
- Use semantic HTML elements
- Provide alt text for images
- Test with screen readers

## Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create git tag: `git tag v1.0.0`
4. Push tag: `git push origin v1.0.0`
5. Create GitHub release with notes

## Questions?

- Check existing issues and discussions
- Read the documentation
- Ask in GitHub Discussions
- Email support@drxvisit.com

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to DrxVisit!
