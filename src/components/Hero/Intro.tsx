"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import BootSequence from "../BootSequence";
import Hero from "./Hero";

// Three.js stays out of the initial bundle; it loads while the boot sequence plays.
const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function Intro() {
  const [booted, setBooted] = useState(false);
  const handleFinish = useCallback(() => setBooted(true), []);

  return (
    <>
      <BootSequence onFinish={handleFinish} />
      <Scene />
      <Hero revealed={booted} />
    </>
  );
}
