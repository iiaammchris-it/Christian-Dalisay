import { motion, AnimatePresence } from 'framer-motion'

export default function FlyingItems({ items, onLand }) {
  return (
    <div className="flying-layer" aria-hidden="true">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="flying-dot"
            style={{ background: item.color.hex }}
            initial={{ x: item.startX, y: item.startY, scale: 1, opacity: 1 }}
            animate={{ x: item.endX, y: item.endY, scale: 0.25, opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => onLand(item.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
