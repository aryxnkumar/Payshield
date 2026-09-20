import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, AlertCircle, Eye, ArrowRight } from 'lucide-react';
import { useAppData } from '@/context/AppDataContext';
import { DisputeStatusBadge, PriorityBadge, RefundStatusBadge } from '@/components/Badges';
import { formatINR, allDisputeStatuses, disputeTypeOptions, allPriorities, allRefundStatuses, type DisputeStatus, type DisputeType, type Priority, type RefundStatus } from '@/data/mockData';

export function AdminDisputesPage() {
  const { disputes } = useAppData();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | DisputeStatus>('All');
  const [typeFilter, setTypeFilter] = useState<'All' | DisputeType>('All');
  const [priorityFilter, setPriorityFilter] = useState<'All' | Priority>('All');
  const [refundFilter, setRefundFilter] = useState<'All' | RefundStatus>('All');

  const filtered = useMemo(() => {
    let result = [...disputes];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) => d.id.toLowerCase().includes(q) || d.customer.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'All') result = result.filter((d) => d.status === statusFilter);
    if (typeFilter !== 'All') result = result.filter((d) => d.disputeType === typeFilter);
    if (priorityFilter !== 'All') result = result.filter((d) => d.priority === priorityFilter);
    if (refundFilter !== 'All') result = result.filter((d) => d.refundStatus === refundFilter);
    return result;
  }, [disputes, search, statusFilter, typeFilter, priorityFilter, refundFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">All Disputes</h1>
        <p className="text-sm text-gray-500">Manage and resolve all customer disputes</p>
      </div>

      {/* Filters */}
      <div className="card p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 lg:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ID or customer..."
              className="input-field pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'All' | DisputeStatus)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-navy-900 focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
              >
                <option value="All">All Status</option>
                {allDisputeStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as 'All' | DisputeType)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-navy-900 focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
            >
              <option value="All">All Types</option>
              {disputeTypeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as 'All' | Priority)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-navy-900 focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
            >
              <option value="All">All Priority</option>
              {allPriorities.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <select
              value={refundFilter}
              onChange={(e) => setRefundFilter(e.target.value as 'All' | RefundStatus)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-navy-900 focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
            >
              <option value="All">All Refund</option>
              {allRefundStatuses.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Desktop table */}
      <div className="card overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                <th className="px-6 py-3">Dispute ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Transaction</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Priority</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Refund</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-6 py-12 text-center">
                    <AlertCircle className="mx-auto h-10 w-10 text-gray-300" />
                    <p className="mt-2 text-sm text-gray-500">No disputes found</p>
                  </td>
                </tr>
              ) : (
                filtered.map((d) => (
                  <tr key={d.id} className="border-b border-gray-50 transition-colors hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-navy-900">{d.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{d.customer}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{d.merchant}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{d.disputeType}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-navy-900">{formatINR(d.amount)}</td>
                    <td className="px-6 py-4"><PriorityBadge priority={d.priority} /></td>
                    <td className="px-6 py-4"><DisputeStatusBadge status={d.status} /></td>
                    <td className="px-6 py-4"><RefundStatusBadge status={d.refundStatus} /></td>
                    <td className="px-6 py-4 text-sm text-gray-500">{d.createdDate}</td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/admin/disputes/${d.id}`} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-electric-600 transition-colors hover:bg-electric-50">
                        <Eye className="h-4 w-4" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-3">
          <p className="text-sm text-gray-500">Showing {filtered.length} of {disputes.length} disputes</p>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {filtered.length === 0 ? (
          <div className="card p-8 text-center">
            <AlertCircle className="mx-auto h-10 w-10 text-gray-300" />
            <p className="mt-2 text-sm text-gray-500">No disputes found</p>
          </div>
        ) : (
          filtered.map((d) => (
            <Link key={d.id} to={`/admin/disputes/${d.id}`} className="card block p-4 transition-all hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-navy-900">{d.id}</span>
                <DisputeStatusBadge status={d.status} />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{d.customer}</p>
                  <p className="text-xs text-gray-400">{d.merchant} · {d.disputeType}</p>
                </div>
                <span className="text-sm font-bold text-navy-900">{formatINR(d.amount)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex gap-2">
                  <PriorityBadge priority={d.priority} />
                  <RefundStatusBadge status={d.refundStatus} />
                </div>
                <div className="flex items-center gap-1 text-electric-600">
                  <span className="text-sm font-medium">View</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
