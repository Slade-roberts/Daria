# Daria Shchukina — Portfolio

A literary portfolio website built with Next.js 16, TypeScript, Tailwind CSS, and Sanity CMS.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Sanity CMS v5** (for content management)

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd Daria
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.local.example` to `.env.local` and fill in your Sanity project credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your-read-token
```

To get your Sanity project credentials:
1. Create a project at [sanity.io](https://sanity.io)
2. Copy the Project ID from your project dashboard
3. Generate an API token with read permissions

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### 5. Access Sanity Studio

Visit [http://localhost:3000/studio](http://localhost:3000/studio) to manage content.

## Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── layout.tsx        # Root layout with Navbar and Footer
│   ├── page.tsx          # Home page
│   ├── about/            # About page
│   ├── portfolio/        # Portfolio/translations page
│   ├── publications/     # Essays & writing page
│   ├── contact/          # Contact page
│   └── studio/           # Embedded Sanity Studio
├── components/           # Shared React components
├── lib/                  # Sanity client and queries
├── sanity/               # Sanity schemas
└── types/                # TypeScript type definitions
```

## Content Management

The site uses Sanity CMS for all content. Access the studio at `/studio` to manage:

- **Site Settings** — Title, subtitle, intro text, contact email, social links
- **About Page** — Biography, profile image, education, expertise, languages
- **Portfolio Items** — Translation projects with category, language pair, description
- **Publications** — Essays, articles, reviews
- **Testimonials** — Endorsements shown on the homepage
- **Contact Section** — Contact page heading and intro text

## Deployment

Deploy to Vercel:

```bash
vercel deploy
```

Make sure to add your environment variables in the Vercel project settings.
