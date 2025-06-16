"use client";

import { useEffect, useState, useRef } from "react";

const ASCIIBackground = ({ strong = false }: { strong?: boolean }) => {
  const [asciiGrid, setAsciiGrid] = useState<string[][]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Simplified character sets
  const lightChars = [".", "·", "`", "'", ",", ":", "_", "-"];
  const mediumChars = ["~", "^", "+", "*", "=", "|", "/", "\\"];
  const heavyChars = ["#", "@", "%", "&", "█", "▓", "■", "●"];

  const generateGrid = () => {
    const cols = Math.floor(window.innerWidth / 8);
    const rows = Math.floor(window.innerHeight / 16);
    const grid: string[][] = [];

    for (let i = 0; i < rows; i++) {
      const row: string[] = [];
      for (let j = 0; j < cols; j++) {
        let char = " ";
        const rand = Math.random();

        // Simpler distribution
        if (rand < 0.005) {
          // 0.5% heavy characters
          char = heavyChars[Math.floor(Math.random() * heavyChars.length)];
        } else if (rand < 0.015) {
          // 1% medium characters
          char = mediumChars[Math.floor(Math.random() * mediumChars.length)];
        } else if (rand < 0.03) {
          // 1.5% light characters
          char = lightChars[Math.floor(Math.random() * lightChars.length)];
        }
        // 97% remain as spaces

        row.push(char);
      }
      grid.push(row);
    }

    setAsciiGrid(grid);
  };

  const updateGridWithMouse = (mouseX: number, mouseY: number) => {
    if (!asciiGrid.length) return;

    const cols = asciiGrid[0]?.length || 0;
    const rows = asciiGrid.length;

    // Convert mouse position to grid coordinates
    const gridX = Math.floor((mouseX / window.innerWidth) * cols);
    const gridY = Math.floor((mouseY / window.innerHeight) * rows);

    setAsciiGrid((prevGrid) => {
      const newGrid = [...prevGrid.map((row) => [...row])];

      // Simplified influence area
      const radius = 3;

      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const targetY = gridY + dy;
          const targetX = gridX + dx;

          if (targetY >= 0 && targetY < rows && targetX >= 0 && targetX < cols) {
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= radius && Math.random() < 0.3) {
              const intensity = 1 - distance / radius;

              if (intensity > 0.7) {
                // Core area - heavy chars
                newGrid[targetY][targetX] = heavyChars[Math.floor(Math.random() * heavyChars.length)];
              } else if (intensity > 0.4) {
                // Medium area - medium chars
                newGrid[targetY][targetX] = mediumChars[Math.floor(Math.random() * mediumChars.length)];
              } else {
                // Outer area - light chars
                newGrid[targetY][targetX] = lightChars[Math.floor(Math.random() * lightChars.length)];
              }
            }
          }
        }
      }

      return newGrid;
    });
  };

  useEffect(() => {
    generateGrid();

    const handleResize = () => {
      generateGrid();
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Throttle mouse updates more aggressively
      if (Math.random() < 0.6) {
        updateGridWithMouse(e.clientX, e.clientY);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Simplified background evolution
    const interval = setInterval(() => {
      setAsciiGrid((prevGrid) => {
        const newGrid = [...prevGrid.map((row) => [...row])];
        const numChanges = Math.floor(newGrid.length * (newGrid[0]?.length || 0) * 0.002); // Change 0.2% of characters

        for (let i = 0; i < numChanges; i++) {
          const row = Math.floor(Math.random() * newGrid.length);
          const col = Math.floor(Math.random() * (newGrid[row]?.length || 0));

          if (newGrid[row] && newGrid[row][col] !== undefined) {
            const rand = Math.random();
            if (rand < 0.8) {
              newGrid[row][col] = " ";
            } else {
              newGrid[row][col] = lightChars[Math.floor(Math.random() * lightChars.length)];
            }
          }
        }

        return newGrid;
      });
    }, 8000); // Update every 8 seconds (slower)

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, [asciiGrid.length]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className={`absolute inset-0 font-mono text-xs leading-4 select-none whitespace-pre w-full ${
          strong ? "text-orange-400/25" : "text-orange-400/15"
        }`}
      >
        {asciiGrid.map((row, i) => (
          <div key={i} className="h-4 w-full" style={{ letterSpacing: "0.05em" }}>
            {row.join("")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ASCIIBackground;
