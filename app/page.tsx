"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Moon from "../components/Moon";

export default function Home() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div style={{ position: "fixed", width: "100%", height: "100%" }}>
        <Canvas camera={{ position: [0, 0, 15], fov: 35 }}>
          <Suspense fallback={null}>
            <Moon />
          </Suspense>
        </Canvas>
      </div>
      <div style={{ height: "400vh" }} />
    </div>
  );
}
