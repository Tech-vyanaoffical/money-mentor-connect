import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, User, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  role: 'customer' | 'advisor';
  full_name: string;
  email: string;
  mobile_number: string;
  created_at: string;
}

const Dashboard = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      // Mock profile data for now since the types aren't generated yet
      const mockProfile: Profile = {
        id: user?.id || '',
        role: 'customer', // This would come from metadata
        full_name: user?.user_metadata?.full_name || 'User',
        email: user?.email || '',
        mobile_number: user?.user_metadata?.mobile_number || '',
        created_at: new Date().toISOString()
      };
      setProfile(mockProfile);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gold rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-primary">FinanceLink</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {profile.full_name}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <p className="text-foreground">{profile.full_name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-foreground">{profile.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Mobile</label>
                <p className="text-foreground">{profile.mobile_number}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Role</label>
                <p className="text-foreground capitalize">{profile.role}</p>
              </div>
            </CardContent>
          </Card>

          {/* Role-specific Dashboard */}
          {profile.role === 'customer' ? (
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle>Customer Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Welcome to your customer dashboard! Here you can:
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Find financial advisors</li>
                  <li>• Schedule consultations</li>
                  <li>• View chat history</li>
                  <li>• Manage payments</li>
                </ul>
              </CardContent>
            </Card>
          ) : (
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle>Advisor Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Welcome to your advisor dashboard! Here you can:
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Manage availability</li>
                  <li>• View client requests</li>
                  <li>• Handle consultations</li>
                  <li>• Track earnings</li>
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {profile.role === 'customer' ? (
                <>
                  <Button className="w-full btn-primary">Find Advisors</Button>
                  <Button variant="outline" className="w-full">View History</Button>
                </>
              ) : (
                <>
                  <Button className="w-full btn-primary">Set Availability</Button>
                  <Button variant="outline" className="w-full">View Clients</Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;