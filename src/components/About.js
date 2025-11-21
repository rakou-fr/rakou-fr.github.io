import { useState, useEffect } from 'react';
import data from '../Data/JSON/About.json';

export default function About() {
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);

  useEffect(() => {
    setExperiences(data.experiences);
    setEducation(data.education);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      {/* Titres */}
      <h1 className="text-2xl font-bold mb-2 text-center">À Propos</h1>
      <h2 className="text-gray-400 mb-6 text-center font-semibold">
        Experience & education
      </h2>
      
      {/* Description */}
      <p className="text-transparent text-transparent bg-clip-text bg-gradient-to-r from-[#13B0F5] to-[#E70FAA] bg-gradient-to-r from-[#13B0F5] to-[#E70FAA] mb-6 mx-12 line-clamp-8 font-semibold text-center">
        Compliqué n'est pas Rakou, il galere ? tant mieux c'est fun, la théorie c'est drole 2s mais apprendre sur le tat ca lui ressemble.
        Expérience ? jamais assez.
      </p>

      <div className="pt-12 flex flex-col md:flex-row w-full max-w-4xl justify-between">
        {/* Experience */}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-4 text-center">Experience</h3>
          <div className="relative border-l-2 border-gray-300 ml-6">
            {experiences.map((exp, index) => (
              <div key={index} className="mb-8 ml-8 relative">
                <div className="absolute -left-4 top-1 w-4 h-4 bg-gradient-to-r from-[#13B0F5] to-[#E70FAA] rounded-full"></div>
                <h4 className="text-lg font-semibold ml-4">{exp.title}</h4>
                <span className="text-gray-400 text-sm ml-4">{exp.company} | {exp.period}</span>
                <p className="text-gray-400 mt-1 ml-4 mx-12">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="flex-1 mt-8 md:mt-0">
          <h3 className="text-xl font-bold mb-4 text-center">Education</h3>
          <div className="relative border-l-2 border-gray-300 ml-6">
            {education.map((edu, index) => (
              <div key={index} className="mb-8 ml-8 relative">
                <div className="absolute -left-4 top-1 w-4 h-4 bg-gradient-to-r from-[#13B0F5] to-[#E70FAA] rounded-full"></div>
                <h4 className="text-lg font-semibold ml-4">{edu.degree}</h4>
                <span className="text-gray-400 text-sm ml-4">{edu.school} | {edu.period}</span>
                <p className="text-gray-400 mt-1 ml-4 mx-12">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
