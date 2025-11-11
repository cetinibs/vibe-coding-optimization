# Design Guidelines: AI Platform Cost Calculator

## Design Approach
**Selected System:** Linear/Vercel-inspired minimalist design system
**Rationale:** Developer-focused utility tool requiring clarity, efficiency, and data presentation. Clean, modern aesthetic with emphasis on readability and quick comprehension.

## Core Design Principles
1. **Data Clarity First:** Information hierarchy prioritizes quick scanning and comparison
2. **Professional Minimalism:** Clean, distraction-free interface for focused work
3. **Responsive Precision:** Seamless experience across desktop and mobile

## Typography System
**Font Family:** Inter via Google Fonts
- **Headings:** font-semibold to font-bold (600-700 weight)
  - H1: text-4xl lg:text-5xl
  - H2: text-2xl lg:text-3xl
  - H3: text-xl lg:text-2xl
- **Body:** font-normal (400 weight)
  - Large: text-lg
  - Regular: text-base
  - Small: text-sm
- **Data/Numbers:** font-mono for all numerical values, costs, and technical information

## Layout System
**Spacing Units:** Tailwind 4, 6, 8, 12, 16, 20, 24 (p-4, m-6, gap-8, etc.)
**Container:** max-w-7xl mx-auto px-4 lg:px-8
**Section Padding:** py-12 lg:py-20
**Component Spacing:** gap-6 to gap-8 for content groups

## Component Library

### Hero Section (Clean, Functional)
- Compact header: py-16 lg:py-24
- Centered headline with description
- Single prominent CTA button
- Subtle platform logos strip below (9 platforms in a row)
- **No large hero image** - keep focused on utility

### Input Form Section
- **Large Textarea:** min-h-[200px], rounded-lg border with focus states
- Prominent label: "Uygulama Fikrinizi Girin"
- Character counter: text-sm text-right
- **Action Buttons:** 
  - Primary: "Hesapla" (Calculate)
  - Secondary: "Promptu Optimize Et" (Optimize Prompt)
- Button arrangement: flex gap-4 on desktop, stack on mobile

### Results Comparison Table
- **Responsive Table:** Scroll horizontally on mobile, full view on desktop
- **Columns:** Platform | Prompt Sayısı | Token Kullanımı | Maliyet (₺)
- **9 Rows:** One for each platform
- **Design Elements:**
  - Alternating row backgrounds for readability
  - Bold platform names
  - Monospace font for all numbers
  - Highlight lowest cost row with subtle accent
  - Sticky header on scroll

### Optimization Results Panel
- **Two-Column Layout (Desktop):** 
  - Left: "Orijinal Prompt" 
  - Right: "Optimize Edilmiş Prompt"
- **Stack on Mobile**
- **Comparison Metrics Bar:**
  - Token reduction percentage
  - Estimated cost savings
  - Display as badge-style metrics above columns
- **Code-style Display:** Both prompts in monospace, rounded containers with subtle border

### Visualization Section
- **Horizontal Bar Chart:** Cost comparison across platforms
- Platform names on Y-axis, cost amounts on X-axis
- Bars sized proportionally
- Include data labels on bars

### Navigation (Minimal)
- **Top Bar:** Logo left, GitHub link right
- Transparent background, sticky on scroll
- Height: h-16

### Footer (Simple)
- Single row: Copyright | Documentation Link | GitHub
- Text: text-sm
- Padding: py-8

## Icons
**Library:** Heroicons (via CDN)
- Calculator icon for CTA
- Sparkles icon for optimization
- Chart icon for results section
- Use outline variant, size: w-5 h-5

## Animations
**Minimal Approach:**
- Table rows: Subtle fade-in on load (stagger by 50ms)
- Buttons: Standard hover scale (scale-105)
- **No** scroll animations or page transitions

## Images
**No hero image required** - this is a data-focused utility tool. Visual emphasis on clean interface and information architecture.

## Accessibility
- Proper ARIA labels on form inputs
- Keyboard navigation for table rows
- Focus visible states on all interactive elements
- Semantic HTML throughout (table, form, section tags)

## Key UX Patterns
- **Progressive Disclosure:** Show results only after calculation
- **Instant Feedback:** Loading states during calculation
- **Clear Actions:** Prominent CTAs with descriptive text
- **Data Scanability:** Monospace numbers, aligned columns, visual hierarchy in tables