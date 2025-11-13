# Design Guidelines: AI Platform Cost Calculator (SaaS Edition)

## Design Approach
**Selected System:** Modern SaaS hybrid (Linear clarity + Stripe gradients + Vercel polish)
**Rationale:** Transform utility tool into visually engaging platform while maintaining data clarity. Vibrant gradients and glassmorphism create professional yet playful atmosphere for developer audience.

## Core Design Principles
1. **Gradient-Driven Hierarchy:** Use color gradients to guide attention and create depth
2. **Glass Layering:** Glassmorphism cards float above gradient backgrounds
3. **Smooth Interactions:** Polished micro-animations enhance premium feel
4. **Data Clarity Preserved:** Typography and spacing ensure readability despite visual richness

## Typography System
**Font Family:** Inter via Google Fonts
- **Headings:** font-bold (700 weight), gradient text treatments
  - H1: text-5xl lg:text-6xl with gradient effect
  - H2: text-3xl lg:text-4xl
  - H3: text-xl lg:text-2xl
- **Body:** font-normal (400), text-base lg:text-lg
- **Data/Numbers:** font-mono for all numerical values and costs
- **Accents:** font-semibold (600) for labels and CTAs

## Gradient & Glass System
**Primary Gradients:**
- Hero Background: Purple-to-blue diagonal (from top-left)
- Card Accents: Pink-to-purple horizontal
- Button Primary: Blue-to-purple
- Hover States: Shift gradient angle/intensity

**Glassmorphism Specifications:**
- backdrop-blur-lg with semi-transparent white/dark backgrounds
- Border: 1px solid with rgba white/black (20% opacity)
- Shadow: Layered shadows for depth (sm + lg combination)
- Container backgrounds: bg-white/10 for dark mode, bg-white/80 for light mode

## Layout System
**Spacing Units:** Tailwind 4, 6, 8, 12, 16, 20, 24
**Container:** max-w-7xl mx-auto px-6 lg:px-8
**Section Padding:** py-20 lg:py-32 (increased for breathing room)
**Card Spacing:** p-8 lg:p-12 for glass cards

## Component Library

### Hero Section
- **Full-width gradient background** with animated subtle grain texture
- Height: min-h-[600px] lg:min-h-[700px]
- Content: Centered, max-w-4xl
- Headline with gradient text effect
- Subheadline: text-lg lg:text-xl, semi-transparent white
- **CTA Button:** Large, gradient background with backdrop-blur, prominent shadow
- **Platform Logos:** Grid of 9 logos below, each in glass card with hover lift effect
- **Background:** Abstract gradient mesh or geometric pattern (see Images section)

### Input Form Section
- **Glass Card Container:** Glassmorphism with gradient border accent
- Large textarea: min-h-[240px], frosted glass effect
- Floating label animation on focus
- Character counter: Badge style with gradient
- **Action Buttons (Horizontal):**
  - "Hesapla": Primary gradient button with glow effect
  - "Promptu Optimize Et": Secondary glass button with gradient border
- Button hover: Scale + gradient intensity shift

### Results Comparison Table
- **Glass Table Container:** Full glassmorphism treatment
- Sticky header with gradient underline
- **Columns:** Platform | Prompts | Tokens | Cost (₺)
- Row hover: Gentle glow effect with gradient accent
- Lowest cost row: Highlighted with colored glass overlay
- Mobile: Horizontal scroll with gradient fade indicators on edges
- Alternating row backgrounds with subtle tint variation

### Optimization Results Panel
- **Two Glass Cards Side-by-Side** (Desktop), stacked (Mobile)
- **Metrics Banner Above:** Glassmorphism strip with gradient accents
  - Token reduction badge
  - Cost savings badge
  - Both with gradient backgrounds
- Prompt containers: Monospace, glass treatment with syntax-style styling
- Diff highlighting: Gradient underlines for changes

### Visualization Section
- **Glass Container** with gradient border
- Horizontal bar chart with gradient bars (color-coded by platform)
- Animated bar growth on scroll-into-view
- Interactive hover states with tooltip glassmorphism
- Grid background with subtle gradient overlay

### Navigation
- **Sticky glass navbar:** backdrop-blur-xl, semi-transparent
- Logo with gradient accent
- GitHub link: Glass button with icon
- Height: h-20, border-bottom with gradient

### Footer
- **Glass panel** with gradient top border
- Three-column layout: Brand | Links | Social
- Gradient dividers between columns
- Newsletter signup: Glass input with gradient submit button
- Copyright text with gradient accent

## Animation Specifications
**Page Load:**
- Hero content: Fade-up sequence (stagger 100ms)
- Glass cards: Scale-in with opacity (0.95 to 1)

**Interactions:**
- Buttons: Hover scale (1.02) + gradient shift + shadow growth
- Cards: Lift effect (translateY -2px) + shadow expansion
- Table rows: Smooth highlight with gradient sweep
- Form inputs: Border gradient animation on focus

**Scroll Effects:**
- Chart bars: Animate width on viewport entry
- Section backgrounds: Subtle parallax on gradient layers
- Glass cards: Gentle float effect on scroll

## Icons
**Library:** Heroicons (outline variant)
- Sparkles: Optimization features
- Calculator: Cost calculation
- ChartBar: Results visualization
- Size: w-6 h-6, gradient fill option for emphasis

## Images
**Hero Background:** 
- Abstract gradient mesh illustration or 3D geometric shapes
- Soft-focus, supports glassmorphism layering
- Purple-blue-pink color harmony
- Positioned as full-width background layer

**Platform Logos:**
- Small icons (48x48px) for 9 AI platforms
- Displayed in grid within glass cards
- Grayscale with colored glass overlay

## Accessibility
- WCAG AA contrast maintained despite gradients (test text on all backgrounds)
- Focus rings: Gradient borders with high contrast
- Glass effects: Ensure sufficient opacity for readability
- Reduced motion: Disable animations via prefers-reduced-motion
- Semantic HTML structure preserved

## Key UX Patterns
- **Progressive Enhancement:** Gradients and glass degrade gracefully
- **Loading States:** Skeleton screens with gradient shimmer
- **Hover Feedback:** All interactive elements respond with smooth transitions
- **Visual Hierarchy:** Gradient intensity guides importance
- **Scannability:** Maintain monospace numbers, clear table structure despite decorative elements