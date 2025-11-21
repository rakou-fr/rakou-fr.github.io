import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    const circle = document.getElementById("cursor-circle");

    const move = (e) => {
      const size = 30;
      circle.style.width = `${size}px`;
      circle.style.height = `${size}px`;
      circle.style.transform = `translate3d(${e.clientX - size / 2}px, ${e.clientY - size / 2}px, 0)`;
    };

    const playClickSound = () => {
      const audio = new Audio("/audio/click.wav");
      audio.volume = 1;
      audio.play().catch((err) => console.warn("Impossible de jouer le son :", err));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", playClickSound);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", playClickSound);
    };
  }, []);

  return (
    <div
      id="cursor-circle"
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75"
      style={{
        borderRadius: "100%",             
        border: "2px solid rgba(19,176,245,0.3)",  
        background: "transparent",       
        boxSizing: "border-box",         
      }}
    />
  );
}
