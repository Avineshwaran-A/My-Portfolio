import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from "framer-motion";
import { hero } from "../data/portfolioData";

/* ══════════════════════════════════════
   1. CURSOR GLOW — follows mouse
══════════════════════════════════════ */
function CursorGlow() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const springX = useSpring(x, { stiffness: 60, damping: 25 });
  const springY = useSpring(y, { stiffness: 60, damping: 25 });

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      style={{
        left: springX,
        top: springY,
        background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
      }}
      className="pointer-events-none fixed z-0 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
      aria-hidden="true"
    />
  );
}

/* ══════════════════════════════════════
   2. FLOATING PARTICLES
══════════════════════════════════════ */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 1.5 + 0.5,
  dur: Math.random() * 12 + 10,
  delay: Math.random() * 8,
  drift: (Math.random() - 0.5) * 40,
}));

/* Particles: use CSS-only animation — far cheaper than 18 motion elements */
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: 0,
            animation: `particleDrift ${p.dur}s ${p.delay}s ease-in-out infinite`,
            transform: `translateY(0px)`,
            "--drift": `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════
   3. COUNT-UP NUMBER
══════════════════════════════════════ */
function CountUp({ from = 0, to, duration = 1.4, delay = 0, suffix = "" }) {
  const [val, setVal] = useState(from);
  useEffect(() => {
    const controls = animate(from, to, {
      duration,
      delay,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return controls.stop;
  }, [from, to, duration, delay]);
  return <>{val}{suffix}</>;
}

/* ══════════════════════════════════════
   4. WORD-LIFT ANIMATED TEXT
══════════════════════════════════════ */
function LiftText({ text, delay = 0, className = "" }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.28em] leading-[1.15]">
          <motion.span
            className="inline-block"
            initial={{ y: "115%", rotateX: 40, opacity: 0 }}
            animate={{ y: 0, rotateX: 0, opacity: 1 }}
            transition={{
              duration: 1,
              delay: delay + i * 0.065,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ══════════════════════════════════════
   5. TYPING CURSOR TAGLINE
══════════════════════════════════════ */
function TypedTagline({ text, startDelay = 1.4 }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), startDelay * 1000);
    return () => clearTimeout(timeout);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;
    const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), 28);
    return () => clearTimeout(t);
  }, [started, displayed, text]);

  return (
    <span>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.9, repeat: Infinity }}
        className="inline-block w-0.5 h-[1em] bg-white/50 ml-0.5 align-middle"
      />
    </span>
  );
}

/* ══════════════════════════════════════
   6. STAT BADGE
══════════════════════════════════════ */
function StatBadge({ value, from, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-start"
    >
      <span className="font-mono text-3xl font-extralight text-white leading-none tracking-tight">
        <CountUp from={from} to={value} delay={delay + 0.2} suffix="+" />
      </span>
      <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/25 mt-1">{label}</span>
    </motion.div>
  );
}

/* ══════════════════════════════════════
   MAIN HERO
══════════════════════════════════════ */
export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y        = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity  = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const scale    = useTransform(scrollYProgress, [0, 0.5], [1, 0.96]);

  return (
    <header
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* ── Cursor glow only ── */}
      <CursorGlow />

      {/* Radial vignette at bottom — fades starfield into content */}
      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)" }} />

      {/* ── Main content (parallax) ── */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 px-8 md:px-16 pb-28 pt-44 max-w-7xl"
      >
        {/* Eyebrow row */}
        <motion.div
          className="flex items-center gap-4 mb-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="block h-px bg-white/30"
            initial={{ width: 0 }}
            animate={{ width: "2rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/30">
            Full-Stack Engineer · ML Enthusiast
          </span>
        </motion.div>

        {/* Name — huge, lifts in */}
        <h1 className="text-[clamp(44px,7.5vw,104px)] font-extralight leading-[0.95] tracking-tight text-white mb-8">
          <LiftText text={hero.name} delay={0.25} />
        </h1>

        {/* Tagline — typed */}
        <p className="text-[clamp(15px,1.9vw,22px)] font-light text-white/40 leading-relaxed max-w-2xl mb-14 font-mono min-h-[2.5em]">
          <TypedTagline text={hero.tagline} startDelay={1.2} />
        </p>

        {/* Stats row */}
        <motion.div
          className="flex gap-12 mb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <StatBadge value={2}  from={0} label="Projects"   delay={1.1} />
          <StatBadge value={3}  from={0} label="Tech Stacks" delay={1.2} />
          <StatBadge value={2}  from={0} label="Years Exp."  delay={1.3} />
        </motion.div>

        {/* CTA row */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:items-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Primary CTA */}
          <button
            onClick={() => {
              const target = document.getElementById("projects-crossfade");
              if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="relative overflow-hidden group inline-flex items-center gap-4 font-mono text-[10px] tracking-[0.3em] uppercase border border-white/25 px-8 py-4 text-white hover:text-black transition-colors duration-500 cursor-pointer"
          >
            <span className="absolute inset-0 bg-white -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            <span className="relative z-10 flex items-center gap-3">
              View Projects
              <svg width="16" height="8" viewBox="0 0 16 8" className="transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M0 4h14M10 1l4 3-4 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>

          {/* Secondary CTA */}
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 px-6 py-4 hover:text-white transition-colors duration-300"
          >
            <span>Get in Touch</span>
            <span className="inline-block w-0 h-px bg-white/40 group-hover:w-6 group-hover:bg-white transition-all duration-300" />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-8 md:left-16 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.0 }}
      >
        <motion.div
          className="w-px bg-white/20 origin-top"
          animate={{ height: ["0px", "48px", "0px"] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
        />
        <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-white/15">Scroll</span>
      </motion.div>

      {/* Corner coordinate */}
      <motion.div
        className="absolute bottom-10 right-8 md:right-16 font-mono text-[9px] tracking-[0.25em] text-white/10 select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        {`{ x: 01 / y: 00 }`}
      </motion.div>
    </header>
  );
}
