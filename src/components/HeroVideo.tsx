import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export function HeroVideo() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 90]);
  const opacity = useTransform(scrollY, [0, 480, 820], [0.55, 0.32, 0]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const progress = Math.min(Math.max(latest / 800, 0), 1);
    video.currentTime = progress * duration;
  });

  if (reduceMotion) {
    return <div className="hero-video hero-video--static" aria-hidden="true" />;
  }

  return (
    <motion.div className="hero-video" aria-hidden="true" style={{ y, opacity }}>
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        poster="/videos/hero-particles-poster.jpg"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
      >
        <source src="/videos/hero-particles.mp4" type="video/mp4" />
      </video>
    </motion.div>
  );
}
