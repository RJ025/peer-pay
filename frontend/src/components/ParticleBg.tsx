"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import Particles from "@/components/ui/particles";

export function ParticlesBg() {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffffff");

  useEffect(() => {
    setColor("#ffffffff");
  }, [theme]);

  return (
    <div className="relative flex h-[100vh] w-[100vw] flex-col items-center justify-center overflow-hidden rounded-lg border bg-stone-900 md:shadow-xl">
      <Particles
        className="absolute inset-0"
        quantity={1000}
        ease={80}
        color={color}
        refresh
      />
    </div>
  );
}
