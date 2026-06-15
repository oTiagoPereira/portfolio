export interface Project {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  github?: string;
  live?: string;
  featured?: boolean;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'ferramentas' | 'design';
}

export const personalInfo = {
  name: 'Tiago Pereira',
  role: 'Desenvolvedor Full Stack',
  description:
    'Estagiário de Desenvolvimento Full Stack com foco em criar aplicações modernas e eficientes. Minha trajetória começou no suporte de TI, o que me deu uma visão única sobre infraestrutura e as necessidades reais dos usuários.',
  bio: [
    'Atualmente focado em aprender e aplicar tecnologias como React, Next.js e TypeScript para construir sistemas que geram valor.',
    'Minha transição do suporte para o desenvolvimento reflete minha paixão por resolver problemas de forma criativa e técnica.',
  ],
  avatar: '/photo.png',
  social: {
    github: 'https://github.com/oTiagoPereira',
    linkedin: 'https://linkedin.com/in/otiagopereiraa',
    email: 'tiagopereira14200@gmail.com',
  },
  githubFilter: {
    include: ['portfolio', 'hotel-regency', 'cinelist-frontend', 'cinelist', 'spotify-replica'],
  },
  resumeUrl: '/curriculo_tiago.pdf',
};

export const skills: Skill[] = [
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'PostgreSQL', category: 'backend' },
  { name: 'Prisma', category: 'backend' },
  { name: 'Sequelize', category: 'backend' },
  { name: 'SQLite', category: 'backend' },
  { name: 'Zod', category: 'backend' },
  { name: 'MySQL', category: 'backend' },
  { name: 'MongoDB', category: 'backend' },
  { name: 'REST APIs', category: 'backend' },
  { name: 'Docker', category: 'ferramentas' },
  { name: 'Unit Testing', category: 'ferramentas' },
  { name: 'VPS & Deployment', category: 'ferramentas' },
  { name: 'i18n', category: 'ferramentas' },
  { name: 'Git', category: 'ferramentas' },
  { name: 'Figma', category: 'design' },
  { name: 'React Query', category: 'frontend' },
  { name: 'Material UI', category: 'frontend' },
  { name: 'PWA', category: 'frontend' },
  { name: 'Express.js', category: 'backend' },
  { name: 'WebSockets', category: 'backend' },
  { name: 'JWT / Auth', category: 'backend' },
  { name: 'Vite', category: 'ferramentas' },
  { name: 'Vitest', category: 'ferramentas' },
];

export const projects: Project[] = [
  {
    title: "Portfólio",
    description:
      "Meu projeto principal atualmente. Construído com Next.js 15, TypeScript e Tailwind CSS, focado em performance e animações fluidas.",
    tags: ["Next.js", "TypeScript", "i18n", "Framer Motion"],
    github: "https://github.com/oTiagoPereira/portfolio",
    live: "https://otiagopereira.dev",
    featured: true,
    image: '/projects/portfolio.png'
  },
  {
    title: "Hotel Regency",
    description:
      "Aplicação fullstack em construção para gestão de reservas hoteleiras. Focada em dashboards administrativos e de usuário.",
    tags: ["React", "TypeScript", "Node.js", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/oTiagoPereira/hotel-regency",
    live: "https://regencyheights.vercel.app/",
    featured: true,
    image: '/projects/regency-hotel.png'
  },
  {
    title: "CineList",
    description:
      "Plataforma de filmes com recomendações por IA, autenticação social e gerenciamento de listas personalizadas.",
    tags: ["React", "Node.js", "Tailwind CSS", "Prisma", "SQLite", "TMDB API"],
    github: "https://github.com/oTiagoPereira/cinelist",
    live: "https://cinelist.otiagopereira.dev",
    featured: true,
    image: '/projects/cinelist.png'
  },
];

export const ongoingProjects: Project[] = [
  {
    title: "Sistema de Gerenciamento (Em breve)",
    description:
      "Projeto que estou desenvolvendo para consolidar conhecimentos em autenticação, banco de dados e gerenciamento de estado.",
    tags: ["Next.js", "Prisma", "Zod", "PostgreSQL"],

  },
];

export const experience: Experience[] = [
  {
    role: 'Estagiário de Desenvolvimento Full Stack',
    company: 'AGSINN Tecnologia',
    period: 'Outubro 2025 — Presente',
    description:
      'Desenvolvimento e manutenção de aplicações web full stack. Atuação direta com APIs REST, modelagem de dados com Sequelize/Prisma e implementação de testes unitários para garantir a qualidade do software.',
    technologies: ['React', 'Node.js', 'Postgres', 'Sequelize', 'Prisma', 'Zod', 'Docker'],
  },
  {
    role: 'Estagiário de Suporte de TI',
    company: 'Toyolex Toyota (Grupo Parvi)',
    period: 'Abril 2025 — Outubro 2025',
    description:
      'Responsável pelo suporte técnico de primeiro e segundo nível, troubleshooting de hardware e software, e auxílio na manutenção da infraestrutura de rede da concessionária.',
    technologies: ['Hardware', 'Windows Server', 'Redes', 'Atendimento ao Cliente'],
  },
];

export const learningTopics = [
  {
    title: 'Arquitetura de Software',
    description:
      'Aprofundando em Clean Architecture, SOLID e separação de responsabilidades no ecossistema Node.js.',
    icon: 'Network',
    progress: 40,
  },
  {
    title: 'Design Patterns',
    description:
      'Aplicando padrões de projeto em TypeScript para criar sistemas mais escaláveis, testáveis e de fácil manutenção.',
    icon: 'Code',
    progress: 50,
  },
  {
    title: 'Banco de Dados Avançado',
    description:
      'Indo além do CRUD: otimização de queries, índices, transações (ACID) e modelagem de dados.',
    icon: 'Database',
    progress: 60,
  },
  {
    title: 'TypeScript & Lógica',
    description:
      'Elevando o nível técnico com tipagem estática avançada, Generics e aprimoramento da lógica de programação.',
    icon: 'Terminal',
    progress: 70,
  },
];

export const navLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Stack', href: '#stack' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Experiencia', href: '#experience' },
  { label: 'Contato', href: '#contact' },
];
