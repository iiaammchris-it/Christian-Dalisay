import { motion, AnimatePresence } from 'framer-motion'

export default function CartDrawer({ open, items, onClose, onRemove }) {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="drawer-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
          >
            <div className="drawer-head">
              <h3>Your bag</h3>
              <button className="drawer-close" onClick={onClose} aria-label="Close cart">×</button>
            </div>

            {items.length === 0 ? (
              <p className="drawer-empty">
                Nothing here yet — try the demo product in the hero section.
              </p>
            ) : (
              <ul className="drawer-list">
                {items.map((item) => (
                  <motion.li
                    key={item.id}
                    className="drawer-item"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <span className="drawer-item-swatch" style={{ background: item.color.hex }} />
                    <div className="drawer-item-info">
                      <p className="drawer-item-name">{item.name}</p>
                      <p className="drawer-item-meta">{item.color.name} · Size {item.size}</p>
                    </div>
                    <span className="drawer-item-price">${item.price}</span>
                    <button className="drawer-item-remove" onClick={() => onRemove(item.id)} aria-label="Remove item">
                      ×
                    </button>
                  </motion.li>
                ))}
              </ul>
            )}

            <div className="drawer-footer">
              <div className="drawer-subtotal">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <p className="drawer-note">
                This cart demonstrates the interaction — it's not a real checkout.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
