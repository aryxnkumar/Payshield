import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowUpDown, Eye, AlertCircle, ArrowLeftRight } from 'lucide-react';
import { useAppData } from '@/context/AppDataContext';
import { TransactionStatusBadge } from '@/components/Badges';
import { formatINR, type TransactionStatus, type PaymentType } from '@/data/mockData';

const statusOptions: ('All' | TransactionStatus)[] = ['All', 'Successful', 'Failed', 'Pending', 'Refunded'];
const paymentOptions: ('All' | PaymentType)[] = ['All', 'UPI', 'Debit Card', 'Credit Card', 'Net Banking'];

type SortField = 'date' | 'amount' | 'merchant';
type SortDir = 'asc' | 'desc';

export function TransactionsPage() {
  const { transactions } = useAppData();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<typeof statusOptions[number]>('All');
  const [paymentFilter, setPaymentFilter] = useState<typeof paymentOptions[number]>('All');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const filtered = useMemo(() => {
    let result = [...transactions];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) => t.id.toLowerCase().includes(q) || t.merchant.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'All') result = result.filter((t) => t.status === statusFilter);
    if (paymentFilter !== 'All') result = result.filter((t) => t.paymentType === paymentFilter);
    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'amount') cmp = a.amount - b.amount;
      else if (sortField === 'merchant') cmp = a.merchant.localeCompare(b.merchant);
      else cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return result;
  }, [transactions, search, statusFilter, paymentFilter, sortField, sortDir]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('desc'); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Transaction History</h1>
        <p className="text-sm text-gray-500">View and manage all your payment transactions</p>
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
              placeholder="Search by ID or merchant..."
              className="input-field pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusOptions[number])}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-navy-900 focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
              >
                {statusOptions.map((s) => <option key={s} value={s}>{s === 'All' ? 'All Status' : s}</option>)}
              </select>
            </div>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value as typeof paymentOptions[number])}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-navy-900 focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
            >
              {paymentOptions.map((p) => <option key={p} value={p}>{p === 'All' ? 'All Payment Types' : p}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                <th className="px-6 py-3">Transaction ID</th>
                <th className="px-6 py-3">
                  <button onClick={() => toggleSort('merchant')} className="flex items-center gap-1 hover:text-navy-700">
                    Merchant <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-6 py-3">
                  <button onClick={() => toggleSort('amount')} className="flex items-center gap-1 hover:text-navy-700">
                    Amount <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-6 py-3">Payment Type</th>
                <th className="px-6 py-3">
                  <button onClick={() => toggleSort('date')} className="flex items-center gap-1 hover:text-navy-700">
                    Date <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <ArrowLeftRight className="mx-auto h-10 w-10 text-gray-300" />
                    <p className="mt-2 text-sm text-gray-500">No transactions found</p>
                  </td>
                </tr>
              ) : (
                filtered.map((t) => (
                  <tr key={t.id} className="border-b border-gray-50 transition-colors hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-navy-900">{t.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{t.merchant}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-navy-900">{formatINR(t.amount)}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{t.paymentType}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{t.date}</td>
                    <td className="px-6 py-4"><TransactionStatusBadge status={t.status} /></td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/app/transactions/${t.id}`} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-electric-600 transition-colors hover:bg-electric-50">
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
          <p className="text-sm text-gray-500">Showing {filtered.length} of {transactions.length} transactions</p>
        </div>
      </div>
    </div>
  );
}
