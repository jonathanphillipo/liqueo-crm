# Liqueo CRM

A modern, elegant CRM for financial services consulting. Built with Next.js 14, PostgreSQL (Neon), and Tailwind CSS.

![Liqueo CRM Dashboard](/.github/preview.png)

## Features

- 📊 **Dashboard** - Pipeline overview, revenue metrics, and activity tracking
- 🏢 **Companies** - Manage asset managers, wealth managers, and FinTech vendors
- 👥 **Contacts** - Track relationships with key stakeholders
- 💼 **Deals** - Full pipeline management with stages and probability tracking
- 📝 **Activities** - Log calls, emails, meetings, notes, and tasks

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL via Neon (serverless)
- **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS + Shadcn UI
- **Animations**: Framer Motion
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- A Neon PostgreSQL database (free tier available)

### 1. Clone the repository

```bash
git clone https://github.com/jonathanphillipo/liqueo-crm.git
cd liqueo-crm
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the database

**Option A: Use Neon (Recommended - Same as Production)**

1. Create a free PostgreSQL database at [neon.tech](https://neon.tech)
2. Copy your connection string
3. Create a `.env.local` file:

```bash
# Create the env file
cp .env.example .env.local
```

Edit `.env.local`:

```env
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
```

**Option B: Use Local SQLite (For Offline Development)**

```env
DATABASE_URL="file:./dev.db"
```

### 4. Initialize the database

```bash
# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Local Development Notes

- **Database URL Required**: The app requires `DATABASE_URL` in `.env.local`
- **Production vs Local**: Use the same Neon database for consistency
- **Build Errors**: ECONNRESET errors during build are normal (dummy DB URL used)
- **Hot Reload**: Changes are reflected immediately with Next.js 15

## Deploying to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) and import your repository
2. Add the `DATABASE_URL` environment variable
3. Deploy!

### 3. Set up the database

After deploying, run these commands locally with your production database URL:

```bash
DATABASE_URL="your-production-url" npm run db:push
DATABASE_URL="your-production-url" npm run db:seed
```

Or use Vercel's CLI:

```bash
vercel env pull .env.local
npm run db:push
npm run db:seed
```

## Database Commands

```bash
npm run db:push      # Push schema changes to database
npm run db:seed      # Seed database with example data
npm run db:studio    # Open Drizzle Studio (database GUI)
npm run db:generate  # Generate migrations (optional)
```

## Project Structure

```
├── actions/db/       # Server actions for CRUD operations
├── app/              # Next.js App Router pages
│   ├── _components/  # Dashboard components
│   ├── companies/    # Companies pages
│   ├── contacts/     # Contacts pages
│   ├── deals/        # Deals pages
│   └── activities/   # Activities pages
├── components/       # Shared components
│   ├── ui/           # Shadcn UI components
│   └── sidebar.tsx   # Navigation sidebar
├── db/
│   ├── schema/       # Drizzle schema definitions
│   ├── db.ts         # Database connection
│   └── seed.ts       # Seed data script
├── lib/              # Utility functions
└── types/            # TypeScript types
```

## Example Data

The seed script includes realistic financial services data:

**Companies:**
- BlackRock, Vanguard, UBS, State Street, Northern Trust
- Charles River Development, SimCorp, Temenos, SS&C, Broadridge

**Deals:**
- Portfolio Analytics Platform ($2.5M)
- Operations Transformation ($4.2M)
- Wealth Platform Integration ($3.8M)
- And more...

## License

MIT
