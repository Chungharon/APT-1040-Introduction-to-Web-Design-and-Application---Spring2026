# Africa Vibe Architecture & Data Schema

## Project Overview
Africa Vibe is a modern Next.js 16 web application designed to celebrate African heritage through festivals, arts, cuisine, and rituals. It features interactive registration forms for various cultural participation tracks.

## Technology Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui (Radix UI based)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Application Structure
- `src/app/`: Contains the main entry points, layout, and global styles.
  - `layout.tsx`: Root layout with font configurations (Montserrat, Open Sans), Navbar (Suspense-wrapped), and Footer.
  - `page.tsx`: Main landing page assembling various sections.
- `src/components/sections/`: Functional blocks of the landing page.
  - `Hero.tsx`: Visual introduction.
  - `Navbar.tsx` & `Footer.tsx`: Navigation and site info.
  - `FestivalForm.tsx`: Registration for festivals.
  - `ArtsAcademyForm.tsx`: Enrollment for arts academy.
  - `CulinaryAcademyForm.tsx`: Registration for culinary programs.
  - `RitualForm.tsx`: Sign-up for cultural rituals.
- `src/components/ui/`: Atomic UI components (Button, Input, Card, etc.) powered by shadcn.
- `src/lib/`: Utility functions (e.g., `cn` for Tailwind class merging).

## Data Schema (Proposed/Extracted)

While the application currently lacks a backend database, the following data schemas are extracted from the frontend forms:

### Festival Participant (`FestivalForm`)
| Field | Type | Description |
|-------|------|-------------|
| `fname` | string | First Name |
| `clname` | string | Last Name |
| `age` | number | Age |
| `country` | string | Country of Origin |
| `address` | string | Postal Address |
| `email` | string (email) | Contact Email |
| `phone` | string (tel) | Contact Phone |
| `participantType` | enum | Artist, Visitor, VIP, MC, Vendor, Performer |
| `festivals` | string[] | IDs of selected festivals (Durbar, Homowo, etc.) |
| `preferredDate` | string (date) | Date of attendance |
| `motivation` | string | Culinary/Cultural inspiration |

## Design System (Tailwind 4)
The project uses a custom color palette defined in `globals.css`:
- `brand-dark`: Deep African charcoal
- `brand-gold`: Vibrant Savannah gold
- `brand-brown`: Earthy Terracotta
- `brand-cream`: Warm Saharan sand
- `brand-green`: Lush Jungle green
