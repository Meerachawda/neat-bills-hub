import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BillCard, Bill } from "@/components/BillCard";
import { PlusCircle, DollarSign, AlertTriangle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const [bills, setBills] = useState<Bill[]>([
    {
      id: '1',
      name: 'Netflix Subscription',
      amount: 15.99,
      dueDate: '2024-01-15',
      category: 'Streaming',
      status: 'overdue',
      notes: 'Annual plan renewal coming up'
    },
    {
      id: '2',
      name: 'Electricity Bill',
      amount: 145.50,
      dueDate: '2024-01-20',
      category: 'Utilities',
      status: 'due-soon',
      notes: 'Higher usage this month due to heating'
    },
    {
      id: '3',
      name: 'Car Insurance',
      amount: 89.99,
      dueDate: '2024-01-28',
      category: 'Insurance',
      status: 'upcoming'
    },
    {
      id: '4',
      name: 'Spotify Premium',
      amount: 9.99,
      dueDate: '2024-02-05',
      category: 'Streaming',
      status: 'upcoming',
      notes: 'Student discount expires next month'
    }
  ]);

  const handleDeleteBill = (id: string) => {
    setBills(prev => prev.filter(bill => bill.id !== id));
  };

  // Categorize bills
  const overdueBills = bills.filter(bill => bill.status === 'overdue');
  const dueSoonBills = bills.filter(bill => bill.status === 'due-soon');
  const upcomingBills = bills.filter(bill => bill.status === 'upcoming');

  // Calculate totals
  const totalMonthly = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const overdueAmount = overdueBills.reduce((sum, bill) => sum + bill.amount, 0);
  const dueSoonAmount = dueSoonBills.reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-hero bg-clip-text text-transparent animate-fade-in">
          Your Financial Command Center
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
          Take control of your bills and subscriptions. Never miss a payment again.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="gradient-card shadow-soft border-0 animate-slide-up">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Monthly</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              ${totalMonthly.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {bills.length} active bills
            </p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-soft border-0 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-overdue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-overdue">
              ${overdueAmount.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {overdueBills.length} bills overdue
            </p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-soft border-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due Soon</CardTitle>
            <Clock className="h-4 w-4 text-due-soon" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-due-soon">
              ${dueSoonAmount.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {dueSoonBills.length} bills due soon
            </p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-soft border-0 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <CardContent className="flex items-center justify-center h-full">
            <Button className="w-full gradient-primary text-white shadow-medium hover:shadow-glow transition-smooth">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New Bill
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bills Sections */}
      <div className="space-y-8">
        {/* Overdue Bills */}
        {overdueBills.length > 0 && (
          <section>
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-5 w-5 text-overdue mr-2" />
              <h2 className="text-2xl font-bold text-overdue">Overdue Bills</h2>
              <span className="ml-2 text-sm bg-overdue text-overdue-foreground px-2 py-1 rounded-full">
                {overdueBills.length}
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {overdueBills.map((bill, index) => (
                <div key={bill.id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <BillCard bill={bill} onDelete={handleDeleteBill} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Due Soon Bills */}
        {dueSoonBills.length > 0 && (
          <section>
            <div className="flex items-center mb-4">
              <Clock className="h-5 w-5 text-due-soon mr-2" />
              <h2 className="text-2xl font-bold text-due-soon">Due Soon</h2>
              <span className="ml-2 text-sm bg-due-soon text-due-soon-foreground px-2 py-1 rounded-full">
                {dueSoonBills.length}
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {dueSoonBills.map((bill, index) => (
                <div key={bill.id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <BillCard bill={bill} onDelete={handleDeleteBill} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Bills */}
        {upcomingBills.length > 0 && (
          <section>
            <div className="flex items-center mb-4">
              <DollarSign className="h-5 w-5 text-upcoming mr-2" />
              <h2 className="text-2xl font-bold text-upcoming">Upcoming Bills</h2>
              <span className="ml-2 text-sm bg-upcoming text-upcoming-foreground px-2 py-1 rounded-full">
                {upcomingBills.length}
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingBills.map((bill, index) => (
                <div key={bill.id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <BillCard bill={bill} onDelete={handleDeleteBill} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Empty State */}
      {bills.length === 0 && (
        <div className="text-center py-12 animate-fade-in">
          <div className="h-16 w-16 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center">
            <PlusCircle className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No bills yet</h3>
          <p className="text-muted-foreground mb-4">Start by adding your first bill to get organized!</p>
          <Button className="gradient-primary text-white shadow-medium hover:shadow-glow transition-smooth">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Your First Bill
          </Button>
        </div>
      )}
    </div>
  );
}