import { createContext, useContext, useState, type ReactNode } from 'react';
import {
  mockTransactions,
  mockDisputes,
  mockNotifications,
  type Transaction,
  type Dispute,
  type AppNotification,
  type DisputeStatus,
  type Priority,
  type RefundStatus,
} from '@/data/mockData';

interface AppDataContextValue {
  transactions: Transaction[];
  disputes: Dispute[];
  notifications: AppNotification[];
  addDispute: (dispute: Dispute) => void;
  updateDispute: (id: string, updates: Partial<Dispute>) => void;
  addAdminNote: (id: string, note: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const AppDataContext = createContext<AppDataContextValue | null>(null);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [disputes, setDisputes] = useState<Dispute[]>(mockDisputes);
  const [notifications, setNotifications] = useState<AppNotification[]>(mockNotifications);

  const addDispute = (dispute: Dispute) => {
    setDisputes((prev) => [dispute, ...prev]);
    setNotifications((prev) => [
      {
        id: `N${Date.now()}`,
        title: 'Dispute Raised',
        message: `Your dispute ${dispute.id} has been submitted successfully.`,
        date: dispute.createdDate,
        read: false,
        type: 'info',
        disputeId: dispute.id,
      },
      ...prev,
    ]);
  };

  const updateDispute = (id: string, updates: Partial<Dispute>) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updates } : d))
    );
    if (updates.status) {
      const type = updates.status === 'Approved' || updates.status === 'Resolved' ? 'success' : updates.status === 'Rejected' ? 'warning' : 'info';
      setNotifications((prev) => [
        {
          id: `N${Date.now()}`,
          title: `Dispute ${updates.status}`,
          message: `Your dispute ${id} is now ${updates.status}.`,
          date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
          read: false,
          type,
          disputeId: id,
        },
        ...prev,
      ]);
    }
    if (updates.refundStatus) {
      const isRefunded = updates.refundStatus === 'Refunded';
      setNotifications((prev) => [
        {
          id: `N${Date.now()}R`,
          title: 'Refund Update',
          message: isRefunded
            ? `Refund for your dispute ${id} has been completed.`
            : `Refund for your dispute ${id} is now ${updates.refundStatus}.`,
          date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
          read: false,
          type: isRefunded ? 'success' : 'info',
          disputeId: id,
        },
        ...prev,
      ]);
    }
  };

  const addAdminNote = (id: string, note: string) => {
    setDisputes((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              adminNotes: [
                ...d.adminNotes,
                {
                  date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
                  author: 'Admin',
                  note,
                },
              ],
            }
          : d
      )
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <AppDataContext.Provider
      value={{
        transactions,
        disputes,
        notifications,
        addDispute,
        updateDispute,
        addAdminNote,
        markNotificationRead,
        markAllNotificationsRead,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider');
  return ctx;
}

export type { DisputeStatus, Priority, RefundStatus };
