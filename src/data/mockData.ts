export type TransactionStatus = 'Successful' | 'Failed' | 'Pending' | 'Refunded';
export type PaymentType = 'UPI' | 'Debit Card' | 'Credit Card' | 'Net Banking';
export type DisputeType =
  | 'Payment Failed'
  | 'Amount Debited but Not Received'
  | 'Duplicate Payment'
  | 'Wrong Amount'
  | 'Unauthorized Transaction';
export type DisputeStatus =
  | 'Raised'
  | 'Under Review'
  | 'Additional Information Required'
  | 'Approved'
  | 'Rejected'
  | 'Resolved';
export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';
export type RefundStatus = 'Not Applicable' | 'Pending' | 'Processing' | 'Refunded' | 'Failed';
export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  paymentType: PaymentType;
  date: string;
  status: TransactionStatus;
  reference: string;
}

export interface DisputeTimelineEntry {
  date: string;
  status: DisputeStatus;
  note: string;
}

export interface Dispute {
  id: string;
  transactionId: string;
  merchant: string;
  amount: number;
  disputeType: DisputeType;
  description: string;
  status: DisputeStatus;
  priority: Priority;
  refundStatus: RefundStatus;
  createdDate: string;
  deadline: string;
  customer: string;
  customerEmail: string;
  evidence: { name: string; type: string; size: string }[];
  timeline: DisputeTimelineEntry[];
  adminNotes: { date: string; author: string; note: string }[];
  riskLevel: RiskLevel;
  riskFlags: string[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
  disputeId?: string;
}

export const mockTransactions: Transaction[] = [
  { id: 'TXN-982341', merchant: 'Amazon', amount: 2499, paymentType: 'UPI', date: '18 Sep 2026', status: 'Successful', reference: 'REF-A8X2K9' },
  { id: 'TXN-982125', merchant: 'Flipkart', amount: 1899, paymentType: 'Debit Card', date: '17 Sep 2026', status: 'Failed', reference: 'REF-B7Y1J4' },
  { id: 'TXN-982090', merchant: 'Myntra', amount: 3499, paymentType: 'Credit Card', date: '16 Sep 2026', status: 'Successful', reference: 'REF-C6Z0M2' },
  { id: 'TXN-981876', merchant: 'Swiggy', amount: 549, paymentType: 'UPI', date: '15 Sep 2026', status: 'Successful', reference: 'REF-D5W9N8' },
  { id: 'TXN-981654', merchant: 'Zomato', amount: 899, paymentType: 'UPI', date: '14 Sep 2026', status: 'Failed', reference: 'REF-E4V8P1' },
  { id: 'TXN-981432', merchant: 'BigBasket', amount: 3299, paymentType: 'Net Banking', date: '13 Sep 2026', status: 'Successful', reference: 'REF-F3U7Q3' },
  { id: 'TXN-981298', merchant: 'BookMyShow', amount: 1299, paymentType: 'Credit Card', date: '12 Sep 2026', status: 'Pending', reference: 'REF-G2T6R5' },
  { id: 'TXN-981145', merchant: 'JioMart', amount: 2199, paymentType: 'Debit Card', date: '11 Sep 2026', status: 'Successful', reference: 'REF-H1S5S6' },
  { id: 'TXN-980987', merchant: 'MakeMyTrip', amount: 15499, paymentType: 'Credit Card', date: '10 Sep 2026', status: 'Refunded', reference: 'REF-I0R4T7' },
  { id: 'TXN-980823', merchant: 'PhonePe', amount: 499, paymentType: 'UPI', date: '09 Sep 2026', status: 'Successful', reference: 'REF-J9Q3U8' },
  { id: 'TXN-980712', merchant: 'IRCTC', amount: 2799, paymentType: 'Net Banking', date: '08 Sep 2026', status: 'Failed', reference: 'REF-K8P2V9' },
  { id: 'TXN-980598', merchant: 'Nykaa', amount: 1799, paymentType: 'Credit Card', date: '07 Sep 2026', status: 'Successful', reference: 'REF-L7O1W0' },
];

export const mockDisputes: Dispute[] = [
  {
    id: 'PS-2026-1042',
    transactionId: 'TXN-982125',
    merchant: 'Flipkart',
    amount: 1899,
    disputeType: 'Payment Failed',
    description: 'Amount was debited from my account but the order was not placed. The payment failed but I did not get a refund.',
    status: 'Under Review',
    priority: 'High',
    refundStatus: 'Processing',
    createdDate: '17 Sep 2026',
    deadline: '22 Sep 2026',
    customer: 'Rahul Sharma',
    customerEmail: 'rahul.sharma@email.com',
    evidence: [{ name: 'payment_failed_screenshot.png', type: 'image/png', size: '1.2 MB' }],
    timeline: [
      { date: '17 Sep 2026', status: 'Raised', note: 'Dispute submitted by customer' },
      { date: '18 Sep 2026', status: 'Under Review', note: 'Dispute assigned to review team' },
    ],
    adminNotes: [],
    riskLevel: 'Low',
    riskFlags: ['No risk detected'],
  },
  {
    id: 'PS-2026-1038',
    transactionId: 'TXN-981654',
    merchant: 'Zomato',
    amount: 899,
    disputeType: 'Amount Debited but Not Received',
    description: 'The amount was debited twice but the order was only placed once. I want a refund for the duplicate charge.',
    status: 'Additional Information Required',
    priority: 'Medium',
    refundStatus: 'Pending',
    createdDate: '14 Sep 2026',
    deadline: '19 Sep 2026',
    customer: 'Rahul Sharma',
    customerEmail: 'rahul.sharma@email.com',
    evidence: [{ name: 'bank_statement.pdf', type: 'application/pdf', size: '340 KB' }],
    timeline: [
      { date: '14 Sep 2026', status: 'Raised', note: 'Dispute submitted by customer' },
      { date: '15 Sep 2026', status: 'Under Review', note: 'Dispute assigned to review team' },
      { date: '16 Sep 2026', status: 'Additional Information Required', note: 'Bank statement requested for verification' },
    ],
    adminNotes: [
      { date: '16 Sep 2026', author: 'Admin', note: 'Customer needs to provide a clearer bank statement showing both transactions.' },
    ],
    riskLevel: 'Medium',
    riskFlags: ['Duplicate transaction pattern'],
  },
  {
    id: 'PS-2026-1035',
    transactionId: 'TXN-980987',
    merchant: 'MakeMyTrip',
    amount: 15499,
    disputeType: 'Wrong Amount',
    description: 'I was charged ₹15,499 instead of the advertised ₹14,499. The difference of ₹1,000 needs to be refunded.',
    status: 'Approved',
    priority: 'Critical',
    refundStatus: 'Processing',
    createdDate: '10 Sep 2026',
    deadline: '15 Sep 2026',
    customer: 'Rahul Sharma',
    customerEmail: 'rahul.sharma@email.com',
    evidence: [
      { name: 'booking_confirmation.png', type: 'image/png', size: '890 KB' },
      { name: 'price_screenshot.png', type: 'image/png', size: '650 KB' },
    ],
    timeline: [
      { date: '10 Sep 2026', status: 'Raised', note: 'Dispute submitted by customer' },
      { date: '11 Sep 2026', status: 'Under Review', note: 'Dispute assigned to review team' },
      { date: '14 Sep 2026', status: 'Approved', note: 'Dispute approved. Refund processing initiated.' },
    ],
    adminNotes: [
      { date: '14 Sep 2026', author: 'Admin', note: 'Verified the price discrepancy. Approved for refund of ₹1,000.' },
    ],
    riskLevel: 'Medium',
    riskFlags: ['High-value transaction'],
  },
  {
    id: 'PS-2026-1028',
    transactionId: 'TXN-980712',
    merchant: 'IRCTC',
    amount: 2799,
    disputeType: 'Duplicate Payment',
    description: 'My ticket was booked twice due to a network error. I need a refund for the duplicate transaction.',
    status: 'Resolved',
    priority: 'High',
    refundStatus: 'Refunded',
    createdDate: '08 Sep 2026',
    deadline: '13 Sep 2026',
    customer: 'Rahul Sharma',
    customerEmail: 'rahul.sharma@email.com',
    evidence: [{ name: 'duplicate_tickets.pdf', type: 'application/pdf', size: '220 KB' }],
    timeline: [
      { date: '08 Sep 2026', status: 'Raised', note: 'Dispute submitted by customer' },
      { date: '09 Sep 2026', status: 'Under Review', note: 'Dispute assigned to review team' },
      { date: '12 Sep 2026', status: 'Approved', note: 'Dispute approved. Refund processing initiated.' },
      { date: '15 Sep 2026', status: 'Resolved', note: 'Refund of ₹2,799 completed to original payment method.' },
    ],
    adminNotes: [
      { date: '12 Sep 2026', author: 'Admin', note: 'Confirmed duplicate booking. Refund approved.' },
      { date: '15 Sep 2026', author: 'Admin', note: 'Refund completed successfully.' },
    ],
    riskLevel: 'Low',
    riskFlags: ['No risk detected'],
  },
  {
    id: 'PS-2026-1021',
    transactionId: 'TXN-981432',
    merchant: 'BigBasket',
    amount: 3299,
    disputeType: 'Unauthorized Transaction',
    description: 'I did not make this transaction. My card was charged without my authorization.',
    status: 'Rejected',
    priority: 'Critical',
    refundStatus: 'Not Applicable',
    createdDate: '05 Sep 2026',
    deadline: '10 Sep 2026',
    customer: 'Priya Patel',
    customerEmail: 'priya.patel@email.com',
    evidence: [{ name: 'card_statement.pdf', type: 'application/pdf', size: '410 KB' }],
    timeline: [
      { date: '05 Sep 2026', status: 'Raised', note: 'Dispute submitted by customer' },
      { date: '06 Sep 2026', status: 'Under Review', note: 'Dispute assigned to review team' },
      { date: '10 Sep 2026', status: 'Rejected', note: 'Transaction verified as authorized by cardholder. Dispute rejected.' },
    ],
    adminNotes: [
      { date: '10 Sep 2026', author: 'Admin', note: 'Transaction verified through 2FA. Cardholder confirmed authorization during call.' },
    ],
    riskLevel: 'High',
    riskFlags: ['Unauthorized transaction', 'Multiple recent disputes'],
  },
  {
    id: 'PS-2026-1015',
    transactionId: 'TXN-980598',
    merchant: 'Nykaa',
    amount: 1799,
    disputeType: 'Payment Failed',
    description: 'Payment failed but amount was debited. No refund received after 5 days.',
    status: 'Raised',
    priority: 'Medium',
    refundStatus: 'Pending',
    createdDate: '20 Sep 2026',
    deadline: '25 Sep 2026',
    customer: 'Priya Patel',
    customerEmail: 'priya.patel@email.com',
    evidence: [{ name: 'failed_payment.png', type: 'image/png', size: '780 KB' }],
    timeline: [
      { date: '20 Sep 2026', status: 'Raised', note: 'Dispute submitted by customer' },
    ],
    adminNotes: [],
    riskLevel: 'Low',
    riskFlags: ['No risk detected'],
  },
  {
    id: 'PS-2026-1009',
    transactionId: 'TXN-981298',
    merchant: 'BookMyShow',
    amount: 1299,
    disputeType: 'Wrong Amount',
    description: 'Charged ₹1,299 instead of ₹999 for a movie ticket. The convenience fee was higher than displayed.',
    status: 'Under Review',
    priority: 'Low',
    refundStatus: 'Pending',
    createdDate: '12 Sep 2026',
    deadline: '17 Sep 2026',
    customer: 'Amit Kumar',
    customerEmail: 'amit.kumar@email.com',
    evidence: [{ name: 'ticket_receipt.png', type: 'image/png', size: '540 KB' }],
    timeline: [
      { date: '12 Sep 2026', status: 'Raised', note: 'Dispute submitted by customer' },
      { date: '13 Sep 2026', status: 'Under Review', note: 'Dispute assigned to review team' },
    ],
    adminNotes: [],
    riskLevel: 'Low',
    riskFlags: ['No risk detected'],
  },
  {
    id: 'PS-2026-1003',
    transactionId: 'TXN-980823',
    merchant: 'PhonePe',
    amount: 499,
    disputeType: 'Duplicate Payment',
    description: 'Two UPI transactions went through for the same payment. Need refund for the duplicate.',
    status: 'Resolved',
    priority: 'Medium',
    refundStatus: 'Refunded',
    createdDate: '03 Sep 2026',
    deadline: '08 Sep 2026',
    customer: 'Amit Kumar',
    customerEmail: 'amit.kumar@email.com',
    evidence: [{ name: 'upi_transactions.png', type: 'image/png', size: '320 KB' }],
    timeline: [
      { date: '03 Sep 2026', status: 'Raised', note: 'Dispute submitted by customer' },
      { date: '04 Sep 2026', status: 'Under Review', note: 'Dispute assigned to review team' },
      { date: '06 Sep 2026', status: 'Approved', note: 'Dispute approved. Refund processing initiated.' },
      { date: '08 Sep 2026', status: 'Resolved', note: 'Refund of ₹499 completed to UPI account.' },
    ],
    adminNotes: [
      { date: '06 Sep 2026', author: 'Admin', note: 'Confirmed duplicate UPI transaction. Refund approved.' },
    ],
    riskLevel: 'Medium',
    riskFlags: ['Duplicate transaction pattern'],
  },
];

export const mockNotifications: AppNotification[] = [
  { id: 'N1', title: 'Dispute Under Review', message: 'Your dispute PS-2026-1042 is now Under Review.', date: '18 Sep 2026', read: false, type: 'info', disputeId: 'PS-2026-1042' },
  { id: 'N2', title: 'Additional Information Required', message: 'Additional information is required for dispute PS-2026-1038.', date: '16 Sep 2026', read: false, type: 'warning', disputeId: 'PS-2026-1038' },
  { id: 'N3', title: 'Dispute Approved', message: 'Your dispute PS-2026-1035 has been approved. Refund is processing.', date: '14 Sep 2026', read: true, type: 'success', disputeId: 'PS-2026-1035' },
  { id: 'N4', title: 'Dispute Resolved', message: 'Your transaction dispute PS-2026-1028 has been resolved.', date: '15 Sep 2026', read: true, type: 'success', disputeId: 'PS-2026-1028' },
  { id: 'N5', title: 'Dispute Rejected', message: 'Your dispute PS-2026-1021 has been rejected. Contact support for details.', date: '10 Sep 2026', read: true, type: 'warning', disputeId: 'PS-2026-1021' },
];

export const disputeTypeOptions: DisputeType[] = [
  'Payment Failed',
  'Amount Debited but Not Received',
  'Duplicate Payment',
  'Wrong Amount',
  'Unauthorized Transaction',
];

export const disputeStatusFlow: DisputeStatus[] = [
  'Raised',
  'Under Review',
  'Additional Information Required',
  'Approved',
  'Resolved',
];

export const allDisputeStatuses: DisputeStatus[] = [
  'Raised',
  'Under Review',
  'Additional Information Required',
  'Approved',
  'Rejected',
  'Resolved',
];

export const allPriorities: Priority[] = ['Low', 'Medium', 'High', 'Critical'];

export const allRefundStatuses: RefundStatus[] = ['Not Applicable', 'Pending', 'Processing', 'Refunded', 'Failed'];

export function formatINR(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}

export function generateDisputeId(): string {
  const num = 1048 + Math.floor(Math.random() * 900);
  return `PS-2026-${num}`;
}

export function generateDeadline(): string {
  const d = new Date();
  d.setDate(d.getDate() + 5);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function getTimeRemaining(deadline: string): { text: string; breached: boolean } {
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const diff = deadlineDate.getTime() - now.getTime();
  if (diff <= 0) return { text: 'SLA Breached', breached: true };
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  const h = hours % 24;
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  if (days > 0) return { text: `Resolution due in ${days}d ${h}h`, breached: false };
  return { text: `Resolution due in ${h}h ${minutes}m`, breached: false };
}

export function assessRisk(dispute: { disputeType: DisputeType; amount: number; customer: string; disputes: Dispute[] }): { level: RiskLevel; flags: string[] } {
  const flags: string[] = [];
  if (dispute.disputeType === 'Unauthorized Transaction') flags.push('Unauthorized transaction');
  if (dispute.disputeType === 'Duplicate Payment') flags.push('Duplicate transaction pattern');
  if (dispute.amount > 10000) flags.push('High-value transaction');
  const customerDisputes = dispute.disputes.filter((d) => d.customer === dispute.customer);
  if (customerDisputes.length >= 3) flags.push('Multiple recent disputes');
  if (flags.length === 0) flags.push('No risk detected');
  const level: RiskLevel = flags.length >= 2 || flags.includes('Unauthorized transaction') ? 'High' : flags.length === 1 && !flags.includes('No risk detected') ? 'Medium' : 'Low';
  return { level, flags };
}
