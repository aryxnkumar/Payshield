import { Link } from 'react-router-dom';
import {
  ArrowLeftRight, AlertCircle, Clock, CheckCircle2, FileText,
  TrendingUp, ArrowRight, Zap, AlertTriangle,
} from 'lucide-react';
import { useAppData } from '@/context/AppDataContext';
import { StatCard, SectionHeader } from '@/components/StatCard';
import { BarChart, DonutChart } from '@/components/Charts';
import { DisputeStatusBadge, PriorityBadge } from '@/components/Badges';
import { formatINR } from '@/data/mockData';

export function AdminDashboard() {
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

  const statusData = [
    { label: 'Raised', value: disputes.filter((d) => d.status === 'Raised').length, color: '#627d98' },
    { label: 'Under Review', value: disputes.filter((d) => d.status === 'Under Review').length, color: '#3b82f6' },
    { label: 'Info Required', value: disputes.filter((d) => d.status === 'Additional Information Required').length, color: '#f59e0b' },
    { label: 'Approved', value: disputes.filter((d) => d.status === 'Approved').length, color: '#22c55e' },
    { label: 'Rejected', value: disputes.filter((d) => d.status === 'Rejected').length, color: '#ef4444' },
    { label: 'Resolved', value: disputes.filter((d) => d.status === 'Resolved').length, color: '#16a34a' },
  ];

  const recentDisputes = disputes.slice(0, 5);
  const highPriority = disputes.filter((d) => d.priority === 'High' || d.priority === 'Critical').slice(0, 4);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-500">Overview of all disputes and transactions across the platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Total Transactions" value={totalTxns} icon={ArrowLeftRight} color="navy" />
        <StatCard label="Total Disputes" value={totalDisputes} icon={AlertCircle} color="blue" />
        <StatCard label="Open Disputes" value={openDisputes} icon={Clock} color="amber" />
        <StatCard label="Pending" value={pendingDisputes} icon={FileText} color="red" />
        <StatCard label="Resolved" value={resolvedDisputes} icon={CheckCircle2} color="green" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <SectionHeader title="Disputes by Category" subtitle="Distribution of dispute types" />
          <BarChart data={categoryData} height={220} />
        </div>
        <div className="card p-6">
          <SectionHeader title="Disputes by Status" subtitle="Current status distribution" />
          <div className="flex items-center justify-center py-4">
            <DonutChart data={statusData} size={200} />
          </div>
        </div>
      </div>

      {/* Recent + High Priority */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent disputes */}
        <div className="card p-6">
          <SectionHeader
            title="Recent Disputes"
            subtitle="Latest dispute submissions"
            action={<Link to="/admin/disputes" className="text-sm font-medium text-electric-600 hover:text-electric-700">View all →</Link>}
          />
          <div className="space-y-3">
            {recentDisputes.map((d) => (
              <Link key={d.id} to={`/admin/disputes/${d.id}`} className="flex items-center justify-between rounded-xl border border-gray-200 p-3 transition-all hover:border-electric-300 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-50">
                    <AlertCircle className="h-4 w-4 text-navy-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-900">{d.id}</p>
                    <p className="text-xs text-gray-500">{d.customer} · {d.merchant}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-navy-900">{formatINR(d.amount)}</span>
                  <DisputeStatusBadge status={d.status} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* High priority */}
        <div className="card p-6">
          <SectionHeader title="High Priority Disputes" subtitle="Dispatches requiring immediate attention" />
          <div className="space-y-3">
            {highPriority.length === 0 ? (
              <p className="py-8 text-center text-sm text-gray-500">No high priority disputes</p>
            ) : (
              highPriority.map((d) => (
                <Link key={d.id} to={`/admin/disputes/${d.id}`} className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50/30 p-3 transition-all hover:border-amber-300 hover:bg-amber-50">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100">
                      <Zap className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{d.id}</p>
                      <p className="text-xs text-gray-500">{d.disputeType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <PriorityBadge priority={d.priority} />
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Resolution overview */}
      <div className="card p-6">
        <SectionHeader title="Resolution Overview" subtitle="Platform-wide dispute resolution metrics" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-electric-500" />
              <p className="text-xs font-medium text-gray-400">Resolution Rate</p>
            </div>
            <p className="mt-2 text-2xl font-bold text-navy-900">
              {totalDisputes > 0 ? Math.round((resolvedDisputes / totalDisputes) * 100) : 0}%
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <p className="text-xs font-medium text-gray-400">Avg. Resolution Time</p>
            </div>
            <p className="mt-2 text-2xl font-bold text-navy-900">3.5<span className="text-sm font-medium text-gray-500"> days</span></p>
          </div>
          <div className="rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <p className="text-xs font-medium text-gray-400">Total Refunded</p>
            </div>
            <p className="mt-2 text-2xl font-bold text-navy-900">
              {formatINR(disputes.filter((d) => d.refundStatus === 'Completed').reduce((sum, d) => sum + d.amount, 0))}
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <p className="text-xs font-medium text-gray-400">Rejected</p>
            </div>
            <p className="mt-2 text-2xl font-bold text-navy-900">
              {disputes.filter((d) => d.status === 'Rejected').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
