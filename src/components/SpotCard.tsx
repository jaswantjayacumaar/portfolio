"use client";

import type { MouseEvent, ReactNode } from "react";

/** Card wrapper that tracks the cursor and exposes --mx / --my so the
 *  `.spot` glow in globals.css can follow the pointer. */
export default function SpotCard({
  as: Tag = "div",
  className = "",
  children,
}: {
  as?: "div" | "article";
  className?: string;
  children: ReactNode;
}) {
  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Tag className={`spot ${className}`} onMouseMove={handleMove}>
      {children}
    </Tag>
  );
}
