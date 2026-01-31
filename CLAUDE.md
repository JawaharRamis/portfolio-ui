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

## GitHub Workflow Skill

Use the `github-workflow` skill for branch creation and commits:

```bash
# Invoke the skill
/claude-code-skill: github-workflow --args '{"feature_name": "dark-mode", "commit_message": "Add dark mode toggle"}'
```

This skill:
- Creates a new branch with pattern `feat/{feature_name}`
- Stages all changes
- Creates a commit with a clear message
- Pushes the branch to remote

**Branch naming**: `feat/{name}` in kebab-case (e.g., `feat/navigation-bar`)
**Commit format**: Present tense, imperative mood, action verb first

## Mandatory Workflow: Check Skills/Agents First

**ENFORCED RULE**: Before responding to ANY user request, you MUST check for and use available skills/agents.

### Step 1: Always Check Available Skills and Agents

When receiving a user request, IMMEDIATELY scan:
- `.claude/skills/` - Skill definitions (files matching `*/SKILL.md`)
- `.claude/agents/` - Agent definitions (files matching `*.md`)

### Step 2: Match Request to Available Skills/Agents

For each user request, determine if any skill or agent matches:

| If request involves... | Use this... |
|------------------------|-------------|
| Git branch/worktree operations | `branch-worktree` skill |
| Creating pull requests | `create-pr` skill |
| Frontend development (Vue/React) | `frontend-developer` agent |
| Backend development (FastAPI/Python) | `backend-developer` agent |
| AWS/cloud architecture | `cloud-architect` agent |
| Terraform/Pulumi infrastructure | `terraform-engineer` agent |
| CI/CD and deployments | `deployment-engineer` agent or `devops-engineer` agent |
| Data pipelines/ETL | `data-engineer` agent |
| Planning/implementation strategy | `brainstorming` skill |
| Code reviews | `superpowers:requesting-code-review` skill |
| Session handover | `session-brief` skill |
| Testing/TDD | `superpowers:test-driven-development` skill |

### Step 3: Use Skill/Agent - DO NOT Execute Directly

Once a matching skill or agent is identified:
- **INVOKE THE SKILL/AGENT** using the `/claude-code-skill:` or appropriate tool
- **DO NOT** attempt to execute the task directly in the main context
- **DO NOT** bypass the skill/agent system

Example:
```
User: "Create a new feature branch for the login feature"

WRONG: "I'll create a branch for you..." [executes git commands directly]

RIGHT: [Invokes `branch-worktree` skill with feature_name: "login"]
```

### Step 4: Handoff with Context

When invoking an agent:
- Pass relevant context from the user request
- Include any files or requirements mentioned
- Let the skill/agent handle the full execution

### Step 5: Continue in Main Context (After Skill/Agent Completes)

After a skill/agent completes:
- Read its output/summary
- Ask follow-up questions if needed
- Summarize results for the user

---

This rule is **MANDATORY** and **NON-NEGOTIABLE**:
