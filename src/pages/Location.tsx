import React from "react";
import { Navbar } from "src/components/Navbar";
import { Footer } from "src/components/Footer";
import { Location } from "src/components/Location";

const LocationPage = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col bg-yellow-400">
      <Navbar />
      <div className="bg-blue-700 min-h-screen">
        <Location />
      </div>
      <Footer />
    </div>
  );
};

export default LocationPage;
