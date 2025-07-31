import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AdvisorsSection from "@/components/AdvisorsSection";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AdvisorsSection />
      <ServicesSection />
      <Footer />
    </div>
  );
};

export default Index;
