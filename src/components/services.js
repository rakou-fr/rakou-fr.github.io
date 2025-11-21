import { useEffect, useState } from "react";
import data from "../Data/JSON/services.json";

export default function Service() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    setServices(data);
  }, []);

  return (
    <div className="py-20 px-6 text-white">
      <h2 className="text-4xl font-bold text-center mb-10">
        Mes <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#13B0F5] to-[#E70FAA]">Services</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-6 rounded-xl border border-gray-800 overflow-hidden transition-all hover:scale-[1.02] duration-300"
          >
            <div className="w-20 h-20 mx-auto mb-4 p-1 rounded-full bg-gradient-to-r from-[#13B0F5] to-[#E70FAA]">
              <div className="w-full h-full bg-gray-950 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-3/4 h-3/4 object-contain"
                />
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-2 text-center">{service.title}</h3>

            <p className="text-gray-300 mb-4 text-center">
              {service.description}
            </p>

            <p className="text-lg font-bold text-[#13B0F5] text-center">
              {service.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
