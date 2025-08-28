import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              first_name: formData.firstName,
              last_name: formData.lastName
            }
          }
        });

        if (error) throw error;

        toast({
          title: "Success!",
          description: "Account created! Please check your email to verify your account.",
        });
        navigate('/');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast({
          title: "Success!",
          description: "Welcome back! You've been signed in successfully.",
        });
        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-bg">
      <Card className="w-full max-w-md gradient-card shadow-elegant border-0 animate-fade-in">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-3xl font-bold gradient-hero bg-clip-text text-transparent">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </CardTitle>
          <CardDescription className="text-lg">
            {isSignUp 
              ? 'Start managing your bills with ease'
              : 'Sign in to your BillBuddy account'
            }
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {isSignUp && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="pl-10 transition-smooth focus:shadow-glow"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="pl-10 transition-smooth focus:shadow-glow"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 transition-smooth focus:shadow-glow"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 transition-smooth focus:shadow-glow"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full gradient-primary text-white shadow-medium hover:shadow-glow transition-smooth"
            >
              {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="text-center space-y-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm"
            >
              {isSignUp 
                ? "Already have an account? Sign in" 
                : "Don't have an account? Sign up"
              }
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}