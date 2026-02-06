"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Expand, Lock, Unlock, Monitor } from "lucide-react";
import { useCanvas } from "@/context/context";
import { useConvexMutation } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { Project } from "@/utils/types";

interface AspectRatio {
  name: string;
  ratio: [number, number];
  label: string;
}

// Common aspect ratios
const ASPECT_RATIOS: AspectRatio[] = [
  { name: "Instagram Story", ratio: [9, 16], label: "9:16" },
  { name: "Instagram Post", ratio: [1, 1], label: "1:1" },
  { name: "Youtube Thumbnail", ratio: [16, 9], label: "16:9" },
  { name: "Portrait", ratio: [2, 3], label: "2:3" },
  { name: "Facebook Cover", ratio: [851, 315], label: "2.7:1" },
  { name: "Twitter Header", ratio: [3, 1], label: "3:1" },
];

export function ResizeContent({ project }: { project: Project }) {
  const { canvasEditor, processingMessage, setProcessingMessage } = useCanvas();
  const [newWidth, setNewWidth] = useState(project?.width || 800);
  const [newHeight, setNewHeight] = useState(project?.height || 600);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const {
    mutate: updateProject,
    data,
    isLoading,
  } = useConvexMutation(api.project.updateProject);

  useEffect(() => {
    if (!isLoading && data) {
      // window.location.reload();
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 500);
    }
  }, [data, isLoading]);

  // Calculate dimensions for aspect ratio based on original canvas size
  const calculateAspectRatioDimensions = (ratio: [number, number]) => {
    if (!project) return { width: 0, height: 0 };

    const [ratioW, ratioH] = ratio;
    const originalArea = project.width * project.height;

    const aspectRatio = ratioW / ratioH;
    const newHeight = Math.sqrt(originalArea / aspectRatio);
    const newWidth = newHeight * aspectRatio;

    return {
      width: Math.round(newWidth),
      height: Math.round(newHeight),
    };
  };

  // Handle width change with aspect ratio lock
  const handleWidthChange = (value: string) => {
    const width = parseInt(value) || 0;
    setNewWidth(width);

    if (lockAspectRatio && project) {
      const ratio = project.height / project.width;
      setNewHeight(Math.round(width * ratio));
    }
    setSelectedPreset(null);
  };

  // Handle height change with aspect ratio lock
  const handleHeightChange = (value: string) => {
    const height = parseInt(value) || 0;
    setNewHeight(height);

    if (lockAspectRatio && project) {
      const ratio = project.width / project.height;
      setNewWidth(Math.round(height * ratio));
    }
    setSelectedPreset(null);
  };

  // Apply aspect ratio preset
  const applyAspectRatio = (aspectRatio: {
    name: string;
    ratio: [number, number];
    label: string;
  }) => {
    const dimensions = calculateAspectRatioDimensions(aspectRatio.ratio);
    setNewWidth(dimensions.width);
    setNewHeight(dimensions.height);
    setSelectedPreset(aspectRatio.name);
  };

  // Calculate viewport scale to fit canvas in container
  const calculateViewportScale = () => {
    if (!canvasEditor) return 1;
    const container = canvasEditor.getElement().parentNode;
    if (!container) return 1;
    const containerWidth = container.clientWidth - 40;
    const containerHeight = container.clientHeight - 40;
    const scaleX = containerWidth / newWidth;
    const scaleY = containerHeight / newHeight;
    return Math.min(scaleX, scaleY, 1);
  };

  // Apply canvas resize
  const handleApplyResize = async () => {
    if (
      !canvasEditor ||
      !project ||
      (newWidth === project.width && newHeight === project.height)
    ) {
      return;
    }

    setProcessingMessage("Resizing canvas...");

    try {
      const canvasState = canvasEditor.toJSON();
      canvasState.width = newWidth;
      canvasState.height = newHeight;

      // Update project in database
      await updateProject({
        projectId: project._id,
        width: newWidth,
        height: newHeight,
        canvasState: canvasState,
      });
    } catch (error) {
      console.error("Error resizing canvas:", error);
      alert("Failed to resize canvas. Please try again.");
    } finally {
      setProcessingMessage(null);
    }
  };

  if (!canvasEditor || !project) {
    return (
      <div className="p-4">
        <p className="text-sm text-white/70">Canvas not ready</p>
      </div>
    );
  }

  const hasChanges = newWidth !== project.width || newHeight !== project.height;

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-neutral-200/50 p-3 ring-1 ring-neutral-400/60 dark:bg-neutral-700/50 dark:ring-neutral-600/80">
        <h4 className="mb-2 text-sm font-medium">Current Size</h4>
        <div className="text-xs opacity-70">
          {project.width} × {project.height} pixels
        </div>
      </div>

      <div className="space-y-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-medium">Custom Size</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLockAspectRatio(!lockAspectRatio)}
            className="p-1 opacity-50 hover:opacity-70"
          >
            {lockAspectRatio ? (
              <Lock className="h-4 w-4" />
            ) : (
              <Unlock className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs opacity-70">Width</label>
            <Input
              type="number"
              value={newWidth}
              onChange={(e) => handleWidthChange(e.target.value)}
              min="100"
              max="5000"
              className="bg-neutral-200/50 ring-1 ring-neutral-400/60 dark:bg-neutral-700/50 dark:ring-neutral-600/80"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs opacity-70">Height</label>
            <Input
              type="number"
              value={newHeight}
              onChange={(e) => handleHeightChange(e.target.value)}
              min="100"
              max="5000"
              className="bg-neutral-200/50 ring-1 ring-neutral-400/60 dark:bg-neutral-700/50 dark:ring-neutral-600/80"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="opacity-70">
            {lockAspectRatio ? "Aspect ratio locked" : "Free resize"}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium ">Aspect Ratios</h3>
        <div className="grid max-h-60 grid-cols-1 gap-2 overflow-y-auto">
          {ASPECT_RATIOS.map((aspectRatio) => {
            const dimensions = calculateAspectRatioDimensions(
              aspectRatio.ratio,
            );
            return (
              <Button
                key={aspectRatio.name}
                variant={
                  selectedPreset === aspectRatio.name ? "default" : "outline"
                }
                size="sm"
                onClick={() => applyAspectRatio(aspectRatio)}
                className={`h-auto justify-between py-2 ${
                  selectedPreset === aspectRatio.name
                    ? "bg-neutral-600 hover:bg-neutral-500"
                    : "text-left"
                }`}
              >
                <div>
                  <div className="font-medium">{aspectRatio.name}</div>
                  <div className="text-xs opacity-70">
                    {dimensions.width} × {dimensions.height} (
                    {aspectRatio.label})
                  </div>
                </div>
                <Monitor className="h-4 w-4" />
              </Button>
            );
          })}
        </div>
      </div>

      {hasChanges && (
        <div className="rounded-lg bg-neutral-200/50 p-3 ring-1 ring-neutral-400/60 dark:bg-neutral-700/50 dark:ring-neutral-600/80">
          <h4 className="mb-2 text-sm font-medium ">
            New Size Preview
          </h4>
          <div className="text-xs opacity-70">
            <div>
              New Canvas: {newWidth} × {newHeight} pixels
            </div>
            <div className="text-red-500">
              {newWidth > project.width || newHeight > project.height
                ? "Canvas will be expanded"
                : "Canvas will be cropped"}
            </div>
            <div className="mt-1 text-black/60 dark:text-white/60">
              Objects will maintain their current size and position
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={handleApplyResize}
        disabled={!hasChanges || !!processingMessage}
        className="w-full"
        variant="default"
      >
        <Expand className="mr-2 h-4 w-4" />
        Apply Resize
      </Button>
    </div>
  );
}
