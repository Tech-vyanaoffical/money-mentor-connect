import { Button } from "@/components/ui/button";
import { TrendingUp, User } from "lucide-react";

const Header = () => {
  return (
    <header className="backdrop-blur-elegant border-b border-border fixed top-0 w-full z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-gold rounded-lg">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-primary">FinancialTalk</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#advisors" className="text-muted-foreground hover:text-primary transition-colors">
            Our Advisors
          </a>
          <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
            Services
          </a>
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
            About
          </a>
        </nav>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <User className="h-4 w-4 mr-2" />
            Login
          </Button>
          <Button size="sm" className="btn-primary">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;