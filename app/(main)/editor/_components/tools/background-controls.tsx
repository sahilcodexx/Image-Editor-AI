"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trash2,
  Palette,
  Image as ImageIcon,
  Search,
  Download,
  Loader2,
  Check,
} from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { useCanvas } from "@/context/context";
import fabric, { FabricImage } from "fabric";
import { Project } from "@/utils/types";

// Unsplash API configuration
const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
const UNSPLASH_API_URL = "https://api.unsplash.com";

export function BackgroundControls({ project }: { project: Project }) {
  const { canvasEditor, processingMessage, setProcessingMessage } = useCanvas();
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [searchQuery, setSearchQuery] = useState("");
  const [unsplashImages, setUnsplashImages] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  // Get the main image object from canvas
  const getMainImage = () => {
    if (!canvasEditor) return null;
    const objects = canvasEditor.getObjects();
    return objects.find((obj: fabric.Object) => obj.type === "image") || null;
  };

  // Background removal using ImageKit
  const handleBackgroundRemoval = async () => {
    const mainImage = getMainImage();
    if (!mainImage || !project) return;

    setProcessingMessage("Removing background with AI...");

    try {
      // Get the current image URL
      const currentImageUrl =
        project.currentImageUrl || project.originalImageUrl;

      // Handle case where no image URL is available
      if (!currentImageUrl) {
        setProcessingMessage(null);
        alert("No image found to remove background from");
        return;
      }

      // Create ImageKit transformation URL for background removal
      const bgRemovedUrl = currentImageUrl.includes("ik.imagekit.io")
        ? `${currentImageUrl.split("?")[0]}?tr=e-bgremove`
        : currentImageUrl;

      // Create new image with background removed
      const processedImage = await FabricImage.fromURL(bgRemovedUrl, {
        crossOrigin: "anonymous",
      });

      // Store the current properties before removing the old image
      const currentProps = {
        left: mainImage.left,
        top: mainImage.top,
        scaleX: mainImage.scaleX,
        scaleY: mainImage.scaleY,
        angle: mainImage.angle,
        originX: mainImage.originX,
        originY: mainImage.originY,
      };

      // Remove the old image and add the new one
      canvasEditor.remove(mainImage);
      processedImage.set(currentProps);
      canvasEditor.add(processedImage);

      // IMPORTANT: Update coordinates after replacing the image
      processedImage.setCoords();

      // Set as active object and recalculate canvas offset
      canvasEditor.setActiveObject(processedImage);
      canvasEditor.calcOffset();
      canvasEditor.requestRenderAll();

      console.log("Background removed successfully");
    } catch (error) {
      console.error("Error removing background:", error);
      alert("Failed to remove background. Please try again.");
    } finally {
      setProcessingMessage(null);
    }
  };

  // Set canvas background color
  const handleColorBackground = () => {
    if (!canvasEditor) return;

    // In Fabric.js 6.7, set property directly and render
    canvasEditor.backgroundColor = backgroundColor;
    canvasEditor.requestRenderAll();
  };

  // Remove canvas background (both color and image)
  const handleRemoveBackground = () => {
    if (!canvasEditor) return;

    // Clear both background color and image
    canvasEditor.backgroundColor = null;
    canvasEditor.backgroundImage = null;
    canvasEditor.requestRenderAll();
  };

  // Search Unsplash images
  const searchUnsplashImages = async () => {
    if (!searchQuery.trim() || !UNSPLASH_ACCESS_KEY) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `${UNSPLASH_API_URL}/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=12`,
        {
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        },
      );

      if (!response.ok) throw new Error("Failed to search images");

      const data = await response.json();
      setUnsplashImages(data.results || []);
    } catch (error) {
      console.error("Error searching Unsplash:", error);
      alert("Failed to search images. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  // Set image as canvas background
  const handleImageBackground = async (imageUrl: string, imageId: string) => {
    if (!canvasEditor) return;

    setSelectedImageId(imageId);
    try {
      // Download and trigger Unsplash download endpoint (required by Unsplash API)
      if (UNSPLASH_ACCESS_KEY) {
        fetch(`${UNSPLASH_API_URL}/photos/${imageId}/download`, {
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        }).catch(() => {}); // Silent fail for download tracking
      }

      // Create fabric image from URL
      const fabricImage: fabric.Image = await FabricImage.fromURL(imageUrl, {
        crossOrigin: "anonymous",
      });

      // USE PROJECT DIMENSIONS instead of canvas dimensions for proper scaling
      const canvasWidth: number = project.width; // Logical canvas width
      const canvasHeight: number = project.height; // Logical canvas height

      // Calculate scales
      const scaleX: number = canvasWidth / fabricImage.width;
      const scaleY: number = canvasHeight / fabricImage.height;

      // Use Math.max to FILL the entire canvas (ensures no empty space)
      const scale: number = Math.max(scaleX, scaleY);

      fabricImage.set({
        scaleX: scale,
        scaleY: scale,
        originX: "center",
        originY: "center",
        left: canvasWidth / 2, // Use project dimensions
        top: canvasHeight / 2, // Use project dimensions
      });

      // Set background and render
      canvasEditor.backgroundImage = fabricImage;
      canvasEditor.requestRenderAll();
      setSelectedImageId(null);

      console.log("Background set:", {
        imageSize: `${fabricImage.width}x${fabricImage.height}`,
        canvasSize: `${canvasWidth}x${canvasHeight}`,
        scale: scale,
        finalSize: `${fabricImage.width * scale}x${fabricImage.height * scale}`,
      });
    } catch (error) {
      console.error("Error setting background image:", error);
      alert("Failed to set background image. Please try again.");
      setSelectedImageId(null);
    }
  };

  // Handle search on Enter key
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchUnsplashImages();
    }
  };

  if (!canvasEditor) {
    return (
      <div className="p-4">
        <p className="text-sm text-white/70">Canvas not ready</p>
      </div>
    );
  }

  return (
    <div className="relative h-full space-y-6">
      {/* AI Background Removal Button - Outside of tabs */}
      <div className="space-y-4 border-b border-white/10 pb-4">
        <div>
          <h3 className="mb-2 text-sm font-medium text-white">
            AI Background Removal
          </h3>
          <p className="mb-4 text-xs text-white/70">
            Automatically remove the background from your image using AI
          </p>
        </div>

        <Button
          onClick={handleBackgroundRemoval}
          disabled={!processingMessage || !getMainImage()}
          className="w-full"
          variant="default"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Remove Image Background
        </Button>

        {!getMainImage() && (
          <p className="text-xs text-amber-400">
            Please add an image to the canvas first to remove its background
          </p>
        )}
      </div>

      {/* Shadcn UI Tabs */}
      <Tabs defaultValue="color" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-slate-700/50">
          <TabsTrigger
            value="color"
            className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
          >
            <Palette className="mr-2 h-4 w-4" />
            Color
          </TabsTrigger>
          <TabsTrigger
            value="image"
            className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Image
          </TabsTrigger>
        </TabsList>

        {/* Color Background Tab */}
        <TabsContent value="color" className="mt-6 space-y-4">
          <div>
            <h3 className="mb-2 text-sm font-medium text-white">
              Solid Color Background
            </h3>
            <p className="mb-4 text-xs text-white/70">
              Choose a solid color for your canvas background
            </p>
          </div>

          <div className="space-y-4">
            <HexColorPicker
              color={backgroundColor}
              onChange={setBackgroundColor}
              style={{ width: "100%" }}
            />

            <div className="flex items-center gap-2">
              <Input
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                placeholder="#ffffff"
                className="flex-1 border-white/20 bg-slate-700 text-white"
              />
              <div
                className="h-10 w-10 rounded border border-white/20"
                style={{ backgroundColor }}
              />
            </div>

            <Button
              onClick={handleColorBackground}
              className="w-full"
              variant="default"
            >
              <Palette className="mr-2 h-4 w-4" />
              Apply Color
            </Button>
          </div>
        </TabsContent>

        {/* Image Background Tab */}
        <TabsContent value="image" className="mt-6 space-y-4">
          <div>
            <h3 className="mb-2 text-sm font-medium text-white">
              Image Background
            </h3>
            <p className="mb-4 text-xs text-white/70">
              Search and use high-quality images from Unsplash
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              placeholder="Search for backgrounds..."
              className="flex-1 border-white/20 bg-slate-700 text-white"
            />
            <Button
              onClick={searchUnsplashImages}
              disabled={isSearching || !searchQuery.trim()}
              variant="default"
            >
              {isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Search Results */}
          {unsplashImages && unsplashImages.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-white">
                Search Results ({unsplashImages?.length})
              </h4>
              <div className="grid max-h-96 grid-cols-2 gap-3 overflow-y-auto">
                {unsplashImages.map((image) => (
                  <div
                    key={image.id}
                    className="group relative cursor-pointer overflow-hidden rounded-lg border border-white/10 transition-colors hover:border-cyan-400"
                    onClick={() =>
                      handleImageBackground(image.urls.regular, image.id)
                    }
                  >
                    <img
                      src={image.urls.small}
                      alt={image.alt_description || "Background image"}
                      className="h-24 w-full object-cover"
                    />

                    {/* Loading overlay */}
                    {selectedImageId === image.id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Loader2 className="h-5 w-5 animate-spin text-white" />
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-colors group-hover:bg-black/30 group-hover:opacity-100">
                      <Download className="h-5 w-5 text-white" />
                    </div>

                    {/* Attribution */}
                    <div className="absolute right-0 bottom-0 left-0 bg-black/70 p-1">
                      <p className="truncate text-xs text-white/80">
                        by {image.user.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {!isSearching && unsplashImages?.length === 0 && searchQuery && (
            <div className="py-8 text-center">
              <ImageIcon className="mx-auto mb-3 h-12 w-12 text-white/30" />
              <p className="text-sm text-white/70">
                No images found for "{searchQuery}"
              </p>
              <p className="text-xs text-white/50">
                Try a different search term
              </p>
            </div>
          )}

          {/* Initial state */}
          {!searchQuery && unsplashImages?.length === 0 && (
            <div className="py-8 text-center">
              <Search className="mx-auto mb-3 h-12 w-12 text-white/30" />
              <p className="text-sm text-white/70">
                Search for background images
              </p>
              <p className="text-xs text-white/50">Powered by Unsplash</p>
            </div>
          )}

          {/* API key warning */}
          {!UNSPLASH_ACCESS_KEY && (
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-3">
              <p className="text-xs text-amber-400">
                Unsplash API key not configured. Please add
                NEXT_PUBLIC_UNSPLASH_ACCESS_KEY to your environment variables.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Clear Canvas Background Button - At the bottom */}
      <div className="bottom-0 w-full border-t border-white/10 pt-4">
        <Button
          onClick={handleRemoveBackground}
          className="w-full"
          variant="outline"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear Canvas Background
        </Button>
      </div>
    </div>
  );
}
