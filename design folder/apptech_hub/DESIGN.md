---
name: AppTech Hub
colors:
  surface: '#f8f9fc'
  surface-dim: '#d9dadd'
  surface-bright: '#f8f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3f6'
  surface-container: '#edeef1'
  surface-container-high: '#e7e8eb'
  surface-container-highest: '#e1e2e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434654'
  inverse-surface: '#2e3133'
  inverse-on-surface: '#f0f1f4'
  outline: '#737686'
  outline-variant: '#c3c5d7'
  surface-tint: '#1a53d6'
  primary: '#1550d3'
  on-primary: '#ffffff'
  primary-container: '#3c6bed'
  on-primary-container: '#fffbff'
  inverse-primary: '#b5c4ff'
  secondary: '#585f68'
  on-secondary: '#ffffff'
  secondary-container: '#dde3ee'
  on-secondary-container: '#5e656e'
  tertiary: '#006b2d'
  on-tertiary: '#ffffff'
  tertiary-container: '#00873b'
  on-tertiary-container: '#f7fff3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b5c4ff'
  on-primary-fixed: '#00164d'
  on-primary-fixed-variant: '#003cad'
  secondary-fixed: '#dde3ee'
  secondary-fixed-dim: '#c1c7d1'
  on-secondary-fixed: '#161c24'
  on-secondary-fixed-variant: '#414750'
  tertiary-fixed: '#6bff8f'
  tertiary-fixed-dim: '#4ae176'
  on-tertiary-fixed: '#002109'
  on-tertiary-fixed-variant: '#005321'
  background: '#f8f9fc'
  on-background: '#191c1e'
  surface-variant: '#e1e2e5'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 20px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 48px
---

## Brand & Style
The design system for this platform prioritizes high-fidelity utility and premium clarity, targeting the modern Korean "App-Tech" user who values efficiency and aesthetic sophistication. The brand personality is **Precise, Rewarding, and Fluid**.

By blending the structural minimalism of **Linear** with the approachable vibrancy of **Toss**, the UI creates an environment of "Digital Prosperity." The aesthetic is rooted in **Minimalism** with **Glassmorphism accents**. It utilizes heavy whitespace to reduce cognitive load while employing sleek, technical details—such as micro-borders and precise iconography—to evoke a sense of high-end financial software. The emotional response is one of trust and "lightness," making the daily task of benefit collection feel like a premium experience rather than a chore.

## Colors
The palette is centered around a vibrant "Hub Blue" (#4F7CFF) that signals action and technology. 

- **Primary:** Used for main actions, active states, and brand highlights.
- **Secondary:** A soft wash blue used for large surface areas like button backgrounds or subtle section headers.
- **Neutral:** A cool-toned background (#F8F9FC) ensures that white cards and glass elements pop with sufficient contrast.
- **Semantic Colors:** Success, Warning, and Danger are highly saturated to ensure quick status recognition in a data-heavy environment.
- **Text:** High-contrast dark grey (#1A1C21) is used for headlines to ensure accessibility and a "premium" print feel.

## Typography
The typography strategy uses a trio of modern sans-serifs to establish hierarchy and technical precision. 

**Hanken Grotesk** is used for headlines to provide a sharp, contemporary look that mirrors high-end SaaS tools. **Inter** handles the bulk of body content for its exceptional readability and neutral tone. **Geist** is reserved for labels, metadata, and numerical "benefit" data, providing a monospaced-adjacent technical feel that echoes the precision of the **Linear** style.

For mobile layouts, headline sizes are aggressively scaled down to maintain "airiness" without causing excessive line wrapping.

## Layout & Spacing
This design system follows a **Mobile-First Fluid Grid** philosophy. 

On mobile, the layout relies on a single column with 20px side margins and 16px gutters between elements. On desktop, the layout expands to a 12-column system with a max-width of 1200px. 

Vertical spacing follows a strict 4px base unit. To achieve the "Airy" feel of Apple-inspired designs, section gaps are generous (48px+), and card internal padding should never drop below 20px. Content is grouped into logical "stacks" using 8px or 16px increments to maintain a clear visual hierarchy.

## Elevation & Depth
Depth is created through a combination of **Tonal Layers** and **Ambient Shadows**.

1.  **Base Layer:** The background (#F8F9FC) is the lowest level.
2.  **Surface Layer:** Primary cards are pure white (#FFFFFF) with an extremely soft, diffused shadow (0px 10px 30px rgba(0, 0, 0, 0.04)).
3.  **Accent Layer:** Glassmorphism is used for floating navigation bars or overlay modals, featuring a 20px backdrop blur and a 1px semi-transparent white border.
4.  **Interactive Layer:** On hover, cards lift slightly (shadow increases in blur) and buttons utilize a subtle inner-glow to suggest tactility.

Avoid heavy black shadows. All shadows should be tinted with a hint of the primary blue to keep the UI looking clean and integrated.

## Shapes
The shape language is defined by **pronounced, friendly curves**. 

- **Cards & Containers:** Use `rounded-xl` (24px) as the standard to create a soft, approachable "Toss-like" container.
- **Buttons:** Use `rounded-lg` (16px) or full pill-shapes for primary CTAs to maximize tap target friendliness.
- **Inputs:** Maintain a consistent `rounded-md` (12px) to balance the softness of cards with the precision of data entry.

## Components

- **Buttons:** Primary buttons use a solid #4F7CFF fill with a white label. They must include a "ripple" interaction on click and a slight scale-down (0.98) to provide physical feedback.
- **Large Cards:** These are the centerpiece. Minimum 24px corner radius, white background, and a subtle 1px border (#E2E8F0) to define edges against the light background.
- **Chips/Badges:** Small, pill-shaped labels using the Secondary color (#EEF4FF) with Primary color text for categorized benefits.
- **Lists:** Clean, borderless rows with high-contrast icons. Use horizontal chevrons (>) to indicate drill-down actions, following the iOS design pattern.
- **Input Fields:** Minimalist design with a focus on the active state. When focused, the border shifts to Primary Blue with a soft blue outer glow.
- **Progress Bars:** Thick (8px+), rounded bars using Success Green for completion, emphasizing the "reward" aspect of the app.
- **Bottom Navigation:** A glassmorphic bar that floats slightly above the bottom of the screen, emphasizing the mobile-first nature of the platform.