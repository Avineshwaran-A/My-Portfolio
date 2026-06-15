import { useEffect, useRef } from "react";

const STAR_COUNT = 900;

function createStar(canvasWidth, canvasHeight) {
  return {
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    radius: Math.random() * 1.2 + 0.2,          // 0.2 – 1.4 px
    baseSpeed: Math.random() * 0.25 + 0.08,      // drift pace
    angleOffset: Math.random() * Math.PI * 2,    // unique sine phase
    opacity: Math.random() * 0.6 + 0.2,          // 0.2 – 0.8
  };
}

export default function StarfieldBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    /* ── size helpers ── */
    const setSize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    /* ── initialise stars ── */
    let stars = Array.from({ length: STAR_COUNT }, () =>
      createStar(canvas.width, canvas.height)
    );

    /* ── animation state ── */
    let rafId;
    let startTime = performance.now();

    const draw = (now) => {
      const elapsed = (now - startTime) * 0.001; // seconds

      /* clear with a slight trail for a soft comet effect */
      ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        /* ── drifting curve: bottom-left → top-right with sine wobble ── */
        const wave = Math.sin(elapsed * 0.4 + star.angleOffset) * 0.4;
        star.x += star.baseSpeed + wave * 0.15;
        star.y -= star.baseSpeed * 0.55 + wave * 0.1;

        /* ── infinite wrapping ── */
        if (star.x > canvas.width)  star.x = 0;
        if (star.y < 0)             star.y = canvas.height;

        /* ── draw ── */
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

        /* Slight twinkle: modulate opacity with a per-star sine */
        const twinkle = 0.75 + 0.25 * Math.sin(elapsed * 1.2 + star.angleOffset * 3);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.fill();
      });

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    /* ── resize ── */
    const onResize = () => {
      setSize();
      /* redistribute stars to the new canvas size */
      stars = Array.from({ length: STAR_COUNT }, () =>
        createStar(canvas.width, canvas.height)
      );
      startTime = performance.now();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 bg-black pointer-events-none"
      aria-hidden="true"
    />
  );
}
