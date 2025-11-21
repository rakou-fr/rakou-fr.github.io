import { useEffect } from "react";

export default function SakuraBackground() {
  useEffect(() => {
    const canvas = document.getElementById("sakura-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const flowers = [];
    const maxFlowers = 20;

    function createFlower() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        size: 8 + Math.random() * 10,
        speed: 0.5 + Math.random() * 1,
        drift: -0.5 + Math.random() * 1,
        rotation: Math.random() * Math.PI,
        rotationSpeed: -0.01 + Math.random() * 0.02,
      };
    }

    for (let i = 0; i < maxFlowers; i++) flowers.push(createFlower());

    function drawFlower(f) {
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.rotation);

      ctx.fillStyle = "rgba(255, 182, 193, 0.5)";
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.rotate((Math.PI * 2) / 5);
        ctx.ellipse(f.size / 2, 0, f.size / 2.5, f.size, 0, 0, Math.PI * 2);
      }
      ctx.fill();

      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      flowers.forEach((f) => {
        f.y += f.speed;
        f.x += f.drift;
        f.rotation += f.rotationSpeed;

        if (f.y > canvas.height + 20) {
          Object.assign(f, createFlower());
          f.y = -20;
        }

        drawFlower(f);
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      id="sakura-canvas"
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}
