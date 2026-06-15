import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { navLinks, navCta } from "../data/portfolioData";

/* ── Magnetic link — element pulls slightly toward cursor ── */
function MagneticLink({ children, className, href, onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = (e) => {
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (onClick) onClick(e);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={className}
    >
      {children}
    </motion.a>
  );
}

/* ── Character-scramble hover on nav text ── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function ScrambleText({ text }) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef(null);

  const scramble = () => {
    let iteration = 0;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, idx) => {
            if (char === " ") return " ";
            if (idx < iteration) return text[idx];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iteration += 0.6;
      if (iteration >= text.length) clearInterval(intervalRef.current);
    }, 35);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setDisplay(text);
  };

  return (
    <span onMouseEnter={scramble} onMouseLeave={reset} className="cursor-pointer">
      {display}
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 w-full z-50 flex justify-between items-center px-8 md:px-16 h-20 transition-all duration-700 ${
          scrolled
            ? "bg-black/80 backdrop-blur-2xl border-b border-white/[0.07]"
            : "bg-transparent"
        }`}
      >
        {/* Brand — glows on hover */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.04 }}
          className="relative font-mono text-xs tracking-[0.35em] uppercase text-white/70 hover:text-white transition-colors duration-300 group"
        >
          <span className="relative z-10">Avineshwaran A.</span>
          {/* Glow behind brand on hover */}
          <span className="absolute inset-0 -z-0 rounded-full blur-xl bg-white/0 group-hover:bg-white/8 transition-all duration-500 scale-150" />
        </motion.a>

        {/* Desktop links — pill fades in on hover */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagneticLink
                href={link.href}
                className="relative group font-mono text-[10px] tracking-[0.3em] uppercase px-5 py-2.5 text-white/40 hover:text-white transition-colors duration-300"
              >
                {/* Curved pill fades in */}
                <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">
                  <ScrambleText text={link.label.toUpperCase()} />
                </span>
              </MagneticLink>
            </motion.div>
          ))}

          {/* CTA — always slightly visible pill, brighter on hover */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticLink
              href={navCta.href}
              className="relative group font-mono text-[10px] tracking-[0.3em] uppercase px-5 py-2.5 text-white/80 hover:text-white transition-colors duration-300"
            >
              {/* Curved pill: dim at rest, bright on hover */}
              <span className="absolute inset-0 rounded-full bg-white/[0.08] group-hover:bg-white/20 transition-all duration-300" />
              <span className="relative z-10">
                <ScrambleText text={navCta.label.toUpperCase()} />
              </span>
            </MagneticLink>
          </motion.div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 group"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0, width: menuOpen ? "20px" : "20px" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="block h-px bg-white origin-center"
            style={{ width: "20px" }}
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1, x: menuOpen ? 10 : 0 }}
            transition={{ duration: 0.25 }}
            className="block w-4 h-px bg-white/60"
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="block h-px bg-white origin-center"
            style={{ width: "20px" }}
          />
        </button>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: "circle(0% at 95% 5%)" }}
            animate={{ clipPath: "circle(150% at 95% 5%)" }}
            exit={{ clipPath: "circle(0% at 95% 5%)" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-12"
          >
            {/* Background lines */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)",
                backgroundSize: "100% 80px",
              }}
            />
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  const target = document.getElementById(link.href.slice(1));
                  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden group font-mono text-3xl font-extralight tracking-tight border border-white/15 px-10 py-4 text-white/60 hover:text-black transition-colors duration-500"
              >
                <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <span className="relative z-10">{link.label}</span>
              </motion.a>
            ))}
            <motion.a
              href={navCta.href}
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                const target = document.getElementById(navCta.href.slice(1));
                if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + navLinks.length * 0.07 }}
              className="relative overflow-hidden group mt-2 font-mono text-xs tracking-[0.3em] uppercase border border-white/40 px-10 py-4 text-white/80 hover:text-black transition-colors duration-500"
            >
              <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <span className="relative z-10">{navCta.label}</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
