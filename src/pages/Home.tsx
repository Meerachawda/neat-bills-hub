import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Calendar, Bell, Shield, ArrowRight, Zap, Heart } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Calendar,
      title: "Smart Tracking",
      description: "Never miss a bill with our intelligent calendar system that tracks all your recurring payments."
    },
    {
      icon: Bell,
      title: "Email Reminders",
      description: "Get friendly reminders before bills are due, so you're always prepared and never stressed."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your financial data is encrypted and secure. We prioritize your privacy above everything else."
    },
    {
      icon: Zap,
      title: "Instant Organization",
      description: "Categorize and organize all your subscriptions and bills in one beautiful, easy-to-use dashboard."
    }
  ];

  const benefits = [
    "Reduce financial stress and anxiety",
    "Save money by avoiding late fees",
    "Get a clear overview of monthly expenses",
    "Take control of subscription chaos",
    "Peace of mind with automated reminders",
    "Better financial planning and budgeting"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 gradient-hero opacity-5"></div>
        <div className="container mx-auto text-center relative">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight animate-fade-in">
              <span className="gradient-hero bg-clip-text text-transparent">
                Life-Admin & Bills Manager
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-slide-up">
              Your Personal Assistant for Bills & Subscriptions. 
              <span className="text-primary font-semibold"> Take Control. Ditch the Stress.</span>
            </p>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Finally, a clean and friendly way to manage all your recurring payments. 
              Never worry about missed bills again.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Link to="/dashboard">
                <Button size="lg" className="gradient-primary text-white shadow-large hover:shadow-glow transition-smooth text-lg px-8 py-6">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link to="/dashboard">
                <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5 text-lg px-8 py-6">
                  View Dashboard
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Heart className="h-4 w-4 text-red-500 mr-2" />
              Trusted by busy adults who want to stay organized
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-hero bg-clip-text text-transparent">
              Everything You Need to Stay Organized
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, powerful features designed to bring calm to your financial life.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="gradient-card shadow-medium border-0 hover:shadow-large transition-smooth animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader className="text-center">
                    <div className="h-12 w-12 rounded-lg gradient-primary mx-auto mb-4 flex items-center justify-center animate-gentle-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-hero bg-clip-text text-transparent">
                  Transform Your Financial Stress into Peace of Mind
                </h2>
                <p className="text-xl text-muted-foreground">
                  Join thousands of adults who've taken control of their financial life admin. 
                  Experience the calm that comes with total organization.
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CheckCircle className="h-6 w-6 text-success mr-3 flex-shrink-0" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link to="/dashboard">
                <Button size="lg" className="gradient-primary text-white shadow-medium hover:shadow-glow transition-smooth">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="relative animate-fade-in">
              <div className="absolute inset-0 gradient-primary opacity-10 rounded-2xl transform rotate-3"></div>
              <Card className="gradient-card shadow-large border-0 relative">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Your Bills at a Glance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-overdue/10 rounded-lg border border-overdue/20">
                    <span className="font-medium">Netflix</span>
                    <div className="text-right">
                      <div className="font-bold text-overdue">$15.99</div>
                      <div className="text-xs text-overdue">2 days overdue</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-due-soon/10 rounded-lg border border-due-soon/20">
                    <span className="font-medium">Electricity</span>
                    <div className="text-right">
                      <div className="font-bold text-due-soon">$145.50</div>
                      <div className="text-xs text-due-soon">Due in 3 days</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-upcoming/10 rounded-lg border border-upcoming/20">
                    <span className="font-medium">Car Insurance</span>
                    <div className="text-right">
                      <div className="font-bold text-upcoming">$89.99</div>
                      <div className="text-xs text-upcoming">Due in 12 days</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold gradient-hero bg-clip-text text-transparent">
              Ready to Take Control of Your Bills?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join the community of organized, stress-free bill managers. Your future self will thank you.
            </p>
            <Link to="/dashboard">
              <Button size="lg" className="gradient-primary text-white shadow-large hover:shadow-glow transition-smooth text-lg px-12 py-6">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}