import cn from "classnames";
import React from "react";

export default function Button(props: { onClick?: () => void; children: React.ReactNode }) {
  const { children, onClick } = props;
  return (
    <button
      onClick={onClick}
      className={cn(
        " border-violet-400 hover:border-violet-600 border-solid border text-violet-200 font-bold py-2 px-4 rounded hover:bg-violet-500 hover:bg-opacity-10"
      )}
    >
      {children}
    </button>
  );
}
