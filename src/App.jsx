import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Threads from './rb/Threads';
import SplitText from './rb/SplitText';
import BlurText from './rb/BlurText';
import RotatingText from './rb/RotatingText';
import ShinyText from './rb/ShinyText';
import ScrollVelocity from './rb/ScrollVelocity';
import CountUp from './rb/CountUp';
import ScrollStack, { ScrollStackItem } from './rb/ScrollStack';
import SpotlightCard from './rb/SpotlightCard';
import LogoLoop from './rb/LogoLoop';
import AnimatedContent from './rb/AnimatedContent';
import ClickSpark from './rb/ClickSpark';

import { CONTACT, NAV, SERVICES, WORKS, WORK_CATEGORIES, SEGMENTS, STEPS, STATS } from './data';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

/* ───────── Smooth scroll (Lenis) sincronizado com GSAP ───────── */
function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = time => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const onAnchor = e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -90, duration: 1.4, force: true });
    };
    document.addEventListener('click', onAnchor);
    return () => {
      document.removeEventListener('click', onAnchor);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}

/* ───────── Navegação ───────── */
function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);
  useMotionValueEvent(scrollY, 'change', y => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160);
    setSolid(y > 40);
  });
  useEffect(() => {
    if (!menu) return;
    window.__lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
    const onKey = e => e.key === 'Escape' && setMenu(false);
    const onResize = () => window.innerWidth > 760 && setMenu(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.__lenis?.start();
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [menu]);
  return (
    <>
    <motion.header
      className={`nav ${solid || menu ? 'nav--solid' : ''}`}
      animate={{ y: hidden && !menu ? '-110%' : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href="#topo" className="nav__logo" aria-label="Overture — início">
        <img src="logo.svg" alt="Overture Agência Criativa" />
      </a>
      <nav className="nav__links" aria-label="Principal">
        {NAV.map(l => (
          <a key={l.href} href={l.href} className="nav__link">
            {l.label}
          </a>
        ))}
      </nav>
      <div className="nav__right">
        <a href="#contato" className="btn btn--sm">
          Vamos conversar
        </a>
        <button
          type="button"
          className={`nav__burger ${menu ? 'is-open' : ''}`}
          aria-expanded={menu}
          aria-controls="menu-mobile"
          aria-label={menu ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenu(m => !m)}
        >
          <span />
          <span />
        </button>
      </div>
    </motion.header>
    <AnimatePresence>
      {menu && (
        <motion.nav
          id="menu-mobile"
          className="mmenu"
          aria-label="Menu"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          <ul>
            {NAV.map((l, i) => (
              <motion.li
                key={l.href}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <a href={l.href} onClick={() => setMenu(false)}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {l.label}
                </a>
              </motion.li>
            ))}
          </ul>
          <motion.div
            className="mmenu__foot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp ↗
            </a>
            <a href={CONTACT.discord} target="_blank" rel="noreferrer">
              Discord ↗
            </a>
          </motion.div>
        </motion.nav>
      )}
    </AnimatePresence>
    </>
  );
}

/* ───────── Hero ───────── */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const threadsY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const markY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const markRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section className="hero" id="topo" ref={ref}>
      <motion.div className="hero__threads" style={{ y: threadsY }} aria-hidden="true">
        <Threads color={[1, 1, 1]} amplitude={1.4} distance={0.3} speed={0.5} lineCount={80} brightness={1.2} />
      </motion.div>
      <motion.img
        src="mark.svg"
        alt=""
        aria-hidden="true"
        className="hero__mark"
        style={{ y: markY, rotate: markRotate }}
      />
      <div className="hero__vignette" aria-hidden="true" />

      <motion.div className="hero__content wrap" style={{ y: contentY, opacity: contentOpacity }}>
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span className="dot" /> <ShinyText text="Agência criativa" color="#8a8a8a" shineColor="#ffffff" speed={3} />
        </motion.p>

        <h1 className="hero__title">
          <SplitText
            tag="span"
            text="Criamos"
            className="hero__line"
            splitType="chars"
            delay={35}
            duration={1.1}
            textAlign="left"
            rootMargin="0px"
            threshold={0}
          />
          <span className="hero__rotator">
            <RotatingText
              texts={['sites', 'landing pages', 'e-commerces']}
              rotationInterval={2600}
              effect="blur"
              staggerDuration={0.025}
              mainClassName="rot"
            />
          </span>
          <SplitText
            tag="span"
            text="que sua marca não esquece."
            className="hero__line hero__line--soft"
            splitType="words"
            delay={90}
            duration={1.1}
            textAlign="left"
            rootMargin="0px"
            threshold={0}
          />
        </h1>

        <div className="hero__sub">
          <BlurText
            text="Design estratégico para fortalecer marcas e gerar resultados."
            delay={70}
            animateBy="words"
            direction="bottom"
            className="hero__subtext"
            rootMargin="0px"
            threshold={0}
          />
        </div>

        <motion.div
          className="hero__cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <a href="#contato" className="btn">
            Iniciar um projeto <span aria-hidden="true">→</span>
          </a>
          <a href="#projetos" className="btn btn--ghost">
            Ver projetos
          </a>
        </motion.div>
      </motion.div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Role</span>
        <i />
      </div>
    </section>
  );
}

/* ───────── Faixa de texto com velocidade de scroll ───────── */
function Marquee() {
  return (
    <section className="marquee" aria-label="O que fazemos">
      <ScrollVelocity
        texts={['Sites ✦ Landing pages ✦ E-commerces ✦ Branding ✦', 'Design estratégico ✦ Performance ✦ Resultado ✦']}
        velocity={55}
        className="marquee__text"
        outlineAlternate
        fontWeight={600}
        gap={28}
        numCopies={6}
      />
    </section>
  );
}

/* ───────── Manifesto com revelação palavra a palavra (parallax de opacidade) ───────── */
function Word({ children, range, progress }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [10, 0]);
  return (
    <motion.span className="word" style={{ opacity, y }}>
      {children}
    </motion.span>
  );
}

