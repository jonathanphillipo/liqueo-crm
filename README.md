# CRM Application

A professional, elegant CRM application built with Next.js and SQLite.

## Features

- **Companies Management** - Track company information, industry, and details
- **Contacts Management** - Manage contact relationships and information
- **Deals Pipeline** - Track sales deals through different stages
- **Activities** - Log calls, emails, meetings, notes, and tasks
- **Beautiful Dashboard** - Overview of your CRM data with key metrics
- **Modern UI** - Elegant design with smooth animations using Framer Motion

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI components
- **Animations**: Framer Motion
- **Database**: SQLite with Drizzle ORM
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Initialize and seed the database:
```bash
npm run db:init
npm run db:seed
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The application uses SQLite with the following main tables:

- **companies** - Company information
- **contacts** - Contact information (linked to companies)
- **deals** - Sales deals (linked to companies and contacts)
- **activities** - Activities like calls, emails, meetings (linked to contacts, companies, and deals)

## Project Structure

```
├── app/                    # Next.js app router pages
│   ├── _components/       # Page-specific components
│   ├── companies/         # Companies pages
│   ├── contacts/          # Contacts pages
│   ├── deals/             # Deals pages
│   └── activities/        # Activities pages
├── actions/               # Server actions
│   └── db/                # Database actions
├── components/            # Shared components
│   ├── ui/                # UI components (Shadcn)
│   └── navigation.tsx     # Navigation component
├── db/                    # Database
│   ├── schema/            # Database schemas
│   ├── db.ts              # Database connection
│   └── seed.ts            # Seed script
├── lib/                   # Utility functions
└── types/                 # TypeScript types
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:init` - Initialize database tables
- `npm run db:seed` - Seed database with example data

## Example Data

The seed script creates:
- 5 companies across different industries
- 6 contacts linked to companies
- 5 deals in various stages
- 6 activities (calls, emails, meetings, notes, tasks)

## License

MIT

