import Header from "@/components/global/Header";
import Hero from "@/components/home/Hero";
import MorePics from "@/components/home/MorePics";
import Showcase from "@/components/home/Showcase";
import Different from "@/components/home/Different";
import Slider from "@/components/home/Slider";
import FAQ from "@/components/home/FAQ";
import Pricing from "@/components/home/Pricing";
import Footer from "@/components/global/Footer";


import { auth } from "./auth";

const HomePage = async () => {
  const session = await auth()
  return (
    <>
      {/* Layer  */}
      <div className="fixed top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      {/* End of Layer */}

      <div className="max-w-6xl mx-auto flex flex-col gap-6 items-center">
        <Header session={session} />
        <Hero />
        <MorePics />
        <Showcase />
        <Different />
        <Slider />
        <FAQ />
        <Pricing />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
