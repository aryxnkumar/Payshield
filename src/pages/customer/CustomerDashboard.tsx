import { Link } from 'react-router-dom';
import {
  ArrowLeftRight, AlertCircle, Clock, CheckCircle2, TrendingUp,
  Plus, ArrowRight, FileText,
} from 'lucide-react';
import { useAppData } from '@/context/AppDataContext';
import { StatCard, SectionHeader } from '@/components/StatCard';
import { BarChart } from '@/components/Charts';
import { TransactionStatusBadge, DisputeStatusBadge, PriorityBadge } from '@/components/Badges';
import { formatINR } from '@/data/mockData';

export function CustomerDashboard() {
  const { transactions, disputes } = useAppData();

  const totalTxns = transactions.length;
  const totalDisputes = disputes.length;
  const openDisputes = disputes.filter((d) => d.status === 'Raised' || d.status === 'Under Review').length;
  const pendingDisputes = disputes.filter((d) => d.status === 'Additional Information Required').length;
  const resolvedDisputes = disputes.filter((d) => d.status === 'Resolved' || d.status === 'Approved').length;

  const categoryData = [
    { label: 'Payment Failed', value: disputes.filter((d) => d.disputeType === 'Payment Failed').length },
    { label: 'Amount Debited', value: disputes.filter((d) => d.disputeType === 'Amount Debited but Not Received').length },
    { label: 'Duplicate', value: disputes.filter((d) => d.disputeType === 'Duplicate Payment').length },
    { label: 'Wrong Amount', value: disputes.filter((d) => d.disputeType === 'Wrong Amount').length },
    { label: 'Unauthorized', value: disputes.filter((d) => d.disputeType === 'Unauthorized Transaction').length },
  ];

  const recentTxns = transactions.slice(0, 5);
  const recentDisputes = disputes.slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back! Here's your dispute overview.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/app/transactions" className="btn-secondary">
            <ArrowLeftRight className="h-4 w-4" />
            View Transactions
          </Link>
          <Link to="/app/raise-dispute" className="btn-primary">
            <Plus className="h-4 w-4" />
            Raise a Dispute
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Total Transactions" value={totalTxns} icon={ArrowLeftRight} color="navy" />
        <StatCard label="Total Disputes" value={totalDisputes} icon={AlertCircle} color="blue" />
        <StatCard label="Open Disputes" value={openDisputes} icon={Clock} color="amber" />
        <StatCard label="Pending" value={pendingDisputes} icon={FileText} color="red" />
        <StatCard label="Resolved" value={resolvedDisputes} icon={CheckCircle2} color="green" />
      </div>

      {/* Chart + Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <SectionHeader title="Disputes by Category" subtitle="Distribution of your dispute types" />
          <BarChart data={categoryData} height={220} />
        </div>
        <div className="card p-6">
          <SectionHeader title="Quick Actions" />
          <div className="space-y-3">
            <Link to="/app/raise-dispute" className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition-all hover:border-electric-300 hover:bg-electric-50">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-electric-50">
                  <Plus className="h-5 w-5 text-electric-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy-900">Raise a Dispute</p>
                  <p className="text-xs text-gray-500">File a new payment dispute</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </Link>
            <Link to="/app/transactions" className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition-all hover:border-electric-300 hover:bg-electric-50">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-50">
                  <ArrowLeftRight className="h-5 w-5 text-navy-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy-900">View Transactions</p>
                  <p className="text-xs text-gray-500">Check your payment history</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </Link>
            <Link to="/app/disputes" className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition-all hover:border-electric-300 hover:bg-electric-50">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy-900">My Disputes</p>
                  <p className="text-xs text-gray-500">Track ongoing disputes</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card p-6">
        <SectionHeader
          title="Recent Transactions"
          subtitle="Your latest payment activity"
          action={<Link to="/app/transactions" className="text-sm font-medium text-electric-600 hover:text-electric-700">View all →</Link>}
        />
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                <th className="pb-3 pr-4">Transaction ID</th>
                <th className="pb-3 pr-4">Merchant</th>
                <th className="pb-3 pr-4">Amount</th>
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTxns.map((t) => (
                <tr key={t.id} className="border-b border-gray-50 transition-colors hover:bg-gray-50">
                  <td className="py-3 pr-4 text-sm font-medium text-navy-900">{t.id}</td>
                  <td className="py-3 pr-4 text-sm text-gray-600">{t.merchant}</td>
                  <td className="py-3 pr-4 text-sm font-semibold text-navy-900">{formatINR(t.amount)}</td>
                  <td className="py-3 pr-4 text-sm text-gray-500">{t.date}</td>
                  <td className="py-3"><TransactionStatusBadge status={t.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Disputes */}
      <div className="card p-6">
        <SectionHeader
          title="Recent Disputes"
          subtitle="Your latest dispute activity"
          action={<Link to="/app/disputes" className="text-sm font-medium text-electric-600 hover:text-electric-700">View all →</Link>}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {recentDisputes.map((d) => (
            <Link key={d.id} to={`/app/disputes/${d.id}`} className="rounded-xl border border-gray-200 p-4 transition-all hover:border-electric-300 hover:shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-navy-900">{d.id}</span>
                <DisputeStatusBadge status={d.status} />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-600">{d.merchant} · {formatINR(d.amount)}</span>
                <PriorityBadge priority={d.priority} />
              </div>
              <p className="mt-2 text-xs text-gray-400">{d.disputeType} · {d.createdDate}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
