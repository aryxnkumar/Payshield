import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, AlertCircle, CheckCircle2, XCircle,
  Clock, CreditCard, Calendar, Hash, Building,
} from 'lucide-react';
import { useAppData } from '@/context/AppDataContext';
import { TransactionStatusBadge } from '@/components/Badges';
import { formatINR } from '@/data/mockData';

export function TransactionDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { transactions } = useAppData();
  const txn = transactions.find((t) => t.id === id);

  if (!txn) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertCircle className="h-12 w-12 text-gray-300" />
        <p className="mt-4 text-lg font-semibold text-navy-900">Transaction not found</p>
        <Link to="/app/transactions" className="btn-primary mt-6">Back to Transactions</Link>
      </div>
    );
  }

  const timeline = [
    { icon: Clock, label: 'Transaction Initiated', date: txn.date, done: true },
    { icon: txn.status === 'Failed' ? XCircle : CheckCircle2, label: txn.status === 'Failed' ? 'Payment Failed' : 'Payment Processed', date: txn.date, done: true },
    { icon: txn.status === 'Refunded' ? CheckCircle2 : txn.status === 'Pending' ? Clock : XCircle, label: txn.status === 'Refunded' ? 'Refund Completed' : txn.status === 'Pending' ? 'Awaiting Confirmation' : 'Transaction Complete', date: txn.date, done: txn.status !== 'Failed' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-navy-900">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Transaction Details</h1>
          <p className="text-sm text-gray-500">{txn.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main info */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50">
                <Building className="h-6 w-6 text-navy-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-navy-900">{txn.merchant}</h2>
                <p className="text-sm text-gray-500">{txn.paymentType}</p>
              </div>
            </div>
            <TransactionStatusBadge status={txn.status} />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Amount</p>
              <p className="mt-1 text-3xl font-bold text-navy-900">{formatINR(txn.amount)}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Transaction ID</p>
              <p className="mt-1 text-sm font-semibold text-navy-900">{txn.id}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Date</p>
              <p className="mt-1 text-sm text-navy-900">{txn.date}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Payment Method</p>
              <p className="mt-1 text-sm text-navy-900">{txn.paymentType}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Reference Number</p>
              <p className="mt-1 text-sm font-semibold text-navy-900">{txn.reference}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Status</p>
              <div className="mt-1"><TransactionStatusBadge status={txn.status} /></div>
            </div>
          </div>
        </div>

        {/* Quick info */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-navy-900">Quick Info</h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Hash className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">ID:</span>
                <span className="font-medium text-navy-900">{txn.id}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CreditCard className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">Type:</span>
                <span className="font-medium text-navy-900">{txn.paymentType}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">Date:</span>
                <span className="font-medium text-navy-900">{txn.date}</span>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-sm font-semibold text-navy-900">Have an issue?</h3>
            <p className="mt-2 text-sm text-gray-500">If this transaction has an issue, you can raise a dispute.</p>
            <Link
              to={`/app/raise-dispute?txn=${txn.id}`}
              className="btn-primary mt-4 w-full"
            >
              <AlertCircle className="h-4 w-4" />
              Raise a Dispute
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="card p-6">
        <h3 className="text-sm font-semibold text-navy-900">Transaction Timeline</h3>
        <div className="mt-6 space-y-0">
          {timeline.map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  item.done ? 'bg-green-50' : 'bg-gray-100'
                }`}>
                  <item.icon className={`h-5 w-5 ${item.done ? 'text-green-600' : 'text-gray-400'}`} />
                </div>
                {i < timeline.length - 1 && (
                  <div className={`w-0.5 h-12 ${item.done ? 'bg-green-200' : 'bg-gray-200'}`} />
                )}
              </div>
              <div className="pt-2">
                <p className={`text-sm font-medium ${item.done ? 'text-navy-900' : 'text-gray-400'}`}>{item.label}</p>
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
