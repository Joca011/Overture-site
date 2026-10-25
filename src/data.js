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

export const WORKS = [
  { img: 'work/bella.webp', name: 'Studio Bella Rosa', segment: 'Estética & beleza', kind: 'Landing page' },
  { img: 'work/sorriso.webp', name: 'Sorriso Perfeito', segment: 'Clínica odontológica', kind: 'Site institucional' },
  { img: 'work/navde.webp', name: 'Navde Rafael', segment: 'Advocacia', kind: 'Site institucional' }
];

export const SEGMENTS = ['Odontologia', 'Estética', 'Gastronomia', 'Advocacia', 'Fitness', 'Saúde', 'Varejo', 'Serviços'];

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
