# Zealthy Coding Challenge - Custom Onboarding Flow

A technical assessment that implements a configurable user onboarding system with admin controls and data visualization.

## Challenge Overview

This project implements a "Custom Onboarding Flow" where admins can configure which form components appear on different pages of the user onboarding process. The application consists of three main sections:

1. **User Onboarding Flow** (`/`)

   - Multi-step wizard interface
   - Email/password collection on first page
   - Configurable components on pages 2 and 3
   - Progress persistence for returning users

2. **Admin Configuration** (`/admin`)

   - Interface for managing component placement
   - Ability to assign components to different pages
   - Components include:
     - About Me (textarea)
     - Address fields (street, city, state, zip)
     - Birthdate selector

3. **Data Visualization** (`/data`)
   - Display of all user submissions
   - Real-time updates as users complete onboarding

## Tech Stack

- **Frontend**: Next.js 15, React 19
- **Styling**: TailwindCSS
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **State Management**: Zustand

## Live Demo

[[Live Demo URL](https://zealthy-challenge-one.vercel.app)]

## Local Development

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables:

````env

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
