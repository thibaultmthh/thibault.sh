import { Prisma } from "@prisma/client";
import guestbookTo2D from "lib/guestbook";
import { Guestbook } from "types";
import Pixel from "./Pixel";

export default function CanvasGuestbook({ canvas, isReady }: { canvas: Guestbook[][][]; isReady: boolean }) {
  console.log("CanvasGuestbook", canvas, isReady);

  return (
    <div className="grid place-items-center">
      <div>
        {canvas.map((row, rowIndex) => (
          <div key={rowIndex} className="flex ">
            {row.map((el, colorIndex) => (
              <Pixel key={colorIndex} color={(el && el[0] && el[0].color) || "ffffff"} data={el[0] || null} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
