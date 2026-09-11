import { motion } from 'framer-motion'

// Subtle, professional ambient background: a soft dot-grid plus two
// slow-drifting blurred blobs in the site's existing accent colors.
// Fixed + pointer-events:none so it never interferes with content.
export default function BackgroundFX() {
  return (
    <div className="bg-fx" aria-hidden="true">
      <div className="bg-fx-grid" />
      <motion.div
        className="bg-fx-blob bg-fx-blob-teal"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="bg-fx-blob bg-fx-blob-amber"
        animate={{ x: [0, -30, 0], y: [0, -24, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  )
}
