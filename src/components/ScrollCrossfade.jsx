/**
 * ScrollCrossfade.jsx
 * -------------------
 * A two-column "Scroll-Linked Sticky Crossfade" layout.
 *
 * Left  — sticky panel (h-screen) that crossfades between project visuals
 *          driven by the activeIndex state.
 * Right — scrollable list of project cards, each ≥ 50 vh tall. An
 *          IntersectionObserver (rootMargin centred on the viewport) updates
 *          activeIndex whenever a new card crosses the middle of the screen.
 *
 * Lenis-ready: the component never touches window.scrollY directly, so you
 * can wrap the page in <ReactLenis root> and it will work without changes.
 *
 * Dependencies: framer-motion  (npm i framer-motion)
 *               tailwindcss    (already in project)
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

// ─── Project Data ────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: 0,
    label: "01",
    title: "Smart Resource Framework Allocation",
    tags: ["Python 3.x", "Tkinter", "SQLite3", "Scikit-Learn", "Matplotlib"],
    description:
      "An intelligent desktop application that predicts and allocates computational resources using supervised machine learning. Built with a full Tkinter GUI backed by SQLite3 for persistent data storage, it trains Scikit-Learn models on historical usage patterns and visualises allocation decisions in real time via Matplotlib dashboards — turning raw metrics into actionable capacity planning.",
    // Neural-network / resource-graph visual
    visual: (
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        aria-hidden="true"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Input layer nodes */}
        {[100, 160, 220, 280].map((y) => (
          <circle key={`in-${y}`} cx="80" cy={y} r="10" stroke="white" strokeWidth="1.2" fill="none" />
        ))}
        {/* Hidden layer nodes */}
        {[120, 190, 260].map((y) => (
          <circle key={`h-${y}`} cx="200" cy={y} r="12" stroke="white" strokeWidth="1.5" fill="none" />
        ))}
        {/* Output layer nodes */}
        {[155, 225].map((y) => (
          <circle key={`out-${y}`} cx="320" cy={y} r="14" stroke="white" strokeWidth="1.8"
            fill="white" fillOpacity="0.08" />
        ))}
        {/* Connections input → hidden */}
        {[100, 160, 220, 280].map((iy) =>
          [120, 190, 260].map((hy) => (
            <line key={`${iy}-${hy}`} x1="90" y1={iy} x2="188" y2={hy}
              stroke="white" strokeWidth="0.4" opacity="0.25" />
          ))
        )}
        {/* Connections hidden → output */}
        {[120, 190, 260].map((hy) =>
          [155, 225].map((oy) => (
            <line key={`${hy}-${oy}`} x1="212" y1={hy} x2="306" y2={oy}
              stroke="white" strokeWidth="0.6" opacity="0.45" />
          ))
        )}
        {/* Active path highlight */}
        <line x1="90" y1="160" x2="188" y2="190" stroke="white" strokeWidth="1.2" opacity="0.9" />
        <line x1="212" y1="190" x2="306" y2="155" stroke="white" strokeWidth="1.2" opacity="0.9" />
        <circle cx="80"  cy="160" r="10" fill="white" />
        <circle cx="200" cy="190" r="12" fill="white" fillOpacity="0.6" />
        <circle cx="320" cy="155" r="14" fill="white" fillOpacity="0.9" />
        {/* Label */}
        <text x="200" y="320" textAnchor="middle" fill="white" fillOpacity="0.25"
          fontSize="10" fontFamily="monospace" letterSpacing="3">ML MODEL</text>
      </svg>
    ),
  },
  {
    id: 1,
    label: "02",
    title: "Dungeons and Fighter",
    tags: ["Godot", "GDScript", "2D Physics", "AI State Machine", "Boss Design"],
    description:
      "A high-octane 2D action platformer built with Godot Engine. Features responsive character controls with frame-perfect input buffering, a finite-state-machine driven AI for challenging enemies, and an epic multi-phase boss fight with distinct attack patterns per phase. The architecture is deliberately modular — every enemy, platform, and combat system is decoupled so new content drops in with zero rewrites.",
    // Pixel dungeon / sword visual
    visual: (
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        aria-hidden="true"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dungeon arch */}
        <path
          d="M120 340 L120 200 Q120 100 200 100 Q280 100 280 200 L280 340"
          stroke="white" strokeWidth="1.5" strokeLinecap="round"
        />
        {/* Inner arch opening */}
        <path
          d="M148 340 L148 210 Q148 130 200 130 Q252 130 252 210 L252 340"
          stroke="white" strokeWidth="0.8" opacity="0.3"
        />
        {/* Sword — blade */}
        <line x1="200" y1="155" x2="200" y2="300" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        {/* Sword — crossguard */}
        <line x1="178" y1="235" x2="222" y2="235" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        {/* Sword — pommel */}
        <circle cx="200" cy="308" r="6" fill="white" />
        {/* Sword — tip */}
        <path d="M197 155 L200 138 L203 155" fill="white" />
        {/* Stars / sparkles */}
        <circle cx="145" cy="145" r="2" fill="white" opacity="0.6" />
        <circle cx="255" cy="165" r="2.5" fill="white" opacity="0.5" />
        <circle cx="135" cy="185" r="1.5" fill="white" opacity="0.4" />
        <circle cx="265" cy="130" r="1.5" fill="white" opacity="0.35" />
        {/* Boss health bar hint */}
        <rect x="120" y="358" width="160" height="4" rx="2" fill="white" fillOpacity="0.1" />
        <rect x="120" y="358" width="90"  height="4" rx="2" fill="white" fillOpacity="0.6" />
        <text x="200" y="380" textAnchor="middle" fill="white" fillOpacity="0.25"
          fontSize="9" fontFamily="monospace" letterSpacing="3">BOSS PHASE II</text>
      </svg>
    ),
  },
];

