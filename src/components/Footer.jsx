import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { footerLinks, footerName } from "../data/portfolioData";

/* ── Split heading — each character falls in from above ── */
function CharSplit({ text, inView, baseDelay = 0 }) {
  return (
    <span aria-label={text}>
      {text.split("").map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: baseDelay + i * 0.03,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Footer() {
  const ref        = useRef(null);
  const lineRef    = useRef(null);
  const bottomRef  = useRef(null);

  const inView       = useInView(ref,       { once: true, margin: "-8% 0px" });
  const lineInView   = useInView(lineRef,   { once: true, margin: "-5% 0px" });
  const bottomInView = useInView(bottomRef, { once: true, margin: "-5% 0px" });

  return (
    <footer id="contact" className="border-t border-white/10 px-4 md:px-16 py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto bg-white/[0.03] backdrop-blur-[6px] border border-white/10 rounded-3xl p-8 md:p-12">

        {/* ── Eyebrow — line wipes in from left ── */}
        <div ref={ref} className="flex items-center gap-4 mb-10">
          <motion.span
            className="block h-px bg-white/25"
            initial={{ width: 0 }}
            animate={inView ? { width: "2rem" } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.span
            className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/25"
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Let's Connect
          </motion.span>
        </div>

        {/* ── Heading — character split drop ── */}
        <h2 className="text-[clamp(48px,8vw,100px)] font-extralight text-white leading-none tracking-tight mb-6 overflow-hidden">
          <CharSplit text="Get in" inView={inView} baseDelay={0.2} />
          <br />
          <CharSplit text="Touch." inView={inView} baseDelay={0.5} />
        </h2>

        {/* ── Sub copy — fades up ── */}
        <motion.p
          className="font-mono text-xs text-white/25 tracking-wider max-w-xs leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          Open to collaborations, freelance projects, and interesting conversations.
        </motion.p>

        {/* ── CTA email button — scales in ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="mailto:avineshwaran@example.com"
            className="group relative inline-flex items-center gap-4 font-mono text-[10px] tracking-[0.3em] uppercase text-white/50 hover:text-white transition-colors duration-400"
          >
            {/* Animated bracket left */}
            <motion.span
              className="font-mono text-white/20 group-hover:text-white/60 transition-colors duration-300"
              animate={{ x: [0, -3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              [
            </motion.span>
            <span className="border-b border-white/20 group-hover:border-white pb-0.5 transition-colors duration-300">
              Send a Message
            </span>
            <motion.span
              className="font-mono text-white/20 group-hover:text-white/60 transition-colors duration-300"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              ]
            </motion.span>
          </a>
        </motion.div>

        {/* ── Divider — grows from left ── */}
        <div ref={lineRef} className="my-16">
          <motion.div
            className="h-px bg-white/10"
            initial={{ scaleX: 0, originX: 0 }}
            animate={lineInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* ── Bottom row — name + social links ── */}
        <div ref={bottomRef} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">

          {/* Name slides from left */}
          <motion.span
            className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/25"
            initial={{ opacity: 0, x: -20 }}
            animate={bottomInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {footerName}
          </motion.span>

          {/* Social links — each expands from a dot */}
          <div className="flex gap-8">
            {footerLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 12 }}
                animate={bottomInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative group font-mono text-[10px] tracking-[0.25em] uppercase text-white/30 hover:text-white transition-colors duration-300"
              >
                {link.label}
                {/* Underline sweeps in */}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-350" />
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
