import React, { useState, useEffect } from 'react';
import { AuthModal } from '@/components/auth/AuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

const Auth = () => {
  const [defaultTab, setDefaultTab] = useState<'login' | 'customer-signup' | 'advisor-signup'>('login');
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      // Redirect authenticated users to dashboard
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-hero flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-8">
        <div className="p-3 bg-gold rounded-lg">
          <TrendingUp className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white">FinanceLink</h1>
      </div>

      {/* Tab Selector */}
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setDefaultTab('login')}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            defaultTab === 'login'
              ? 'bg-gold text-white shadow-lg'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setDefaultTab('customer-signup')}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            defaultTab === 'customer-signup'
              ? 'bg-gold text-white shadow-lg'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Customer Signup
        </button>
        <button
          onClick={() => setDefaultTab('advisor-signup')}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            defaultTab === 'advisor-signup'
              ? 'bg-gold text-white shadow-lg'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Advisor Signup
        </button>
      </div>

      {/* Auth Modal - Always Open */}
      <div className="w-full max-w-md">
        <AuthModal
          isOpen={true}
          onClose={() => {}}
          defaultTab={defaultTab}
        />
      </div>
    </div>
  );
};

export default Auth;