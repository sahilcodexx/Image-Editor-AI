"use client";
import Container from "@/components/common/container";
import SvgImage from "@/components/common/SvgImage";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import ProjectOpenModel from "./_components/project-open-model";

const Dashboard = () => {
  const [showNewProject, setShowNewProject] = useState<boolean>(false);

  const { data: projects, isLoading } = useConvexQuery(
    api.project.getUserProjects,
  ) as {
    data: unknown[] | undefined;
    error: Error;
    isLoading: boolean;
  };
  console.log(projects);

  

  return (
    <Container className="flex h-screen w-full flex-col items-center justify-start gap-5 pt-25">
      <div className="flex w-full items-end justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl">Your Projects</h2>
          <p className="text-muted-foreground text-xs md:text-sm">
            Create and manage your AI-powered image designs
          </p>
        </div>
        <div>
          <Button onClick={() => setShowNewProject(true)}>
            <Plus />
            Create Project
          </Button>
        </div>
      </div>
      <div className="mt-15 flex flex-col items-center gap-3">
        {isLoading ? (
          <span className="animate-spin">
            <Loader2 height={50} width={40} />
          </span>
        ) : projects && projects.length > 0 ? null : (
          <>
            <SvgImage />
            <h2 className="text-3xl font-medium md:text-4xl">
              Create Your First Project
            </h2>
            <p className="text-muted-foreground text-center text-xs md:text-sm">
              Upload an image to start editing with our powerful AI tools,{" "}
              <br />
              or create a blank canvas to design from scratch.
            </p>
            <div className="mt-5">
              <Button onClick={() => setShowNewProject(true)}>
                Start Creating
              </Button>
            </div>
          </>
        )}
        <ProjectOpenModel
          isOpen={showNewProject}
          onClose={() => setShowNewProject(false)}
        />
      </div>
    </Container>
  );
};

export default Dashboard;
