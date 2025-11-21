import { useEffect, useRef, useState } from "react";
import TechStack from "./TechStack";
import Intro from "./Intro";
import Contact from "./Contact";
import Footer from "./Footer";
import About from "./About";
import Navbar from "./Navbar";
import Projets from "./ProjectsGrid";
import Loader from "./Loader";
import Service from "./services";
import SakuraBackground from "./SakuraBackground";

export default function Welcomes() {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationRef = useRef(null);

  const [volume, setVolume] = useState(() => parseFloat(localStorage.getItem("musicVolume")) || 0.10);
  const [muted, setMuted] = useState(() => localStorage.getItem("musicMuted") === "true");
  const [audioLevel, setAudioLevel] = useState(1);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;

    const handleToggleAudio = (e) => {
      const isMuted = e.detail;
      setMuted(isMuted);

      if (audioRef.current) {
        if (isMuted) {
          audioRef.current.volume = 0;
          audioRef.current.pause();
        } else {
          audioRef.current.volume = volume;
          audioCtxRef.current?.resume();
          audioRef.current.play().catch((err) =>
            console.warn("Impossible de rejouer le son :", err)
          );
        }
      }
    };

    const handleVolumeChange = (e) => {
      const newVolume = e.detail;
      setVolume(newVolume);
      if (audioRef.current && !muted) audioRef.current.volume = newVolume;
    };

    window.addEventListener("toggle-audio", handleToggleAudio);
    window.addEventListener("change-volume", handleVolumeChange);

    return () => {
      window.removeEventListener("toggle-audio", handleToggleAudio);
      window.removeEventListener("change-volume", handleVolumeChange);
    };
  }, [volume, muted, started]);

  useEffect(() => {
    if (!started) return;

    audioRef.current = new Audio("/audio/sento.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = muted ? 0 : volume;

    audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    analyserRef.current = audioCtxRef.current.createAnalyser();
    analyserRef.current.fftSize = 512;

    const source = audioCtxRef.current.createMediaElementSource(audioRef.current);
    source.connect(analyserRef.current);
    analyserRef.current.connect(audioCtxRef.current.destination);

    dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let lastLevelUpdate = 0;

    const draw = (ts) => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);

      let sum = 0;
      for (let i = 0; i < dataArrayRef.current.length; i++) sum += dataArrayRef.current[i];
      const avg = sum / dataArrayRef.current.length;

      const sensitivity = 1.5;
      const decay = 0.95;

      if (!draw.prevEnergy) draw.prevEnergy = avg;
      if (!draw.energyThreshold) draw.energyThreshold = avg * sensitivity;

      const isBeat = avg > draw.energyThreshold;

      draw.energyThreshold = draw.energyThreshold * decay + avg * (1 - decay);

      if (ts - lastLevelUpdate > 50) {
        const normalized = 0.8 + (avg / 255) * 1;
        setAudioLevel(isBeat ? normalized * 1.5 : normalized);
        lastLevelUpdate = ts;
      }

      const bars = dataArrayRef.current.length;
      const halfBars = Math.floor(bars / 2);
      const barWidth = 4;
      const spacing = 0.4;
      const centerX = width / 2;

      for (let i = 0; i < halfBars; i++) {
        const scale = 1 - i / halfBars;
        const value = dataArrayRef.current[i];
        const barHeight = (value / 255) * height * scale;

        const leftX = centerX - (i + 1) * (barWidth + spacing);
        const rightX = centerX + (i + 1) * (barWidth + spacing) - barWidth;

        ctx.fillStyle = `rgba(${19 + i * 2}, 176, ${245 + i * 2}, 0.5)`;
        ctx.fillRect(leftX, height - barHeight, barWidth, barHeight);
        ctx.fillRect(rightX, height - barHeight, barWidth, barHeight);
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    if (!muted) {
      audioRef.current.play().catch((err) =>
        console.warn("Audio blocked until user interaction:", err)
      );
    }

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
      audioRef.current.pause();
    };
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const canvas = canvasRef.current;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = 200;
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [started]);

  if (!started)
    return (
      <Loader
        onStart={(withMusic) => {
          localStorage.setItem("musicMuted", withMusic ? "false" : "true");
          setMuted(!withMusic);
          setStarted(true);
        }}
      />
    );

  return (
    <div className="relative bg-gray-950">
      <Navbar />

      {/* <SakuraBackground /> */}

      <canvas
        ref={canvasRef}
        className="fixed bottom-0 left-0 w-full pointer-events-none z-10"
      />

      <div className="relative z-20">
        <div className="flex flex-col pt-20 md:flex-row min-h-[calc(100vh-64px)]">
          <div id="home" className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center">
            <Intro audioLevel={audioLevel} />
          </div>
          <div id="techstack" className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center">
            <TechStack audioLevel={audioLevel} />
          </div>
        </div>

        <section id="projects">
          <Projets />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="services">
          <Service />
        </section>

        <section id="contact">
          <Contact />
        </section>

        <Footer />
      </div>
    </div>
  );
}
