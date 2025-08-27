import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useBills } from "@/hooks/useBills";
import { useAuth } from "@/contexts/AuthContext";
import { BillCard } from "@/components/BillCard";
import { AddBillDialog } from "@/components/AddBillDialog";
import { Plus, AlertTriangle, Clock, CheckCircle, TrendingUp, DollarSign, Calendar, Target } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { bills, loading, deleteBill } = useBills();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto p-6 text-center">
        <Card className="max-w-md mx-auto gradient-card shadow-elegant border-0">
          <CardHeader>
            <CardTitle className="gradient-hero bg-clip-text text-transparent">
              Please Sign In
            </CardTitle>
            <CardDescription>
              You need to be signed in to view your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="gradient-primary text-white">
              <Link to="/auth">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-48 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const overdueBills = bills.filter(bill => bill.status === 'overdue');
  const dueSoonBills = bills.filter(bill => bill.status === 'due-soon');
  const upcomingBills = bills.filter(bill => bill.status === 'upcoming');
  
  const totalMonthlyAmount = bills.reduce((sum, bill) => {
    if (bill.frequency === 'monthly') return sum + bill.amount;
    if (bill.frequency === 'weekly') return sum + (bill.amount * 4.33);
    if (bill.frequency === 'yearly') return sum + (bill.amount / 12);
    if (bill.frequency === 'quarterly') return sum + (bill.amount / 3);
    return sum + bill.amount;
  }, 0);

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-hero bg-clip-text text-transparent animate-fade-in">
            Your Dashboard
          </h1>
          <p className="text-xl text-muted-foreground animate-slide-up">
            Keep track of all your bills in one place.
          </p>
        </div>
        <AddBillDialog />
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-slide-up">
        <Card className="gradient-card shadow-medium border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Bills</p>
                <p className="text-2xl font-bold text-foreground">{bills.length}</p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-medium border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Total</p>
                <p className="text-2xl font-bold text-foreground">${totalMonthlyAmount.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-medium border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Due Soon</p>
                <p className="text-2xl font-bold text-warning">{dueSoonBills.length}</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-medium border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold text-overdue">{overdueBills.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-overdue" />
            </div>
          </CardContent>
        </Card>
      </div>

      {bills.length === 0 ? (
        <Card className="gradient-card shadow-medium border-0 text-center p-12 animate-fade-in">
          <CardContent className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Plus className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">No bills yet</h3>
            <p className="text-muted-foreground">
              Get started by adding your first bill to track your expenses.
            </p>
            <AddBillDialog 
              trigger={
                <Button className="gradient-primary text-white shadow-medium hover:shadow-glow transition-smooth">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Bill
                </Button>
              }
            />
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Overdue Bills */}
          {overdueBills.length > 0 && (
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-overdue" />
                <h2 className="text-2xl font-bold text-overdue">Overdue Bills</h2>
                <Badge variant="destructive" className="bg-overdue text-overdue-foreground">
                  {overdueBills.length}
                </Badge>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {overdueBills.map((bill) => (
                  <BillCard key={bill.id} bill={bill} onDelete={deleteBill} />
                ))}
              </div>
            </div>
          )}

          {/* Due Soon Bills */}
          {dueSoonBills.length > 0 && (
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-warning" />
                <h2 className="text-2xl font-bold text-warning">Due Soon</h2>
                <Badge variant="default" className="bg-warning text-warning-foreground">
                  {dueSoonBills.length}
                </Badge>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {dueSoonBills.map((bill) => (
                  <BillCard key={bill.id} bill={bill} onDelete={deleteBill} />
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Bills */}
          {upcomingBills.length > 0 && (
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <h2 className="text-2xl font-bold text-success">Upcoming Bills</h2>
                <Badge variant="secondary" className="bg-success text-success-foreground">
                  {upcomingBills.length}
                </Badge>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {upcomingBills.map((bill) => (
                  <BillCard key={bill.id} bill={bill} onDelete={deleteBill} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}