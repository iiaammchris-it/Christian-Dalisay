import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// ─────────────────────────────────────────────────────────────
// EDIT ME: swap the placeholder graphic for your real photo.
// 1. Drop your photo into /public, e.g. /public/profile.jpg
// 2. Replace the <img src="/profile-placeholder.svg" .../> below
//    with <img src="/profile.jpg" .../>
// The tilt / glare / floating-chip interaction will keep working
// with any image — it's driven by the wrapper, not the source.
// ─────────────────────────────────────────────────────────────

const STACK_CHIPS = ["React", "Shopify", "Next.js", "Figma"];

export default function ProfileCard() {
  const cardRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 18, mass: 0.5 };
  const rotateX = useSpring(
    useTransform(my, [-0.5, 0.5], [10, -10]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mx, [-0.5, 0.5], [-10, 10]),
    springConfig,
  );
  const glareX = useSpring(
    useTransform(mx, [-0.5, 0.5], [0, 100]),
    springConfig,
  );
  const glareY = useSpring(
    useTransform(my, [-0.5, 0.5], [0, 100]),
    springConfig,
  );

  function handleMove(e) {
    const rect = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div className="profile-wrap">
      <motion.div
        ref={cardRef}
        className="profile-card"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        data-cursor="link"
      >
        <div className="profile-photo-frame">
          <img
            className="profile-photo"
            src="/profile.png"
            alt="Christian Dalisay"
            draggable="false"
          />
          <motion.div
            className="profile-glare"
            style={{
              background: useTransform(
                [glareX, glareY],
                ([gx, gy]) =>
                  `radial-gradient(340px circle at ${gx}% ${gy}%, rgba(255,255,255,0.16), transparent 60%)`,
              ),
            }}
          />
          <div className="profile-frame-grid" />
        </div>

        <motion.div
          className="profile-status-chip"
          style={{ translateZ: 40 }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="profile-status-dot" />
          Available for work
        </motion.div>

        <motion.div
          className="profile-loc-chip"
          style={{ translateZ: 30 }}
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
        >
          📍 Philippines
        </motion.div>
      </motion.div>

      <div className="profile-stack-orbit">
        {STACK_CHIPS.map((s, i) => (
          <motion.span
            key={s}
            className="profile-stack-chip"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 + i * 0.08, duration: 0.5 }}
          >
            {s}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
