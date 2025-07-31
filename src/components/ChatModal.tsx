import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Clock, Video, Phone } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'advisor';
  timestamp: Date;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  advisorName: string;
  advisorSpecialty: string;
  isAuthenticated?: boolean;
  onAuthRequired?: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({ 
  isOpen, 
  onClose, 
  advisorName, 
  advisorSpecialty,
  isAuthenticated = false,
  onAuthRequired
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [isFreeTime, setIsFreeTime] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [chatEnded, setChatEnded] = useState(false);
  const [hasUsedFreeTime, setHasUsedFreeTime] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !isConnected && !hasUsedFreeTime) {
      // Check if user has already used free time (localStorage)
      const usedFreeTime = localStorage.getItem('hasUsedFreeTime');
      if (usedFreeTime && !isAuthenticated) {
        setHasUsedFreeTime(true);
        setChatEnded(true);
        addMessage('advisor', 'You have already used your free 2 minutes. Please login and pay to continue chatting with our financial advisors.');
        return;
      }
      
      // Simulate connection delay
      setTimeout(() => {
        setIsConnected(true);
        addMessage('advisor', `Hello! I'm ${advisorName}, your financial advisor specializing in ${advisorSpecialty}. Your first 2 minutes are FREE. How can I help you today?`);
      }, 2000);
    }
  }, [isOpen, advisorName, advisorSpecialty, isConnected, hasUsedFreeTime, isAuthenticated]);

  useEffect(() => {
    if (isConnected && isFreeTime && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsFreeTime(false);
            setChatEnded(true);
            localStorage.setItem('hasUsedFreeTime', 'true');
            
            if (!isAuthenticated) {
              addMessage('advisor', 'Your free 2 minutes have ended. Please login and pay ₹2/minute to continue this conversation.');
              onAuthRequired?.();
            } else {
              addMessage('advisor', 'Your free 2 minutes have ended. Continuing at ₹2/minute. Click "Pay & Continue" to proceed.');
            }
            
            toast({
              title: "Free Time Ended",
              description: isAuthenticated 
                ? "Click 'Pay & Continue' to proceed at ₹2/minute" 
                : "Please login to continue with paid consultation",
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isConnected, isFreeTime, timeLeft]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (sender: 'user' | 'advisor', text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || chatEnded) return;

    addMessage('user', inputValue);
    setInputValue('');

    // Simulate advisor response
    setTimeout(() => {
      const responses = [
        "That's a great question! Let me analyze your situation...",
        "Based on your query, I recommend considering these options...",
        "I understand your concern. Here's what I suggest...",
        "For your financial goals, we should focus on...",
        "Let me break down the best approach for you..."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage('advisor', randomResponse);
    }, 1000 + Math.random() * 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePayAndContinue = () => {
    // This will be implemented with Stripe payment
    toast({
      title: "Payment Integration",
      description: "Payment system will be implemented next. This will process ₹2/minute billing.",
    });
    setChatEnded(false);
  };

  const handleClose = () => {
    setMessages([]);
    setTimeLeft(120);
    setIsFreeTime(true);
    setIsConnected(false);
    setChatEnded(false);
    // Don't reset hasUsedFreeTime on close to prevent loophole
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold text-foreground">
                Chat with {advisorName}
              </DialogTitle>
              <p className="text-sm text-muted-foreground">{advisorSpecialty}</p>
            </div>
            <div className="flex items-center gap-4">
              {isFreeTime && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Clock className="w-3 h-3 mr-1" />
                  Free: {formatTime(timeLeft)}
                </Badge>
              )}
              {!isFreeTime && (
                <Badge variant="destructive">
                  <Clock className="w-3 h-3 mr-1" />
                  Paid: ₹2/min
                </Badge>
              )}
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Video className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0">
          <ScrollArea className="flex-1 p-4">
            {!isConnected ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Connecting to {advisorName}...</p>
                </div>
              </div>
            ) : hasUsedFreeTime && !isAuthenticated ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-6">
                  <h3 className="text-lg font-semibold mb-4">Free Session Already Used</h3>
                  <p className="text-muted-foreground mb-4">
                    You have already used your free 2-minute session. Please login to continue with paid consultation.
                  </p>
                  <Button onClick={onAuthRequired} className="btn-hero">
                    Login to Continue
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {chatEnded && isAuthenticated && (
                  <div className="flex justify-center">
                    <Button onClick={handlePayAndContinue} className="btn-hero">
                      Pay ₹2/min & Continue Chat
                    </Button>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </ScrollArea>

          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={chatEnded ? "Pay to continue chatting..." : "Type your message..."}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={!isConnected || chatEnded}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!inputValue.trim() || !isConnected || chatEnded}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};