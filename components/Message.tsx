import { Prisma } from "@prisma/client";
import { Guestbook } from "types";
import Pixel from "./Pixel";

export default function Message({ post, canvas }: { post: Guestbook; canvas: Guestbook[][][] }) {
  const radius = 3;

  let lines = canvas.map((row, rowIndex) =>
    row.filter((v, i) => {
      return i >= post.positionY - radius && i <= post.positionY + radius;
    })
  );

  lines = lines.filter((row, i) => i >= post.positionX - radius && i <= post.positionX + radius);

  console.log(lines);

  return (
    <div id={"r-" + post.id} className="my-8 flex ">
      <div className="mr-3">
        {lines.map((row, rowIndex) => (
          <div key={rowIndex} className="flex ">
            {row.map((color, colorIndex) => (
              <Pixel key={colorIndex} color={color[0]?.color} />
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-between sm:justify-start">
        <p className="text-white sm:mb-4">{post.message}</p>
        <div className="sm:flex ">
          <p className="text-neutral-400 text-right ">{post.name} </p>
          <span className="hidden sm:block text-neutral-500 mx-4"> / </span>
          <span className="hidden sm:block text-neutral-400">{new Date(post.createdAt).toString()}</span>
        </div>
      </div>
    </div>
  );
}
