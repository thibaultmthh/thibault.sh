import { useCallback, useEffect, useState } from "react";

export default function useMousePosition(){
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const onMouseMove = useCallback((event: MouseEvent) => {
        setMousePosition({
            x: event.pageX,
            y: event.pageY,
        });
    } , []);
    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove);
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        }
    } , [onMouseMove]);
    return mousePosition;
}