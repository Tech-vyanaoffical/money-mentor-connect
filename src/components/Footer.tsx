import { TrendingUp, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gold rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">FinancialTalk</h3>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Expert financial guidance on-demand. Connect with certified advisors 
              and take control of your financial future.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-primary-foreground/60 hover:text-gold cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-primary-foreground/60 hover:text-gold cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-primary-foreground/60 hover:text-gold cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-primary-foreground/60 hover:text-gold cursor-pointer transition-colors" />
            </div>
          </div>
          
          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-gold transition-colors">Investment Advisory</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Tax Planning</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Wealth Management</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Insurance Planning</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Retirement Planning</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Company</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-gold transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Our Advisors</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3 text-primary-foreground/80">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4" />
                <span>support@financialtalk.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 FinancialTalk. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-primary-foreground/60 hover:text-gold text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-primary-foreground/60 hover:text-gold text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-primary-foreground/60 hover:text-gold text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;