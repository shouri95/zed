#!/bin/bash

# Create project directory and navigate into it
mkdir screenplay-app
cd screenplay-app

# Initialize npm project and create package.json
npm init -y

# Install dependencies
npm install next react react-dom typescript @types/node @types/react @types/react-dom
npm install tailwindcss postcss autoprefixer
npm install @radix-ui/react-dialog @radix-ui/react-slot class-variance-authority clsx tailwind-merge tailwindcss-animate
npm install lucide-react

# Install shadcn/ui dependencies
npm install @radix-ui/react-alert-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-select @radix-ui/react-toast
npm install @hookform/resolvers zod react-hook-form

# Install dev dependencies
npm install -D eslint eslint-config-next

# Create project structure
mkdir -p app components lib public styles
mkdir -p components/ui

# Create necessary files
touch app/layout.tsx app/page.tsx app/globals.css
touch components/scene-block.tsx components/scene-connection.tsx components/scene-editor.tsx components/scene-canvas.tsx
touch lib/types.ts lib/utils.ts
touch styles/custom.css
touch .gitignore next.config.js postcss.config.js tailwind.config.js tsconfig.json

# Initialize Next.js configuration
echo "/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig" > next.config.js

# Initialize PostCSS configuration
echo "module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}" > postcss.config.js

# Initialize Tailwind configuration
echo "/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}" > tailwind.config.js

# Initialize TypeScript configuration
echo '{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}' > tsconfig.json

# Initialize .gitignore
echo "# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts" > .gitignore

# Add scripts to package.json
npm pkg set scripts.dev="next dev"
npm pkg set scripts.build="next build"
npm pkg set scripts.start="next start"
npm pkg set scripts.lint="next lint"

# Install shadcn/ui CLI tool
npm install -D @shadcn/ui

# Initialize shadcn/ui
npx shadcn-ui init

# Add commonly used shadcn/ui components
npx shadcn-ui add button
npx shadcn-ui add card
npx shadcn-ui add dialog
npx shadcn-ui add input
npx shadcn-ui add label
npx shadcn-ui add textarea
npx shadcn-ui add toast

echo "Project setup complete. You can now run 'npm install' to install all dependencies."