import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { useTyping } from "../hooks/useTyping"
import { useAdaptiveMotion } from "../hooks/useAdaptiveMotion"

const MORPH_WORDS = [
  "Secure.",
  "Autonomous.",
  "Inevitable.",
  "The Nervous System of the AI Era.",
]
const TYPING_LINES = [
  "Analyzing market opportunities...",
  "Qualifying 847 inbound leads...",
  "Closing pipeline: $2.4M identified",
  "Deploying workflow automation...",
  "Revenue optimization: +340% projected",
]

// Shared clip-path wipe: content reveals upward from a hard edge
const wipe = (delay = 0) => ({
  initial: { clipPath: "inset(0 0 100% 0)" },
  animate: { clipPath: "inset(0 0 0% 0)" },
  transition: { delay, duration: 0.7, ease: [0.76, 0, 0.24, 1] },
})

export default function Hero() {
  const [morphIdx, setMorphIdx] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const typed = useTyping(TYPING_LINES)
  const motion_ = useAdaptiveMotion()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 35, damping: 22 })
  const springY = useSpring(mouseY, { stiffness: 35, damping: 22 })

  useEffect(() => {
    const t = setInterval(() => setMorphIdx(i => (i + 1) % MORPH_WORDS.length), 3200)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!motion_.parallax) return
    const el = sectionRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width * 28 * motion_.intensity)
      mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height * 18 * motion_.intensity)
    }
    el.addEventListener("mousemove", onMove)
    return () => el.removeEventListener("mousemove", onMove)
  }, [mouseX, mouseY, motion_])

  return (
    <div className="hero-section" ref={sectionRef}>
      {/* Background orbs — only this child has overflow:hidden */}
      <div className="hero-bg">
        <div className="deep-sphere deep-sphere-hero" />
        <motion.div className="orb orb-1" style={motion_.parallax ? { x: springX, y: springY } : {}} />
        <motion.div className="orb orb-2" style={motion_.parallax ? { x: springX, y: springY } : {}} />
        <motion.div className="orb orb-3" style={motion_.parallax ? { x: springX, y: springY } : {}} />
        <div className="grid-overlay" />
        <div className="noise-overlay" />
      </div>

      <div className="hero-content">
        {/* Eyebrow — clip wipe */}
        <div style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
          <motion.div className="hero-eyebrow" style={{ marginBottom: 0 }} {...wipe(0.05)}>
            AI Automation Platform
          </motion.div>
        </div>

        {/* AIZA — clip wipe, extra padding so legs never touch clip boundary */}
        <div style={{ overflow: "hidden", paddingBottom: "0.15em" }}>
          <motion.h1
            className="hero-title"
            style={{ marginBottom: 0 }}
            {...wipe(0.18)}
          >
            AIZA
          </motion.h1>
        </div>

        {/* Morph word — clip wipe per word change */}
        <div style={{ overflow: "hidden", minHeight: "1.4em", marginBottom: "1.5rem" }}>
          <motion.div
            key={morphIdx}
            className="hero-morph"
            style={{ marginBottom: 0 }}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(100% 0 0% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            {MORPH_WORDS[morphIdx]}
          </motion.div>
        </div>

        {/* Typing sub — fade in (typing effect pairs better with fade) */}
        <motion.p
          className="hero-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.7 }}
        >
          <span style={{ color: "var(--accent2)" }}>&gt; </span>
          {typed}
          <span className="typing-cursor" />
        </motion.p>

        {/* CTA — clip wipe */}
        <div style={{ overflow: "hidden" }}>
          <motion.button
            className="hero-cta"
            {...wipe(0.7)}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          >
            Explore the Platform <span>→</span>
          </motion.button>
        </div>
      </div>

      <div className="hero-scroll-hint">
        <span>Scroll</span>
        <div className="scroll-arrow" />
      </div>
    </div>
  )
}
