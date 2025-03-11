import { useEffect, useState } from 'react';

const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [stars, setStars] = useState<{ cx: string; cy: string; opacity: number }[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        return prev + 1;
      });

      if (stars.length < 50) {
        setStars(prev => [...prev, {
          cx: `${Math.random() * 100}%`,
          cy: `${Math.random() * 100}%`,
          opacity: Math.random()
        }]);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [onLoadingComplete, stars.length]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'black',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <svg width="100%" height="100%" style={{ position: 'absolute' }}>
        {stars.map((star, i) => (
          <circle
            key={i}
            cx={star.cx}
            cy={star.cy}
            r="1"
            fill="white"
            style={{
              opacity: star.opacity,
              animation: 'twinkle 1s infinite alternate'
            }}
          />
        ))}
      </svg>

      <div style={{
        width: '200px',
        height: '2px',
        background: '#333',
        borderRadius: '4px',
        overflow: 'hidden',
        zIndex: 1
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: 'white',
          transition: 'width 0.3s ease'
        }} />
      </div>
    </div>
  );
};

export default LoadingScreen;