function Manifesto() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] });
  const words =
    'Uma boa abertura define tudo o que vem depois. Por isso desenhamos sites, landing pages e e-commerces com estratégia, estética e performance — para a sua marca entrar em cena com presença e sair com resultado.'.split(
      ' '
    );
  return (
    <section className="manifesto wrap" ref={ref}>
      <p className="label">( Sobre )</p>
      <p className="manifesto__text">
        {words.map((w, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} range={[start, end]} progress={scrollYProgress}>
              {w}
            </Word>
          );
        })}
      </p>
      <div className="stats">
        {STATS.map((s, i) => (
          <AnimatedContent key={s.label} distance={40} delay={i * 0.12} duration={0.9}>
            <div className="stat">
              <div className="stat__num">
                <CountUp to={s.to} duration={1.8} />
                <span className="stat__suffix">{s.suffix}</span>
              </div>
              <div className="stat__label">{s.label}</div>
            </div>
          </AnimatedContent>
        ))}
      </div>
    </section>
  );
}

/* ───────── Serviços (ScrollStack) ───────── */
function Services() {
  return (
    <section className="services" id="servicos">
      <div className="wrap services__head">
        <p className="label">( Serviços )</p>
        <h2 className="h2">
          <SplitText
            tag="span"
            text="O que fazemos pela sua marca"
            splitType="words"
            delay={80}
            textAlign="left"
            effect="blur"
            className="h2__split"
          />
        </h2>
      </div>
      <ScrollStack
        useWindowScroll
        smoothScroll={false}
        itemDistance={60}
        itemStackDistance={26}
        stackPosition="18%"
        baseScale={0.86}
        itemScale={0.03}
        dimAmount={0.35}
        holdDistance={40}
      >
        {SERVICES.map(s => (
          <ScrollStackItem key={s.n} itemClassName="svc">
            <div className="svc__top">
              <span className="svc__n">{s.n}</span>
              <span className="svc__arrow" aria-hidden="true">↗</span>
            </div>
            <div className="svc__body">
              <h3 className="svc__title">{s.title}</h3>
              <p className="svc__text">{s.text}</p>
              <ul className="svc__tags">
                {s.tags.map(t => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
}

/* ───────── Projetos (fileiras em movimento + grade filtrável + visualização ampliada) ───────── */
const img = (w, size = '') => `work/${w.slug}${size}.webp`;

function Lightbox({ index, onClose, onNav }) {
  const w = WORKS[index];
  const closeRef = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    closeRef.current?.focus({ preventScroll: true });
    return () => previous?.focus?.({ preventScroll: true });
  }, []);
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav(1);
      if (e.key === 'ArrowLeft') onNav(-1);
    };
    window.addEventListener('keydown', onKey);
    window.__lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      window.__lenis?.start();
      document.documentElement.style.overflow = '';
    };
  }, [onClose, onNav]);

  return (
    <motion.div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label={w.name}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.figure
        key={w.slug}
        className="lb__fig"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
      >
        <img src={img(w)} alt={`Página ${w.name}`} />
        <figcaption className="lb__cap">
          <div>
            <strong>{w.name}</strong>
            <span>
              {w.segment} · {w.kind}
            </span>
          </div>
          <span className="lb__count">
            {String(index + 1).padStart(2, '0')} / {String(WORKS.length).padStart(2, '0')}
          </span>
        </figcaption>
      </motion.figure>
      <button className="lb__btn lb__btn--prev" aria-label="Projeto anterior" onClick={e => (e.stopPropagation(), onNav(-1))}>
        ←
      </button>
      <button className="lb__btn lb__btn--next" aria-label="Próximo projeto" onClick={e => (e.stopPropagation(), onNav(1))}>
        →
      </button>
      <button ref={closeRef} className="lb__close" aria-label="Fechar" onClick={onClose}>
        ✕
      </button>
    </motion.div>
  );
}

