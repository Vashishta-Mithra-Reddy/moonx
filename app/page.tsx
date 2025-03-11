"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import Moon from "../components/Moon";
import LoadingScreen from "../components/LoadingScreen";
import styles from './starBackground.module.css';

const stars = [
  { cx: "10%", cy: "15%", r: 1.2, opacity: 0.8 },
  { cx: "25%", cy: "30%", r: 0.8, opacity: 0.6 },
  { cx: "40%", cy: "10%", r: 1.0, opacity: 0.7 },
  { cx: "60%", cy: "40%", r: 1.4, opacity: 0.9 },
  { cx: "75%", cy: "25%", r: 0.9, opacity: 0.7 },
  { cx: "85%", cy: "35%", r: 1.1, opacity: 0.8 },
  { cx: "15%", cy: "65%", r: 1.3, opacity: 0.7 },
  { cx: "35%", cy: "75%", r: 0.7, opacity: 0.6 },
  { cx: "50%", cy: "85%", r: 2.2, opacity: 0.8 },
  { cx: "70%", cy: "60%", r: 1.0, opacity: 0.7 },
  { cx: "90%", cy: "80%", r: 0.8, opacity: 0.6 },
  { cx: "20%", cy: "90%", r: 1.1, opacity: 0.8 },
  { cx: "30%", cy: "45%", r: 1.4, opacity: 0.9 },
  { cx: "45%", cy: "55%", r: 0.9, opacity: 0.7 },
  { cx: "80%", cy: "15%", r: 1.2, opacity: 0.8 },
  { cx: "5%", cy: "20%", r: 0.6, opacity: 0.7 },
  { cx: "95%", cy: "45%", r: 1.0, opacity: 0.8 },
  { cx: "65%", cy: "95%", r: 0.7, opacity: 0.6 },
  { cx: "33%", cy: "88%", r: 1.1, opacity: 0.9 },
  { cx: "18%", cy: "40%", r: 0.8, opacity: 0.7 },
  { cx: "88%", cy: "50%", r: 1.3, opacity: 0.8 },
  { cx: "45%", cy: "22%", r: 0.9, opacity: 0.7 },
  { cx: "72%", cy: "77%", r: 1.0, opacity: 0.8 },
  { cx: "28%", cy: "65%", r: 0.7, opacity: 0.6 },
  { cx: "92%", cy: "28%", r: 1.2, opacity: 0.9 },
  { cx: "8%", cy: "82%", r: 0.8, opacity: 0.7 },
  { cx: "55%", cy: "33%", r: 1.1, opacity: 0.8 },
  { cx: "38%", cy: "18%", r: 0.9, opacity: 0.7 },
  { cx: "82%", cy: "92%", r: 1.0, opacity: 0.8 },
  { cx: "12%", cy: "52%", r: 0.6, opacity: 0.6 },
  { cx: "62%", cy: "12%", r: 1.2, opacity: 0.9 },
  { cx: "42%", cy: "72%", r: 0.8, opacity: 0.7 },
  { cx: "78%", cy: "42%", r: 1.1, opacity: 0.8 },
  { cx: "22%", cy: "28%", r: 0.9, opacity: 0.7 },
  { cx: "15%", cy: "48%", r: 2.2, opacity: 0.9 }, // Larger star
  { cx: "67%", cy: "23%", r: 0.5, opacity: 0.5 },
  { cx: "89%", cy: "71%", r: 0.4, opacity: 0.6 },
  { cx: "37%", cy: "83%", r: 0.3, opacity: 0.4 },
  { cx: "58%", cy: "67%", r: 2.0, opacity: 0.85 }, // Larger star
  { cx: "93%", cy: "38%", r: 0.6, opacity: 0.7 },
  { cx: "25%", cy: "12%", r: 0.4, opacity: 0.5 },
  { cx: "71%", cy: "89%", r: 0.3, opacity: 0.6 },
  { cx: "44%", cy: "31%", r: 0.5, opacity: 0.7 },
  { cx: "83%", cy: "59%", r: 1.8, opacity: 0.8 }, // Larger star
  { cx: "19%", cy: "76%", r: 0.4, opacity: 0.5 },
  { cx: "63%", cy: "15%", r: 0.3, opacity: 0.6 },
  { cx: "31%", cy: "94%", r: 0.5, opacity: 0.4 },
  { cx: "77%", cy: "33%", r: 0.4, opacity: 0.7 },
  { cx: "52%", cy: "78%", r: 0.3, opacity: 0.5 },
  { cx: "96%", cy: "25%", r: 0.6, opacity: 0.6 },
  { cx: "41%", cy: "62%", r: 0.4, opacity: 0.7 },
  { cx: "87%", cy: "45%", r: 0.5, opacity: 0.5 },
  { cx: "13%", cy: "88%", r: 0.3, opacity: 0.6 },
  { cx: "73%", cy: "19%", r: 2.5, opacity: 0.95 }, // Largest star
  { cx: "29%", cy: "51%", r: 0.4, opacity: 0.5 },
  { cx: "66%", cy: "84%", r: 0.5, opacity: 0.7 },
  { cx: "48%", cy: "27%", r: 0.3, opacity: 0.6 }
];

const StarBackground = () => (
  <svg
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      background: 'black',
      pointerEvents: 'none'
    }}
  >
    {stars.map((star, i) => {
      const duration = 1.5 + Math.random() * 2;
      const delay = Math.random() * 3;
      
      return (
        <circle
          key={i}
          cx={star.cx}
          cy={star.cy}
          r={star.r}
          fill="white"
          className={styles.star}
          style={{
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        />
      );
    })}
  </svg>
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <StarBackground />
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
      <div style={{ position: "fixed", width: "100%", height: "100%", zIndex: 1 }}>
        <Canvas camera={{ position: [0, 0, 15], fov: 35 }}>
          <Suspense fallback={null}>
            <Moon onLoad={() => setIsLoading(false)} />
          </Suspense>
        </Canvas>
      </div>
      <div style={{ height: "400vh" }} />
    </div>
  );
}
