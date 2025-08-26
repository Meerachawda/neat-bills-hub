import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Target, Lightbulb, PiggyBank, Calculator, ArrowRight, Star } from "lucide-react";

export default function Tips() {
  const tips = [
    {
      id: 1,
      category: "Money Saving",
      title: "Audit Your Subscriptions Monthly",
      description: "Review all your subscriptions and cancel ones you don't actively use. The average person wastes $79/month on unused subscriptions.",
      impact: "High",
      savings: "$79/month",
      difficulty: "Easy"
    },
    {
      id: 2,
      category: "Budgeting",
      title: "Use the 50/30/20 Rule",
      description: "Allocate 50% for needs, 30% for wants, and 20% for savings and debt repayment. This creates a balanced financial foundation.",
      impact: "High",
      savings: "20% savings rate",
      difficulty: "Medium"
    },
    {
      id: 3,
      category: "Investment",
      title: "Start Emergency Fund First",
      description: "Before investing, build an emergency fund covering 3-6 months of expenses. This prevents you from going into debt during emergencies.",
      impact: "Critical",
      savings: "Avoid debt interest",
      difficulty: "Medium"
    },
    {
      id: 4,
      category: "Bills Management",
      title: "Automate Fixed Bills",
      description: "Set up automatic payments for fixed bills like rent, insurance, and utilities to avoid late fees and improve credit score.",
      impact: "Medium",
      savings: "$25-50/month in fees",
      difficulty: "Easy"
    },
    {
      id: 5,
      category: "Investment",
      title: "Take Advantage of Employer 401k Match",
      description: "If your employer offers 401k matching, contribute at least enough to get the full match. It's free money!",
      impact: "High",
      savings: "100% return on match",
      difficulty: "Easy"
    },
    {
      id: 6,
      category: "Money Saving",
      title: "Negotiate Your Bills Annually",
      description: "Call providers yearly to negotiate better rates on internet, phone, and insurance. Loyalty doesn't always pay.",
      impact: "Medium",
      savings: "$20-100/month",
      difficulty: "Medium"
    }
  ];

  const investmentBasics = [
    {
      title: "Start With Index Funds",
      description: "Low-cost, diversified index funds are perfect for beginners. They track market performance with minimal fees.",
      risk: "Low to Medium"
    },
    {
      title: "Dollar-Cost Averaging",
      description: "Invest a fixed amount regularly regardless of market conditions. This reduces the impact of market volatility.",
      risk: "Low"
    },
    {
      title: "Understand Your Risk Tolerance",
      description: "Younger investors can typically handle more risk. Consider your timeline and comfort level with market fluctuations.",
      risk: "Varies"
    },
    {
      title: "Diversify Your Portfolio",
      description: "Don't put all eggs in one basket. Spread investments across different asset classes and sectors.",
      risk: "Reduces Risk"
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "bg-success text-success-foreground";
      case "Critical": return "bg-primary text-primary-foreground";
      case "Medium": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-success/20 text-success border-success/30";
      case "Medium": return "bg-warning/20 text-warning border-warning/30";
      case "Hard": return "bg-destructive/20 text-destructive border-destructive/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-hero bg-clip-text text-transparent animate-fade-in">
          Financial Tips & Investment Guide
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up">
          Practical advice to optimize your finances, reduce expenses, and start your investment journey.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4 animate-slide-up">
        <Card className="gradient-card shadow-soft border-0 text-center">
          <CardContent className="p-4">
            <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">$158</div>
            <div className="text-sm text-muted-foreground">Avg Monthly Savings</div>
          </CardContent>
        </Card>
        <Card className="gradient-card shadow-soft border-0 text-center">
          <CardContent className="p-4">
            <Target className="h-8 w-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-success">6</div>
            <div className="text-sm text-muted-foreground">Actionable Tips</div>
          </CardContent>
        </Card>
        <Card className="gradient-card shadow-soft border-0 text-center">
          <CardContent className="p-4">
            <PiggyBank className="h-8 w-8 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-secondary">20%</div>
            <div className="text-sm text-muted-foreground">Recommended Savings</div>
          </CardContent>
        </Card>
        <Card className="gradient-card shadow-soft border-0 text-center">
          <CardContent className="p-4">
            <Calculator className="h-8 w-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-accent">$1M+</div>
            <div className="text-sm text-muted-foreground">30-Year Growth Potential</div>
          </CardContent>
        </Card>
      </div>

      {/* Money Management Tips */}
      <section className="space-y-6">
        <div className="flex items-center space-x-2">
          <Lightbulb className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Smart Money Tips</h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {tips.map((tip, index) => (
            <Card key={tip.id} className="gradient-card shadow-medium border-0 hover:shadow-large transition-smooth animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs">
                      {tip.category}
                    </Badge>
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                  </div>
                  <Badge className={getImpactColor(tip.impact)}>
                    {tip.impact} Impact
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base">
                  {tip.description}
                </CardDescription>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-success">Potential Savings</div>
                    <div className="font-bold text-success">{tip.savings}</div>
                  </div>
                  
                  <Badge className={getDifficultyColor(tip.difficulty)}>
                    {tip.difficulty}
                  </Badge>
                </div>
                
                <Button variant="outline" className="w-full">
                  <Star className="h-4 w-4 mr-2" />
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Investment Basics */}
      <section className="space-y-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Investment Basics for Beginners</h2>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            {investmentBasics.map((item, index) => (
              <Card key={index} className="gradient-card shadow-soft border-0 animate-slide-up" style={{ animationDelay: `${index * 0.1 + 0.6}s` }}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {item.risk} Risk
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Investment Calculator Preview */}
          <Card className="gradient-card shadow-medium border-0 animate-slide-up" style={{ animationDelay: '1s' }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-5 w-5 text-primary mr-2" />
                Investment Growth Calculator
              </CardTitle>
              <CardDescription>
                See how your money can grow over time with compound interest
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">Monthly Investment</span>
                  <span className="font-bold text-lg">$500</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">Annual Return (7%)</span>
                  <span className="font-bold text-lg">$600 / year</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <span className="text-sm font-medium">30-Year Value</span>
                  <span className="font-bold text-2xl text-primary">$1,223,459</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Invested:</span>
                  <span className="font-medium">$180,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Interest Earned:</span>
                  <span className="font-medium text-success">$1,043,459</span>
                </div>
              </div>
              
              <Button className="w-full gradient-primary text-white shadow-medium hover:shadow-glow transition-smooth">
                <Calculator className="h-4 w-4 mr-2" />
                Use Full Calculator
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Action Section */}
      <Card className="gradient-hero text-white shadow-large border-0 animate-fade-in" style={{ animationDelay: '1.2s' }}>
        <CardContent className="text-center py-12">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Ready to Transform Your Finances?</h2>
            <p className="text-xl opacity-90">
              Start implementing these strategies today. Small changes compound into life-changing results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Target className="h-5 w-5 mr-2" />
                Set Financial Goals
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 text-white border-white/30 hover:bg-white/10">
                <ArrowRight className="h-5 w-5 mr-2" />
                Start Budget Planning
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}