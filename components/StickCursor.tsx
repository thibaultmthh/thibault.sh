import classNames from "classnames";
import useMousePosition from "./hooks/useMousePosition";

export default function StickCursor({
  children,
  offsetX,
  offsetY,
}: {
  children: React.ReactNode;
  offsetX?: number;
  offsetY?: number;
}) {
  const { x: mouseX, y: mouseY } = useMousePosition();

  return (
    <div className={classNames("absolute")} style={{ left: mouseX + (offsetX || 0), top: mouseY + (offsetY || 0) }}>
      {children}
    </div>
  );
}
