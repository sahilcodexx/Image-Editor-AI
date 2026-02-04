"use client";
import UpgradeModel from "@/components/common/upgrade-model";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useCanvas } from "@/context/context";
import { api } from "@/convex/_generated/api";

import { useConvexMutation, useConvexQuery } from "@/hooks/use-convex-query";
import { usePlanAccess } from "@/hooks/use-plan-access";
import { Project, ToolId } from "@/utils/types";
import {
  Crop,
  Expand,
  Sliders,
  Palette,
  Maximize2,
  Text,
  Eye,
  ArrowLeft,
  Lock,
  RotateCcw,
  RotateCw,
  RefreshCcw,
  Loader2,
  Save,
  Download,
  ChevronDown,
  FileImage,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, ElementType } from "react";
import CanvasEditor from "./canvas-editor";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TOOLS: {
  id: ToolId;
  label: string;
  icon: ElementType;
  proOnly?: boolean;
}[] = [
  {
    id: "resize",
    label: "Resize",
    icon: Expand,
  },
  {
    id: "crop",
    label: "Crop",
    icon: Crop,
  },
  {
    id: "adjust",
    label: "Adjust",
    icon: Sliders,
  },
  {
    id: "text",
    label: "Text",
    icon: Text,
  },
  {
    id: "background",
    label: "AI Background",
    icon: Palette,
    proOnly: true,
  },
  {
    id: "ai_extender",
    label: "AI Image Extender",
    icon: Maximize2,
    proOnly: true,
  },
  {
    id: "ai_edit",
    label: "AI Editing",
    icon: Eye,
    proOnly: true,
  },
];

const EXPORT_FORMATS = [
  {
    format: "PNG",
    quality: 1.0,
    label: "PNG (High Quality)",
    extension: "png",
  },
  {
    format: "JPEG",
    quality: 0.9,
    label: "JPEG (90% Quality)",
    extension: "jpg",
  },
  {
    format: "JPEG",
    quality: 0.8,
    label: "JPEG (80% Quality)",
    extension: "jpg",
  },
  {
    format: "WEBP",
    quality: 0.9,
    label: "WebP (90% Quality)",
    extension: "webp",
  },
];

