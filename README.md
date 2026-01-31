# DANVERSE-X

DANVERSE-X is an AI-powered creative studio platform built with Next.js for delivering cinematic advertisements, branding, and intelligent content systems.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-black?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![CI/CD Pipeline](https://github.com/DANVERSE01/DANVERSE-X/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/DANVERSE01/DANVERSE-X/actions/workflows/ci.yml)

## Table of Contents

- [Features](#features)
- [Quickstart](#quickstart)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

## Features

- **AI-Powered Creative Studio**: Specialized in cinematic ads, bold branding, and smart content systems.
- **Next.js App Router**: Modern architecture utilizing layouts, optimized routes, and server components.
- **Premium UI Components**: Built with Radix UI, Lucide Icons, and Tailwind CSS for a professional look and feel.
- **3D Visualizations**: Integrated with Spline and React Three Fiber for immersive web experiences.
- **SEO & Performance**: Dynamic sitemaps, robots.txt, and JSON-LD structured data for maximum visibility.
- **Comprehensive Content Routes**: Dedicated pages for FAQ, Checkout, Revisions, and Service-specific landing pages.

## Quickstart

### Prerequisites

- Node.js 18+
- pnpm 9+

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DANVERSE01/DANVERSE-X.git
   cd DANVERSE-X
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

## Project Structure

```text
.
├── app/                # App Router routes, layouts, and API handlers
├── components/         # Reusable UI and layout components
├── files/              # Support files and source assets
├── lib/                # Shared utility functions and types
├── public/             # Static assets (images, fonts, etc.)
├── styles/             # Global CSS and Tailwind configurations
├── .github/            # GitHub Actions and repository templates
├── middleware.ts       # Next.js middleware for authentication
└── package.json        # Project metadata, scripts, and dependencies
```

## Configuration

The project uses environment variables for configuration. Create a `.env.local` file based on `.env.example`:

- `NEXT_PUBLIC_SITE_URL`: The base URL of the deployed site.
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: Contact phone number for WhatsApp integration.
- `NEXT_PUBLIC_CONTACT_EMAIL`: Official support and contact email.

## Scripts

- `pnpm dev`: Start the development server.
- `pnpm build`: Create an optimized production build.
- `pnpm start`: Run the production server.
- `pnpm lint`: Run ESLint for code quality checks.

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for our guidelines.

## Security

For security-related issues, please refer to our [SECURITY.md](SECURITY.md).

## License

This project is licensed under the [MIT License](LICENSE).
