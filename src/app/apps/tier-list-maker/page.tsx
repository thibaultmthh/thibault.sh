"use client";

import { useState, DragEvent, useCallback, useRef } from "react";
import Image from "next/image";
import { useLocalStorageState } from "@thibault.sh/hooks/useLocalStorageState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Download, Edit2, Plus, RotateCcw, GripVertical, Check } from "lucide-react";

interface TierItem {
  id: string;
  imageUrl: string;
  name?: string;
}

interface Tier {
  id: string;
  label: string;
  color: string;
  items: TierItem[];
}

interface TierListData {
  tiers: Tier[];
  images: TierItem[];
  title: string;
}

const DEFAULT_COLORS = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-gray-500",
];

// Fallback hex colors for export compatibility
const COLOR_HEX_MAP: Record<string, string> = {
  "bg-red-500": "#ef4444",
  "bg-orange-500": "#f97316",
  "bg-yellow-500": "#eab308",
  "bg-green-500": "#22c55e",
  "bg-blue-500": "#3b82f6",
  "bg-purple-500": "#a855f7",
  "bg-pink-500": "#ec4899",
  "bg-gray-500": "#6b7280",
};

const DEFAULT_TIERS: Tier[] = [
  { id: "s", label: "S", color: "bg-red-500", items: [] },
  { id: "a", label: "A", color: "bg-orange-500", items: [] },
  { id: "b", label: "B", color: "bg-yellow-500", items: [] },
  { id: "c", label: "C", color: "bg-green-500", items: [] },
  { id: "d", label: "D", color: "bg-blue-500", items: [] },
];

