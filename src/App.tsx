import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import {
  ArrowUp, CalendarDays, Check, ChevronLeft, ChevronRight, ClipboardCheck, Clock3, Crosshair, Disc3, FileText,
  Gauge, Handshake, Mail, MapPin, Menu, MessageCircle, Phone, Star, Users, Wrench, X, Zap
} from 'lucide-react'
import logoMark from './assets/logo-mark.png'
import heroImg from './assets/hero.jpg'
import mapImg from './assets/map.jpg'
import svcNeumaticos from './assets/svc-neumaticos.jpg'
import svcAlineacion from './assets/svc-alineacion.jpg'
import svcEquilibrado from './assets/svc-equilibrado.jpg'
import svcMecanica from './assets/svc-mecanica.jpg'
import svcFrenos from './assets/svc-frenos.jpg'
import svcRevision from './assets/svc-revision.jpg'
import bMichelin from './assets/brand-michelin.png'
import bContinental from './assets/brand-continental.png'
import bBridgestone from './assets/brand-bridgestone.png'
import bPirelli from './assets/brand-pirelli.png'
import bGoodyear from './assets/brand-goodyear.png'
import bDunlop from './assets/brand-dunlop.png'

const PHONE_MAIN = '695 04 71 24'
const PHONES = ['695 04 71 24', '615 18 85 42', '91 283 72 30']
const EMAIL = 'neumaticosyserviciosjl@gmail.com'
const WA = 'https://wa.me/34695047124?text=' + encodeURIComponent('Hola, quisiera pedir presupuesto en Neumáticos y Servicios JL.')
const MAPS = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Calle Ntra. Señora de Valverde 175, 28034 Madrid')
const tel = (p: string) => 'tel:+34' + p.replace(/\s/g, '')

const NAV = [
  { label: 'Inicio', id: 'inicio' },
  { label: 'Servicios', id: 'servicios' },
  { label: 'Sobre nosotros', id: 'nosotros' },
  { label: 'Reseñas', id: 'resenas' },
  { label: 'Contacto', id: 'contacto' }
]

const SERVICES = [
  { title: 'Neumáticos', copy: 'Venta y montaje de neumáticos de primeras marcas para todo tipo de vehículos.', Icon: Disc3, img: svcNeumaticos },
  { title: 'Alineación de dirección', copy: 'Mejora la seguridad, el confort y alarga la vida de tus neumáticos.', Icon: Crosshair, img: svcAlineacion },
  { title: 'Equilibrado', copy: 'Equilibrado electrónico para una conducción más segura y sin vibraciones.', Icon: Gauge, img: svcEquilibrado },
  { title: 'Mecánica rápida', copy: 'Revisiones, cambios de filtros, baterías y mucho más.', Icon: Wrench, img: svcMecanica },
  { title: 'Frenos / Aceite', copy: 'Sustitución de pastillas y discos, cambio de aceite y mantenimiento esencial.', Icon: Disc3, img: svcFrenos },
  { title: 'Revisión', copy: 'Revisión completa para mayor seguridad en tu día a día.', Icon: ClipboardCheck, img: svcRevision }
]

const BRANDS = [
  { n: 'Michelin', src: bMichelin }, { n: 'Continental', src: bContinental }, { n: 'Bridgestone', src: bBridgestone },
  { n: 'Pirelli', src: bPirelli }, { n: 'Goodyear', src: bGoodyear }, { n: 'Dunlop', src: bDunlop }
]

const REVIEWS = [
  { text: 'Grandes profesionales, rápidos y honestos. Siempre que necesito neumáticos o una revisión vengo aquí. Totalmente recomendables.', who: 'Cliente verificado', sample: false },
  { text: 'Me cambiaron los cuatro neumáticos y alinearon la dirección en una mañana. Trato cercano y precio claro desde el principio.', who: 'Reseña de ejemplo · demo', sample: true },
  { text: 'Explicaron qué hacía falta y qué podía esperar. Sin sorpresas en la factura. Volveré para la próxima revisión.', who: 'Reseña de ejemplo · demo', sample: true },
  { text: 'Servicio ágil en Fuencarral. Me asesoraron entre varias marcas según mi presupuesto y el coche quedó perfecto.', who: 'Reseña de ejemplo · demo', sample: true }
]

