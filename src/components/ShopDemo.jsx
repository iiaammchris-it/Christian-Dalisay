import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const SWATCHES = [
  { name: 'Storm Grey', hex: '#8b95a1' },
  { name: 'Signal Teal', hex: '#4fd1c5' },
  { name: 'Amber', hex: '#f2b84b' },
]

const SIZES = ['S', 'M', 'L']

export default function ShopDemo({ onAddToBag }) {
  const [color, setColor] = useState(SWATCHES[1])
  const [size, setSize] = useState('M')
  const [justAdded, setJustAdded] = useState(false)
  const btnRef = useRef(null)

  function handleAdd() {
    const rect = btnRef.current.getBoundingClientRect()
    onAddToBag(rect, {
      id: Date.now(),
      name: 'Field Jacket',
      color,
      size,
      price: 128,
    })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 900)
  }

  return (
    <div className="shop-demo">
      <p className="shop-demo-label">Try it — this cart is real, not a screenshot</p>

      <div className="shop-demo-card">
        <div className="shop-demo-visual" style={{ '--product-color': color.hex }}>
          <svg viewBox="0 0 120 140" width="88" height="100" aria-hidden="true">
            <path
              d="M60 8 L92 22 L92 40 L104 46 L104 70 L92 66 L92 128 L28 128 L28 66 L16 70 L16 46 L28 40 L28 22 Z"
              fill="var(--product-color)"
              style={{ transition: 'fill 0.25s ease' }}
            />
            <path
              d="M60 8 L92 22 L84 34 L60 24 Z M60 8 L28 22 L36 34 L60 24 Z"
              fill="rgba(0,0,0,0.18)"
            />
          </svg>
        </div>

        <div className="shop-demo-info">
          <h3>Field Jacket</h3>
          <p className="shop-demo-price">$128</p>

          <div className="shop-demo-row">
            <span className="shop-demo-row-label">Color — {color.name}</span>
            <div className="shop-demo-swatches">
              {SWATCHES.map((s) => (
                <button
                  key={s.name}
                  className={`swatch ${color.name === s.name ? 'swatch-active' : ''}`}
                  style={{ '--swatch-color': s.hex }}
                  aria-label={s.name}
                  onClick={() => setColor(s)}
                />
              ))}
            </div>
          </div>

          <div className="shop-demo-row">
            <span className="shop-demo-row-label">Size</span>
            <div className="shop-demo-sizes">
              {SIZES.map((s) => (
                <button
                  key={s}
                  className={`size-pill ${size === s ? 'size-pill-active' : ''}`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <motion.button
            ref={btnRef}
            className="btn btn-primary shop-demo-add"
            onClick={handleAdd}
            whileTap={{ scale: 0.96 }}
          >
            {justAdded ? 'Added ✓' : 'Add to bag'}
          </motion.button>
        </div>
      </div>
    </div>
  )
}
