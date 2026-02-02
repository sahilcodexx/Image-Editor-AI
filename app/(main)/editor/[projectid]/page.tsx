"use client";
import { CanvasContext } from "@/context/context";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { Loader2, Monitor } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { HashLoader } from "react-spinners";
import CanvasEditor from "../_components/canvas-editor";
import { Project } from "@/utils/types";
import EditorTopbar from "../_components/editor-topbar";
import EditorSidebar from "../_components/editor-sidebar";

const Editor = () => {
  const { projectid } = useParams();
  const [canvasEditor, setCanvasEditor] = useState<any>(null);
  const [processingMessage, setProcessingMessage] = useState<string | null>(
    null,
  );
  const [activeTool, setActiveTool] = useState<string>("resize");

  const {
    data: project,
    isLoading,
    error,
  } = useConvexQuery(api.project.getProject, { projectId: projectid });

  // Ensure project has all required properties
  const projectWithId = project
    ? ({ ...project, _id: projectid } as Project)
    : null;

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <span className="animate-spin">
          <Loader2 height={50} width={40} />
        </span>
        <p>Loading Please wait.</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-red-500">
            Project Not Found
          </h2>
          <p className="text-gray-600">
            The project you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <CanvasContext.Provider
      value={{
        canvasEditor,
        setCanvasEditor,
        activeTool,
        processingMessage,
        setProcessingMessage,
        onToolChange: setActiveTool,
      }}
    >
      <div className="flex min-h-screen items-center justify-center text-center lg:hidden">
        <div>
          <Monitor className="mx-auto mb-5 h-16 w-16" />
          <h2 className="text-4xl">Desktop Required</h2>
          <p className="text-sm opacity-80">
            Please use a larger screen to access the full editing experience
          </p>
        </div>
      </div>
      <div className="hidden min-h-screen dark:bg-neutral-900 lg:block">
        <div>
          {processingMessage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
              <div className="flex flex-col items-center gap-4 rounded-lg p-6">
                <HashLoader color="#fff" />
                <div className="text-center">
                  <p className="text-xl font-medium text-white">
                    {processingMessage}
                  </p>
                  <p className="mt-1 text-xs text-red-500 text-shadow-red-300">
                    Please wait, do not switch tabs or navigate away
                  </p>
                </div>
              </div>
            </div>
          )}
          <EditorTopbar project={projectWithId!} />
          <div className="flex min-h-screen flex-1 overflow-hidden">
            <EditorSidebar project={projectWithId!} />
            <div className="flex-1">
              <CanvasEditor project={projectWithId!} />
            </div>
          </div>
          <div className=""></div>
        </div>
      </div>
    </CanvasContext.Provider>
  );
};

export default Editor;
