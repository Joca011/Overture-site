// ✏️ Edite aqui os textos, links e contatos do site.

export const CONTACT = {
  whatsapp: 'https://chat.whatsapp.com/GXGVORNcreoBo3DG9dFKQC?s=cl&p=a&mlu=4&ilr=4', // grupo do WhatsApp
  discord: 'https://discord.gg/4sYnFh9w3' // grupo do Discord
};

export const NAV = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Processo', href: '#processo' },
  { label: 'Contato', href: '#contato' }
];

export const SERVICES = [
  {
    n: '01',
    title: 'Sites institucionais',
    text: 'Sites rápidos, bonitos e pensados para converter visitantes em clientes — com a cara e o tom da sua marca.',
    tags: ['UI/UX', 'React', 'SEO', 'Responsivo']
  },
  {
    n: '02',
    title: 'Landing pages',
    text: 'Páginas de alta performance para campanhas, lançamentos e captação de leads, com foco total em resultado.',
    tags: ['Copy', 'Design', 'Conversão', 'Analytics']
  },
  {
    n: '03',
    title: 'E-commerces',
    text: 'Lojas virtuais com experiência de compra fluida, vitrine impecável e estrutura pronta para vender.',
    tags: ['Loja virtual', 'Checkout', 'Integrações']
  },
  {
    n: '04',
    title: 'Branding & identidade',
    text: 'Logo, sistema visual e direção criativa para a sua marca ser reconhecida em qualquer ponto de contato.',
    tags: ['Logo', 'Identidade', 'Direção de arte']
  }
];

export const WORK_CATEGORIES = ['Todos', 'Saúde & beleza', 'Alimentação', 'Serviços', 'Varejo & tech'];

// Telas dos projetos ficam em public/work/<slug>.webp (grande) e <slug>-sm.webp (miniatura).
export const WORKS = [
  { slug: 'sorriso-perfeito', name: 'Sorriso Perfeito', segment: 'Clínica odontológica', kind: 'Site institucional', cat: 'Saúde & beleza' },
  { slug: 'bella-rosa', name: 'Studio Bella Rosa', segment: 'Estética & beleza', kind: 'Landing page', cat: 'Saúde & beleza' },
  { slug: 'forno-nobre', name: 'Forno Nobre', segment: 'Pizzaria', kind: 'E-commerce', cat: 'Alimentação' },
  { slug: 'navde-rafael', name: 'Navde Rafael', segment: 'Advocacia', kind: 'Site institucional', cat: 'Serviços' },
  { slug: 'acai-tropical', name: 'Açaí Tropical', segment: 'Açaiteria', kind: 'Delivery', cat: 'Alimentação' },
  { slug: 'pao-de-ouro', name: 'Padaria Pão de Ouro', segment: 'Padaria', kind: 'Site institucional', cat: 'Alimentação' },
  { slug: 'saia-do-mesmo', name: 'Rafael Almeida', segment: 'Personal trainer', kind: 'Landing page', cat: 'Saúde & beleza' },
  { slug: 'fps-lab', name: 'FPS Lab', segment: 'Otimização para games', kind: 'Landing page', cat: 'Varejo & tech' },
  { slug: 'doce-encanto', name: 'Doce Encanto', segment: 'Confeitaria', kind: 'Site institucional', cat: 'Alimentação' },
  { slug: 'moda-atelie', name: 'Moda Ateliê', segment: 'Loja de roupas', kind: 'E-commerce', cat: 'Varejo & tech' },
  { slug: 'grafica-impacto', name: 'Gráfica Impacto', segment: 'Gráfica', kind: 'Site institucional', cat: 'Serviços' },
  { slug: 'power-fit', name: 'Power Fit Academia', segment: 'Academia', kind: 'Landing page', cat: 'Saúde & beleza' },
  { slug: 'cartorio-santa-luzia', name: 'Cartório Santa Luzia', segment: 'Cartório', kind: 'Site institucional', cat: 'Serviços' },
  { slug: 'radio-ritmo', name: 'Rádio Ritmo FM', segment: 'Rádio', kind: 'Site institucional', cat: 'Serviços' },
  { slug: 'cel-fix', name: 'Cel Fix', segment: 'Assistência e loja de celulares', kind: 'Site institucional', cat: 'Varejo & tech' }
];

export const SEGMENTS = ['Odontologia', 'Estética', 'Gastronomia', 'Advocacia', 'Fitness', 'Padaria', 'Açaí', 'Confeitaria', 'Moda', 'Gráfica', 'Cartório', 'Rádio', 'Games', 'Assistência técnica'];

export const STEPS = [
  { n: '01', title: 'Imersão', text: 'Entendemos o seu negócio, público e objetivos para traçar a estratégia certa.' },
  { n: '02', title: 'Direção criativa', text: 'Definimos conceito, linguagem visual e estrutura de conteúdo antes de desenhar.' },
  { n: '03', title: 'Design & desenvolvimento', text: 'Do layout ao código: interfaces animadas, rápidas e responsivas.' },
  { n: '04', title: 'Lançamento', text: 'Publicamos, medimos e ajustamos para o projeto continuar entregando resultado.' }
];

// ✏️ Valores ilustrativos — troque pelos números reais da agência.
export const STATS = [
  { to: 100, suffix: '%', label: 'Projetos sob medida' },
  { to: 4, suffix: ' etapas', label: 'Do briefing ao ar' },
  { to: 1, suffix: ' time', label: 'Do início ao fim' }
];
