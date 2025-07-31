import { Button } from "@/components/ui/button";
import { Shield, Clock, Star } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-hero min-h-screen flex items-center pt-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-shadow">
            Expert Financial
            <span className="block text-gold">Guidance On-Demand</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect with certified financial advisors instantly. Get professional advice on investments, taxes, budgeting, and wealth planning.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button className="btn-hero text-lg px-8 py-6 animate-scale-in">
              Talk to Financial Advisor
              <span className="ml-2 text-sm bg-white/20 px-2 py-1 rounded">First 2 mins FREE</span>
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              View Our Advisors
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-3 text-white/90">
              <Shield className="h-6 w-6 text-gold" />
              <span className="font-medium">Certified Experts</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white/90">
              <Clock className="h-6 w-6 text-gold" />
              <span className="font-medium">Available 24/7</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white/90">
              <Star className="h-6 w-6 text-gold" />
              <span className="font-medium">5-Star Rated</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;