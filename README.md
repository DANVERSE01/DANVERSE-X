# DANVERSE-X

A Next.js App Router project with reusable UI components and multiple content routes for a marketing-style site.

## Badges

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-black?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?logo=tailwindcss&logoColor=white)

Build status badge is not included because a repository origin URL is not configured in this checkout.

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

- Next.js App Router layout and routes under `app/`.
- Dedicated routes for About, FAQ, checkout, revisions, and terms pages.
- API route handlers under `app/api`.
- SEO assets including `sitemap.xml` and `robots.txt` routes.
- Reusable UI components organized under `components/` and `components/ui`.

## Quickstart

Clone the repository (URL TBD – origin remote is not configured in this checkout):

```bash
git clone <TBD>
cd DANVERSE-X
```

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

## Project Structure

```text
.
├── app/                # App Router routes, layouts, and assets
├── components/         # Reusable UI components
├── files/              # Project assets and supporting files
├── lib/                # Shared utilities
├── public/             # Static assets
├── styles/             # Global styling
├── .github/            # GitHub workflows and templates
├── middleware.ts       # Next.js middleware
└── package.json        # Scripts and dependencies
```

## Configuration

This project does not require environment variables for basic local development (based on current code).

## Scripts

- `pnpm dev` - run the development server
- `pnpm build` - build the production app
- `pnpm start` - run the production server
- `pnpm lint` - run ESLint

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Security

See [SECURITY.md](SECURITY.md) for reporting guidance.

## License

Licensed under the [MIT License](LICENSE).
