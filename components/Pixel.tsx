import { Prisma } from "@prisma/client";
import Link from "next/link";
import useHover from "./hooks/useHover";
import StickCursor from "./StickCursor";

export default function Pixel({ color, data }: { color: string; data?: Prisma.GuestbookGetPayload<{}> }) {
  const [ref, hovered] = useHover();

  return (
    <>
      {hovered && data && (
        <StickCursor offsetY={-100}>
          <div className="rounded bg-neutral-400 p-3">{data.message}</div>
        </StickCursor>
      )}
      <Link href={`#r-${data?.id}`} scroll>
        <div
          style={{ backgroundColor: `#${color}` }}
          ref={ref}
          className="w-4 h-4 sm:w-6 sm:h-6  border-violet-300 hover:border  "
        ></div>
      </Link>
    </>
  );
}
