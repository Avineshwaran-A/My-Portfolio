import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ScrollCrossfade from "./components/ScrollCrossfade";
import Timeline from "./components/Timeline";
import Footer from "./components/Footer";
import StarfieldBackground from "./components/StarfieldBackground";

export default function App() {
  return (
    <div className="text-white">
      {/* Fixed starfield canvas — sits behind everything */}
      <StarfieldBackground />
      <Navbar />
      <Hero />
      <ScrollCrossfade />
      <Timeline />
      <Footer />
    </div>
  );
}
