import { TrendingUp, Shield, PiggyBank, Home, FileText, Calculator } from "lucide-react";

const services = [
  {
    icon: TrendingUp,
    title: "Investment Advisory",
    description: "Expert guidance on stocks, mutual funds, bonds, and portfolio optimization for maximum returns.",
    features: ["Portfolio Analysis", "Risk Assessment", "Market Insights", "Asset Allocation"]
  },
  {
    icon: FileText,
    title: "Tax Planning",
    description: "Comprehensive tax strategies to minimize liabilities and maximize savings throughout the year.",
    features: ["Tax Optimization", "Deduction Planning", "Filing Assistance", "Compliance Support"]
  },
  {
    icon: PiggyBank,
    title: "Wealth Management",
    description: "Holistic approach to growing and preserving your wealth for long-term financial security.",
    features: ["Financial Planning", "Goal Setting", "Savings Strategy", "Wealth Preservation"]
  },
  {
    icon: Shield,
    title: "Insurance Planning",
    description: "Protect your family and assets with the right insurance coverage and risk management.",
    features: ["Life Insurance", "Health Coverage", "Property Protection", "Risk Analysis"]
  },
  {
    icon: Home,
    title: "Real Estate Advisory",
    description: "Navigate property investments, home loans, and real estate market opportunities.",
    features: ["Property Valuation", "Investment Analysis", "Loan Advisory", "Market Research"]
  },
  {
    icon: Calculator,
    title: "Retirement Planning",
    description: "Secure your golden years with strategic retirement planning and pension optimization.",
    features: ["Retirement Goals", "Pension Planning", "Social Security", "Legacy Planning"]
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Comprehensive Financial Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From investment planning to retirement strategies, we cover all aspects 
            of your financial journey with expert precision.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="card-elegant p-8 text-center group hover:shadow-2xl">
              <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gold/20 transition-colors">
                <service.icon className="h-8 w-8 text-gold" />
              </div>
              
              <h3 className="text-xl font-semibold text-primary mb-4">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-sm text-muted-foreground flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="bg-gold/5 border border-gold/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-muted-foreground mb-6">
              Book a consultation with our experts and take the first step towards financial freedom.
            </p>
            <button className="btn-hero">
              Schedule Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;