import { useState } from "react";

export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  category: string;
  frequency: string;
  notes?: string;
  status: 'upcoming' | 'due-soon' | 'overdue';
}

const mockBills: Bill[] = [
  {
    id: '1',
    name: 'Netflix',
    amount: 15.99,
    dueDate: '2024-08-30',
    category: 'Entertainment',
    frequency: 'Monthly',
    status: 'overdue'
  },
  {
    id: '2',
    name: 'Electricity Bill',
    amount: 85.50,
    dueDate: '2024-09-02',
    category: 'Utilities',
    frequency: 'Monthly',
    status: 'due-soon'
  },
  {
    id: '3',
    name: 'Spotify',
    amount: 9.99,
    dueDate: '2024-09-15',
    category: 'Entertainment',
    frequency: 'Monthly',
    status: 'upcoming'
  }
];

export function useBills() {
  const [bills, setBills] = useState<Bill[]>(mockBills);

  const addBill = (bill: Omit<Bill, 'id'>) => {
    const newBill = { ...bill, id: Date.now().toString() };
    setBills(prev => [...prev, newBill]);
  };

  const deleteBill = (id: string) => {
    setBills(prev => prev.filter(bill => bill.id !== id));
  };

  const updateBill = (id: string, updates: Partial<Bill>) => {
    setBills(prev => prev.map(bill => 
      bill.id === id ? { ...bill, ...updates } : bill
    ));
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
    addBill,
    deleteBill,
    updateBill,
    exportData
  };
}