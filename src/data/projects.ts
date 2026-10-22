export interface Project {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  live: string;
  github: string;
  gradient: string;
  emoji: string;
  featured?: boolean;
  role: string;
  duration: string;
  problem: string;
  approach: string;
  outcome: string;
}

export const featuredProject: Project = {
  slug: 'search-job-links',
  title: 'Search Job Links',
  description:
    'A live React + TypeScript web app that aggregates and surfaces job listings with a fast, searchable interface. Built with Vite for instant dev feedback and deployed on GitHub Pages - a practical tool born from real job-hunting needs.',
  tech: ['React', 'TypeScript', 'Vite', 'CSS'],
  live: 'https://nikulgoyani369.github.io/Search-Job-Links/',
  github: 'https://github.com/NikulGoyani369/Search-Job-Links',
  gradient: 'from-[#1a1a2e] to-[#16213e]',
  emoji: '🔍',
  featured: true,
  role: 'Solo Developer',
  duration: '2 weeks',
  problem:
    'Job-hunting across multiple platforms meant switching between browser tabs constantly, losing track of promising roles and duplicating effort. There was no single place to search across the boards I actually used.',
  approach:
    'Built a React + TypeScript SPA with Vite that aggregates curated job board links into a single searchable interface. Deployed on GitHub Pages for zero-cost hosting with no backend required.',
  outcome:
    'A personal productivity tool used daily. Demonstrates practical React skills applied to a real problem — shipped in two weeks from idea to live deployment.',
};

