import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Shield, MessageCircle } from "lucide-react";
import { ChatModal } from "./ChatModal";
import { useState } from "react";

interface AdvisorCardProps {
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  isOnline: boolean;
  pricePerMinute: number;
  image: string;
  tags: string[];
}

const AdvisorCard = ({ 
  name, 
  specialization, 
  experience, 
  rating, 
  isOnline, 
  pricePerMinute,
  image,
  tags 
}: AdvisorCardProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <div className="card-elegant p-6 hover:scale-105 transition-all duration-300">
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative">
          <img 
            src={image} 
            alt={name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
            isOnline ? 'bg-success' : 'bg-muted'
          }`} />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-primary">{name}</h3>
          <p className="text-muted-foreground text-sm">{specialization}</p>
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-gold text-gold" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
            <span className="text-muted-foreground text-sm">•</span>
            <span className="text-sm text-muted-foreground">{experience}+ years</span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-lg font-bold text-primary">₹{pricePerMinute}</div>
          <div className="text-xs text-muted-foreground">per minute</div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{isOnline ? 'Available now' : 'Offline'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Shield className="h-4 w-4" />
            <span>Verified</span>
          </div>
        </div>
        
        <Button 
          className={isOnline ? "btn-hero text-sm px-4 py-2" : "btn-primary text-sm px-4 py-2"}
          disabled={!isOnline}
          onClick={() => isOnline && setIsChatOpen(true)}
        >
          <MessageCircle className="w-4 h-4 mr-1" />
          {isOnline ? 'Talk Now' : 'Schedule'}
        </Button>
      </div>
      
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        advisorName={name}
        advisorSpecialty={specialization}
      />
    </div>
  );
};

export default AdvisorCard;