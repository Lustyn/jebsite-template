# Jebsite Template

A modern, production-ready template for building full-stack React applications using React Router 7 and TailwindCSS 4.

## Features

- 🚀 Server-side rendering with React Router 7
- ⚡️ Hot Module Replacement (HMR) for fast development
- 📦 Modern bundling with Vite
- 🔄 Data loading and mutations with React Router
- 🔍 tRPC + React Query with server-side prefetching support
- ⚙️ RSC with client/server comparison examples
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

## Examples

This template includes practical examples to help you understand the key concepts:

### React Server Components Demo

Visit `/server-example` to see a comprehensive demonstration of React Server Components vs Client Components. This example shows:

- **Server Components**: Data fetched and rendered on the server before HTML is sent to the client
- **Client Components**: Data fetched on the client after hydration with loading states
- **Side-by-side comparison**: Highlighting the differences in performance and behavior
- **Server-only data**: Accessing Node.js environment information that's only available on the server

The example demonstrates when to use each approach:

- Use Server Components for fast initial loads and SEO-critical content
- Use Client Components for interactive features and dynamic user interfaces

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

## Keeping Your Project Updated with Template Changes

When you've created a project based on this template, you might want to incorporate future updates and improvements from the template into your existing project. Using an LLM-based coding assistant like Windsurf or Cursor can make this process much easier.

### Using LLM-Based Tools to Merge Template Updates

LLM-based coding assistants can help you analyze the differences between the template and your project, and intelligently merge changes while preserving your customizations.

#### Step-by-Step Process

1. Identify the specific commit or version of the template you want to merge from
2. Open your project in an LLM-enabled editor (like Windsurf or Cursor)
3. Provide a prompt to the LLM to analyze and merge the changes
4. Review the proposed changes before applying them
5. Resolve any conflicts that the LLM couldn't handle automatically

#### Example Prompt for LLM-Based Merging

Here's a comprehensive prompt you can use with your LLM-based coding assistant:

```
I want to update my project with the latest changes from the Jebsite Template. Please help me merge the changes from the commit range [COMMIT_HASH_A]..[COMMIT_HASH_B] into my current project.

Here's what I need you to do:

1. First, examine the changes in this specific commit range by reviewing:
   https://github.com/Lustyn/jebsite-template/compare/[COMMIT_HASH_A]...[COMMIT_HASH_B]

2. Analyze my current project structure to understand what files I've modified or customized.

3. For each changed file in the template update:
   - If the file exists in my project and I haven't customized it significantly, apply the template changes.
   - If I've heavily customized the file, analyze the changes carefully and suggest how to incorporate the template updates without overwriting my customizations.
   - If it's a new file that doesn't exist in my project, add it if it's relevant.

4. IMPORTANT: Ignore any changes to:
   - Example code or explanatory comments that I've removed from my project
   - Lock files (package-lock.json, yarn.lock, pnpm-lock.yaml, etc.)
   - Generated files that should be rebuilt locally

5. For each file you want to update:
   - Explain why the change is beneficial
   - Highlight any potential conflicts or areas where I need to make decisions

6. Focus on structural improvements, dependency updates, security fixes, and new features, while preserving my business logic and customizations.

7. If there are major architectural changes that require significant refactoring, explain them first before implementing.
```

### Tips for Successful Merging

- Be specific about which commit or version you want to merge from
- Review all changes carefully before applying them
- For complex projects, consider merging changes in smaller batches
- Keep a backup or ensure your code is committed to version control before applying changes
- Test thoroughly after merging to ensure everything still works as expected

### Common Template Updates to Watch For

- Security patches and dependency updates
- Performance improvements
- New components or utilities
- Bug fixes
- Documentation improvements

By using this approach, you can keep your project up-to-date with the latest improvements while maintaining your customizations.

---

Built with ❤️ by justy
