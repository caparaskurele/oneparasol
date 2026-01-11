# Copilot Instructions for One Parasol

## Project Overview
One Parasol is a Next.js 14 landing page template customized as a knowledge platform offering content on finance, investment, career growth, and lifestyle topics. The project uses TypeScript, TailwindCSS, and a file-based content model (Markdown/MDX) stored in `content/knowledge-hub/`.

## Architecture

### Content Model (Key Pattern)
- **File-based Structure**: Content lives in `content/knowledge-hub/<category>/<subcategory>/*.md`
- **Scaffolding**: Use `scripts/scaffold-knowledge-hub.js` to generate directory structure for new categories
- **Parsing**: Uses `gray-matter` to extract frontmatter (YAML metadata) from Markdown files:
  ```typescript
  const { data, content } = matter(raw);  // data = metadata, content = markdown body
  ```
- **Knowledge Hub Categories** (defined in both [scaffold-knowledge-hub.js](scripts/scaffold-knowledge-hub.js#L14) and [Navbar.tsx](src/components/Navbar.tsx#L8)):
  1. Strategic Business Solutions
  2. Money Markets & Mandates (Investments, NRIs, Legal)
  3. Career Growth Grid
  4. Soul & Stories
  5. Smart Money Modern Lifestyle
  6. Government Benefits & Public Schemes

### Page Structure
- **Category Hubs**: `src/app/knowledge_hub/<category>/page.tsx` → Reads all `.md` files in corresponding `content/` dir and displays as grid
- **Subcategory Pages**: `src/app/knowledge_hub/<category>/<subcategory>/page.tsx` → Lists articles in that subcategory
- **Article Pages**: `src/app/knowledge_hub/<category>/<subcategory>/[slug]/page.tsx` → Renders individual article markdown
- **Dynamic Routes**: Use `[param]/page.tsx` pattern to match `content/` directory structure

### Example Workflow (Data Scientist path)
- Content: `content/knowledge-hub/career-growth-grid/data-scientist/*.md`
- List View: `src/app/knowledge_hub/career-growth-grid/data-scientist/page.tsx`
- Article Rendering: `src/app/knowledge_hub/career-growth-grid/data-scientist/[slug]/page.tsx`

## Key Technologies & Conventions

### Styling
- **TailwindCSS 3.4** with JIT mode enabled
- Dark mode via `next-themes` (class strategy)
- Common pattern: `className="text-indigo-600 dark:text-indigo-400"`
- Use `@/` path alias (configured in [tsconfig.json](tsconfig.json))

### UI Components
- **Headless UI** for accessible interactive components (Disclosure, Button)
- **Heroicons** for SVG icons (`@heroicons/react`)
- **Layout Components**: `Container`, `SectionTitle`, `Hero`, `Benefits`, `Cta`, `Faq`
- **Client Components**: Marked with `"use client"` when using hooks/browser APIs

### Page Utilities
- **Image Handling**: Use Next.js `Image` component for optimization (`fill`, `objectFit`)
- **Link Navigation**: `Link` from `next/link` with href patterns matching route structure
- **Static Rendering**: Server components by default, reading from `fs` directly
- **Not Found**: Import `notFound()` from `next/navigation` when directory doesn't exist

## Build & Development

### Scripts (from [package.json](package.json))
```bash
npm run dev      # Start dev server on http://localhost:3000
npm run build    # Production build
npm run start    # Run production build
npm run lint     # Run ESLint
```

### Database / API
- Currently minimal backend: `src/app/api/contact/` exists but largely unused
- Contact handling via `nodemailer` (installed but check if configured)
- No persistent DB; content is markdown-driven

### Metadata & SEO
- Set metadata in `src/app/layout.tsx` (root) or per-route via `generateMetadata()`
- Icons configured at `/img/logo.png`

## Common Tasks

### Add New Knowledge Hub Category
1. Update `scripts/scaffold-knowledge-hub.js` with category definition (main, title, subs array)
2. Run `node scripts/scaffold-knowledge-hub.js` to generate directories
3. Add to `hubMenu` in [src/components/Navbar.tsx](src/components/Navbar.tsx#L8) for navigation
4. Create `src/app/knowledge_hub/<category>/page.tsx` following pattern in existing subcategory pages
5. Add `.md` files to `content/knowledge-hub/<category>/<subcategory>/`

### Create Article
1. Add `.md` file to `content/knowledge-hub/<category>/<subcategory>/article-slug.md`
2. Include frontmatter:
   ```yaml
   ---
   title: "Article Title"
   description: "Short description"
   image: "/img/category-image.png"
   ---
   ```
3. Article automatically appears in subcategory list via file read in `page.tsx`

### Style Consistency
- Maintain indigo color scheme: `text-indigo-600`, `bg-indigo-50`, `hover:text-indigo-700`
- Use grid layouts: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Max width for content: `max-w-6xl` or `max-w-7xl`
- Spacing: Use Tailwind spacing scale (px-4, py-12, gap-6, etc.)

## Important Gotchas

1. **Route Matching**: Directory structure in `content/` must match dynamic route segments exactly (case-sensitive on Linux/Mac)
2. **Gray Matter**: Always use `matter(fileContent)` before accessing `.data` for metadata
3. **Server Components**: File system access (`fs`) only works in Server Components, not Client Components
4. **Next.js App Router**: Default behavior is Server Components; add `"use client"` only when needed
5. **Markdown Rendering**: Project has `react-markdown` + `remark-gfm` installed but check which component handles rendering (likely custom)

## References
- Main layout: [src/app/layout.tsx](src/app/layout.tsx)
- Navbar with knowledge hub categories: [src/components/Navbar.tsx](src/components/Navbar.tsx)
- Example subcategory page: [src/app/knowledge_hub/career-growth-grid/data-scientist/page.tsx](src/app/knowledge_hub/career-growth-grid/data-scientist/page.tsx)
- Scaffold script: [scripts/scaffold-knowledge-hub.js](scripts/scaffold-knowledge-hub.js)
- Type definitions: [src/types.ts](src/types.ts)
