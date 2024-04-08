import React from "react";
import { Navbar } from "src/components/Navbar";
import { Device } from "src/components/Device";
import { Footer } from "src/components/Footer";

const DevicePage = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col bg-yellow-400">
      <Navbar />
      <div className="bg-blue-700 min-h-screen">
        <Device />
      </div>
      <Footer />
    </div>
  );
};

export default DevicePage;
