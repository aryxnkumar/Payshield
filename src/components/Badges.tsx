import type { TransactionStatus, DisputeStatus, Priority, RefundStatus, RiskLevel } from '@/data/mockData';

const transactionStatusStyles: Record<TransactionStatus, string> = {
  Successful: 'bg-green-50 text-green-700 border-green-200',
  Failed: 'bg-red-50 text-red-700 border-red-200',
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Refunded: 'bg-electric-50 text-electric-700 border-electric-200',
};

const disputeStatusStyles: Record<DisputeStatus, string> = {
  Raised: 'bg-navy-50 text-navy-700 border-navy-200',
  'Under Review': 'bg-electric-50 text-electric-700 border-electric-200',
  'Additional Information Required': 'bg-amber-50 text-amber-700 border-amber-200',
  Approved: 'bg-green-50 text-green-700 border-green-200',
  Rejected: 'bg-red-50 text-red-700 border-red-200',
  Resolved: 'bg-green-50 text-green-700 border-green-200',
};

const priorityStyles: Record<Priority, string> = {
  Low: 'bg-gray-50 text-gray-600 border-gray-200',
  Medium: 'bg-electric-50 text-electric-700 border-electric-200',
  High: 'bg-amber-50 text-amber-700 border-amber-200',
  Critical: 'bg-red-50 text-red-700 border-red-200',
};

const refundStatusStyles: Record<RefundStatus, string> = {
  'Not Applicable': 'bg-gray-50 text-gray-500 border-gray-200',
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Processing: 'bg-electric-50 text-electric-700 border-electric-200',
  Refunded: 'bg-green-50 text-green-700 border-green-200',
  Failed: 'bg-red-50 text-red-700 border-red-200',
};

const riskStyles: Record<RiskLevel, string> = {
  Low: 'bg-green-50 text-green-700 border-green-200',
  Medium: 'bg-amber-50 text-amber-700 border-amber-200',
  High: 'bg-red-50 text-red-700 border-red-200',
};

export function TransactionStatusBadge({ status }: { status: TransactionStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${transactionStatusStyles[status]}`}>
      {status}
    </span>
  );
}

export function DisputeStatusBadge({ status }: { status: DisputeStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${disputeStatusStyles[status]}`}>
      {status}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${priorityStyles[priority]}`}>
      {priority}
    </span>
  );
}

export function RefundStatusBadge({ status }: { status: RefundStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${refundStatusStyles[status]}`}>
      {status}
    </span>
  );
}

export function RiskBadge({ level }: { level: RiskLevel }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${riskStyles[level]}`}>
      {level} Risk
    </span>
  );
}

export function SLABadge({ text, breached }: { text: string; breached: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${
      breached ? 'bg-red-50 text-red-700 border-red-200' : 'bg-navy-50 text-navy-700 border-navy-200'
    }`}>
      {breached && '⚠ '}
      {text}
    </span>
  );
}
