import { Link, useSearchParams, useLocation } from 'react-router-dom';
import {
  CheckCircle2, ArrowRight, Search, FileText, Building,
  Calendar, AlertCircle, Hash,
} from 'lucide-react';
import { DisputeStatusBadge } from '@/components/Badges';
import { useAppData } from '@/context/AppDataContext';
import { formatINR, type Dispute } from '@/data/mockData';

export function DisputeSuccessPage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { disputes } = useAppData();
  const disputeId = searchParams.get('id');
  const passedDispute = (location.state as { dispute?: Dispute } | null)?.dispute;
  const dispute = passedDispute || disputes.find((d) => d.id === disputeId);

  return (
    <div className="flex min-h-[600px] items-center justify-center">
      <div className="w-full max-w-lg">
        <div className="card overflow-hidden">
          {/* Success header */}
          <div className="relative bg-gradient-to-br from-green-500 to-green-700 px-8 py-12 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)]" />
            <div className="relative">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm animate-scale-in">
                <CheckCircle2 className="h-12 w-12 text-white" />
              </div>
              <h1 className="mt-6 text-2xl font-bold text-white">Dispute submitted successfully</h1>
              <p className="mt-2 text-sm text-green-50">Your dispute has been raised and is now being processed</p>
            </div>
          </div>

          {/* Dispute info */}
          <div className="p-8">
            <div className="rounded-xl border-2 border-dashed border-electric-200 bg-electric-50/50 p-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Dispute ID</p>
              <p className="mt-1 text-2xl font-bold text-electric-700">{disputeId || 'PS-2026-1048'}</p>
            </div>

            <div className="mt-6 space-y-4">
              <InfoRow icon={Building} label="Transaction" value={`${dispute?.merchant || '—'} · ${dispute?.transactionId || '—'}`} />
              <InfoRow icon={FileText} label="Amount" value={dispute ? formatINR(dispute.amount) : '—'} />
              <InfoRow icon={AlertCircle} label="Dispute Type" value={dispute?.disputeType || '—'} />
              <InfoRow icon={Calendar} label="Submitted Date" value={dispute?.createdDate || '—'} />
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-3">
                  <Hash className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-500">Current Status</span>
                </div>
                <DisputeStatusBadge status={dispute?.status || 'Raised'} />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to={`/app/disputes/${disputeId}`} className="btn-primary flex-1">
                <Search className="h-4 w-4" />
                Track Dispute
              </Link>
              <Link to="/app/dashboard" className="btn-secondary flex-1 justify-center">
                Back to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof Building; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-gray-400" />
        <span className="text-sm text-gray-500">{label}</span>
      </div>
      <span className="text-sm font-semibold text-navy-900">{value}</span>
    </div>
  );
}
