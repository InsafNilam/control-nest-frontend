import { Footer } from "src/components/Footer";
import { Navbar } from "src/components/Navbar";

const DashboardPage = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col bg-yellow-400">
      <Navbar />
      <div className="landing-page">
        <img
          className="background-image"
          src="https://acropolium.com/img/articles/gps-tracking/img01.jpg"
          alt="Background"
        />
        <div className="overlay-text">
          <h1>Welcome to Our Website</h1>
          <p>A brief description of your website or product.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
