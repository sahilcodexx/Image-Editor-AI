"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Crop,
  CheckCheck,
  X,
  Square,
  RectangleHorizontal,
  RectangleVertical,
  Smartphone,
  Maximize,
} from "lucide-react";
import { useCanvas } from "@/context/context";
import fabric, { FabricImage, Rect } from "fabric";

// Define an interface for the original image properties
interface OriginalImageProps {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  scaleX?: number;
  scaleY?: number;
  angle?: number;
  selectable?: boolean;
  evented?: boolean;
}

const ASPECT_RATIOS = [
  { label: "Freeform", value: null, icon: Maximize },
  { label: "Square", value: 1, icon: Square, ratio: "1:1" },
  {
    label: "Widescreen",
    value: 16 / 9,
    icon: RectangleHorizontal,
    ratio: "16:9",
  },
  { label: "Portrait", value: 4 / 5, icon: RectangleVertical, ratio: "4:5" },
  { label: "Story", value: 9 / 16, icon: Smartphone, ratio: "9:16" },
];

export function CropContent() {
  const { canvasEditor, activeTool } = useCanvas();

  const [selectedImage, setSelectedImage] = useState<FabricImage | null>(null);
  const [isCropMode, setIsCropMode] = useState(false);
  const [selectedRatio, setSelectedRatio] = useState<number | null>(null);
  const [cropRect, setCropRect] = useState<Rect | null>(null);
  const [originalProps, setOriginalProps] = useState<OriginalImageProps | null>(
    null,
  );

  // Get the currently selected or main image
  const getActiveImage = (): FabricImage | null => {
    if (!canvasEditor) return null;

    const activeObject = canvasEditor.getActiveObject();
    if (activeObject && activeObject.type === "image") {
      return activeObject as FabricImage;
    }

    const objects = canvasEditor.getObjects();
    return (
      (objects.find(
        (obj: fabric.Object) => obj.type === "image",
      ) as FabricImage) || null
    );
  };

  // Remove all Rect objects from canvas (cleanup crop rectangles)
  const removeAllCropRectangles = () => {
    if (!canvasEditor) return;

    const objects = canvasEditor.getObjects();
    const rectsToRemove = objects.filter(
      (obj: fabric.Object) => obj.type === "rect",
    );

    rectsToRemove.forEach((rect: any) => {
      canvasEditor.remove(rect);
    });

    canvasEditor.requestRenderAll();
  };

  // Initialize crop mode when tool becomes active
  useEffect(() => {
    if (activeTool === "crop" && canvasEditor) {
      const image = getActiveImage();
      if (image && !isCropMode) {
        initializeCropMode(image);
      }
    } else if (activeTool !== "crop" && isCropMode) {
      exitCropMode();
    }
  }, [activeTool, canvasEditor, isCropMode]);

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (isCropMode) {
        exitCropMode();
      }
    };
  }, [isCropMode]);

  // Initialize crop mode
  const initializeCropMode = (image: FabricImage) => {
    if (!image || isCropMode) return;

    // First, remove any existing crop rectangles
    removeAllCropRectangles();

    // Store original image properties
    const original: OriginalImageProps = {
      left: image.left,
      top: image.top,
      width: image.width,
      height: image.height,
      scaleX: image.scaleX,
      scaleY: image.scaleY,
      angle: image.angle || 0,
      selectable: image.selectable,
      evented: image.evented,
    };

    setOriginalProps(original);
    setSelectedImage(image);
    setIsCropMode(true);

    // Make image non-selectable to prevent default scaling
    image.set({
      selectable: false,
      evented: false,
    });

    // Create crop rectangle overlay
    if (canvasEditor) {
      createCropRectangle(image);
      canvasEditor.requestRenderAll();
    }
  };

  // Create the crop rectangle overlay
  const createCropRectangle = (image: FabricImage) => {
    if (!canvasEditor) return;
    // Calculate image bounds on canvas
    const bounds = image.getBoundingRect();

    const cropRectangle = new Rect({
      left: bounds.left + bounds.width * 0.1,
      top: bounds.top + bounds.height * 0.1,
      width: bounds.width * 0.8,
      height: bounds.height * 0.8,
      fill: "transparent",
      stroke: "#00bcd4",
      strokeWidth: 2,
      strokeDashArray: [5, 5],
      selectable: true,
      evented: true,
      name: "cropRect",
      cornerColor: "#00bcd4",
      cornerSize: 12,
      transparentCorners: false,
      cornerStyle: "circle",
      borderColor: "#00bcd4",
      borderScaleFactor: 1,
    });

    // Add custom control behavior
    cropRectangle.on("scaling", (e: any) => {
      const rect = e.target as Rect;
      if (!rect) return;

      // Apply aspect ratio constraint if selected
      if (selectedRatio && selectedRatio !== null) {
        const currentRatio =
          ((rect.width ?? 0) * (rect.scaleX ?? 1)) /
          ((rect.height ?? 0) * (rect.scaleY ?? 1));
        if (Math.abs(currentRatio - selectedRatio) > 0.01) {
          // Adjust height to maintain ratio
          const newHeight =
            ((rect.width ?? 0) * (rect.scaleX ?? 1)) /
            selectedRatio /
            (rect.scaleY ?? 1);
          rect.set("height", newHeight);
        }
      }

      if (canvasEditor) {
        canvasEditor.requestRenderAll();
      }
    });

    canvasEditor.add(cropRectangle);
    canvasEditor.setActiveObject(cropRectangle);
    setCropRect(cropRectangle);
  };

  // Exit crop mode and cleanup
  const exitCropMode = () => {
    if (!isCropMode) return;

    // Remove ALL rectangles from canvas (since we only use them for cropping)
    removeAllCropRectangles();

    // Clear crop rect reference
    setCropRect(null);

    // Restore original image properties
    if (selectedImage && originalProps) {
      selectedImage.set({
        selectable: originalProps.selectable,
        evented: originalProps.evented,
        // Restore other properties if needed
        left: originalProps.left,
        top: originalProps.top,
        scaleX: originalProps.scaleX,
        scaleY: originalProps.scaleY,
        angle: originalProps.angle,
      });

      // Select the restored image
      if (canvasEditor) {
        canvasEditor.setActiveObject(selectedImage);
      }
    }

    setIsCropMode(false);
    setSelectedImage(null);
    setOriginalProps(null);
    setSelectedRatio(null);

    if (canvasEditor) {
      canvasEditor.requestRenderAll();
    }

    console.log("Crop mode cleanup complete");
  };

  // Apply aspect ratio constraint to crop rectangle
  const applyAspectRatio = (ratio: number | null) => {
    setSelectedRatio(ratio);

    if (!cropRect || ratio === null) return;
    if (!canvasEditor) return;

    // Calculate new dimensions maintaining aspect ratio
    const currentWidth = (cropRect.width ?? 0) * (cropRect.scaleX ?? 1);
    const newHeight = currentWidth / ratio;

    cropRect.set({
      height: newHeight / (cropRect.scaleY ?? 1),
      scaleY: cropRect.scaleX,
    });

    canvasEditor.requestRenderAll();
  };

  // Apply crop transformation using Fabric.js built-in cropping
  const applyCrop = async () => {
    if (!selectedImage || !cropRect || !canvasEditor) return;

    try {
      // Get crop rectangle bounds
      const cropBounds = cropRect.getBoundingRect();
      const imageBounds = selectedImage.getBoundingRect();

      // Calculate crop relative to the original image
      const cropX = Math.max(0, cropBounds.left - imageBounds.left);
      const cropY = Math.max(0, cropBounds.top - imageBounds.top);
      const cropWidth = Math.min(cropBounds.width, imageBounds.width - cropX);
      const cropHeight = Math.min(
        cropBounds.height,
        imageBounds.height - cropY,
      );

      // Convert to image coordinate system (accounting for image scaling)
      const imageScaleX = selectedImage.scaleX || 1;
      const imageScaleY = selectedImage.scaleY || 1;

      const actualCropX = cropX / imageScaleX;
      const actualCropY = cropY / imageScaleY;
      const actualCropWidth = cropWidth / imageScaleX;
      const actualCropHeight = cropHeight / imageScaleY;

      if (!selectedImage._element) {
        throw new Error("Image element not found");
      }

      // Create a new cropped image using Fabric.js cropping
      const croppedImage = new FabricImage(selectedImage._element, {
        left: cropBounds.left + cropBounds.width / 2,
        top: cropBounds.top + cropBounds.height / 2,
        originX: "center",
        originY: "center",
        selectable: true,
        evented: true,
        // Apply crop using Fabric.js crop properties
        cropX: actualCropX,
        cropY: actualCropY,
        width: actualCropWidth,
        height: actualCropHeight,
        scaleX: imageScaleX,
        scaleY: imageScaleY,
      });

      // Replace the original image
      canvasEditor.remove(selectedImage);
      canvasEditor.add(croppedImage);
      canvasEditor.setActiveObject(croppedImage);
      canvasEditor.requestRenderAll();

      // Exit crop mode
      exitCropMode();
    } catch (error) {
      console.error("Error applying crop:", error);
      alert("Failed to apply crop. Please try again.");
      exitCropMode();
    }
  };

  // Cancel crop and reset
  const cancelCrop = () => {
    exitCropMode();
  };

  if (!canvasEditor) {
    return (
      <div className="p-4">
        <p className="text-sm text-white/70">Canvas not ready</p>
      </div>
    );
  }

  const activeImage = getActiveImage();
  if (!activeImage && !isCropMode) {
    return (
      <div className="p-4">
        <p className="text-sm text-white/70">Select an image to crop</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Crop Mode Status */}
      {isCropMode && (
        <div className="rounded-lg bg-neutral-200/50 p-3 ring-1 ring-neutral-400/60 dark:bg-neutral-700/50 dark:ring-neutral-600/80">
          <p className="text-sm font-medium">Crop Mode Active</p>
          <p className="mt-1 text-xs opacity-80">
            Adjust the blue rectangle to set crop area
          </p>
        </div>
      )}

      {/* Start Crop Button */}
      {!isCropMode && activeImage && (
        <Button
          onClick={() => initializeCropMode(activeImage)}
          className="w-full"
          variant="default"
        >
          <Crop className="mr-2 h-4 w-4" />
          Start Cropping
        </Button>
      )}

      {/* Aspect Ratio Selection - Only show in crop mode */}
      {isCropMode && (
        <div>
          <h3 className="mb-3 text-sm font-medium">Crop Aspect Ratios</h3>
          <div className="grid grid-cols-3 gap-2">
            {ASPECT_RATIOS.map((ratio) => {
              const IconComponent = ratio.icon;
              return (
                <button
                  key={ratio.label}
                  onClick={() => applyAspectRatio(ratio.value)}
                  className={`cursor-pointer rounded-lg border p-3 text-center transition-colors ${
                    selectedRatio === ratio.value
                      ? "bg-neutral-200/70 ring-1 ring-neutral-400/60 dark:bg-neutral-700/50 dark:ring-neutral-600/80"
                      : "border-black/10 opacity-70 hover:border-black hover:bg-white/5 dark:border-white/20 dark:hover:border-white/40"
                  }`}
                >
                  <IconComponent className="mx-auto mb-2 h-6 w-6 text-black/80 dark:text-white" />
                  <div className="text-xs">{ratio.label}</div>
                  {ratio.ratio && (
                    <div className="text-xs opacity-70">{ratio.ratio}</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Crop Actions - Only show in crop mode */}
      {isCropMode && (
        <div className="space-y-3 border-t border-white/10 pt-4">
          <Button onClick={applyCrop} className="w-full" variant="default">
            <CheckCheck className="mr-2 h-4 w-4" />
            Apply Crop
          </Button>

          <Button onClick={cancelCrop} variant="outline" className="w-full">
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        </div>
      )}

      {/* Instructions */}
      <div className="rounded-lg bg-neutral-200/50 p-3 ring-1 ring-neutral-400/60 dark:bg-neutral-700/50 dark:ring-neutral-600/80">
        <p className="text-xs opacity-70">
          <strong>How to crop:</strong>
          <br />
          1. Click "Start Cropping"
          <br />
          2. Drag the blue rectangle to select crop area
          <br />
          3. Choose aspect ratio (optional)
          <br />
          4. Click "Apply Crop" to finalize
        </p>
      </div>
    </div>
  );
}
