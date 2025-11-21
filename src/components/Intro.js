import { useEffect, useState } from "react";

export default function LeftIntro({ audioLevel = 1 }) {
  const [smoothLevel, setSmoothLevel] = useState(audioLevel);

  useEffect(() => {
    const smoothFactor = 0.15;
    const interval = setInterval(() => {
      setSmoothLevel(prev => prev + (audioLevel - prev) * smoothFactor);
    }, 16);
    return () => clearInterval(interval);
  }, [audioLevel]);

  const clampedScale = Math.min(Math.max(smoothLevel, 0.8), 2);

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex text-white p-8 flex-row items-center justify-center space-x-8">
        <div className="text-left max-w-xs z-10">
          <p className="text-4xl">
            Salut 👋,<br />
            C'est le<br />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#13B0F5] to-[#E70FAA]">
              Rakou,
            </span>
          </p>
          <p className="text-4xl">Je crée des trucs</p>
        </div>

        <div
          className="w-64 h-64 flex items-center justify-center rounded-full p-1 bg-gradient-to-r from-[#13B0F5] to-[#E70FAA]"
          style={{
            transform: `scale(${clampedScale})`,
            boxShadow: `0 0 ${8 * clampedScale}px rgba(19,176,245,0.4)`,
            transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out"
          }}
        >
          <div className="w-full h-full bg-gray-950 rounded-full flex items-center justify-center overflow-hidden">
            <img
              src="./Images/Logo/raton.jpg"
              alt="illustration"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden flex-col items-center justify-center text-center p-8 space-y-8 w-full">
        <div className="w-full">
          <p className="text-4xl mb-2">
            Salut 👋,<br />
            C'est le<br />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#13B0F5] to-[#E70FAA]">
              Rakou,
            </span>
          </p>
          <p className="text-4xl">Je crée des trucs</p>
        </div>

        <div
          className="w-64 h-64 flex items-center justify-center rounded-full p-1 bg-gradient-to-r from-[#13B0F5] to-[#E70FAA]"
          style={{
            transform: `scale(${clampedScale})`,
            boxShadow: `0 0 ${8 * clampedScale}px rgba(19,176,245,0.4)`,
            transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out"
          }}
        >
          <div className="w-full h-full bg-gray-950 rounded-full flex items-center justify-center overflow-hidden">
            <img
              src="./Images/Logo/raton.jpg"
              alt="nature image"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}