export default function TierListMaker() {
  const [tierListData, setTierListData] = useLocalStorageState<TierListData>("tier-list-data", {
    tiers: DEFAULT_TIERS,
    images: [],
    title: "My Tier List",
  });

  const [editingTier, setEditingTier] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState(false);
  const [draggedOverTier, setDraggedOverTier] = useState<string | null>(null);
  const tierListRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;

      try {
        // Process all files and collect the results
        const newItems = await Promise.all(
          Array.from(files).map((file) => {
            return new Promise<TierItem>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = (e) => {
                const imageUrl = e.target?.result as string;
                if (imageUrl) {
                  resolve({
                    id: crypto.randomUUID(),
                    imageUrl,
                    name: file.name.split(".")[0],
                  });
                } else {
                  reject(new Error(`Failed to read file: ${file.name}`));
                }
              };
              reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`));
              reader.readAsDataURL(file);
            });
          })
        );

        // Update state once with all new items
        setTierListData((prev) => ({
          ...prev,
          images: [...prev.images, ...newItems],
        }));
      } catch (error) {
        console.error("Error uploading files:", error);
        alert("Some files failed to upload. Please try again.");
      }

      // Reset the input value so the same files can be uploaded again if needed
      event.target.value = "";
    },
    [setTierListData]
  );

  const handleDragStart = useCallback((e: DragEvent, item: TierItem) => {
    e.dataTransfer.setData("itemId", item.id);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent, tierId: string) => {
      e.preventDefault();
      setDraggedOverTier(null);
      const itemId = e.dataTransfer.getData("itemId");

      setTierListData((prev) => {
        // Remove item from current location
        const updatedTiers = prev.tiers.map((tier) => ({
          ...tier,
          items: tier.items.filter((item) => item.id !== itemId),
        }));

        // Try to find the item in both the images pool and existing tiers
        const draggedItem =
          prev.images.find((item) => item.id === itemId) ||
          prev.tiers.flatMap((tier) => tier.items).find((item) => item.id === itemId);

        if (draggedItem) {
          // Find target tier and add item
          const tierIndex = updatedTiers.findIndex((tier) => tier.id === tierId);
          if (tierIndex !== -1) {
            updatedTiers[tierIndex].items.push(draggedItem);
          }

          return {
            ...prev,
            tiers: updatedTiers,
            images: prev.images.filter((item) => item.id !== itemId),
          };
        }

        return prev;
      });
    },
    [setTierListData]
  );

  const handleDragOver = useCallback((e: DragEvent, tierId?: string) => {
    e.preventDefault();
    if (tierId) {
      setDraggedOverTier(tierId);
    }
  }, []);

  const handleDragLeave = useCallback(() => {
    setDraggedOverTier(null);
  }, []);

  const handleDropToPool = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      const itemId = e.dataTransfer.getData("itemId");

      setTierListData((prev) => {
        // Find the item in the tiers
        const draggedItem = prev.tiers.flatMap((tier) => tier.items).find((item) => item.id === itemId);

        if (draggedItem) {
          // Remove from tiers
          const updatedTiers = prev.tiers.map((tier) => ({
            ...tier,
            items: tier.items.filter((item) => item.id !== itemId),
          }));

          return {
            ...prev,
            tiers: updatedTiers,
            images: [...prev.images, draggedItem],
          };
        }
        return prev;
      });
    },
    [setTierListData]
  );

  // Tier editing functions
  const addTier = useCallback(() => {
    const newTier: Tier = {
      id: crypto.randomUUID(),
      label: "New Tier",
      color: DEFAULT_COLORS[tierListData.tiers.length % DEFAULT_COLORS.length],
      items: [],
    };
    setTierListData((prev) => ({
      ...prev,
      tiers: [...prev.tiers, newTier],
    }));
  }, [tierListData.tiers.length, setTierListData]);

  const deleteTier = useCallback(
    (tierId: string) => {
      setTierListData((prev) => {
        const tierToDelete = prev.tiers.find((t) => t.id === tierId);
        return {
          ...prev,
          tiers: prev.tiers.filter((t) => t.id !== tierId),
          images: tierToDelete ? [...prev.images, ...tierToDelete.items] : prev.images,
        };
      });
    },
    [setTierListData]
  );

  const updateTierLabel = useCallback(
    (tierId: string, newLabel: string) => {
      setTierListData((prev) => ({
        ...prev,
        tiers: prev.tiers.map((tier) => (tier.id === tierId ? { ...tier, label: newLabel } : tier)),
      }));
    },
    [setTierListData]
  );

  const updateTierColor = useCallback(
    (tierId: string, newColor: string) => {
      setTierListData((prev) => ({
        ...prev,
        tiers: prev.tiers.map((tier) => (tier.id === tierId ? { ...tier, color: newColor } : tier)),
      }));
    },
    [setTierListData]
  );

  const updateTitle = useCallback(
    (newTitle: string) => {
      setTierListData((prev) => ({
        ...prev,
        title: newTitle,
      }));
    },
    [setTierListData]
  );

  const clearAll = useCallback(() => {
    setTierListData((prev) => ({
      ...prev,
      tiers: prev.tiers.map((tier) => ({ ...tier, items: [] })),
      images: [...prev.images, ...prev.tiers.flatMap((tier) => tier.items)],
    }));
  }, [setTierListData]);

  const resetToDefault = useCallback(() => {
    setTierListData({
      tiers: DEFAULT_TIERS,
      images: [],
      title: "My Tier List",
    });
  }, [setTierListData]);

  // Simplified and reliable export functionality
  const exportToImage = useCallback(async () => {
    const exportButton = document.querySelector("[data-export-button]") as HTMLButtonElement;
    const originalText = exportButton?.textContent || "Export Image";

    try {
      // Show loading state
      if (exportButton) {
        exportButton.textContent = "Exporting...";
        exportButton.disabled = true;
      }

      if (!tierListRef.current) {
        throw new Error("Tier list reference not found");
      }

      console.log("Starting export process...");

      // Create a temporary container for export
      const exportContainer = document.createElement("div");
      exportContainer.style.position = "absolute";
      exportContainer.style.left = "-9999px";
      exportContainer.style.top = "-9999px";
      exportContainer.style.width = "1400px";
      exportContainer.style.background = "#ffffff";
      exportContainer.style.padding = "40px";
      exportContainer.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

      // Clone the tier list content
      const clone = tierListRef.current.cloneNode(true) as HTMLElement;

      // Remove all buttons and controls from the clone
      const buttonsAndControls = clone.querySelectorAll("button, .tier-controls, [data-export-button]");
      buttonsAndControls.forEach((element) => element.remove());

      // Style the clone for better export appearance
      clone.style.width = "100%";
      clone.style.maxWidth = "none";
      clone.style.backgroundColor = "#ffffff";
      clone.style.border = "none";
      clone.style.boxShadow = "none";

      // Add footer to clone
      const footer = document.createElement("div");
      footer.style.marginTop = "30px";
      footer.style.padding = "20px 0";
      footer.style.borderTop = "1px solid #e2e8f0";
      footer.style.textAlign = "center";
      footer.style.fontSize = "14px";
      footer.style.color = "#64748b";
      footer.textContent = "Created with thibault.sh/apps/tier-list-maker";

      exportContainer.appendChild(clone);
      exportContainer.appendChild(footer);
      document.body.appendChild(exportContainer);

      // Use html2canvas with optimized settings
      const html2canvas = (await import("html2canvas")).default;

      console.log("Rendering with html2canvas...");

      const canvas = await html2canvas(exportContainer, {
        backgroundColor: "#ffffff",
        scale: 2, // High resolution
        useCORS: false, // Disable CORS to avoid data URL issues
        allowTaint: true, // Allow tainted canvas for data URLs
        foreignObjectRendering: false, // Disable for better compatibility
        logging: false,
        width: 1400,
        onclone: (clonedDoc) => {
          // Additional cleanup in cloned document
          const allButtons = clonedDoc.querySelectorAll("button, .tier-controls");
          allButtons.forEach((btn) => btn.remove());

          // Ensure images are visible
          const allImages = clonedDoc.querySelectorAll("img");
          allImages.forEach((img) => {
            img.style.display = "block";
            img.style.visibility = "visible";
          });
        },
      });

      // Clean up temporary container
      document.body.removeChild(exportContainer);

      console.log("Export rendered successfully, downloading...");

      // Download the image
      const link = document.createElement("a");
      const timestamp = new Date().toISOString().slice(0, 10);
      link.download = `${tierListData.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_tierlist_${timestamp}.png`;
      link.href = canvas.toDataURL("image/png", 0.95);

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log("Export completed successfully!");

      // Show success message briefly
      if (exportButton) {
        exportButton.textContent = "✓ Downloaded!";
        setTimeout(() => {
          if (exportButton) {
            exportButton.textContent = originalText;
          }
        }, 2000);
      }
    } catch (error) {
      console.error("Export failed:", error);

      // Show error message
      if (exportButton) {
        exportButton.textContent = "Export Failed";
        setTimeout(() => {
          if (exportButton) {
            exportButton.textContent = originalText;
          }
        }, 3000);
      }

      // User-friendly error message
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      alert(
        `Export failed: ${errorMsg}\n\nTips:\n- Try with fewer/smaller images\n- Check browser console for details\n- Refresh the page and try again`
      );
    } finally {
      // Always re-enable the button
      if (exportButton) {
        exportButton.disabled = false;
      }
    }
  }, [tierListData]);

  return (
    <div className="p-6 w-full min-h-screen bg-gray-100">
      {/* Header with title editing */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          {editingTitle ? (
            <div className="flex items-center gap-2">
              <Input
                value={tierListData.title}
                onChange={(e) => updateTitle(e.target.value)}
                className="text-3xl font-bold text-center"
                onBlur={() => setEditingTitle(false)}
                onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)}
                autoFocus
              />
              <Button size="sm" onClick={() => setEditingTitle(false)} className="bg-green-500 hover:bg-green-600">
                <Check className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h1 className="text-4xl font-bold text-gray-800">{tierListData.title}</h1>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingTitle(true)}
                className="opacity-60 hover:opacity-100"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Create and customize your own tier lists with our enhanced drag-and-drop interface. Edit tiers, customize
          colors, and export your finished tier list as an image.
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          <Button onClick={exportToImage} className="bg-blue-600 hover:bg-blue-700 text-sm" data-export-button>
            <Download className="w-4 h-4 mr-1" />
            Export Image
          </Button>
          <Button variant="outline" onClick={addTier} className="text-sm">
            <Plus className="w-4 h-4 mr-1" />
            Add Tier
          </Button>
          <Button variant="outline" onClick={clearAll} className="text-sm">
            <RotateCcw className="w-4 h-4 mr-1" />
            Clear All
          </Button>
          <Button variant="outline" onClick={resetToDefault} className="text-sm">
            <Trash2 className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side - Tier List */}
        <div className="flex-1">
          <div ref={tierListRef} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">{tierListData.title}</h2>
            </div>

            {tierListData.tiers.map((tier) => (
              <div key={tier.id} className="mb-2">
                <div
                  className={`flex rounded-lg shadow-sm overflow-hidden border transition-all ${
                    draggedOverTier === tier.id ? "border-blue-400 bg-blue-50" : "border-gray-200"
                  } ${editingTier === tier.id ? "ring-2 ring-blue-300" : ""}`}
                >
                  {/* Tier label with editing */}
                  <div
                    className={`w-24 flex items-center justify-center ${tier.color} px-3 py-2 relative group`}
                    style={{ backgroundColor: COLOR_HEX_MAP[tier.color] }}
                  >
                    {editingTier === tier.id ? (
                      <Input
                        value={tier.label}
                        onChange={(e) => updateTierLabel(tier.id, e.target.value)}
                        className="text-white font-bold text-lg text-center bg-transparent border-white/30 h-8"
                        onBlur={() => setEditingTier(null)}
                        onKeyDown={(e) => e.key === "Enter" && setEditingTier(null)}
                        autoFocus
                      />
                    ) : (
                      <span
                        className="font-bold text-white text-lg cursor-pointer select-none hover:text-white/90 transition-colors"
                        onClick={() => setEditingTier(tier.id)}
                        title="Click to edit"
                      >
                        {tier.label}
                      </span>
                    )}

                    {/* Tier controls - always visible on hover */}
                    <div className="absolute top-0 right-0 p-1 tier-controls opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex gap-0.5">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 text-white hover:bg-white/20 rounded-full"
                          onClick={() => setEditingTier(tier.id)}
                          title="Edit tier"
                        >
                          <Edit2 className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 text-white hover:bg-red-500/20 rounded-full"
                          onClick={() => deleteTier(tier.id)}
                          disabled={tierListData.tiers.length <= 1}
                          title="Delete tier"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Tier content */}
                  <div
                    className="flex-1 min-h-[80px] p-2 flex flex-wrap gap-2 bg-gray-50/30 transition-colors hover:bg-gray-50/60"
                    onDrop={(e) => handleDrop(e, tier.id)}
                    onDragOver={(e) => handleDragOver(e, tier.id)}
                    onDragLeave={handleDragLeave}
                  >
                    {tier.items.map((item) => (
                      <div
                        key={item.id}
                        className="w-16 h-16 relative cursor-move rounded-md overflow-hidden shadow-sm
                                  transition-all hover:scale-105 hover:shadow-md active:scale-95 
                                  border border-gray-200 hover:border-gray-300"
                        draggable
                        onDragStart={(e) => handleDragStart(e, item)}
                        title={item.name}
                      >
                        <Image src={item.imageUrl} alt={item.name || "Tier item"} fill className="object-cover" />
                      </div>
                    ))}
                    {tier.items.length === 0 && (
                      <div className="flex-1 flex items-center justify-center text-gray-400 text-xs">
                        Drag items here
                      </div>
                    )}
                  </div>
                </div>

                {/* Inline editing panel */}
                {editingTier === tier.id && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex flex-wrap items-center gap-4">
                      {/* Label editing */}
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-700">Label:</label>
                        <Input
                          value={tier.label}
                          onChange={(e) => updateTierLabel(tier.id, e.target.value)}
                          className="w-24 h-8 text-sm"
                          placeholder="Tier name"
                        />
                      </div>

                      {/* Color picker */}
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-700">Color:</label>
                        <div className="flex gap-1">
                          {DEFAULT_COLORS.map((color) => (
                            <button
                              key={color}
                              className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-110 ${color} ${
                                tier.color === color
                                  ? "border-gray-800 scale-110 shadow-md"
                                  : "border-gray-300 hover:border-gray-400"
                              }`}
                              onClick={() => updateTierColor(tier.id, color)}
                              title={`Select ${color.replace("bg-", "").replace("-500", "")} color`}
                              style={{ backgroundColor: COLOR_HEX_MAP[color] }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 ml-auto">
                        <Button size="sm" variant="outline" onClick={() => setEditingTier(null)} className="h-8">
                          <Check className="w-3 h-3 mr-1" />
                          Done
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Upload and Image Pool */}
        <div className="w-full lg:w-80 space-y-3">
          {/* Upload section */}
          <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-200">
            <label className="mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Upload Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="block w-full text-xs text-gray-500
                file:mr-2 file:py-1.5 file:px-3
                file:rounded-md file:border-0
                file:text-xs file:font-medium
                file:bg-blue-50 file:text-blue-600
                hover:file:bg-blue-100
                cursor-pointer transition-colors"
            />
            <p className="text-xs text-gray-500 mt-1">JPG, PNG, GIF, WebP</p>
          </div>

          {/* Stats */}
          <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-medium text-gray-700 mb-2 text-sm">Statistics</h3>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <div className="font-semibold text-gray-900">
                  {tierListData.images.length + tierListData.tiers.reduce((sum, tier) => sum + tier.items.length, 0)}
                </div>
                <div className="text-gray-500">Total</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900">{tierListData.images.length}</div>
                <div className="text-gray-500">Pool</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900">
                  {tierListData.tiers.reduce((sum, tier) => sum + tier.items.length, 0)}
                </div>
                <div className="text-gray-500">Ranked</div>
              </div>
            </div>
          </div>

          {/* Image Pool */}
          <div
            className="p-3 bg-white rounded-lg shadow-sm border border-gray-200"
            onDrop={handleDropToPool}
            onDragOver={handleDragOver}
          >
            <h2 className="text-sm font-medium mb-2 text-gray-700 flex items-center gap-2">
              <GripVertical className="w-4 h-4" />
              <span>Image Pool</span>
            </h2>
            <p className="text-xs text-gray-500 mb-2">Drop items here to remove from tiers</p>
            <div className="flex flex-wrap gap-2 min-h-[100px] bg-gray-50/50 rounded-lg p-2">
              {tierListData.images.map((image) => (
                <div
                  key={image.id}
                  className="w-16 h-16 relative cursor-move rounded-md overflow-hidden shadow-sm
                            transition-all hover:scale-105 hover:shadow-md active:scale-95
                            border border-gray-200 hover:border-gray-300"
                  draggable
                  onDragStart={(e) => handleDragStart(e, image)}
                  title={image.name}
                >
                  <Image src={image.imageUrl} alt={image.name || "Pool item"} fill className="object-cover" />
                </div>
              ))}
              {tierListData.images.length === 0 && (
                <div className="flex-1 flex items-center justify-center text-gray-400 text-sm min-h-[80px]">
                  Upload images or drop items here
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-800 mb-2 text-sm">Quick Tips</h3>
            <ul className="text-xs text-blue-700 space-y-0.5">
              <li>• Click tier labels to edit</li>
              <li>• Hover tiers to see controls</li>
              <li>• Add tiers with + button</li>
              <li>• Export as image when done</li>
              <li>• Progress auto-saves</li>
            </ul>
          </div>

          {/* Export help */}
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-medium text-green-800 mb-2 text-sm">Export Ready!</h3>
            <ul className="text-xs text-green-700 space-y-0.5">
              <li>• High-quality PNG with website attribution</li>
              <li>• All uploaded images included automatically</li>
              <li>• Button shows progress during export</li>
              <li>• Check Downloads folder for saved file</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Simple SEO Content */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Free Online Tier List Maker</h2>
          <p className="text-gray-600 mb-6">
            Create professional tier lists with our easy-to-use tier list maker. Upload images, customize tier colors
            and labels, then drag and drop to rank your items. Perfect for gaming characters, movies, food, or any
            ranking project. Export high-quality images and save your progress automatically.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span>✓ Free tier list generator</span>
            <span>✓ Custom tier rankings</span>
            <span>✓ HD image export</span>
            <span>✓ Auto-save progress</span>
            <span>✓ Mobile-friendly design</span>
          </div>
        </div>
      </div>
    </div>
  );
}