// ─── Crossfade variants ───────────────────────────────────────────────────────

const CROSSFADE_VARIANTS = {
  enter: { opacity: 0, scale: 1.04 },
  center: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ─── Left Panel — sticky crossfading visual ───────────────────────────────────

function StickyPanel({ activeIndex }) {
  const project = PROJECTS[activeIndex];

  return (
    <div className="sticky top-12 h-[calc(100vh-6rem)] flex flex-col items-center justify-center overflow-hidden">
      {/* Project counter pill */}
      <div className="absolute top-10 left-10 flex items-center gap-3">
        <span className="font-mono text-xs tracking-[0.25em] text-white/30 uppercase">
          Project
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={`counter-${activeIndex}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }}
            className="font-mono text-xs tracking-[0.25em] text-white"
          >
            {String(activeIndex + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Crossfading visual */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`visual-${activeIndex}`}
          variants={CROSSFADE_VARIANTS}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center"
          aria-label={project.title}
        >
          {project.visual}
        </motion.div>
      </AnimatePresence>

      {/* Crossfading project title below visual */}
      <AnimatePresence mode="wait">
        <motion.p
          key={`title-${activeIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } }}
          exit={{ opacity: 0, y: -8, transition: { duration: 0.3 } }}
          className="mt-8 font-mono text-xs tracking-[0.2em] text-white/40 uppercase text-center px-8"
        >
          {project.title}
        </motion.p>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="absolute bottom-10 flex gap-2">
        {PROJECTS.map((_, i) => (
          <motion.span
            key={i}
            animate={{
              width: i === activeIndex ? "24px" : "6px",
              backgroundColor: i === activeIndex ? "#ffffff" : "rgba(255,255,255,0.2)",
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="h-1.5 rounded-full"
            style={{ display: "block" }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Project Card — right column entry ───────────────────────────────────────

function ProjectCard({ project, onInView }) {
  const cardRef = useRef(null);
  const ioRef   = useRef(null); // separate ref for IntersectionObserver
  const inView  = useInView(cardRef, { once: true, margin: "-10% 0px" });

  // IntersectionObserver for crossfade tracking (uses ioRef)
  useEffect(() => {
    const el = ioRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onInView(project.id); },
      { root: null, rootMargin: "-35% 0px -35% 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [project.id, onInView]);

  // Split title into words for word-lift
  const titleWords = project.title.split(" ");

  return (
    <article
      ref={ioRef}
      className="
        min-h-[50vh] flex flex-col justify-center
        px-10 sm:px-16 py-20
        border-b border-white/[0.07]
        last:border-b-0
        transition-colors duration-500
        hover:bg-white/[0.015]
      "
      id={`project-${project.id}`}
    >
      {/* ── Animate wrapper slides in from right ── */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Label — drops down */}
        <motion.span
          className="font-mono text-[10px] tracking-[0.35em] text-white/20 uppercase mb-6 block"
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {project.label}
        </motion.span>

        {/* Title — word by word clip-up */}
        <h2 className="group/title text-3xl sm:text-4xl font-light text-white leading-tight mb-5 tracking-tight cursor-default">
          {titleWords.map((word, wi) => (
            <span key={wi} className="inline-block overflow-hidden mr-[0.3em]">
              <motion.span
                className="inline-block"
                initial={{ y: "110%", rotateX: 30 }}
                animate={inView ? { y: 0, rotateX: 0 } : {}}
                transition={{
                  duration: 0.75,
                  delay: 0.2 + wi * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h2>

        {/* Tags — stagger scale in */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag, ti) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.35 + ti * 0.06, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.06, borderColor: "rgba(255,255,255,0.5)", color: "rgba(255,255,255,0.9)" }}
              className="text-[10px] font-mono tracking-[0.2em] uppercase border border-white/15 text-white/35 px-3 py-1 cursor-default"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Description — fades up */}
        <motion.p
          className="text-white/40 text-sm leading-relaxed max-w-prose font-mono"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {project.description}
        </motion.p>

        {/* CTA — slides in from left */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            className="
              group/btn relative overflow-hidden
              flex items-center gap-3
              text-xs font-mono tracking-[0.25em] uppercase
              border border-white/15 px-6 py-3
              text-white/40 hover:text-black
              transition-colors duration-500
            "
            aria-label={`View ${project.title} case study`}
          >
            <span className="absolute inset-0 bg-white -translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            <span className="relative z-10">View Case Study</span>
            <svg className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" width="14" height="7" viewBox="0 0 14 7" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M0 3.5h12M8.5 1l3.5 2.5L8.5 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </article>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function ScrollCrossfade() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Stable callback — prevents IntersectionObserver re-registrations
  const handleInView = useCallback((id) => {
    setActiveIndex(id);
  }, []);

  return (
    /*
     * Lenis note:
     *   Wrap this section (or your whole app) with <ReactLenis root> from
     *   '@studio-freight/react-lenis' and nothing below needs to change.
     *   The IntersectionObserver fires on real scroll position regardless of
     *   whether Lenis or native scrolling is in use.
     */
    <section
      id="projects-crossfade"
      className="text-white px-4 md:px-16 py-24"
      aria-label="Featured Projects"
    >
      <div className="max-w-7xl mx-auto bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* ── Left: sticky visual panel ── */}
        <div className="hidden md:block">
          <StickyPanel activeIndex={activeIndex} />
        </div>

        {/* ── Right: scrollable project list ── */}
        <div className="min-h-screen border-l border-white/[0.07]">
          {/* Section header */}
          <div className="px-10 sm:px-16 py-16 border-b border-white/[0.07] overflow-hidden">
            <motion.span
              className="font-mono text-[10px] tracking-[0.35em] text-white/20 uppercase block mb-5"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Selected Work
            </motion.span>
            <div className="overflow-hidden">
              <motion.h2
                className="text-5xl sm:text-6xl font-extralight text-white leading-none tracking-tight"
                initial={{ y: "105%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                Projects
              </motion.h2>
            </div>
          </div>

          {/* Project cards */}
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onInView={handleInView}
            />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
