import React, { useEffect, useRef, useState } from 'react';

interface AsciiEffectProps {
  src: string;
  className?: string;
  characters?: string;
  resolution?: number;
  color?: string;
}

export const AsciiEffect: React.FC<AsciiEffectProps> = ({
  src,
  className = "",
  characters = "@#S%?*+;:,. ",
  resolution = 0.15,
  color = "currentColor"
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ascii, setAscii] = useState<string>("");

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      const width = 100; // Fixed width for ASCII grid
      const height = (img.height / img.width) * width * 0.5; // 0.5 to account for character aspect ratio

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const imageData = ctx.getImageData(0, 0, width, height).data;
      let asciiStr = "";

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const offset = (y * width + x) * 4;
          const r = imageData[offset];
          const g = imageData[offset + 1];
          const b = imageData[offset + 2];
          const brightness = (r + g + b) / 3;
          const charIndex = Math.floor((brightness / 255) * (characters.length - 1));
          asciiStr += characters[charIndex];
        }
        asciiStr += "\n";
      }
      setAscii(asciiStr);
    };
  }, [src, characters]);

  return (
    <div className={`font-mono leading-[0.8] whitespace-pre overflow-hidden select-none ${className}`} style={{ color }}>
      <canvas ref={canvasRef} className="hidden" />
      {ascii}
    </div>
  );
};
