import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type HobbyItem = {
  title: string;
  emoji: string;
  left: string;
  top: string;
};

const RandomMover = ({ item, containerRef }: { item: HobbyItem; containerRef: React.RefObject<HTMLDivElement> }) => {
  const controls = useAnimation(); // Controls for random animation
  const [isDragging, setIsDragging] = useState(false);

  const getRandomPosition = () => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      return {
        x: Math.random() * (width * 0.050),
        y: Math.random() * (height * 0.015),
      };
    }
    return { x: 0, y: 0 };
  };

  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        const newPosition = getRandomPosition();
        controls.start({
          x: newPosition.x,
          y: newPosition.y,
          transition: { duration: 2, ease: "easeInOut" },
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isDragging, controls, containerRef]);

  return (
    <motion.div
      className="inline-flex items-center gap-2 px-6 bg-gradient-to-tr from-emerald-500 to-sky-400 rounded-full py-1.5 absolute"
      style={{
        left: item.left,
        top: item.top,
      }}
      animate={controls}
      drag
      dragConstraints={containerRef}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
    >
      <span className="font-medium text-gray-950">{item.title}</span>
      <span>{item.emoji}</span>
    </motion.div>
  );
};

export default RandomMover;