export const projects: Project[] = [
  {
    slug: 'car-management-api',
    title: 'Car Management API',
    description:
      'Full-stack REST API + CLI client for managing car manufacturers and models. Features offline-first sync — the CLI works locally when the server is down and auto-syncs on reconnection.',
    tech: ['TypeScript', 'Node.js', 'MongoDB', 'REST API'],
    live: '#',
    github: 'https://github.com/NikulGoyani369/car-management',
    gradient: 'from-[#1a1a2e] to-[#2d1b4e]',
    emoji: '🚗',
    role: 'Solo Developer',
    duration: '3 weeks',
    problem:
      'Needed a robust full-stack API example demonstrating both a RESTful backend and a CLI client that could handle offline scenarios gracefully — a real-world concern for field tooling.',
    approach:
      'Built a TypeScript/Node.js backend with MongoDB storage. The CLI client implements an offline-first sync strategy: writes queue locally when the server is unreachable and auto-reconcile on reconnection.',
    outcome:
      'Demonstrates resilient distributed-systems patterns in a compact project. The offline-sync mechanism shows practical understanding of eventual consistency without requiring a distributed infrastructure.',
  },
  {
    slug: 'playwright-test-automation',
    title: 'Playwright Test Automation',
    description:
      'Hands-on test automation suite using Playwright and TypeScript, covering browser automation, assertions, and end-to-end testing patterns — directly applied in professional V&V work.',
    tech: ['Playwright', 'TypeScript', 'E2E Testing', 'Node.js'],
    live: '#',
    github: 'https://github.com/NikulGoyani369/introduction-to-playwright',
    gradient: 'from-[#0f1f2e] to-[#1a3a4e]',
    emoji: '🎭',
    role: 'Test Engineer',
    duration: 'Ongoing',
    problem:
      'Needed hands-on Playwright experience to deepen and validate skills being applied professionally at Straumann Group in a regulated medical-device context.',
    approach:
      'Built a structured test suite covering browser automation, multi-page flows, assertions, and reusable page objects. Patterns mirror what the team uses in production V&V work.',
    outcome:
      'Framework patterns adopted by the team at Straumann Group. Serves as a living reference for onboarding new engineers to the Playwright test stack.',
  },
  {
    slug: 'master-thesis',
    title: 'Master Thesis (Python)',
    description:
      'Academic research project from the MSc in Computer Engineering at University of Duisburg-Essen. A Python-based system with 288 commits, combining data processing, analysis, and a web-based output layer.',
    tech: ['Python', 'HTML', 'Shell', 'Data Analysis'],
    live: '#',
    github: 'https://github.com/NikulGoyani369/Master_Thesis',
    gradient: 'from-[#1a2e1a] to-[#1a4e2d]',
    emoji: '🎓',
    role: 'Researcher & Developer',
    duration: '6 months',
    problem:
      'MSc dissertation required implementing a novel system combining data processing, analysis pipelines, and a web-based output layer as part of Computer Engineering research at University of Duisburg-Essen.',
    approach:
      'Python-based system with structured data pipelines feeding into an HTML/web output layer. Followed academic rigour with documented methodology, reproducible results, and 288 commits of consistent development discipline.',
    outcome:
      'Successfully submitted and graded. Demonstrated the ability to sustain a large, complex codebase over six months with consistent commit discipline and academic-quality documentation.',
  },
  {
    slug: 'portfolio-website',
    title: 'Portfolio Website',
    description:
      'Personal developer portfolio built with Next.js 13 App Router, TypeScript, and Framer Motion. Features dark-mode design, animated sections, EmailJS contact form, and OG image generation.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    live: '#',
    github: 'https://github.com/NikulGoyani369/portfolio-nextjs',
    gradient: 'from-[#1a1a2e] to-[#2a1040]',
    emoji: '🌐',
    role: 'Designer & Developer',
    duration: 'Ongoing',
    problem:
      'Needed a portfolio that accurately reflected QA/engineering expertise while demonstrating frontend development capability. Most templates felt generic and failed to communicate the depth of the work.',
    approach:
      'Built from scratch with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion. Dark-mode glass aesthetic, live GitHub stats via API, AI chat integration, animated sections, and SEO-optimised metadata with JSON-LD structured data.',
    outcome:
      'A living portfolio that evolves with each new skill. OG image generation, Vercel Analytics, and structured data provide visibility into reach and are optimised for recruiter discovery.',
  },
  {
    slug: 'selenium-test-suite',
    title: 'Selenium Test Suite',
    description:
      'Reusable test automation framework using Selenium WebDriver and Python. Covers login flows, form validation, and regression scenarios with structured reporting and CI-ready configuration.',
    tech: ['Python', 'Selenium', 'pytest', 'CI/CD'],
    live: '#',
    github: 'https://github.com/NikulGoyani369/selenium-test-suite',
    gradient: 'from-[#0f1a2e] to-[#1a2e3a]',
    emoji: '🤖',
    role: 'Test Automation Engineer',
    duration: '4 weeks',
    problem:
      'Existing ad-hoc Selenium scripts lacked structure, had no reporting, and could not be run in CI. Regression coverage was inconsistent and failure diagnosis required reading raw console output.',
    approach:
      'Designed a Page Object Model framework using Selenium WebDriver + pytest. Covered login flows, form validation, and regression scenarios. Added structured HTML reporting and GitHub Actions integration.',
    outcome:
      'CI-ready and extensible. pytest fixtures reduce duplication and the reporting layer gives immediate visibility into failures without digging through raw logs.',
  },
  {
    slug: 'rest-api-testing-framework',
    title: 'REST API Testing Framework',
    description:
      'API testing suite covering CRUD operations, authentication flows, and error handling for a Node.js backend. Validates response schemas, status codes, and edge cases with automated assertions.',
    tech: ['TypeScript', 'Node.js', 'REST API', 'Jest'],
    live: '#',
    github: 'https://github.com/NikulGoyani369/REST-API-Testing-Framework',
    gradient: 'from-[#1e1a0f] to-[#2e2a1a]',
    emoji: '⚙️',
    role: 'Test Automation Engineer',
    duration: '3 weeks',
    problem:
      'Node.js REST API teams often have inconsistent test coverage — happy-path tests exist but auth edge cases, schema drift, and error handling are untested until production incidents surface them.',
    approach:
      'Built a TypeScript + Jest suite covering CRUD operations, JWT authentication flows, response schema validation, error status codes, and boundary conditions for a Node.js REST backend.',
    outcome:
      'Automated assertions catch schema drift and auth regressions before they reach staging. The test structure doubles as API contract documentation for the team.',
  },
];