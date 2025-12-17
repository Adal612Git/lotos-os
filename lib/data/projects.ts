export type ProjectDemoType = "crm-sim" | "secure-terminal" | "data-visualizer";

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  links: {
    demo: string;
    repo: string;
  };
  featured: boolean;
  internal?: boolean;
  demoType?: ProjectDemoType;
}

export const PROJECTS: Project[] = [
  {
    id: "neural-sentry",
    title: "NEURAL SENTRY",
    description:
      "Centro de mando que automatiza hunting, correlación de alertas y contención con agentes autónomos.",
    techStack: ["Python", "FastAPI", "TensorFlow", "LangChain"],
    links: {
      demo: "/hangar",
      repo: "https://github.com/rick-lotos/neural-sentry",
    },
    featured: true,
    internal: true,
    demoType: "crm-sim",
  },
  {
    id: "crypto-grid",
    title: "CRYPTO-GRID",
    description:
      "Red de pagos cuánticos con monitoreo antifraude en vivo y dashboards para monitorear wallets blindadas.",
    techStack: ["Solidity", "Hardhat", "Next.js", "viem"],
    links: {
      demo: "/hangar",
      repo: "https://github.com/rick-lotos/crypto-grid",
    },
    featured: false,
    internal: true,
    demoType: "secure-terminal",
  },
  {
    id: "echo-protocol",
    title: "ECHO PROTOCOL",
    description:
      "Mensajería descentralizada con core en Rust, replicación P2P y visualización en tiempo real de nodos.",
    techStack: ["Rust", "Tokio", "WebRTC", "React"],
    links: {
      demo: "/hangar",
      repo: "https://github.com/rick-lotos/echo-protocol",
    },
    featured: false,
    internal: true,
    demoType: "data-visualizer",
  },
  {
    id: "automata-core",
    title: "AUTOMATA CORE",
    description:
      "Framework DevOps que provisiona nubes híbridas, ejecuta CI/CD declarativo y emite reportes predictivos.",
    techStack: ["Go", "Docker", "Kubernetes", "Grafana"],
    links: {
      demo: "https://automata-core.demo",
      repo: "https://github.com/rick-lotos/automata-core",
    },
    featured: true,
  },
];
