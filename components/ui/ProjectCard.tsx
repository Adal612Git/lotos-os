"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Project } from "@/lib/data/projects";

interface ProjectCardProps {
  project: Project;
  isActive?: boolean;
  onLoadDemo?: () => void;
}

const ProjectCard = ({ project, isActive, onLoadDemo }: ProjectCardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={cardVariants}
      className={`glass-panel border-breathe p-6 rounded-2xl bg-gradient-to-br from-[#0c1426]/95 via-[#0c2039]/85 to-[#120c1a]/90 border transition-all duration-300 hover:shadow-[0_0_30px_rgba(100,255,218,0.45)]
        ${isActive ? "border-accent-pink shadow-[0_0_32px_rgba(247,37,133,0.45)]" : "border-accent-green/30"}
      `}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">
            {project.featured ? "PRIORIDAD ALTA" : "DISPONIBLE"}
          </p>
          <h3 className="text-2xl font-mono font-bold text-glow-green">{project.title}</h3>
        </div>
        <span className="text-[10px] text-white/40 tracking-[0.3em]">#{project.id}</span>
      </div>
      <p className="text-white/40 text-sm mb-5 min-h-[64px] leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-3 mb-6">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-black/30 text-white/80 rounded-full text-[11px] border border-accent-blue/30 shadow-[0_0_10px_rgba(76,201,240,0.2)]"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        {onLoadDemo && (
          <button type="button" onClick={onLoadDemo} className="btn-demo mt-1" aria-pressed={isActive}>
            CARGAR DEMO
          </button>
        )}
        <div className="flex items-center gap-3 text-white/70">
          <a
            href={project.links.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-2 rounded-full border border-white/10 text-xs hover:text-accent-green hover:border-accent-green/50 transition"
            aria-label={`${project.title} repository`}
          >
            <Github size={16} />
            Repo
          </a>
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-2 rounded-full border border-white/10 text-xs hover:text-accent-blue hover:border-accent-blue/50 transition"
            aria-label={`${project.title} demo`}
          >
            <ExternalLink size={16} />
            Live
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
