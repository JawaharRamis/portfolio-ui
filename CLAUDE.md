# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Modern single-page architecture portfolio website built with Vue 3 + Vite, styled with Tailwind CSS. Content is managed via JSON files for easy updates without touching code. Deployed to AWS S3 + CloudFront for static hosting with CDN.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Initialize Tailwind CSS (first time setup)
npx tailwindcss init -p
```

## Architecture

### Tech Stack
- **Framework**: Vue 3 with Vite build tool
- **Styling**: Tailwind CSS (utility-first)
- **Content**: JSON-based data files (no backend)
- **Deployment**: AWS S3 (static hosting) + CloudFront (CDN)

### Design Consistency Requirement

**CRITICAL**: Maintain consistent visual style and theme across ALL components.

The portfolio requires a cohesive, professional aesthetic that ties all sections together:

- **Color Palette**: Use a unified color scheme across Hero, About, Projects, and Artwork sections. Pick neutral base colors with a single accent color used consistently throughout.

- **Typography**: Consistent font hierarchy - one serif font for headings (elegant, architectural feel), one sans-serif font for body text. Same font weights and sizes should be used for equivalent elements across all components.

- **Spacing & Whitespace**: Consistent padding, margins, and gaps throughout. Use Tailwind spacing scale consistently (e.g., always use `gap-6` or `gap-8` for card grids, not a mix).

- **Borders & Shadows**: If using borders or shadows on cards/modals, keep them consistent. Don't mix thin borders on some sections and thick on others.

- **Transitions & Animations**: Use similar transition durations and easing functions across all interactive elements. If fade-in is used on project cards, use similar fade-in on artwork cards.

- **Button/CTA Styles**: Navigation buttons, "View Project" buttons, and any CTAs should have consistent hover states and visual treatment.

**When creating new components**, reference existing components to match:
- Border radius values (e.g., if `rounded-lg` is used elsewhere, don't use `rounded-2xl`)
- Shadow intensities (e.g., if `shadow-lg` is used for project cards, use same for artwork cards)
- Background colors (don't mix multiple gray shades unless intentional)

### Content Management Strategy

All portfolio content is stored in JSON files under `src/data/`:
- `profile.json` - Personal info, bio, resume (education, experience, skills)
- `projects.json` - Architecture projects with images, descriptions, metadata
- `artwork.json` - Paintings and artwork with optional metadata

**Key Principle**: All text fields in JSON are optional. Components must use defensive rendering - check for data existence before displaying to gracefully handle missing fields.

### Component Structure

**Main Layout** (`src/App.vue`):
- Single-page application with smooth scroll navigation
- Fixed/sticky `NavigationBar` with active section highlighting
- Sections: Hero → About → Projects → Artwork → Footer

**Gallery Modal Pattern**:
Both architecture projects and artwork use a similar modal pattern:
1. Gallery section displays thumbnails/cards
2. Click opens a full-screen/lightbox modal
3. Modal supports image carousel, keyboard navigation (ESC to close)
4. Displays optional metadata (title, year, location, medium, etc.)

### Image Organization

Static assets go in `public/images/`:
```
public/images/
├── profile/          # Hero image, headshot
├── projects/         # Architecture project images (organized by project)
└── artwork/          # Painting/art images
```

All image paths in JSON files should be absolute paths starting with `/images/`.

## AWS Deployment Workflow

```bash
# 1. Build production assets
npm run build

# 2. Upload dist/ folder contents to S3 bucket
# 3. (Optional) Invalidate CloudFront cache for updated files
```

**S3 Configuration**:
- Static website hosting enabled
- Index document: `index.html`
- Error document: `index.html` (for SPA routing)
- Public bucket policy for read access

**CloudFront Configuration**:
- Origin: S3 bucket website endpoint
- Default root object: `index.html`
- Custom error response: 404 → /index.html with 200 status
- HTTPS enabled (free ACM certificate)

## Important Design Patterns

1. **Defensive Rendering**: Always check `if (data?.field)` before rendering optional fields
2. **Smooth Scroll**: Navigation links use smooth scrolling to section IDs
3. **Lazy Loading**: Images should use `loading="lazy"` for performance
4. **Responsive-First**: Mobile-first design with Tailwind breakpoints
5. **Accessibility**: Include ARIA labels, keyboard navigation support, alt text
6. **Visual Consistency**: Match spacing, colors, typography, and styles across all components
