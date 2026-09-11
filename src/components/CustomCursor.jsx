import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.4 })
  const mounted = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setEnabled(mq.matches)
    if (!mq.matches) return

    document.body.classList.add('has-custom-cursor')

    function handleMove(e) {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    function handleOver(e) {
      if (e.target.closest('[data-cursor="link"]')) setHovering(true)
    }
    function handleOut(e) {
      if (e.target.closest('[data-cursor="link"]')) setHovering(false)
    }

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseover', handleOver)
    document.addEventListener('mouseout', handleOut)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
    }
  }, [])

  if (!enabled) return null

  return (
    <motion.div
      className={`custom-cursor ${hovering ? 'custom-cursor-hover' : ''}`}
      style={{ x: springX, y: springY }}
    />
  )
}
