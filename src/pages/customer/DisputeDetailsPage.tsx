import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Building, Calendar, AlertCircle, FileText,
  CheckCircle2, Clock, XCircle, ArrowRight, Hash, CreditCard, Search,
} from 'lucide-react';
import { useAppData } from '@/context/AppDataContext';
import { DisputeStatusBadge, PriorityBadge, RefundStatusBadge } from '@/components/Badges';
import { formatINR, disputeStatusFlow, type DisputeStatus } from '@/data/mockData';

export function DisputeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { disputes } = useAppData();
  const dispute = disputes.find((d) => d.id === id);

  if (!dispute) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertCircle className="h-12 w-12 text-gray-300" />
        <p className="mt-4 text-lg font-semibold text-navy-900">Dispute not found</p>
        <Link to="/app/disputes" className="btn-primary mt-6">Back to Disputes</Link>
      </div>
    );
  }

  const currentStageIndex = disputeStatusFlow.indexOf(dispute.status);
  const isRejected = dispute.status === 'Rejected';

  const stageIcons = [Clock, Search, AlertCircle, CheckCircle2, CheckCircle2];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-navy-900">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Dispute Tracking</h1>
          <p className="text-sm text-gray-500">{dispute.id}</p>
        </div>
      </div>

      {/* Status banner */}
      <div className={`rounded-xl border p-4 ${
        isRejected ? 'border-red-200 bg-red-50' :
        dispute.status === 'Resolved' || dispute.status === 'Approved' ? 'border-green-200 bg-green-50' :
        'border-electric-200 bg-electric-50'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isRejected ? <XCircle className="h-6 w-6 text-red-500" /> :
             dispute.status === 'Resolved' || dispute.status === 'Approved' ? <CheckCircle2 className="h-6 w-6 text-green-500" /> :
             <Clock className="h-6 w-6 text-electric-500" />}
            <div>
              <p className="text-sm font-semibold text-navy-900">Current Status: {dispute.status}</p>
              <p className="text-xs text-gray-500">
                {isRejected ? 'Your dispute has been rejected. Contact support for more information.' :
                 dispute.status === 'Resolved' ? 'Your dispute has been fully resolved.' :
                 dispute.status === 'Approved' ? 'Your dispute has been approved. Refund is being processed.' :
                 'Your dispute is being processed. We will keep you updated.'}
              </p>
            </div>
          </div>
          <div className="hidden gap-2 sm:flex">
            <DisputeStatusBadge status={dispute.status} />
            <PriorityBadge priority={dispute.priority} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Details */}
        <div className="space-y-6 lg:col-span-2">
          {/* Transaction info */}
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-navy-900">Transaction Details</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <InfoItem icon={Building} label="Merchant" value={dispute.merchant} />
              <InfoItem icon={Hash} label="Transaction ID" value={dispute.transactionId} />
              <InfoItem icon={CreditCard} label="Amount" value={formatINR(dispute.amount)} />
              <InfoItem icon={Calendar} label="Date" value={dispute.createdDate} />
            </div>
            <Link to={`/app/transactions/${dispute.transactionId}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-electric-600 hover:text-electric-700">
              View Transaction <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Dispute info */}
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-navy-900">Dispute Information</h3>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Dispute Type</p>
                <p className="mt-1 text-sm font-medium text-navy-900">{dispute.disputeType}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Complaint Description</p>
                <p className="mt-1 text-sm text-navy-700">{dispute.description}</p>
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Priority</p>
                  <div className="mt-1"><PriorityBadge priority={dispute.priority} /></div>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Refund Status</p>
                  <div className="mt-1"><RefundStatusBadge status={dispute.refundStatus} /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Evidence */}
          {dispute.evidence.length > 0 && (
            <div className="card p-6">
              <h3 className="text-sm font-semibold text-navy-900">Evidence</h3>
              <div className="mt-4 space-y-2">
                {dispute.evidence.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                    <FileText className="h-8 w-8 text-electric-500" />
                    <div>
                      <p className="text-sm font-medium text-navy-900">{f.name}</p>
                      <p className="text-xs text-gray-500">{f.size}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Status timeline */}
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-navy-900">Status Timeline</h3>
            <div className="mt-6">
              {/* Visual flow */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {disputeStatusFlow.map((status, i) => {
                    const StageIcon = stageIcons[i];
                    const isCompleted = isRejected
                      ? dispute.timeline.some((t) => t.status === status) && status !== 'Approved' && status !== 'Resolved'
                      : i <= currentStageIndex && currentStageIndex >= 0;
                    const isCurrent = dispute.status === status;
                    return (
                      <div key={status} className="relative flex flex-1 flex-col items-center">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all ${
                          isCurrent ? 'border-electric-500 bg-electric-500 text-white shadow-lg shadow-electric-500/30 animate-pulse-slow' :
                          isCompleted ? 'border-green-500 bg-green-500 text-white' :
                          'border-gray-200 bg-white text-gray-300'
                        }`}>
                          <StageIcon className="h-6 w-6" />
                        </div>
                        <span className={`mt-2 max-w-[80px] text-center text-xs font-medium ${
                          isCurrent ? 'text-electric-600' : isCompleted ? 'text-navy-900' : 'text-gray-400'
                        }`}>
                          {status}
                        </span>
                        {i < disputeStatusFlow.length - 1 && (
                          <div className={`absolute top-6 left-1/2 h-0.5 w-full ${isCompleted ? 'bg-green-300' : 'bg-gray-200'}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* History */}
              <div className="space-y-0">
                {dispute.timeline.map((entry, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        i === dispute.timeline.length - 1 ? 'bg-electric-50' : 'bg-green-50'
                      }`}>
                        <CheckCircle2 className={`h-5 w-5 ${i === dispute.timeline.length - 1 ? 'text-electric-500' : 'text-green-500'}`} />
                      </div>
                      {i < dispute.timeline.length - 1 && <div className="w-0.5 h-10 bg-gray-200" />}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-semibold text-navy-900">{entry.status}</p>
                      <p className="text-xs text-gray-500">{entry.note}</p>
                      <p className="mt-0.5 text-xs font-medium text-gray-400">{entry.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-navy-900">Dispute Summary</h3>
            <div className="mt-4 space-y-3">
              <SummaryRow label="Dispute ID" value={dispute.id} />
              <SummaryRow label="Created" value={dispute.createdDate} />
              <SummaryRow label="Status" value={dispute.status} />
              <SummaryRow label="Priority" value={dispute.priority} />
              <SummaryRow label="Refund" value={dispute.refundStatus} />
              <SummaryRow label="Amount" value={formatINR(dispute.amount)} />
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-sm font-semibold text-navy-900">Need Help?</h3>
            <p className="mt-2 text-sm text-gray-500">Contact our support team for assistance with this dispute.</p>
            <button className="btn-secondary mt-4 w-full justify-center">Contact Support</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: typeof Building; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-gray-400" />
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">{label}</p>
      </div>
      <p className="mt-1 text-sm font-semibold text-navy-900">{value}</p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-50 pb-2">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-semibold text-navy-900">{value}</span>
    </div>
  );
}


