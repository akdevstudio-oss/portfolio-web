# Muhammad Ali - Portfolio & Software Services

A modern, production-ready portfolio website built with Next.js, Tailwind CSS v4, and Supabase.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Backend/Auth:** Supabase
- **Forms:** React Hook Form + Zod
- **UI Components:** Shadcn UI (latest)
- **Toast Notifications:** Sonner

## Features

- **Responsive Design:** Fully optimized for mobile, tablet, and desktop.
- **Dark Mode:** Dark mode by default with a light mode toggle.
- **Project Showcase:** Dynamic project grid with hover effects.
- **Admin Panel:** Secure dashboard for managing portfolio projects (CRUD).
- **Contact Form:** Professional contact form with validation.
- **Glassmorphism:** Modern UI with subtle gradients and glass effects.

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase Account

### Environment Variables

Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Setup

1. Create a new project on [Supabase](https://supabase.com).
2. Run the following SQL in the SQL Editor to create the `projects` table:

```sql
-- Create projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  live_url TEXT,
  github_url TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public to view projects
CREATE POLICY "Allow public read-only access" ON projects
  FOR SELECT USING (true);

-- Create policy to allow authenticated admin to manage projects
CREATE POLICY "Allow admin full access" ON projects
  FOR ALL USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'email' = 'alikhanxada1001@gmail.com');
```

3. **Storage Setup:**
   - Create a new public bucket named `project-images`.
   - Update bucket policies to allow public read access and authenticated upload access for your admin email.

4. **Authentication:**
   - Enable Email/Password authentication in the Supabase Dashboard.
   - Create an admin user with the email: `alikhanxada1001@gmail.com`.

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel

1. Push your code to a GitHub repository.
2. Connect your repository to [Vercel](https://vercel.com).
3. Add the environment variables (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in the project settings.
4. Deploy!

## License

This project is licensed under the ISC License.
