import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'motion/react';
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
import TiltedCard from './rb/TiltedCard';
import Magnet from './rb/Magnet';
import LogoLoop from './rb/LogoLoop';
import AnimatedContent from './rb/AnimatedContent';
import ClickSpark from './rb/ClickSpark';
import TargetCursor from './rb/TargetCursor';

import { CONTACT, NAV, SERVICES, WORKS, SEGMENTS, STEPS, STATS } from './data';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

/* ───────── Smooth scroll (Lenis) sincronizado com GSAP ───────── */
function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
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
      lenis.scrollTo(el, { offset: -20, duration: 1.4 });
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
  useMotionValueEvent(scrollY, 'change', y => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160);
    setSolid(y > 40);
  });
  return (
    <motion.header
      className={`nav ${solid ? 'nav--solid' : ''}`}
      animate={{ y: hidden ? '-110%' : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href="#topo" className="nav__logo cursor-target" aria-label="Overture — início">
        <img src="logo.svg" alt="Overture Agência Criativa" />
      </a>
      <nav className="nav__links" aria-label="Principal">
        {NAV.map(l => (
          <a key={l.href} href={l.href} className="nav__link cursor-target">
            {l.label}
          </a>
        ))}
      </nav>
      <Magnet padding={60} magnetStrength={3}>
        <a href="#contato" className="btn btn--sm cursor-target">
          Vamos conversar
        </a>
      </Magnet>
    </motion.header>
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
          <Magnet padding={80} magnetStrength={3}>
            <a href="#contato" className="btn cursor-target">
              Iniciar um projeto <span aria-hidden="true">→</span>
            </a>
          </Magnet>
          <a href="#projetos" className="btn btn--ghost cursor-target">
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
            <div className="stat cursor-target">
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
        holdDistance={120}
      >
        {SERVICES.map(s => (
          <ScrollStackItem key={s.n} itemClassName="svc cursor-target">
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

/* ───────── Projetos (TiltedCard + parallax por coluna) ───────── */
function Projects() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const ys = [
    useTransform(scrollYProgress, [0, 1], [90, -90]),
    useTransform(scrollYProgress, [0, 1], [-30, 130]),
    useTransform(scrollYProgress, [0, 1], [120, -60])
  ];
  const sy = useSpring(useTransform(scrollYProgress, [0, 1], [60, -140]), { stiffness: 80, damping: 20 });

  return (
    <section className="projects" id="projetos" ref={ref}>
      <div className="wrap">
        <p className="label">( Projetos )</p>
        <h2 className="h2">
          <SplitText
            tag="span"
            text="Trabalhos que abrem caminho"
            splitType="words"
            delay={80}
            textAlign="left"
            effect="blur"
            className="h2__split"
          />
        </h2>

        <div className="projects__grid">
          <div className="projects__cards">
            {WORKS.map((w, i) => (
              <motion.figure key={w.name} className={`work work--${i}`} style={{ y: ys[i] }}>
                <div className="work__media cursor-target">
                <TiltedCard
                  imageSrc={w.img}
                  altText={w.name}
                  containerHeight="100%"
                  containerWidth="100%"
                  imageHeight="100%"
                  imageWidth="100%"
                  rotateAmplitude={10}
                  scaleOnHover={1.04}
                  radius={18}
                  glare={0.35}
                  showTooltip={false}
                  flipOnClick={false}
                  gyroscope={false}
                />
                </div>
                <figcaption className="work__cap">
                  <div>
                    <strong>{w.name}</strong>
                    <span>{w.segment}</span>
                  </div>
                  <em>{w.kind}</em>
                </figcaption>
              </motion.figure>
            ))}
          </div>

          <motion.div className="reel" style={{ y: sy }}>
            <p className="label">( Showreel )</p>
            <div className="reel__frame cursor-target">
              <video src="reel.mp4" autoPlay muted loop playsInline preload="metadata" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Segmentos ───────── */
function Segments() {
  const logos = SEGMENTS.map(s => ({ node: <span className="seg cursor-target">{s}</span>, title: s }));
  return (
    <section className="segments" aria-label="Segmentos atendidos">
      <p className="label wrap">( Segmentos que já vestimos )</p>
      <LogoLoop logos={logos} speed={70} gap={56} logoHeight={44} fadeOut pauseOnHover scrollBoost={1} />
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
            <SpotlightCard className="step cursor-target" spotlightColor="#ffffff" intensity={0.16}>
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
          <Magnet padding={100} magnetStrength={3}>
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="btn btn--lg cursor-target">
              Entrar no grupo do WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </Magnet>
          <Magnet padding={80} magnetStrength={3}>
            <a href={CONTACT.discord} target="_blank" rel="noreferrer" className="btn btn--lg btn--ghost cursor-target">
              Comunidade no Discord <span aria-hidden="true">↗</span>
            </a>
          </Magnet>
        </div>
      </div>

      <footer className="footer wrap">
        <img src="logo.svg" alt="Overture Agência Criativa" className="footer__logo" />
        <div className="footer__links">
          <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="cursor-target">
            WhatsApp
          </a>
          <a href={CONTACT.discord} target="_blank" rel="noreferrer" className="cursor-target">
            Discord
          </a>
          <a href="#topo" className="cursor-target">Voltar ao topo ↑</a>
        </div>
        <p className="footer__copy">© {new Date().getFullYear()} Overture Agência Criativa. Todos os direitos reservados.</p>
      </footer>
    </section>
  );
}

export default function App() {
  useSmoothScroll();
  const [fine, setFine] = useState(false);
  useEffect(() => {
    setFine(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  return (
    <ClickSpark sparkColor="#ffffff" sparkSize={10} sparkRadius={22} sparkCount={8} duration={450}>
      {fine && <TargetCursor targetSelector=".cursor-target" cursorColor="#ffffff" />}
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
