import React from 'react';
import Navbar from './components/Navbar';
import Welcomes from './components/welcomes';
import CustomCursor from './components/CustomCursor'; // ⬅️ AJOUT

function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* ⬅️ AJOUT ICI */}
      <CustomCursor />

      <Welcomes />

      {/* tu pourras mettre des sections avec max-w-7xl ou container */}
      {/* <div className="container mx-auto">…</div> */}
    </div>
  );
}

export default App;
