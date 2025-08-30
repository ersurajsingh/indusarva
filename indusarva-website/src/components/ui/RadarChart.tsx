import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface RadarChartProps {
  data: {
    financial_discipline: number;
    forward_thinking: number;
    reliability: number;
    character: number;
  };
  size?: number;
}

const RadarChart: React.FC<RadarChartProps> = ({ data, size = 300 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const categories = [
    { key: 'financial_discipline', label: 'Financial Discipline', angle: 0 },
    { key: 'forward_thinking', label: 'Forward Thinking', angle: Math.PI / 2 },
    { key: 'reliability', label: 'Reliability', angle: Math.PI },
    { key: 'character', label: 'Character', angle: (3 * Math.PI) / 2 }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = size / 2;
    const centerY = size / 2;
    const maxRadius = size / 2 - 60;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Draw background circles
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, (maxRadius * i) / 5, 0, 2 * Math.PI);
      ctx.stroke();
    }

    // Draw axis lines
    categories.forEach(category => {
      const x = centerX + Math.cos(category.angle - Math.PI / 2) * maxRadius;
      const y = centerY + Math.sin(category.angle - Math.PI / 2) * maxRadius;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = '#E5E7EB';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw data polygon
    ctx.beginPath();
    categories.forEach((category, index) => {
      const value = data[category.key as keyof typeof data];
      const radius = (value / 100) * maxRadius;
      const x = centerX + Math.cos(category.angle - Math.PI / 2) * radius;
      const y = centerY + Math.sin(category.angle - Math.PI / 2) * radius;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    
    // Fill the polygon
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Stroke the polygon
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw data points
    categories.forEach(category => {
      const value = data[category.key as keyof typeof data];
      const radius = (value / 100) * maxRadius;
      const x = centerX + Math.cos(category.angle - Math.PI / 2) * radius;
      const y = centerY + Math.sin(category.angle - Math.PI / 2) * radius;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#3B82F6';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

  }, [data, size]);

  return (
    <div className="relative">
      <motion.canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="max-w-full h-auto"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      
      {/* Category Labels */}
      <div className="absolute inset-0">
        {categories.map((category, index) => {
          const labelRadius = size / 2 - 30;
          const x = size / 2 + Math.cos(category.angle - Math.PI / 2) * labelRadius;
          const y = size / 2 + Math.sin(category.angle - Math.PI / 2) * labelRadius;
          
          return (
            <motion.div
              key={category.key}
              className="absolute text-xs font-medium text-gray-700 text-center"
              style={{
                left: x - 40,
                top: y - 10,
                width: 80
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              {category.label}
              <div className="text-primary-600 font-bold">
                {data[category.key as keyof typeof data]}%
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RadarChart;