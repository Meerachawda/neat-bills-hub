import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Bell, Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-8 max-w-2xl mx-auto p-6">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold gradient-hero bg-clip-text text-transparent animate-fade-in">
            Life-Bills Manager
          </h1>
          <p className="text-xl text-muted-foreground animate-slide-up">
            Your Personal Assistant for Bills & Subscriptions. Take Control. Ditch the Stress.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Link to="/dashboard">
            <Button size="lg" className="gradient-primary text-white shadow-medium hover:shadow-glow transition-smooth">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/tips">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5">
              View Tips
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="space-y-2">
            <Calendar className="h-8 w-8 text-primary mx-auto" />
            <p className="text-sm text-muted-foreground">Smart Tracking</p>
          </div>
          <div className="space-y-2">
            <Bell className="h-8 w-8 text-primary mx-auto" />
            <p className="text-sm text-muted-foreground">Email Reminders</p>
          </div>
          <div className="space-y-2">
            <Shield className="h-8 w-8 text-primary mx-auto" />
            <p className="text-sm text-muted-foreground">Secure & Private</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
