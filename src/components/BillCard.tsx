import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2, Calendar, DollarSign, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  category: string;
  status: 'overdue' | 'due-soon' | 'upcoming';
  notes?: string;
}

interface BillCardProps {
  bill: Bill;
  onDelete: (id: string) => void;
}

export function BillCard({ bill, onDelete }: BillCardProps) {
  const [showNotes, setShowNotes] = useState(false);

  const statusConfig = {
    overdue: {
      variant: "destructive" as const,
      className: "bg-overdue text-overdue-foreground border-overdue/20",
      label: "Overdue"
    },
    'due-soon': {
      variant: "default" as const,
      className: "bg-due-soon text-due-soon-foreground border-due-soon/20",
      label: "Due Soon"
    },
    upcoming: {
      variant: "secondary" as const,
      className: "bg-upcoming text-upcoming-foreground border-upcoming/20",
      label: "Upcoming"
    }
  };

  const config = statusConfig[bill.status];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntilDue = (dateString: string) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `Due in ${diffDays} days`;
  };

  return (
    <Card className={cn(
      "relative p-4 transition-smooth hover:shadow-medium animate-slide-up",
      "gradient-card border shadow-soft"
    )}>
      {/* Delete Button */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-8 w-8 p-0 text-muted-foreground hover:text-destructive transition-smooth"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Bill</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{bill.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(bill.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Status Badge */}
      <div className="flex items-start justify-between mb-3">
        <Badge className={cn("text-xs font-medium", config.className)}>
          {config.label}
        </Badge>
        <span className="text-xs text-muted-foreground">
          {getDaysUntilDue(bill.dueDate)}
        </span>
      </div>

      {/* Bill Info */}
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-card-foreground">{bill.name}</h3>
          <p className="text-sm text-muted-foreground">{bill.category}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-primary">
            <DollarSign className="h-4 w-4 mr-1" />
            <span className="font-bold text-lg">${bill.amount.toFixed(2)}</span>
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="text-sm">{formatDate(bill.dueDate)}</span>
          </div>
        </div>

        {/* Notes */}
        {bill.notes && (
          <div className="pt-2 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotes(!showNotes)}
              className="p-0 h-auto text-xs text-muted-foreground hover:text-foreground"
            >
              <FileText className="h-3 w-3 mr-1" />
              {showNotes ? 'Hide Notes' : 'Show Notes'}
            </Button>
            
            {showNotes && (
              <p className="text-sm text-muted-foreground mt-2 p-2 bg-muted rounded-sm animate-fade-in">
                {bill.notes}
              </p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}