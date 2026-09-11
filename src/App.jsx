import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProfileCard from './components/ProfileCard.jsx'
import BackgroundFX from './components/BackgroundFX.jsx'
import Loader from './components/Loader.jsx'
import CustomCursor from './components/CustomCursor.jsx'

// ─────────────────────────────────────────────────────────────
// EDIT ME: descriptions below are written from each site's public
// homepage (platform, category, positioning) — accurate to what's
// live today, but not a claim about which parts you personally
// built. Adjust the "stack" tags and wording to match your real
// role on each project before sending this to your client.
// ─────────────────────────────────────────────────────────────

function faviconFor(url) {
  try {
    const domain = new URL(url).hostname
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
  } catch {
    return null
  }
}

const projects = [
  {
    tag: 'Ecommerce',
    title: 'Mamas & Papas',
    description:
      'Storefront for the baby-gear retailer — pushchairs, nursery furniture, clothing and feeding essentials on Shopify.',
    stack: ['Shopify', 'Liquid', 'JavaScript'],
    url: 'https://mamasandpapas.ph/',
  },
  {
    tag: 'Ecommerce',
    title: 'Love To Dream',
    description:
      'WordPress storefront for the swaddle and sleepwear brand, organized around its staged baby-sleep system.',
    stack: ['WordPress', 'WooCommerce', 'JavaScript'],
    url: 'https://lovetodream.ph/',
  },
  {
    tag: 'Ecommerce',
    title: 'Wonderhome Naturals',
    description:
      'WooCommerce storefront for a plant-based home & pet-care line, built around its sustainability story.',
    stack: ['WordPress', 'WooCommerce', 'JavaScript'],
    url: 'https://wonderhomenaturals.com/',
  },
  {
    tag: 'Ecommerce',
    title: 'Kids and Baby Group',
    description:
      'Shared Shopify outlet storefront for Mamas & Papas, Love to Dream, and Kiddimoto — one clearance shop for the group.',
    stack: ['Shopify', 'Liquid', 'JavaScript'],
    url: 'https://kidsandbabygroup.myshopify.com/',
  },
  {
    tag: 'Web App',
    title: 'Navi',
    description:
      'Firebase-hosted web app — add the specifics on scope and stack once confirmed.',
    stack: ['Firebase', 'JavaScript'],
    url: 'https://navi-app-ph.web.app/',
  },
  {
    tag: 'Community Platform',
    title: 'KoneKita',
    description:
      'A community platform connecting Santolan residents with local jobs, businesses, and bookable services.',
    stack: ['React', 'JavaScript'],
    url: 'https://konekita.online/',
  },
  {
    tag: 'Public Service',
    title: 'MindAlalay',
    description:
      "A staff and helpline portal for Barangay Buting's mental health support program in Pasig City.",
    stack: ['React', 'JavaScript'],
    url: 'https://www.mindalalay.com/',
  },
  {
    tag: 'Youth Portal',
    title: 'KKB App',
    description:
      'Official youth portal for Barangay Buting — KK profiling, verification, digital ID, points, and rewards.',
    stack: ['Next.js', 'JavaScript'],
    url: 'https://kkbapp-buting.com/',
  },
]

// Tech stack — expanded to match the actual range of platforms across
// the projects above (ecommerce, CMS, backend, tooling), each backed
// by a real brand icon via the Simple Icons CDN, tinted to the site's
// accent color so it stays consistent with the rest of the design.
const skills = [
  { name: 'React', slug: 'react', detail: 'Component architecture, state management, and performance-minded rendering.' },
  { name: 'JavaScript', slug: 'javascript', detail: 'Modern ES6+, async data flows, and integration with third-party APIs.' },
  { name: 'Next.js', slug: 'nextdotjs', detail: 'Server-rendered and statically generated React apps, routing, and API routes.' },
  { name: 'Shopify', slug: 'shopify', detail: 'Liquid theming, custom sections, and storefront customization for ecommerce brands.' },
  { name: 'WordPress', slug: 'wordpress', detail: 'Custom themes and page-builder driven sites for content-first businesses.' },
  { name: 'WooCommerce', slug: 'woocommerce', detail: 'Product catalogs, checkout flows, and store customization on WordPress.' },
  { name: 'Firebase', slug: 'firebase', detail: 'Auth, Firestore, and hosting for lightweight full-stack web apps.' },
  { name: 'Figma', slug: 'figma', detail: 'Translating design files into pixel-accurate, responsive interfaces.' },
  { name: 'Git', slug: 'git', detail: 'Version control, branching workflows, and collaborative code review.' },
]

const heroVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 1.35 } },
}

const heroItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="nav-mark" href="#top" data-cursor="link">CD</a>
        <div className="nav-right">
          <ul className="nav-links">
            <li><a href="#work" data-cursor="link">Work</a></li>
            <li><a href="#skills" data-cursor="link">Skills</a></li>
            <li><a href="#contact" data-cursor="link">Contact</a></li>
          </ul>
          <button
            className={`nav-burger ${menuOpen ? 'nav-burger-open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
            <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

function Hero() {
  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <header className="hero wrap" id="top" onMouseMove={handleMouseMove}>
      <div className="hero-spotlight" />
      <motion.div
        className="hero-grid"
        variants={heroVariants}
        initial="hidden"
        animate="show"
      >
        <div className="hero-copy">
          <motion.p className="hero-kicker" variants={heroItem}>Full Stack Developer</motion.p>
          <motion.h1 variants={heroItem}>Christian Dalisay builds fast, clean web products.</motion.h1>
          <motion.p className="hero-sub" variants={heroItem}>
            I design and build ecommerce storefronts, content platforms, and
            product interfaces with React, Next.js, Shopify, and WordPress —
            from first wireframe to shipped release.
          </motion.p>
          <motion.div className="hero-actions" variants={heroItem}>
            <a className="btn btn-primary" href="#work" data-cursor="link">See the work</a>
            <a className="btn btn-ghost" href="mailto:iiaammchris@gmail.com" data-cursor="link">Get in touch</a>
          </motion.div>
        </div>
        <motion.div variants={heroItem}>
          <ProfileCard />
        </motion.div>
      </motion.div>

      <motion.div
        className="scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.6 }}
      >
        <span>Scroll</span>
        <div className="scroll-cue-line">
          <motion.div
            className="scroll-cue-fill"
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </header>
  )
}

function Skills() {
  return (
    <section id="skills" className="wrap">
      <div className="section-head">
        <h2>What I work with</h2>
        <span className="section-index">02</span>
      </div>
      <div className="skills-list">
        {skills.map((s) => (
          <motion.div
            className="skill-item"
            key={s.name}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <div className="skill-icon-wrap">
              <img
                className="skill-icon"
                src={`https://cdn.simpleicons.org/${s.slug}/4fd1c5`}
                alt=""
                loading="lazy"
                aria-hidden="true"
              />
            </div>
            <h3>{s.name}</h3>
            <p>{s.detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Work() {
  return (
    <section id="work" className="wrap">
      <div className="section-head">
        <h2>Selected work</h2>
        <span className="section-index">01</span>
      </div>
      <ul className="project-rows">
        {projects.map((p, i) => (
          <li key={p.title}>
            <a
              className="project-row"
              href={p.url}
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
            >
              <span className="project-row-index">{String(i + 1).padStart(2, '0')}</span>
              <span className="project-row-favicon">
                <img src={faviconFor(p.url)} alt="" loading="lazy" aria-hidden="true" />
              </span>
              <div className="project-row-main">
                <h3>{p.title}</h3>
                <p className="project-row-tag">{p.tag}</p>
              </div>
              <p className="project-row-desc">{p.description}</p>
              <div className="project-row-stack">
                {p.stack.map((t) => <span key={t}>{t}</span>)}
              </div>
              <span className="project-row-arrow">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="wrap contact">
      <h2>Have a project in mind? Let's build it.</h2>
      <a className="contact-email" href="mailto:iiaammchris@gmail.com" data-cursor="link">
        iiaammchris@gmail.com ↗
      </a>
      <div className="contact-meta">
        <span>Based in the Philippines</span>
        <span>Available for freelance & contract work</span>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="wrap">
      <span>© {new Date().getFullYear()} Christian Dalisay</span>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Loader />
      <CustomCursor />
      <BackgroundFX />
      <Nav />
      <Hero />
      <Work />
      <Skills />
      <Contact />
      <Footer />
    </>
  )
}
