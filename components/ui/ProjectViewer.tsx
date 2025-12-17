"use client";

import SystemWindow from "@/components/hangar/SystemWindow";
import CRMSim from "@/components/hangar/demos/CRMSim";
import DataVisualizer from "@/components/hangar/demos/DataVisualizer";
import SecureTerminal from "@/components/hangar/demos/SecureTerminal";
import { Project, ProjectDemoType } from "@/lib/data/projects";

interface ProjectViewerProps {
  project: Project;
}

const DEMO_MAP: Record<ProjectDemoType, () => JSX.Element> = {
  "crm-sim": () => <CRMSim />,
  "secure-terminal": () => <SecureTerminal />,
  "data-visualizer": () => <DataVisualizer />,
};

const resolveDemoType = (project: Project): ProjectDemoType | null => {
  if (project.demoType) return project.demoType;
  if (project.id === "neural-sentry") return "crm-sim";
  if (project.id === "crypto-grid") return "secure-terminal";
  if (project.id === "echo-protocol") return "data-visualizer";
  return null;
};

const ProjectViewer = ({ project }: ProjectViewerProps) => {
  const demoType = resolveDemoType(project);
  const Demo = demoType ? DEMO_MAP[demoType] : null;

  return (
    <SystemWindow
      title={project.title}
      description={project.description}
      isInternal={Boolean(project.internal)}
      demoComponent={Demo ? <Demo key={project.id} /> : null}
    />
  );
};

export default ProjectViewer;
