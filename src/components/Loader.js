import { useState, useEffect } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";


export default function Loader({ onStart }) {
  const [loading, setLoading] = useState(true);
  const [askAudio, setAskAudio] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-gray-950 text-white z-[9999]">
        <div className="relative">
          <div className="absolute inset-0 blur-xl opacity-40 bg-gradient-to-r from-c1 to-c2 rounded-full animate-pulse"></div>
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent"></div>
        </div>
        <h2 className="text-2xl font-semibold tracking-wider mt-8 animate-fadeIn">
          Chargement...
        </h2>
      </div>
    );
  }

  if (!askAudio) {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-gray-950 text-white z-[9999] text-center p-6">
        <div className="relative mb-6">
          <div className="absolute -inset-2 bg-gradient-to-r from-c1 to-c2 blur-md opacity-70 animate-pulse rounded-full"></div>
          <FaVolumeUp className="relative text-6xl text-white drop-shadow-[0_0_12px_rgba(19,176,245,0.8)] animate-bounce-slow" />
        </div>
        <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-c1 to-c2 animate-fadeIn">
          Voulez-vous activer la musique ? 🎧
        </h2>
        <p className="text-gray-400 mb-6 max-w-md animate-fadeIn delay-100">
          Ce site contient une musique de fond. Vous pouvez choisir d’activer ou non le son.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => {
              onStart(true);  // musique activée
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-c1 to-c2 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300"
          >
            Oui, activer le son
          </button>
          <button
            onClick={() => {
              onStart(false); // musique désactivée
            }}
            className="px-6 py-3 rounded-xl bg-gray-700 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <FaVolumeMute /> Non, en silence
          </button>
        </div>
      </div>
    );
  }

  return null;
}
