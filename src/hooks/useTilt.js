import { useRef } from "react";

export default function useTilt() {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const img = ref.current;
    const rect = img.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * 12;
    const rotateY = ((x / rect.width) - 0.5) * -12;

    img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.07)`;
  };

  const handleMouseLeave = () => {
    const img = ref.current;
    img.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return { ref, handleMouseMove, handleMouseLeave };
}
