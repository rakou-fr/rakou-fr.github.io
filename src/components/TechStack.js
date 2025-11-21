import { useState, useEffect, useRef } from "react";
import techs from "../Data/JSON/techs.json";
import * as DiIcons from "react-icons/di";
import * as SiIcons from "react-icons/si";

const colors = [
  "#F54927", "#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#9D4EDD",
  "#FF8C42", "#FF5D8F", "#00B5CC", "#FFB400", "#FF3F00", "#D90368",
  "#00F5D4", "#7A0BC0", "#F72585", "#7209B7", "#3A0CA3", "#4361EE",
  "#4CC9F0", "#F94144", "#F3722C", "#F8961E", "#90BE6D", "#577590"
];

export default function TechStack({ audioLevel = 1 }) {
  const [activeColumn, setActiveColumn] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(0);

  const columns = 6;
  const prevLevelRef = useRef(0);
  const lastTriggerRef = useRef(Date.now());

  useEffect(() => {
    const now = Date.now();
    const THRESHOLD = 1.2


    if (audioLevel > THRESHOLD ) {
      setActiveColumn((prev) => (prev + 1) % columns);
      setGlowIntensity(1.5);
      lastTriggerRef.current = now;
    }

    prevLevelRef.current = audioLevel;
  }, [audioLevel]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity((g) => Math.max(0, g - 0.05));
    }, 25);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-full ">
      <h2 className="text-2xl font-bold mb-2 text-center">Stack Technique</h2>
      <p className="text-gray-400 mb-6 text-center">
        technologies déja utilisé
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-10">
        {techs.map((tech, i) => {
          const IconComponent =
            tech.type === "di" ? DiIcons[tech.icon] : SiIcons[tech.icon];
          const color = colors[i % colors.length];

          const col = i % columns;
          const isActive = col === activeColumn;

          const baseGlow = 0.05;
          const beatGlow = glowIntensity;

          const intensity = isActive ? beatGlow : baseGlow;
          const glow = `drop-shadow(0 0 ${10 * intensity}px ${color}) drop-shadow(0 0 ${25 * intensity}px ${color})`;


          return (
          <div
            key={i}
            className="flex justify-center items-center text-5xl transition-all duration-100 ease-out"
            style={{
              transform: isActive ? `scale(${1 + beatGlow * 0.05})` : "scale(1)",
              filter: glow,
            }}
          >
            {IconComponent ? <IconComponent style={{ color }} /> : null}
          </div>
          );
        })}
      </div>
    </div>
  );
}
