import { useEffect, useRef } from "react";

type KeyCombo = string[];
type KeyComboCallback = () => void;

export function useKeyCombo(combo: KeyCombo, callback: KeyComboCallback) {
  const pressedKeys = useRef(new Set<string>());

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      pressedKeys.current.add(event.key);

      // Check if all keys in the combo are pressed
      const isComboPressed = combo.every((key) => pressedKeys.current.has(key));

      if (isComboPressed) {
        event.preventDefault();
        callback();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      pressedKeys.current.delete(event.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      pressedKeys.current.clear();
    };
  }, [combo, callback]);
}
