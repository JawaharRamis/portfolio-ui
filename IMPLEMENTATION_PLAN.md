# Architecture Portfolio Website - Implementation Plan

## Overview
Build a modern, visually appealing single-page architecture portfolio website using Vue.js, with JSON-based content management, and deploy to AWS S3 + CloudFront.

## Technology Stack
- **Frontend Framework**: Vue 3 with Vite (fast, modern build tool)
- **Styling**: Tailwind CSS (utility-first, modern design)
- **Image Optimization**: Built-in lazy loading + responsive images
- **Content Management**: JSON data files for projects and artwork
- **Hosting**: AWS S3 (static hosting) + CloudFront (CDN)
- **Domain**: Optional Route 53 for custom domain

## Project Structure
```
portfolio-ui/
├── public/
│   └── images/
│       ├── projects/          # Architecture project images
│       ├── artwork/            # Paintings and art images
│       └── profile/            # Profile/hero images
├── src/
│   ├── components/
│   │   ├── HeroSection.vue
│   │   ├── AboutSection.vue
│   │   ├── ProjectsGallery.vue
│   │   ├── ProjectCard.vue
│   │   ├── ProjectModal.vue    # Detailed project view
│   │   ├── ArtGallery.vue
│   │   ├── ArtworkModal.vue
│   │   └── NavigationBar.vue   # Smooth scroll navigation
│   ├── data/
│   │   ├── profile.json        # Personal info, bio, resume
│   │   ├── projects.json       # Architecture projects
│   │   └── artwork.json        # Paintings/art pieces
│   ├── App.vue                 # Main single-page layout
│   ├── main.js
│   └── style.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Implementation Phases

### Phase 1: Project Setup & Configuration
**Goal**: Initialize Vue.js project with all necessary dependencies

**Steps**:
1. Initialize Vue 3 project with Vite:
   - Run `npm create vite@latest . -- --template vue`
   - Install dependencies: `npm install`

2. Install additional packages:
   - Tailwind CSS: `npm install -D tailwindcss postcss autoprefixer`
   - Vue Router (for hash navigation): `npm install vue-router@4`
   - Optional image lightbox: `npm install vue-easy-lightbox`

3. Configure Tailwind CSS:
   - Initialize: `npx tailwindcss init -p`
   - Configure content paths in `tailwind.config.js`
   - Import Tailwind directives in `src/style.css`

4. Set up project structure (create folders and initial files)

**Deliverable**: Working Vue development server with Tailwind CSS configured

---

### Phase 2: Data Structure & Content Schema
**Goal**: Define JSON schemas for flexible content management

**Steps**:
1. Create `src/data/profile.json`:
   ```json
   {
     "name": "Architect Name",
     "title": "Architecture & Design",
     "bio": "Brief introduction...",
     "heroImage": "/images/profile/hero.jpg",
     "resume": {
       "education": [...],
       "experience": [...],
       "skills": [...]
     }
   }
   ```

2. Create `src/data/projects.json`:
   ```json
   [
     {
       "id": 1,
       "title": "Project Name",
       "category": "Residential/Commercial/Public",
       "year": "2024",
       "description": "Optional detailed description",
       "shortDescription": "Brief overview for card",
       "location": "City, Country",
       "coverImage": "/images/projects/project1/cover.jpg",
       "images": [
         "/images/projects/project1/img1.jpg",
         "/images/projects/project1/img2.jpg"
       ],
       "details": {
         "area": "500 sqm",
         "client": "Optional",
         "collaborators": "Optional"
       }
     }
   ]
   ```

3. Create `src/data/artwork.json`:
   ```json
   [
     {
       "id": 1,
       "title": "Artwork Title (optional)",
       "medium": "Oil on Canvas (optional)",
       "year": "2024 (optional)",
       "image": "/images/artwork/art1.jpg",
       "thumbnail": "/images/artwork/art1-thumb.jpg",
       "description": "Optional description"
     }
   ]
   ```

**Key Features**:
- All text fields are optional (will gracefully handle missing data)
- Flexible schema supports varying amounts of information per project
- Easy to add/remove projects without code changes

**Deliverable**: Complete JSON data schemas with example data

---

### Phase 3: Core Components Development ✓ COMPLETE
- All Vue components created (HeroSection, AboutSection, ProjectsGallery, ProjectCard, ProjectModal, ArtGallery, NavigationBar)
- Components implement defensive rendering for optional JSON fields
- Basic functionality working

### Phase 4: Main App Integration & Styling (IN PROGRESS)
**Goal**: Assemble components into cohesive single-page experience

**Critical Files to Modify**:
- **src/App.vue**: Main single-page layout

**Steps**:
1. Import all section components
2. Create single-page layout structure
3. Implement smooth scroll behavior
4. Add scroll-triggered animations (fade-in, slide-in)
5. Apply styling & visual polish
6. Ensure accessibility & UX

**Deliverable**: Fully functional single-page portfolio website

---

### Phase 5: AWS Deployment Setup
**Goal**: Deploy static site to AWS S3 with CloudFront CDN

**Steps**:

1. **Build for Production**:
   - Run `npm run build`
   - Optimize images before placing in `public/images/`
   - Outputs to `dist/` folder

2. **Create S3 Bucket**:
   - Login to AWS Console
   - Create S3 bucket (e.g., `architect-portfolio-site`)
   - Enable static website hosting
   - Set index document to `index.html`
   - Configure error document to `index.html` (for SPA routing)

3. **Configure Bucket Policy**:
   - Make bucket publicly readable
   - Apply bucket policy for public access

4. **Upload Files**:
   - Upload entire `dist/` folder contents to S3
   - Ensure proper MIME types for files
   - Upload optimized images to `images/` folder

5. **Set up CloudFront Distribution**:
   - Create CloudFront distribution
   - Origin: S3 bucket website endpoint
   - Enable GZIP compression
   - Set default root object to `index.html`
   - Configure custom error responses (404 → index.html)
   - Enable HTTPS (free SSL certificate)

6. **Optional: Custom Domain**:
   - Purchase domain or use existing
   - Create Route 53 hosted zone
   - Update CloudFront distribution with domain
   - Add CNAME record in Route 53 pointing to CloudFront

7. **Future Updates**:
   - Update JSON data files or images locally
   - Run `npm run build`
   - Upload changed files to S3
   - Invalidate CloudFront cache if needed

**Deliverable**: Live portfolio website accessible via CloudFront URL or custom domain

---

## Design Considerations

### Visual Appeal
- **Modern aesthetic**: Clean lines, ample whitespace, bold typography
- **Image-focused**: Large, high-quality project images
- **Smooth interactions**: Fade-ins, parallax, smooth scrolling
- **Professional color palette**: Neutral base with accent colors
- **Typography**: Elegant serif for headings, clean sans-serif for body

### Flexibility Features
- **Graceful degradation**: Components handle missing data
- **Optional fields**: All text fields in JSON are optional
- **Variable image counts**: Projects can have 1-20+ images
- **Easy content updates**: Just edit JSON files, no code changes

### Performance Optimization
- Lazy loading for images (native browser or library)
- Responsive images (different sizes for mobile/desktop)
- Minified CSS/JS in production build
- CloudFront CDN for fast global delivery
- WebP image format for smaller file sizes

---

## Verification & Testing

### Local Development Testing
1. **Run dev server**: `npm run dev`
2. **Test all sections**:
   - Hero section displays correctly
   - About section renders resume data
   - Projects gallery shows all projects
   - Project modal opens with images and details
   - Art gallery displays artwork
   - Artwork modal/lightbox functions
   - Navigation scrolls smoothly between sections

3. **Test content flexibility**:
   - Remove optional fields from JSON
   - Verify components don't break
   - Add projects with varying image counts
   - Test with/without descriptions

4. **Responsive testing**:
   - Mobile (320px, 375px, 414px)
   - Tablet (768px, 1024px)
   - Desktop (1440px, 1920px)

5. **Browser testing**:
   - Chrome, Firefox, Safari, Edge
   - Mobile browsers (iOS Safari, Chrome Mobile)

### Production Deployment Testing
1. **Build verification**:
   - Run `npm run build`
   - Check `dist/` folder output
   - Verify all assets are included

2. **S3 deployment**:
   - Upload files to S3
   - Test S3 website endpoint directly
   - Verify images load correctly

3. **CloudFront testing**:
   - Access via CloudFront URL
   - Check HTTPS works
   - Verify caching headers
   - Test in different geographic regions

4. **Performance testing**:
   - Google PageSpeed Insights
   - Lighthouse audit (aim for 90+ scores)
   - Check image loading performance

---

## Estimated Costs (AWS)
- **S3 Storage**: ~$0.50-2/month (depending on image size)
- **CloudFront**: ~$1-5/month (low to moderate traffic)
- **Route 53** (optional): ~$0.50/month per hosted zone
- **Total**: ~$2-10/month for a portfolio site

---

## Future Enhancements (Post-Launch)
- Contact form (AWS Lambda + SES)
- Blog section for architecture thoughts
- Project filtering by category/year
- Dark mode toggle
- Multi-language support
- Analytics (Google Analytics or AWS CloudWatch)
- Password-protected sections for work-in-progress
