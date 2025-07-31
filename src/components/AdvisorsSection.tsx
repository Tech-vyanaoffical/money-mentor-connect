import { AdvisorCard } from "./AdvisorCard";

const advisors = [
  {
    name: "Dr. Rajesh Sharma",
    specialization: "Investment & Portfolio Management",
    experience: 15,
    rating: 4.9,
    isOnline: true,
    pricePerMinute: 50,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    tags: ["Stocks", "Mutual Funds", "Portfolio", "Risk Management"]
  },
  {
    name: "Priya Mehta",
    specialization: "Tax Planning & Compliance",
    experience: 12,
    rating: 4.8,
    isOnline: true,
    pricePerMinute: 45,
    image: "https://images.unsplash.com/photo-1594736797933-d0ba5ba0b81a?w=150&h=150&fit=crop&crop=face",
    tags: ["Tax Planning", "GST", "Income Tax", "Compliance"]
  },
  {
    name: "Amit Kumar",
    specialization: "Personal Finance & Budgeting",
    experience: 8,
    rating: 4.7,
    isOnline: false,
    pricePerMinute: 35,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    tags: ["Budgeting", "Savings", "Debt Management", "Financial Planning"]
  },
  {
    name: "Sneha Patel",
    specialization: "Insurance & Risk Assessment",
    experience: 10,
    rating: 4.8,
    isOnline: true,
    pricePerMinute: 40,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    tags: ["Life Insurance", "Health Insurance", "Risk Assessment", "Claims"]
  },
  {
    name: "Vikram Singh",
    specialization: "Real Estate Investment",
    experience: 18,
    rating: 4.9,
    isOnline: true,
    pricePerMinute: 60,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    tags: ["Real Estate", "Property Investment", "REIT", "Commercial"]
  },
  {
    name: "Anita Desai",
    specialization: "Retirement Planning",
    experience: 14,
    rating: 4.8,
    isOnline: false,
    pricePerMinute: 55,
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face",
    tags: ["Retirement", "Pension", "PF", "Long-term Planning"]
  }
];

const AdvisorsSection = () => {
  return (
    <section id="advisors" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Meet Our Expert Advisors
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Certified financial professionals with decades of combined experience, 
            ready to guide you towards financial success.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advisors.map((advisor, index) => (
            <AdvisorCard key={index} {...advisor} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            All advisors are vetted and certified by recognized financial institutions
          </p>
          <div className="flex justify-center space-x-8 opacity-60">
            <img src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=120&h=60&fit=crop" alt="Certified" className="h-12 grayscale" />
            <img src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=120&h=60&fit=crop" alt="Licensed" className="h-12 grayscale" />
            <img src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=120&h=60&fit=crop" alt="Verified" className="h-12 grayscale" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvisorsSection;