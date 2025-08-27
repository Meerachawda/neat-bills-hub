import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useBills } from "@/hooks/useBills";
import { Plus, DollarSign, Calendar, Tag, Clock, FileText } from "lucide-react";

interface AddBillDialogProps {
  trigger?: React.ReactNode;
}

export function AddBillDialog({ trigger }: AddBillDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    due_date: "",
    category: "",
    frequency: "monthly",
    notes: ""
  });
  
  const { addBill } = useBills();
  const { toast } = useToast();

  const categories = [
    "Utilities",
    "Entertainment",
    "Insurance",
    "Healthcare",
    "Transportation",
    "Subscriptions",
    "Banking",
    "Education",
    "Housing",
    "Other"
  ];

  const frequencies = [
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "yearly", label: "Yearly" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.amount || !formData.due_date || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than 0.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      await addBill({
        name: formData.name.trim(),
        amount: amount,
        due_date: formData.due_date,
        category: formData.category,
        frequency: formData.frequency,
        notes: formData.notes.trim() || undefined
      });

      // Reset form
      setFormData({
        name: "",
        amount: "",
        due_date: "",
        category: "",
        frequency: "monthly",
        notes: ""
      });
      
      setOpen(false);
    } catch (error) {
      // Error handling is done in the useBills hook
    } finally {
      setLoading(false);
    }
  };

  const defaultTrigger = (
    <Button className="gradient-primary text-white shadow-medium hover:shadow-glow transition-smooth">
      <Plus className="h-4 w-4 mr-2" />
      Add Bill
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] gradient-card border-0 shadow-elegant">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-hero bg-clip-text text-transparent">
            Add New Bill
          </DialogTitle>
          <DialogDescription>
            Add a new bill to track and manage your expenses.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bill Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Bill Name *
            </Label>
            <div className="relative">
              <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                placeholder="e.g., Netflix, Electricity Bill"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="pl-10 transition-smooth focus:shadow-glow"
                required
              />
            </div>
          </div>

          {/* Amount and Due Date */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium">
                Amount *
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  className="pl-10 transition-smooth focus:shadow-glow"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="due_date" className="text-sm font-medium">
                Due Date *
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="due_date"
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => handleInputChange("due_date", e.target.value)}
                  className="pl-10 transition-smooth focus:shadow-glow"
                  required
                />
              </div>
            </div>
          </div>

          {/* Category and Frequency */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
                required
              >
                <SelectTrigger className="transition-smooth focus:shadow-glow">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Frequency</Label>
              <Select
                value={formData.frequency}
                onValueChange={(value) => handleInputChange("frequency", value)}
              >
                <SelectTrigger className="transition-smooth focus:shadow-glow">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {frequencies.map((freq) => (
                    <SelectItem key={freq.value} value={freq.value}>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {freq.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">
              Notes (Optional)
            </Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="notes"
                placeholder="Add any additional notes about this bill..."
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="pl-10 min-h-[80px] transition-smooth focus:shadow-glow resize-none"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="gradient-primary text-white shadow-medium hover:shadow-glow transition-smooth"
            >
              {loading ? "Adding..." : "Add Bill"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}