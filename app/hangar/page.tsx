"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { PROJECTS } from "@/lib/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectViewer from "@/components/ui/ProjectViewer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const HangarPage = () => {
  const [activeProjectId, setActiveProjectId] = useState(PROJECTS[0].id);
  const activeProject = useMemo(
    () => PROJECTS.find((project) => project.id === activeProjectId) ?? PROJECTS[0],
    [activeProjectId]
  );

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="grid gap-8 xl:grid-cols-[1.15fr_minmax(0,1fr)]">
        <div className="flex flex-col gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-accent-green">módulo hangar</p>
          <ProjectViewer project={activeProject} />
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-mono font-bold text-glow-green">PROYECTOS DISPONIBLES</h1>
            <span className="text-xs uppercase tracking-[0.4em] text-accent-pink">select</span>
          </div>
          <p className="text-white/40 text-sm font-mono">
            Selecciona dos demos a la vez gracias al layout dual. Cada tarjeta palpita para indicar disponibilidad inmediata.
          </p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {PROJECTS.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isActive={project.id === activeProjectId}
                onLoadDemo={() => setActiveProjectId(project.id)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HangarPage;
