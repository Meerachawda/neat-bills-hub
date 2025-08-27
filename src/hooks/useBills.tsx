import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface Bill {
  id: string;
  name: string;
  amount: number;
  due_date: string;
  category: string;
  frequency: string;
  notes?: string;
  status: 'upcoming' | 'due-soon' | 'overdue';
  user_id: string;
}

export function useBills() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Calculate bill status based on due date
  const calculateBillStatus = (dueDate: string): 'upcoming' | 'due-soon' | 'overdue' => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'overdue';
    if (diffDays <= 3) return 'due-soon';
    return 'upcoming';
  };

  // Fetch bills from Supabase
  const fetchBills = async () => {
    if (!user) {
      setBills([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('bills')
        .select('*')
        .eq('user_id', user.id)
        .order('due_date', { ascending: true });

      if (error) throw error;

      const billsWithStatus = (data || []).map(bill => ({
        ...bill,
        status: calculateBillStatus(bill.due_date)
      }));

      setBills(billsWithStatus);
    } catch (error: any) {
      toast({
        title: "Error loading bills",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, [user]);

  const addBill = async (billData: Omit<Bill, 'id' | 'user_id' | 'status'>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add bills",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('bills')
        .insert({
          ...billData,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      const newBill = {
        ...data,
        status: calculateBillStatus(data.due_date)
      };

      setBills(prev => [...prev, newBill]);
      toast({
        title: "Bill added successfully",
        description: `${billData.name} has been added to your bills.`
      });
    } catch (error: any) {
      toast({
        title: "Error adding bill",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const deleteBill = async (id: string) => {
    try {
      const { error } = await supabase
        .from('bills')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setBills(prev => prev.filter(bill => bill.id !== id));
      toast({
        title: "Bill deleted",
        description: "The bill has been removed successfully."
      });
    } catch (error: any) {
      toast({
        title: "Error deleting bill",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const updateBill = async (id: string, updates: Partial<Omit<Bill, 'id' | 'user_id'>>) => {
    try {
      const { data, error } = await supabase
        .from('bills')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setBills(prev => prev.map(bill => 
        bill.id === id ? {
          ...data,
          status: calculateBillStatus(data.due_date)
        } : bill
      ));

      toast({
        title: "Bill updated",
        description: "Your bill has been updated successfully."
      });
    } catch (error: any) {
      toast({
        title: "Error updating bill",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(bills, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'bills-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return {
    bills,
    loading,
    addBill,
    deleteBill,
    updateBill,
    exportData,
    refreshBills: fetchBills
  };
}