import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendarEvent {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
  status: 'overdue' | 'due-soon' | 'upcoming';
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Sample calendar events
  const events: CalendarEvent[] = [
    { id: '1', name: 'Netflix', amount: 15.99, date: '2024-01-15', category: 'Streaming', status: 'overdue' },
    { id: '2', name: 'Electricity', amount: 145.50, date: '2024-01-20', category: 'Utilities', status: 'due-soon' },
    { id: '3', name: 'Car Insurance', amount: 89.99, date: '2024-01-28', category: 'Insurance', status: 'upcoming' },
    { id: '4', name: 'Spotify', amount: 9.99, date: '2024-02-05', category: 'Streaming', status: 'upcoming' },
    { id: '5', name: 'Internet', amount: 79.99, date: '2024-01-22', category: 'Utilities', status: 'due-soon' },
    { id: '6', name: 'Phone Plan', amount: 55.00, date: '2024-01-25', category: 'Utilities', status: 'upcoming' }
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="aspect-square"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day);
      const isToday = new Date().getDate() === day && 
                     new Date().getMonth() === currentDate.getMonth() && 
                     new Date().getFullYear() === currentDate.getFullYear();

      days.push(
        <div
          key={day}
          className={cn(
            "aspect-square p-1 border border-border/50 transition-smooth hover:bg-muted/50",
            isToday && "bg-primary/10 border-primary/30"
          )}
        >
          <div className={cn(
            "w-full h-full flex flex-col",
            isToday && "font-bold text-primary"
          )}>
            <span className="text-sm mb-1">{day}</span>
            <div className="flex-1 space-y-1 overflow-hidden">
              {dayEvents.slice(0, 2).map(event => (
                <div
                  key={event.id}
                  className={cn(
                    "text-xs p-1 rounded text-white text-center font-medium",
                    event.status === 'overdue' && "bg-overdue",
                    event.status === 'due-soon' && "bg-due-soon",
                    event.status === 'upcoming' && "bg-upcoming"
                  )}
                >
                  ${event.amount}
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className="text-xs text-center text-muted-foreground font-medium">
                  +{dayEvents.length - 2} more
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return days;
  };

  const upcomingEvents = events
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 6);

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-hero bg-clip-text text-transparent animate-fade-in">
          Bill Calendar
        </h1>
        <p className="text-xl text-muted-foreground animate-slide-up">
          Visualize your upcoming bills and never miss a payment deadline.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Calendar */}
        <Card className="lg:col-span-2 gradient-card shadow-medium border-0 animate-slide-up">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                <CardTitle className="text-2xl">{formatMonth(currentDate)}</CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('prev')}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('next')}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-0 border border-border/50 rounded-lg overflow-hidden">
              {/* Day headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="bg-muted p-3 text-center text-sm font-medium border-r border-b border-border/50 last:border-r-0">
                  {day}
                </div>
              ))}
              {/* Calendar days */}
              {renderCalendarDays()}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Bills Sidebar */}
        <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Card className="gradient-card shadow-medium border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 text-primary mr-2" />
                Upcoming Bills
              </CardTitle>
              <CardDescription>
                Next 6 bills due in chronological order
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event, index) => {
                const dueDate = new Date(event.date);
                const today = new Date();
                const diffTime = dueDate.getTime() - today.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                return (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-3 rounded-lg gradient-card border animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex-1">
                      <div className="font-medium">{event.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {dueDate.toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">
                        ${event.amount.toFixed(2)}
                      </div>
                      <Badge
                        className={cn(
                          "text-xs",
                          event.status === 'overdue' && "bg-overdue text-overdue-foreground",
                          event.status === 'due-soon' && "bg-due-soon text-due-soon-foreground",
                          event.status === 'upcoming' && "bg-upcoming text-upcoming-foreground"
                        )}
                      >
                        {diffDays < 0 ? `${Math.abs(diffDays)}d overdue` :
                         diffDays === 0 ? 'Today' :
                         diffDays === 1 ? 'Tomorrow' :
                         `${diffDays}d`}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="gradient-card shadow-medium border-0">
            <CardHeader>
              <CardTitle>This Month</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Bills</span>
                <span className="font-bold text-xl text-primary">
                  ${events.reduce((sum, event) => sum + event.amount, 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Bills Count</span>
                <span className="font-bold">{events.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Avg per Bill</span>
                <span className="font-bold">
                  ${(events.reduce((sum, event) => sum + event.amount, 0) / events.length).toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}