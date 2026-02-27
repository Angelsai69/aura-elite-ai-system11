import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function Platform() {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Parallax: image rises slightly as you scroll through
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])
  // Slight de-rotate as it comes into view — starts at 2.5° and settles to 1°
  const rotate = useTransform(scrollYProgress, [0.1, 0.5], [2.5, 1])
  // Scale up gently on scroll-in
  const scale = useTransform(scrollYProgress, [0.1, 0.45], [0.96, 1])

  return (
    <section className="platform-section" ref={ref}>
      {/* Background grid + subtle orb */}
      <div className="bg-layer">
        <div className="grid-overlay" />
        <div className="noise-overlay" />
        <div className="platform-orb-left" />
        <div className="platform-orb-right" />
      </div>

      {/* Text header */}
      <motion.div
        className="platform-header"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="section-label">The Platform</div>
        <h2 className="platform-title">
          Every signal. Every action.<br />
          <span className="platform-title-grad">One operating layer.</span>
        </h2>
        <p className="platform-sub">
          Command Center gives your team live visibility across every workflow,
          pipeline, and AI action — desktop and mobile, always in sync.
        </p>
      </motion.div>

      {/* Device image — angled, parallax, glow bloom */}
      <div className="platform-stage">
        {/* Glow bloom underneath the device */}
        <motion.div
          className="platform-glow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
        />

        {/* The device mockup image */}
        <motion.div
          className="platform-device-wrap"
          style={{ y, rotate, scale }}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <img
            src="/platform-devices.png"
            alt="AIZA Command Center — MacBook and iPhone dashboard"
            className="platform-img"
            draggable={false}
          />

          {/* Subtle reflection gradient over the bottom of the image */}
          <div className="platform-img-fade" />
        </motion.div>
      </div>

      {/* Three callout stats below the image */}
      <motion.div
        className="platform-stats"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {[
          { value: "847", label: "Events processed per session", color: "var(--accent2)" },
          { value: "4.2s", label: "Average AI response time", color: "var(--accent3)" },
          { value: "340%", label: "Average revenue ROI", color: "var(--green)" },
        ].map((stat) => (
          <div className="platform-stat" key={stat.label}>
            <div className="platform-stat-value" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="platform-stat-label">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
