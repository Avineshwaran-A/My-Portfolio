// ─────────────────────────────────────────────────────────────
//  portfolioData.js
//  Single source of truth for all portfolio content.
//  Components consume this data via imports and .map() renders.
// ─────────────────────────────────────────────────────────────

// ── Navigation ───────────────────────────────────────────────
export const navLinks = [
  { label: "Projects",  href: "#projects-crossfade" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
];

export const navCta = { label: "Contact", href: "#contact" };

// ── Hero ──────────────────────────────────────────────────────
export const hero = {
  name: "Avineshwaran A.",
  tagline:
    "Bridging frontend interfaces with complex backend logic and probabilistic algorithms.",
  subtext:
    "A specialized Full-stack Engineer and Machine Learning enthusiast focused on building high-performance systems and intelligent diagnostic models.",
};

// layout: "text-left"  → text col first, image col second  (1fr 1.5fr)
// layout: "image-left" → image col first, text col second  (1.5fr 1fr)
export const projects = [
  {
    id: "canecare",
    title: "CaneCare",
    tag: "MOBILE APP / ML DIAGNOSIS",
    description:
      "A specialized agricultural diagnosis platform leveraging Convolutional Neural Networks to detect sugarcane diseases via image analysis.",
    cta: "VIEW CASE STUDY",
    ctaHref: "#",
    layout: "text-left",
    imageAlt:
      "A high-contrast black and white photograph showing a close-up of a textured sugarcane leaf",
  },
  {
    id: "stock-analysis",
    title: "Stock Analysis System",
    tag: "FINTECH / NLP / PREDICTION",
    description:
      "Automated pipeline for real-time data fetching and ML-driven trend prediction, featuring NLP summarization of market sentiment.",
    cta: "GITHUB REPO",
    ctaHref: "#",
    layout: "image-left",
    imageAlt:
      "A clean, minimalist visualization of stock market data displayed on a high-resolution screen",
  },
  {
    id: "resource-allocation",
    title: "Resource Allocation",
    tag: "SYSTEMS / SCHEDULING / ML",
    description:
      "A low-level framework integrating OS scheduling algorithms with ML predictions to optimize server resource distribution dynamically.",
    cta: "VIEW DOCS",
    ctaHref: "#",
    layout: "text-left",
    imageAlt:
      "A macro shot of a server rack's internal components, rendered in a sophisticated monochrome palette",
  },
];

// ── Timeline ──────────────────────────────────────────────────
export const timelineItems = [
  {
    id: "hack-hustle",
    period: "2023 - PRESENT",
    title: "Hack Hustle 2.0",
    description:
      "Participated as a Lead Developer, architecting a solution for distributed task management in under 48 hours.",
    active: true,   // filled dot (bg-primary)
  },
  {
    id: "network-testing",
    period: "2022 - 2023",
    title: "Local Network Testing",
    description:
      "Engineered multi-client testing environments to simulate high-concurrency stress for backend services.",
    active: false,  // hollow dot (bg-background)
  },
  {
    id: "ml-specialization",
    period: "ONGOING",
    title: "ML Specialization",
    description:
      "Advanced research into threat attack simulation modeling and probabilistic neural architectures.",
    active: false,
  },
];

// ── Footer ────────────────────────────────────────────────────
export const footerLinks = [
  { label: "GITHUB",   href: "#" },
  { label: "LINKEDIN", href: "#" },
  { label: "TWITTER",  href: "#" },
  { label: "EMAIL",    href: "#" },
];

export const footerName    = "AVINESHWARAN A.";
export const footerTagline = "© 2024 AVINESHWARAN A. — BUILT WITH PRECISION";