function Projects() {
  const [filter, setFilter] = useState('Todos');
  const [open, setOpen] = useState(null);
  // A grade mostra todos menos o último (que aparece só nas fileiras em movimento), para fechar em pares.
  const gridWorks = WORKS.slice(0, -1);
  const list = filter === 'Todos' ? gridWorks : gridWorks.filter(w => w.cat === filter);
  const rowLogos = useMemo(
    () =>
      [WORKS.slice(0, 5), WORKS.slice(5, 10), WORKS.slice(10)].map(row =>
        row.map(w => ({
          title: w.name,
          ariaLabel: w.name,
          node: (
            <button type="button" className="mcard" onClick={() => setOpen(WORKS.indexOf(w))} aria-label={`Ver ${w.name}`}>
              <img src={img(w, '-sm')} alt="" loading="lazy" draggable={false} />
              <span className="mcard__tag">
                <strong>{w.name}</strong>
                <small>{w.segment}</small>
              </span>
            </button>
          )
        }))
      ),
    []
  );
  const close = useCallback(() => setOpen(null), []);
  const nav = useCallback(d => setOpen(i => (i + d + WORKS.length) % WORKS.length), []);

  return (
    <section className="projects" id="projetos">
      <div className="wrap projects__intro">
        <p className="label">( Projetos )</p>
        <h2 className="h2 projects__title">
          <SplitText
            tag="span"
            text="Sites que criamos na Overture"
            splitType="words"
            delay={80}
            textAlign="left"
            effect="blur"
            className="h2__split"
          />
        </h2>
        <p className="projects__lead">
          {WORKS.length} projetos em {WORK_CATEGORIES.length - 1} áreas: saúde, alimentação, serviços, varejo e tecnologia. Clique em
          qualquer tela para ver de perto.
        </p>
      </div>

      <div className="mrows" aria-label="Telas dos projetos em movimento">
        {rowLogos.map((logos, i) => (
          <LogoLoop
            key={i}
            logos={logos}
            direction={i % 2 ? 'right' : 'left'}
            speed={[46, 38, 52][i]}
            gap={20}
            logoHeight={200}
            fadeOut
            fadeOutWidth={0.08}
            pauseOnHover
            scrollBoost={1.2}
            intro={false}
            ariaLabel={`Projetos, fileira ${i + 1}`}
          />
        ))}
      </div>

      <div className="wrap portfolio" id="portfolio">
        <div className="chips" role="group" aria-label="Filtrar projetos por área">
          {WORK_CATEGORIES.map(c => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              className={`chip ${filter === c ? 'chip--on' : ''}`}
              onClick={() => setFilter(c)}
            >
              {filter === c && <motion.span layoutId="chip-bg" className="chip__bg" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <span className="chip__label">{c}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="pgrid">
          <AnimatePresence mode="popLayout">
            {list.map((w, i) => (
              <motion.button
                layout
                key={w.slug}
                className="pcard"
                onClick={() => setOpen(WORKS.indexOf(w))}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="pcard__media">
                  <img src={img(w, '-sm')} alt={`Página ${w.name}`} loading="lazy" />
                  <span className="pcard__hover">Ver projeto ↗</span>
                </span>
                <span className="pcard__cap">
                  <span>
                    <strong>{w.name}</strong>
                    <small>{w.segment}</small>
                  </span>
                  <em>{w.kind}</em>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>{open !== null && <Lightbox index={open} onClose={close} onNav={nav} />}</AnimatePresence>
    </section>
  );
}

/* ───────── Segmentos ───────── */
const SEGMENT_LOGOS = SEGMENTS.map(s => ({ node: <span className="seg">{s}</span>, title: s }));

function Segments() {
  return (
    <section className="segments" aria-label="Segmentos atendidos">
      <p className="label wrap">( Segmentos que já vestimos )</p>
      <LogoLoop logos={SEGMENT_LOGOS} speed={70} gap={56} logoHeight={44} fadeOut pauseOnHover scrollBoost={1} />
    </section>
  );
}

/* ───────── Processo ───────── */
function Process() {
  return (
    <section className="process wrap" id="processo">
      <p className="label">( Processo )</p>
      <h2 className="h2">
        <SplitText
          tag="span"
          text="Do briefing ao ar, em quatro atos"
          splitType="words"
          delay={80}
          textAlign="left"
          effect="blur"
          className="h2__split"
        />
      </h2>
      <div className="process__grid">
        {STEPS.map((s, i) => (
          <AnimatedContent key={s.n} distance={60} delay={i * 0.1} duration={0.9} blur={6}>
            <SpotlightCard className="step" spotlightColor="#ffffff" intensity={0.16}>
              <span className="step__n">{s.n}</span>
              <h3 className="step__title">{s.title}</h3>
              <p className="step__text">{s.text}</p>
            </SpotlightCard>
          </AnimatedContent>
        ))}
      </div>
    </section>
  );
}

/* ───────── Contato + rodapé ───────── */
function Contact() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1.15]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-60, 20]);
  return (
    <section className="contact" id="contato" ref={ref}>
      <motion.img src="mark.svg" alt="" aria-hidden="true" className="contact__mark" style={{ scale, rotate }} />
      <div className="wrap contact__inner">
        <p className="label">( Contato )</p>
        <h2 className="contact__title">
          <SplitText
            tag="span"
            text="Vamos abrir o seu próximo capítulo?"
            splitType="words"
            delay={90}
            duration={1.2}
            textAlign="left"
            effect="blur"
            className="contact__split"
          />
        </h2>
        <div className="contact__actions">
          <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="btn btn--lg">
            Entrar no grupo do WhatsApp <span aria-hidden="true">↗</span>
          </a>
          <a href={CONTACT.discord} target="_blank" rel="noreferrer" className="btn btn--lg btn--ghost">
            Comunidade no Discord <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <footer className="footer wrap">
        <img src="logo.svg" alt="Overture Agência Criativa" className="footer__logo" />
        <div className="footer__links">
          <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a href={CONTACT.discord} target="_blank" rel="noreferrer">
            Discord
          </a>
          <a href="#topo">Voltar ao topo ↑</a>
        </div>
        <p className="footer__copy">© {new Date().getFullYear()} Overture Agência Criativa. Todos os direitos reservados.</p>
      </footer>
    </section>
  );
}

export default function App() {
  useSmoothScroll();

  return (
    <ClickSpark sparkColor="#ffffff" sparkSize={10} sparkRadius={22} sparkCount={8} duration={450}>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Services />
        <Projects />
        <Segments />
        <Process />
        <Contact />
      </main>
    </ClickSpark>
  );
}
