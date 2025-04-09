# Jebsite Template

A modern, production-ready template for building full-stack React applications using React Router 7 and TailwindCSS 4.

## Features

- 🚀 Server-side rendering with React Router 7
- ⚡️ Hot Module Replacement (HMR) for fast development
- 📦 Modern bundling with Vite
- 🔄 Data loading and mutations with React Router
- 🔍 tRPC + React Query with server-side prefetching support
- 🔒 TypeScript by default
- 🎨 TailwindCSS 4 with dark mode support
- 🧩 Utility-first CSS with class-variance-authority and tailwind-merge
- 🛠️ Shadcn component system for beautiful UI components
- 🚄 React Compiler for optimized performance
- 🔍 ESLint and Prettier for code quality
- 🧪 Husky and lint-staged for pre-commit hooks
- 🐳 Docker support for easy deployment

## Project Structure

```
jebsite-template/
├── app/                   # Main application code
│   ├── api/               # API routes
│   ├── components/        # UI components
│   ├── lib/               # Utility functions and shared code
│   ├── routes/            # Route components and logic
│   ├── app.css            # Global styles with TailwindCSS
│   ├── root.tsx           # Root component and error boundaries
│   ├── routes.ts          # Route definitions
├── public/                # Static assets
├── Dockerfile             # Docker configuration for deployment
├── components.json        # Shadcn component configuration
├── eslint.config.js       # ESLint configuration
├── .prettierrc            # Prettier configuration
├── package.json           # Dependencies and scripts
├── react-router.config.ts # React Router configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite bundler configuration
```

## Getting Started

### Prerequisites

- Node.js 20 or later
- corepack (which will automatically manage pnpm for you)

### Installation

Install the dependencies:

```bash
pnpm install
```

### Development

Start the development server with HMR:

```bash
pnpm dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
pnpm build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t jebsite .

# Run the container
docker run -p 3000:3000 jebsite
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### Serverless Deployment

For deploying to platforms like Cloudflare Workers, AWS Lambda, or Vercel, you should follow the platform's specific guidance for hosting React Router apps.

- [Cloudflare Workers Template](https://github.com/cloudflare/templates/tree/staging/react-router-starter-template)
- [AWS Lambda (SST)](https://sst.dev/docs/component/aws/react/)
- [Vercel](https://vercel.com/docs/frameworks/react-router) (current incompatible with unstable_middleware, so proceed with caution)

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `pnpm build`:

```
├── package.json
├── pnpm-lock.yaml
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with TailwindCSS 4 already configured with a beautiful default theme that supports both light and dark modes based on system preferences. The styling system includes:

- Modern color system using OKLCH color space
- Responsive design utilities
- Animation utilities via tw-animate-css
- Utility composition with tailwind-merge and class-variance-authority
- Shadcn component system for consistent, accessible UI components

## Technologies

### React Compiler

This template includes React Compiler (formerly React Forget) which automatically optimizes your React components for better performance without manual memoization.

### Shadcn Component System

Shadcn provides a collection of reusable, accessible UI components that are fully customizable and styled with TailwindCSS. The components are installed directly into your project, giving you full control over their implementation.

### tRPC + React Query

The template includes tRPC integration with React Query for type-safe API calls between your client and server. This setup supports server-side prefetching of data, ensuring optimal performance and SEO benefits while maintaining end-to-end type safety.

## Scripts

- `dev`: Start the development server
- `build`: Build for production
- `start`: Start the production server
- `typecheck`: Generate types and check for type errors
- `format`: Format code with Prettier
- `lint`: Lint code with ESLint
- `prepare`: Set up Husky hooks

---

Built with ❤️ by justy
