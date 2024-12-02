"use client";

import { useState, DragEvent, useCallback } from "react";
import Image from "next/image";

interface TierItem {
  id: string;
  imageUrl: string;
}

interface Tier {
  label: string;
  color: string;
  items: TierItem[];
}

export default function TierListMaker() {
  const [tiers, setTiers] = useState<Tier[]>([
    { label: "S", color: "bg-red-400", items: [] },
    { label: "A", color: "bg-orange-400", items: [] },
    { label: "B", color: "bg-yellow-400", items: [] },
    { label: "C", color: "bg-green-400", items: [] },
    { label: "D", color: "bg-blue-400", items: [] },
  ]);

  const [images, setImages] = useState<TierItem[]>([]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          setImages((prev) => [...prev, { id: crypto.randomUUID(), imageUrl }]);
        };
        reader.readAsDataURL(file);
      });
    }
  }, []);

  const handleDragStart = useCallback((e: DragEvent, item: TierItem) => {
    e.dataTransfer.setData("itemId", item.id);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent, tierIndex: number) => {
      e.preventDefault();
      const itemId = e.dataTransfer.getData("itemId");

      setTiers((currentTiers) => {
        // Remove item from current location
        const updatedTiers = currentTiers.map((tier) => ({
          ...tier,
          items: tier.items.filter((item) => item.id !== itemId),
        }));

        // Try to find the item in both the images pool and existing tiers
        const draggedItem =
          images.find((item) => item.id === itemId) ||
          currentTiers.flatMap((tier) => tier.items).find((item) => item.id === itemId);

        if (draggedItem) {
          // If item was in images pool, remove it
          if (images.some((item) => item.id === itemId)) {
            setImages((prev) => prev.filter((item) => item.id !== itemId));
          }

          // Add to new tier
          updatedTiers[tierIndex].items.push(draggedItem);
        }

        return updatedTiers;
      });
    },
    [images]
  );

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDropToPool = useCallback((e: DragEvent) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("itemId");

    setTiers((currentTiers) => {
      // Find the item in the tiers
      const draggedItem = currentTiers.flatMap((tier) => tier.items).find((item) => item.id === itemId);

      if (draggedItem) {
        // Remove from tiers
        const updatedTiers = currentTiers.map((tier) => ({
          ...tier,
          items: tier.items.filter((item) => item.id !== itemId),
        }));

        // Add to images pool
        setImages((prev) => [...prev, draggedItem]);

        return updatedTiers;
      }
      return currentTiers;
    });
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gray-100">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Tier List Maker</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Create and customize your own tier lists with our easy-to-use drag-and-drop interface. Perfect for ranking
          games, characters, movies, or anything else you want to organize into tiers.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side - Tier List */}
        <div className="flex-1">
          {tiers.map((tier, index) => (
            <div
              key={tier.label}
              className="flex mb-3 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200/50"
            >
              <div className={`w-20 flex items-center justify-center font-bold text-white ${tier.color} text-2xl`}>
                {tier.label}
              </div>
              <div
                className="flex-1 min-h-[100px] p-3 flex flex-wrap gap-2 bg-gray-50/50 transition-colors
                          hover:bg-gray-50/80"
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={handleDragOver}
              >
                {tier.items.map((item) => (
                  <div
                    key={item.id}
                    className="w-20 h-20 relative cursor-move rounded-lg overflow-hidden shadow-sm
                              transition-all hover:scale-105 hover:shadow-md active:scale-95"
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                  >
                    <Image src={item.imageUrl} alt="Tier item" fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right side - Upload and Image Pool */}
        <div className="w-full md:w-80 space-y-4">
          <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-200/50">
            <label className="block mb-3 text-sm font-medium text-gray-700">Upload Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500
                file:mr-3 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-orange-50 file:text-orange-600
                hover:file:bg-orange-100
                cursor-pointer transition-colors"
            />
          </div>

          <div
            className="p-4 bg-white rounded-xl shadow-sm border border-gray-200/50"
            onDrop={handleDropToPool}
            onDragOver={handleDragOver}
          >
            <h2 className="text-sm font-medium mb-3 text-gray-700 flex items-center gap-2">
              <span>Image Pool</span>
              <span className="text-xs text-gray-500">(Drop here to remove from tiers)</span>
            </h2>
            <div className="flex flex-wrap gap-2 min-h-[100px] bg-gray-50/50 rounded-lg p-2">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="w-20 h-20 relative cursor-move rounded-lg overflow-hidden shadow-sm
                            transition-all hover:scale-105 hover:shadow-md active:scale-95"
                  draggable
                  onDragStart={(e) => handleDragStart(e, image)}
                >
                  <Image src={image.imageUrl} alt="Pool item" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-gray-600 text-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">How to Use the Tier List Maker</h2>
        <ol className="space-y-2 list-decimal list-inside">
          <li>Upload your images using the upload button on the right</li>
          <li>Drag and drop images from the pool into your preferred tier (S, A, B, C, or D)</li>
          <li>Rearrange items between tiers by dragging them</li>
          <li>Drop items back to the pool if you want to remove them from the tiers</li>
        </ol>
      </div>
    </div>
  );
}
