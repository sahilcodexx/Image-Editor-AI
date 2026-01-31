"use client"
import { useRouter } from "next/navigation";
import React from "react";
import ProjectCard from "./project-card";

const  ProjectGrid = ({ projects }: { projects: unknown[] | undefined }) => {
  const router = useRouter()

  const handleEditProject = (projectId: string) => {
    router.push(`/editor/${projectId}`)
  }

  return <div>{projects && projects.map((project: any) => (
    <ProjectCard
      key={project._id}
      project={project}
      onEdit={() => handleEditProject(project._id)}
    />
  ))}</div>;
};

export default ProjectGrid;
