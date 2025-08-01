import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

interface AdvisorSignupFormProps {
  onSuccess: () => void;
}

const expertiseAreas = [
  'tax',
  'stocks', 
  'budgeting',
  'insurance',
  'retirement',
  'loans',
  'investment'
];

export const AdvisorSignupForm: React.FC<AdvisorSignupFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    panCard: '',
    aadhaar: '',
    experience: '',
    expertise: '',
  });
  const [certificate, setCertificate] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCertificate(e.target.files[0]);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (!certificate) {
      toast({
        title: "Certificate Required",
        description: "Please upload your certificate",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // First create the user account
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: formData.fullName,
            mobile_number: formData.mobile,
            role: 'advisor',
            pan_card_number: formData.panCard,
            aadhaar_number: formData.aadhaar,
            years_experience: parseInt(formData.experience),
            expertise_area: formData.expertise,
            certificate_url: null // Will be updated after file upload
          }
        }
      });

      if (error) throw error;

      // Upload certificate (this will be implemented when we set up storage)
      toast({
        title: "Application Submitted",
        description: "Your advisor application has been submitted for review. Please check your email to verify your account.",
      });

      onSuccess();
    } catch (error: any) {
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4 max-h-96 overflow-y-auto">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="mobile">Mobile Number</Label>
        <Input
          id="mobile"
          name="mobile"
          type="tel"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="panCard">PAN Card Number</Label>
        <Input
          id="panCard"
          name="panCard"
          value={formData.panCard}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="aadhaar">Aadhaar Number</Label>
        <Input
          id="aadhaar"
          name="aadhaar"
          value={formData.aadhaar}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="experience">Years of Experience</Label>
        <Input
          id="experience"
          name="experience"
          type="number"
          min="0"
          value={formData.experience}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="expertise">Area of Expertise</Label>
        <Select value={formData.expertise} onValueChange={(value) => setFormData(prev => ({ ...prev, expertise: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select your expertise" />
          </SelectTrigger>
          <SelectContent>
            {expertiseAreas.map((area) => (
              <SelectItem key={area} value={area}>
                {area.charAt(0).toUpperCase() + area.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="certificate">Upload Certificate (PDF/Image)</Label>
        <Input
          id="certificate"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Submitting Application..." : "Apply as Advisor"}
      </Button>
    </form>
  );
};