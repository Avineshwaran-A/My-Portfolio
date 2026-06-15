import { useEffect, useRef } from "react";

const STAR_COUNT = 400; // reduced for performance

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
    const ctx = canvas.getContext("2d", { alpha: false });

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
    let lastFrame = 0;
    const TARGET_FPS = 30;
    const FRAME_MS = 1000 / TARGET_FPS;

    const draw = (now) => {
      rafId = requestAnimationFrame(draw);

      // throttle to ~30 fps
      const delta = now - lastFrame;
      if (delta < FRAME_MS) return;
      lastFrame = now - (delta % FRAME_MS);

      const elapsed = (now - startTime) * 0.001;

      // Shared wave — compute once per frame, not per star
      const sharedWave = Math.sin(elapsed * 0.4) * 0.4;

      /* clear with solid fill (alpha:false context = faster) */
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Batch stars by opacity bucket to minimise fillStyle changes
      ctx.beginPath();
      stars.forEach((star) => {
        const wave = sharedWave + star.angleOffset * 0.05;
        star.x += star.baseSpeed + wave * 0.15;
        star.y -= star.baseSpeed * 0.55 + wave * 0.1;

        if (star.x > canvas.width)  star.x = 0;
        if (star.y < 0)             star.y = canvas.height;

        // simple twinkle without per-star Math.sin every frame
        const twinkle = 0.75 + 0.25 * Math.sin(elapsed + star.angleOffset);
        ctx.globalAlpha = star.opacity * twinkle;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
      });
      ctx.globalAlpha = 1;
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
      style={{ willChange: "transform" }}
      aria-hidden="true"
    />
  );
}