const EditorTopbar = ({ project }: { project: Project }) => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [restrictedTool, setRestrictedTool] = useState<string | null>(null);

  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState(null);
  const [viewportTransform, setViewportTransform] = useState();

  const {
    activeTool,
    onToolChange,
    canvasEditor,
    undo,
    redo,
    reset,
    canUndo,
    canRedo,
    isSaving,
  } = useCanvas();
  const { hasAccess, canExport, isFree } = usePlanAccess();
  const router = useRouter();

  const { mutate: updateProject, isLoading: isUpdatingProject } =
    useConvexMutation(api.project.updateProject);

  const { data: user } = useConvexQuery(api.users.getCurrentUser);

  const handleManualSave = async () => {
    if (!canvasEditor) {
      return;
    }
    try {
      await updateProject({
        projectId: project._id,
        canvasState: canvasEditor.toJSON(),
      });
      toast.success("Project saved successfully!");
    } catch (error) {
      console.error("Failed to save project", error);
      toast.error("Failed to save project");
    }
  };

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  const handleToolChange = (toolId: ToolId) => {
    if (!hasAccess(toolId)) {
      setRestrictedTool(toolId);
      setShowUpgradeModal(true);
      return;
    }
    onToolChange(toolId);
  };

  const handleExport = async (exportConfig) => {
    try {
      if (!canExport || !project) {
        toast.error(
          "You have reached your export limit for this month. Please upgrade to Pro for more exports.",
        );
        return;
      }
      if (!canExport(user?.exportsThisMonth || 0)) {
        setRestrictedTool("export");
        setShowUpgradeModal(true);
        return;
      }
      setIsExporting(true);
      setExportFormat(exportConfig.format);

      const currentZoom = canvasEditor?.getZoom();
      const currentViewportTransform = [...canvasEditor?.viewportTransform];

      canvasEditor.setZoom(1);
      canvasEditor.setViewportTransform([1, 0, 0, 1, 0, 0]);

      canvasEditor.setDimensions({
        width: project.width,
        height: project.height,
      });

      canvasEditor.requestRenderAll();

      const dataUrl = canvasEditor.toDataURL({
        format: exportConfig.format.toLowerCase(),
        quality: exportConfig.quality,
        multiplier: 1,
      });

      canvasEditor.setZoom(currentZoom);
      canvasEditor.setViewportTransform(currentViewportTransform);
      canvasEditor.setDimensions({
        width: project.width * currentZoom,
        height: project.height * currentZoom,
      });
      setIsExporting(false);
      setExportFormat(null);
      canvasEditor.requestRenderAll();

      const link = document.createElement("a");
      link.download = `${project.title}.${exportConfig.extension}`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Image exported successfully as " + exportConfig.format);
    } catch (error) {
      console.error("Export failed", error);
      toast.error("Export failed. Please try again.");
    } finally {
      setIsExporting(false);
      setExportFormat(null);
    }
  };

  return (
    <>
      <div className="border-b px-6 py-4 dark:bg-neutral-950/80">
        <div className="mb-3 flex items-center justify-between">
          <Button
            variant={"custom"}
            size={"sm"}
            onClick={handleBackToDashboard}
          >
            <ArrowLeft /> All Projects
          </Button>
          <h2 className="capitalize">{project.title}</h2>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={reset}
              disabled={isSaving || !project.originalImageUrl}
              className="gap-2"
            >
              {" "}
              <RefreshCcw />
              Reset
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleManualSave}
              disabled={isSaving || !canvasEditor}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  saving
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </>
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={"outline"}
                  size={"sm"}
                  disabled={isExporting || !canvasEditor}
                  className="gap-2"
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Exporting {exportFormat}
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Export
                      <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="opacity-70">
                    Export Resolution: {project.width} x {project.height}px
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  {EXPORT_FORMATS.map((format) => (
                    <DropdownMenuItem
                      key={format.label}
                      onClick={() => handleExport(format)}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <FileImage className="mr-2 h-4 w-4" />
                      <div>
                        <div>{format.format}</div>
                        <div>
                          {format.format} {Math.round(format.quality * 100)}%
                          Quality
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <div className="px-2 py-1 text-sm text-wrap">
                    Free Plan: {user?.exportsThisMonth || 0}/20 exports this
                    month
                    {(user?.exportsThisMonth || 0) >= 20 && (
                      <div className="mt-1 text-sm text-red-600">
                        You have reached your export limit. Upgrade to Pro for
                        more exports.
                      </div>
                    )}
                  </div>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <ModeToggle />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {TOOLS.map((tools) => {
              const Icon = tools.icon;
              const isActive = activeTool === tools.id;
              const hasToolAccess = hasAccess(tools.id);
              return (
                <Button
                  key={tools.id}
                  variant={isActive ? "default" : "secondary"}
                  size="sm"
                  className={`text-sm ${!hasToolAccess ? "opacity-60" : ""}`}
                  onClick={() => handleToolChange(tools.id)}
                >
                  <Icon />
                  {tools.label}
                  {tools.proOnly && !hasToolAccess && <Lock />}
                </Button>
              );
            })}
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={undo}
              disabled={!canUndo}
              className={`transition-colors duration-200 hover:bg-neutral-200/90`}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={redo}
              disabled={!canRedo}
              className={`transition-colors duration-200 hover:bg-neutral-200/50`}
            >
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <UpgradeModel
        isOpen={showUpgradeModal}
        onClose={() => {
          setShowUpgradeModal(false);
          setRestrictedTool(null);
        }}
        restrictedTool={restrictedTool || ""}
        reason="This tool is only available for Pro users."
      />
    </>
  );
};

export default EditorTopbar;
