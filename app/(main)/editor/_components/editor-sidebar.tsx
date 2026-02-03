import { useCanvas } from "@/context/context";
import { Project, ToolConfig } from "@/utils/types";

import {
  Crop,
  Expand,
  Sliders,
  Palette,
  Maximize2,
  Text,
  Eye,
} from "lucide-react";
import AdjustControl from "./tools/Adjust";
import { ResizeContent } from "./tools/Resize";
import { CropContent } from "./tools/Crop";
import BackgroundControls from "./tools/background-controls";

const TOOL_CONFIGS: Record<string, ToolConfig> = {
  resize: {
    title: "Resize",
    icon: Expand,
    description: "Change project dimensions",
  },
  crop: {
    title: "Crop",
    icon: Crop,
    description: "Crop and trim your image",
  },
  adjust: {
    title: "Adjust",
    icon: Sliders,
    description: "Brightness, contrast, and more (Manual saving required)",
  },
  background: {
    title: "Background",
    icon: Palette,
    description: "Remove or change background",
  },
  ai_extender: {
    title: "AI Image Extender",
    icon: Maximize2,
    description: "Extend image boundaries with AI",
  },
  text: {
    title: "Add Text",
    icon: Text,
    description: "Customize in Various Fonts",
  },
  ai_edit: {
    title: "AI Editing",
    icon: Eye,
    description: "Enhance image quality with AI",
  },
};
const EditorSidebar = ({ project }: { project: Project }) => {
  const { activeTool } = useCanvas();

  const toolConfig = TOOL_CONFIGS[activeTool];
  if (!toolConfig) {
    return null;
  }

  const Icon = toolConfig.icon;
  return (
    <div className="flex min-w-80 flex-col border-r dark:bg-neutral-950/80">
      <div className="border-b p-4">
        <div className="flex items-center gap-3">
          <Icon className="h-4 w-4" />
          <h2>{toolConfig.title}</h2>
        </div>
        <p className="mt-1 text-sm">{toolConfig.description}</p>
      </div>
      <div className="flex-1 p-4">{renderToolConfig(activeTool, project)}</div>
    </div>
  );
};

export default EditorSidebar;

const renderToolConfig = (activeTool: string, project: Project) => {
  switch (activeTool) {
    case "crop":
      return <CropContent />;
    case "resize":
      return <ResizeContent project={project} />;
    case "adjust":
      return <AdjustControl />;
    case "background":
      return <BackgroundControls project={project} />;
    default:
      return <div>Select a Tool to get started</div>;
  }
};