const WHY = [
  { Icon: Zap, t: 'Atención rápida', d: 'Tu tiempo es importante. Servicio ágil y eficaz.' },
  { Icon: Star, t: 'Primeras marcas', d: 'Neumáticos de calidad al mejor precio, para todos los presupuestos.' },
  { Icon: Handshake, t: 'Honestidad y confianza', d: 'Te asesoramos siempre con transparencia, sin sorpresas.' },
  { Icon: FileText, t: 'Presupuesto sin compromiso', d: 'Consúltanos y te damos la mejor opción para tu vehículo.' }
]

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion() || !('IntersectionObserver' in window)) { setShown(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${shown ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

function CountUp({ to, decimals = 0, duration = 1400 }: { to: number; decimals?: number; duration?: number }) {
  const [v, setV] = useState(reducedMotion() ? to : 0)
  useEffect(() => {
    if (reducedMotion()) return
    let raf = 0
    const t0 = performance.now() + 350
    const tick = (t: number) => {
      const p = Math.min(Math.max((t - t0) / duration, 0), 1)
      setV(to * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, duration])
  return <>{v.toFixed(decimals).replace('.', ',')}</>
}

function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <a className={`logo ${footer ? 'logo-footer' : ''}`} href="#inicio" aria-label="Neumáticos y Servicios JL, inicio">
      <img src={logoMark} alt="" width="102" height="50" />
      <span>NEUMÁTICOS<br />Y SERVICIOS JL</span>
    </a>
  )
}

function isOpenNow() {
  try {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date())
    const get = (t: string) => parts.find(p => p.type === t)?.value ?? ''
    const day = get('weekday'); const mins = parseInt(get('hour')) % 24 * 60 + parseInt(get('minute'))
    if (['Sat', 'Sun'].includes(day)) return false
    return (mins >= 540 && mins < 840) || (mins >= 960 && mins < 1080)
  } catch { return false }
}

function QuoteModal({ open, service, onClose }: { open: boolean; service: string; onClose: () => void }) {
  const [sent, setSent] = useState(false)
  const [svc, setSvc] = useState(service)
  const first = useRef<HTMLInputElement>(null)
  useEffect(() => { if (open) { setSent(false); setSvc(service); setTimeout(() => first.current?.focus(), 60) } }, [open, service])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open, onClose])
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true) }
  return (
    <div className={`modal ${open ? 'open' : ''}`} aria-hidden={!open} onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="quote-title">
        <button className="modal-close" onClick={onClose} aria-label="Cerrar"><X /></button>
        {sent ? (
          <div className="sent">
            <span className="sent-check"><Check /></span>
            <h3>¡Solicitud recibida!</h3>
            <p>Gracias. Te contactaremos lo antes posible con tu presupuesto. Si es urgente, llámanos al <a href={tel(PHONE_MAIN)}>{PHONE_MAIN}</a>.</p>
            <p className="demo-note">Demostración: este formulario no envía datos a ningún servidor.</p>
            <button className="btn red" onClick={onClose}>Cerrar</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <p className="eyebrow">PRESUPUESTO SIN COMPROMISO</p>
            <h3 id="quote-title">Pide tu presupuesto</h3>
            <label>Nombre<input ref={first} name="nombre" required autoComplete="name" placeholder="Tu nombre" /></label>
            <label>Teléfono o email<input name="contacto" required autoComplete="tel" placeholder="Cómo te contactamos" /></label>
            <label>Servicio
              <select value={svc} onChange={e => setSvc(e.target.value)}>
                <option value="">Selecciona un servicio</option>
                {SERVICES.map(s => <option key={s.title}>{s.title}</option>)}
              </select>
            </label>
            <label>Mensaje<textarea name="mensaje" rows={3} placeholder="Medida de neumático, modelo de coche, lo que necesites…" /></label>
            <button className="btn red full" type="submit">Enviar solicitud <ChevronRight /></button>
            <p className="demo-note">Demostración: el formulario no envía datos.</p>
          </form>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState('inicio')
  const [modal, setModal] = useState(false)
  const [modalSvc, setModalSvc] = useState('')
  const [slide, setSlide] = useState(0)
  const [paused, setPaused] = useState(false)
  const [open, setOpen] = useState(isOpenNow())
  const heroBg = useRef<HTMLDivElement>(null)
  const lock = useRef(0)

  const go = useCallback((id: string) => {
    setMenu(false)
    setActive(id)
    lock.current = Date.now() + 1000
    const el = document.getElementById(id)
    if (!el) return
    const y = id === 'inicio' ? 0 : el.getBoundingClientRect().top + window.scrollY - 64
    window.scrollTo({ top: y, behavior: reducedMotion() ? 'auto' : 'smooth' })
  }, [])

  const openQuote = useCallback((svc = '') => { setMenu(false); setModalSvc(svc); setModal(true) }, [])
  const closeQuote = useCallback(() => setModal(false), [])

  useEffect(() => {
    let ticking = false
    const update = () => {
      ticking = false
      const y = window.scrollY
      setScrolled(y > 12)
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? y / h : 0)
      if (heroBg.current && !reducedMotion() && y < 900) heroBg.current.style.transform = `translate3d(0, ${y * 0.18}px, 0)`
      if (Date.now() > lock.current) {
        const probe = y + window.innerHeight * 0.35
        let cur = 'inicio'
        for (const n of NAV) {
          const el = document.getElementById(n.id)
          if (el && el.getBoundingClientRect().top + y <= probe) cur = n.id
        }
        const lower = document.getElementById('resenas')
        if (cur === 'nosotros' && lower && window.matchMedia('(min-width:1100px)').matches) cur = 'resenas'
        if (window.innerHeight + y >= document.documentElement.scrollHeight - 4) cur = 'contacto'
        setActive(cur)
      }
    }
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update) } }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [])

  useEffect(() => {
    if (paused || reducedMotion()) return
    const t = setInterval(() => setSlide(s => (s + 1) % REVIEWS.length), 6500)
    return () => clearInterval(t)
  }, [paused])

  useEffect(() => { const t = setInterval(() => setOpen(isOpenNow()), 60000); return () => clearInterval(t) }, [])
  useEffect(() => { document.body.classList.toggle('menu-open', menu) }, [menu])
  useEffect(() => {
    const close = () => { if (window.innerWidth >= 768) setMenu(false) }
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  const prev = () => setSlide(s => (s - 1 + REVIEWS.length) % REVIEWS.length)
  const next = () => setSlide(s => (s + 1) % REVIEWS.length)

  return (
    <>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-in">
          <Logo />
          <nav className="nav" aria-label="Principal">
            {NAV.map(n => (
              <button key={n.id} className={active === n.id ? 'on' : ''} onClick={() => go(n.id)} aria-current={active === n.id ? 'true' : undefined}>{n.label}</button>
            ))}
          </nav>
          <div className="head-actions">
            <a className="phone-pill" href={tel('912837230')}><Phone />91 283 72 30</a>
            <button className="btn red sm" onClick={() => openQuote()}>Pedir presupuesto <ChevronRight /></button>
          </div>
          <button className="hamburger" onClick={() => setMenu(m => !m)} aria-label={menu ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menu}>{menu ? <X /> : <Menu />}</button>
        </div>
        <div className={`mobile-menu ${menu ? 'open' : ''}`}>
          {NAV.map((n, i) => (
            <button key={n.id} className={active === n.id ? 'on' : ''} style={{ transitionDelay: menu ? `${60 + i * 40}ms` : '0ms' }} onClick={() => go(n.id)} tabIndex={menu ? 0 : -1}>{n.label}<ChevronRight /></button>
          ))}
          <a className="btn outline full" href={tel(PHONE_MAIN)} tabIndex={menu ? 0 : -1}><Phone />Llamar ahora</a>
        </div>
      </header>
      <div className={`scrim ${menu ? 'show' : ''}`} onClick={() => setMenu(false)} />

      <main>
        <section id="inicio" className="hero">
          <div className="hero-bg" ref={heroBg}><img src={heroImg} alt="Mecánico alineando un vehículo en el taller de Neumáticos y Servicios JL" fetchPriority="high" /></div>
          <div className="hero-shade" />
          <div className="hero-in">
            <p className="eyebrow rise" style={{ ['--d' as string]: '80ms' }}>TU TALLER DE CONFIANZA EN MADRID</p>
            <h1 className="rise" style={{ ['--d' as string]: '160ms' }}>Especialistas en neumáticos y alineación <em>en Madrid</em></h1>
            <p className="lead rise" style={{ ['--d' as string]: '260ms' }}>Neumáticos, montaje, equilibrado, alineación de dirección y mecánica rápida. Servicio profesional, rápido y de confianza en Fuencarral y toda la zona norte de Madrid.</p>
            <div className="ctas rise" style={{ ['--d' as string]: '360ms' }}>
              <button className="btn red" onClick={() => openQuote()}><CalendarDays />Pedir presupuesto <ChevronRight className="arr" /></button>
              <a className="btn outline" href={tel(PHONE_MAIN)}><Phone />Llamar ahora</a>
              <a className="btn wa" href={WA} target="_blank" rel="noreferrer"><MessageCircle />WhatsApp</a>
            </div>
            <div className="trust rise" style={{ ['--d' as string]: '480ms' }}>
              <div><Users className="ti" /><span><strong><CountUp to={4.8} decimals={1} />/5</strong><small><CountUp to={233} /> reseñas</small></span></div>
              <div><Clock3 className="ti" /><span>Atención rápida<br />y profesional</span></div>
              <div><Star className="ti" /><span>Primeras marcas<br />y todos los presupuestos</span></div>
              <div className="loc"><MapPin className="ti" /><span>Fuencarral y<br />zona norte de Madrid</span></div>
            </div>
          </div>
          <p className="script" aria-hidden="true">Ruedas<br />que te llevan<br />más lejos</p>
        </section>

        <section id="servicios" className="services">
          <div className="wrap">
            <Reveal className="sec-head">
              <div><p className="eyebrow">SERVICIOS</p><h2>Todo lo que tu vehículo necesita</h2></div>
              <p className="sec-copy">En Neumáticos y Servicios JL ofrecemos un servicio integral para el cuidado de tu vehículo, con la experiencia y la calidad de un taller especializado.</p>
              <button className="link-red" onClick={() => openQuote()}>Ver todos los servicios <ChevronRight /></button>
            </Reveal>
            <div className="svc-grid">
              {SERVICES.map((s, i) => (
                <Reveal key={s.title} delay={i * 70}>
                  <button className="svc" onClick={() => openQuote(s.title)} aria-label={`Pedir presupuesto de ${s.title}`}>
                    <span className="svc-img"><img src={s.img} alt="" loading="lazy" /></span>
                    <span className="svc-body"><span className="svc-icon"><s.Icon /></span><h3>{s.title}</h3><p>{s.copy}</p></span>
                    <ChevronRight className="svc-next" />
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="brands" aria-label="Marcas">
          <div className="brands-in">
            <div className="brands-copy"><p className="eyebrow">PRIMERAS MARCAS, TODAS LAS OPCIONES</p><h2>Neumáticos de las mejores marcas y para todos los presupuestos</h2></div>
            <div className="brands-row">
              <div className="brands-track">
                {[...BRANDS, ...BRANDS].map((b, i) => <img key={i} src={b.src} alt={i < BRANDS.length ? b.n : ''} aria-hidden={i >= BRANDS.length} />)}
              </div>
              <span className="more">Y muchas<br />más…</span>
            </div>
          </div>
        </section>

        <div className="lower">
          <section id="resenas" className="reviews" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div className="reviews-in">
              <div className="score">
                <p className="eyebrow">LO QUE OPINAN NUESTROS CLIENTES</p>
                <p className="big">4,8<span>/5</span><span className="stars" aria-label="4,8 de 5 estrellas">{[0, 1, 2, 3, 4].map(i => <Star key={i} className={i === 4 ? 'half' : ''} />)}</span></p>
                <p className="based">Basado en 233 reseñas de Google</p>
              </div>
              <div className="carousel" aria-roledescription="carrusel" aria-live="off">
                <button className="car-btn" onClick={prev} aria-label="Reseña anterior"><ChevronLeft /></button>
                <div className="quote-box">
                  {REVIEWS.map((r, i) => (
                    <figure key={i} className={`quote ${i === slide ? 'on' : ''}`} aria-hidden={i !== slide}>
                      <span className="qmark" aria-hidden="true">“</span>
                      <blockquote>{r.text}</blockquote>
                      <figcaption>{r.who}</figcaption>
                    </figure>
                  ))}
                  <div className="dots">{REVIEWS.map((_, i) => <button key={i} className={i === slide ? 'on' : ''} onClick={() => setSlide(i)} aria-label={`Ir a la reseña ${i + 1}`} />)}</div>
                </div>
                <button className="car-btn" onClick={next} aria-label="Reseña siguiente"><ChevronRight /></button>
              </div>
            </div>
          </section>
          <section id="nosotros" className="why">
            <div className="why-in">
              <Reveal><h2>¿Por qué elegir Neumáticos y Servicios JL?</h2></Reveal>
              <div className="why-grid">
                {WHY.map((w, i) => (
                  <Reveal key={w.t} delay={i * 80}>
                    <div className="why-item"><span className="why-icon"><w.Icon /></span><div><h3>{w.t}</h3><p>{w.d}</p></div></div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer id="contacto" className="site-footer">
        <div className="foot-in">
          <div className="f-brand"><Logo footer /><p>Tu taller de confianza en Fuencarral, Madrid.</p></div>
          <div className="f-col f-addr">
            <MapPin className="fi" />
            <div><p>Calle Ntra. Señora de Valverde 175<br />28034 Madrid (Fuencarral)</p><a className="btn outline xs" href={MAPS} target="_blank" rel="noreferrer">Cómo llegar <ChevronRight /></a></div>
          </div>
          <div className="f-col f-contact">
            <Phone className="fi" />
            <div>
              <p>{PHONES.map(p => <a key={p} href={tel(p)}>{p}</a>)}</p>
              <a className="mail" href={`mailto:${EMAIL}`}><Mail className="fi inline" />{EMAIL}</a>
            </div>
          </div>
          <div className="f-col f-hours">
            <Clock3 className="fi" />
            <div>
              <p className="hrs-t">Horario</p>
              <p>Lunes a Viernes<br />09:00 - 14:00<br />16:00 - 18:00</p>
              <p className={`status ${open ? 'is-open' : ''}`}><i />{open ? 'Abierto ahora' : 'Cerrado ahora'}</p>
            </div>
          </div>
          <a className="f-map" href={MAPS} target="_blank" rel="noreferrer" aria-label="Ver ubicación en Google Maps"><img src={mapImg} alt="Mapa de Fuencarral con la ubicación del taller" loading="lazy" /></a>
        </div>
        <p className="copy">© 2026 Neumáticos y Servicios JL · Demo creada por UnderStack</p>
      </footer>

      <a className="fab-wa" href={WA} target="_blank" rel="noreferrer" aria-label="Escribir por WhatsApp" data-show={scrolled}><MessageCircle /></a>
      <button className="fab-top" onClick={() => go('inicio')} aria-label="Volver arriba" data-show={progress > 0.12}><ArrowUp /></button>
      <QuoteModal open={modal} service={modalSvc} onClose={closeQuote} />
    </>
  )
}
