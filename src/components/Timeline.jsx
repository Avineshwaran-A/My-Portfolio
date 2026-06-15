import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { timelineItems } from "../data/portfolioData";

/* ── Scramble on hover (reusable) ── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ·—";
function ScrambleHeading({ text, className }) {
  const [display, setDisplay] = useState(text);
  const iRef = useRef(null);

  const scramble = () => {
    let iter = 0;
    clearInterval(iRef.current);
    iRef.current = setInterval(() => {
      setDisplay(
        text.split("").map((ch, idx) => {
          if (ch === " ") return " ";
          if (idx < iter) return text[idx];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("")
      );
      iter += 0.7;
      if (iter >= text.length) clearInterval(iRef.current);
    }, 40);
  };

  return (
    <span className={className} onMouseEnter={scramble}>
      {display}
    </span>
  );
}

/* ── Individual timeline entry ── */
const ITEM_VARIANTS = {
  hidden: { opacity: 0, x: -28, filter: "blur(4px)" },
  visible: (i) => ({
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: 0.8, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] },
  }),
};

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={ITEM_VARIANTS}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative group cursor-default"
    >
      {/* Dot */}
      <div
        className={`absolute -left-[53px] top-1.5 w-3 h-3 border transition-all duration-500 ${
          item.active
            ? "bg-white border-white shadow-[0_0_12px_rgba(255,255,255,0.6)]"
            : "bg-black border-white/20 group-hover:border-white/60 group-hover:shadow-[0_0_8px_rgba(255,255,255,0.2)]"
        }`}
      />

      {/* Pulse for active */}
      {item.active && (
        <motion.div
          className="absolute -left-[55px] top-0.5 w-4 h-4 border border-white/30"
          animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.8, repeat: Infinity }}
        />
      )}

      {/* Period */}
      <motion.span
        className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/20 block mb-3"
      >
        {item.period}
      </motion.span>

      {/* Title with scramble */}
      <h3 className="text-xl md:text-2xl font-light text-white/80 mb-3 tracking-tight group-hover:text-white transition-colors duration-400">
        <ScrambleHeading text={item.title} className="" />
      </h3>

      {/* Hover accent line */}
      <div className="absolute -left-[45px] top-6 w-0 h-px bg-white/30 group-hover:w-8 transition-all duration-500" />

      <p className="font-mono text-xs text-white/30 leading-relaxed max-w-md group-hover:text-white/50 transition-colors duration-400">
        {item.description}
      </p>
    </motion.div>
  );
}

/* ── Section heading with animated line ── */
function SectionHeading({ label, title }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div ref={ref}>
      <motion.span
        className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/20 block mb-5"
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {label}
      </motion.span>

      <div className="overflow-hidden">
        <motion.h2
          className="text-4xl md:text-5xl font-extralight text-white leading-tight tracking-tight"
          initial={{ y: "110%" }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          Timeline
        </motion.h2>
      </div>

      <motion.div
        className="mt-6 h-px bg-white/15"
        initial={{ width: 0 }}
        animate={inView ? { width: "2rem" } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </motion.div>
  );
}

export default function Timeline() {
  return (
    <section
      id="education"
      className="px-4 md:px-16 py-24 border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto bg-white/[0.03] backdrop-blur-[6px] border border-white/10 rounded-3xl p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-20">
          <SectionHeading label="Experience & Growth" title="Timeline" />

          <div className="relative border-l border-white/[0.08] ml-4 md:ml-0 pl-12 flex flex-col gap-14">
            {timelineItems.map((item, i) => (
              <TimelineItem key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
