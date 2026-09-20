import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, User, Building, AlertCircle, FileText, Calendar,
  CheckCircle2, Clock, XCircle, Hash, CreditCard, Mail,
  MessageSquare, Send, Shield, RefreshCw, Download, AlertTriangle,
  Flag,
} from 'lucide-react';
import { useAppData } from '@/context/AppDataContext';
import { DisputeStatusBadge, PriorityBadge, RefundStatusBadge, RiskBadge, SLABadge } from '@/components/Badges';
import { Modal } from '@/components/FileUpload';
import { formatINR, allDisputeStatuses, allPriorities, allRefundStatuses, getTimeRemaining, type DisputeStatus, type Priority, type RefundStatus } from '@/data/mockData';

export function AdminDisputeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { disputes, updateDispute, addAdminNote } = useAppData();
  const dispute = disputes.find((d) => d.id === id);

  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [priorityModalOpen, setPriorityModalOpen] = useState(false);
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<DisputeStatus>(dispute?.status || 'Raised');
  const [newPriority, setNewPriority] = useState<Priority>(dispute?.priority || 'Medium');
  const [newRefund, setNewRefund] = useState<RefundStatus>(dispute?.refundStatus || 'Pending');
  const [noteText, setNoteText] = useState('');

  if (!dispute) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertCircle className="h-12 w-12 text-gray-300" />
        <p className="mt-4 text-lg font-semibold text-navy-900">Dispute not found</p>
        <Link to="/admin/disputes" className="btn-primary mt-6">Back to Disputes</Link>
      </div>
    );
  }

  const sla = getTimeRemaining(dispute.deadline);
  const isResolved = dispute.status === 'Resolved' || dispute.status === 'Rejected';

  const handleSaveStatus = () => {
    const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    updateDispute(dispute.id, {
      status: newStatus,
      timeline: [...dispute.timeline, { date: today, status: newStatus, note: `Status updated to ${newStatus} by admin` }],
    });
    setStatusModalOpen(false);
  };

  const handleSavePriority = () => {
    updateDispute(dispute.id, { priority: newPriority });
    setPriorityModalOpen(false);
  };

  const handleSaveRefund = () => {
    updateDispute(dispute.id, { refundStatus: newRefund });
    setRefundModalOpen(false);
  };

  const handleAddNote = () => {
    if (noteText.trim()) {
      addAdminNote(dispute.id, noteText.trim());
      setNoteText('');
      setNoteModalOpen(false);
    }
  };

  const handleDownloadReport = () => {
    const reportWin = window.open('', '_blank', 'width=800,height=900');
    if (!reportWin) return;
    const timelineHtml = dispute.timeline.map((t) => `<tr><td style="padding:6px;border:1px solid #e5e7eb">${t.date}</td><td style="padding:6px;border:1px solid #e5e7eb">${t.status}</td><td style="padding:6px;border:1px solid #e5e7eb">${t.note}</td></tr>`).join('');
    const notesHtml = dispute.adminNotes.length > 0
      ? dispute.adminNotes.map((n) => `<tr><td style="padding:6px;border:1px solid #e5e7eb">${n.date}</td><td style="padding:6px;border:1px solid #e5e7eb">${n.author}</td><td style="padding:6px;border:1px solid #e5e7eb">${n.note}</td></tr>`).join('')
      : '<tr><td colspan="3" style="padding:6px;border:1px solid #e5e7eb;color:#9ca3af">No admin notes</td></tr>';
    reportWin.document.write(`<!doctype html><html><head><title>PayShield Dispute Report — ${dispute.id}</title><style>body{font-family:Inter,Arial,sans-serif;padding:40px;color:#102a43}h1{color:#2563eb;margin-bottom:4px}.sub{color:#627d98;margin-bottom:24px}.section{margin-bottom:20px}.section h2{font-size:14px;text-transform:uppercase;color:#627d98;margin-bottom:8px}table{width:100%;border-collapse:collapse;font-size:13px}td{padding:8px 6px}.label{color:#627d98;width:200px}table.grid td{border:1px solid #e5e7eb;padding:6px}.footer{margin-top:32px;font-size:11px;color:#9ca3af;border-top:1px solid #e5e7eb;padding-top:12px}</style></head><body>
<h1>PayShield</h1><p class="sub">Dispute Report — ${dispute.id}</p>
<div class="section"><h2>Dispute Details</h2><table>
<tr><td class="label">Dispute ID</td><td><strong>${dispute.id}</strong></td></tr>
<tr><td class="label">Customer</td><td>${dispute.customer} (${dispute.customerEmail})</td></tr>
<tr><td class="label">Transaction ID</td><td>${dispute.transactionId}</td></tr>
<tr><td class="label">Merchant</td><td>${dispute.merchant}</td></tr>
<tr><td class="label">Amount</td><td>${formatINR(dispute.amount)}</td></tr>
<tr><td class="label">Date</td><td>${dispute.createdDate}</td></tr>
<tr><td class="label">Dispute Type</td><td>${dispute.disputeType}</td></tr>
<tr><td class="label">Description</td><td>${dispute.description}</td></tr>
<tr><td class="label">Priority</td><td>${dispute.priority}</td></tr>
<tr><td class="label">Current Status</td><td>${dispute.status}</td></tr>
<tr><td class="label">Refund Status</td><td>${dispute.refundStatus}</td></tr>
<tr><td class="label">Resolution Deadline</td><td>${dispute.deadline}</td></tr>
<tr><td class="label">Risk Level</td><td>${dispute.riskLevel}</td></tr>
</table></div>
<div class="section"><h2>Status History</h2><table class="grid"><tr style="font-weight:bold;background:#f9fafb"><td style="padding:6px;border:1px solid #e5e7eb">Date</td><td style="padding:6px;border:1px solid #e5e7eb">Status</td><td style="padding:6px;border:1px solid #e5e7eb">Description</td></tr>${timelineHtml}</table></div>
<div class="section"><h2>Admin Notes</h2><table class="grid"><tr style="font-weight:bold;background:#f9fafb"><td style="padding:6px;border:1px solid #e5e7eb">Date</td><td style="padding:6px;border:1px solid #e5e7eb">Author</td><td style="padding:6px;border:1px solid #e5e7eb">Note</td></tr>${notesHtml}</table></div>
<div class="footer">Generated by PayShield on ${new Date().toLocaleString('en-IN')} — This is a demo report.</div>
</body></html>`);
    reportWin.document.close();
    setTimeout(() => reportWin.print(), 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button onClick={() => navigate(-1)} className="self-start rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-navy-900">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-navy-900">{dispute.id}</h1>
          <p className="text-sm text-gray-500">{dispute.customer} · {dispute.merchant}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <DisputeStatusBadge status={dispute.status} />
          <PriorityBadge priority={dispute.priority} />
          {!isResolved && <SLABadge text={sla.text} breached={sla.breached} />}
        </div>
      </div>

      {/* Admin controls */}
      <div className="card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-navy-900">Admin Controls</h3>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => { setNewStatus(dispute.status); setStatusModalOpen(true); }} className="btn-primary">
              <RefreshCw className="h-4 w-4" />
              Update Status
            </button>
            <button onClick={() => { setNewPriority(dispute.priority); setPriorityModalOpen(true); }} className="btn-secondary">
              <Shield className="h-4 w-4" />
              Change Priority
            </button>
            <button onClick={() => { setNewRefund(dispute.refundStatus); setRefundModalOpen(true); }} className="btn-secondary">
              <RefreshCw className="h-4 w-4" />
              Refund Status
            </button>
            <button onClick={() => setNoteModalOpen(true)} className="btn-secondary">
              <MessageSquare className="h-4 w-4" />
              Add Note
            </button>
            <button onClick={handleDownloadReport} className="btn-secondary">
              <Download className="h-4 w-4" />
              Download Report
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Details */}
        <div className="space-y-6 lg:col-span-2">
          {/* Customer info */}
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-navy-900">Customer Information</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoItem icon={User} label="Customer" value={dispute.customer} />
              <InfoItem icon={Mail} label="Email" value={dispute.customerEmail} />
            </div>
          </div>

          {/* Transaction info */}
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-navy-900">Transaction Information</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoItem icon={Building} label="Merchant" value={dispute.merchant} />
              <InfoItem icon={Hash} label="Transaction ID" value={dispute.transactionId} />
              <InfoItem icon={CreditCard} label="Amount" value={formatINR(dispute.amount)} />
              <InfoItem icon={Calendar} label="Date" value={dispute.createdDate} />
            </div>
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
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Priority</p>
                  <div className="mt-1"><PriorityBadge priority={dispute.priority} /></div>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Refund Status</p>
                  <div className="mt-1"><RefundStatusBadge status={dispute.refundStatus} /></div>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Resolution Deadline</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-sm font-semibold text-navy-900">{dispute.deadline}</span>
                    {!isResolved && <SLABadge text={sla.text} breached={sla.breached} />}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Analysis */}
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-navy-900">Risk Analysis</h3>
              <RiskBadge level={dispute.riskLevel} />
            </div>
            <p className="mt-1 text-xs text-gray-400">Automated demo indicators — not real fraud detection</p>
            <div className="mt-4 space-y-2">
              {dispute.riskFlags.map((flag, i) => (
                <div key={i} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                  flag === 'No risk detected' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                }`}>
                  <Flag className="h-4 w-4" />
                  {flag}
                </div>
              ))}
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
            <div className="mt-6 space-y-0">
              {dispute.timeline.map((entry, i) => {
                const isLast = i === dispute.timeline.length - 1;
                const isRejection = entry.status === 'Rejected';
                return (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        isLast ? (isRejection ? 'bg-red-50' : 'bg-electric-50') : 'bg-green-50'
                      }`}>
                        {isRejection ? <XCircle className="h-5 w-5 text-red-500" /> :
                         isLast ? <CheckCircle2 className="h-5 w-5 text-electric-500" /> :
                         <CheckCircle2 className="h-5 w-5 text-green-500" />}
                      </div>
                      {i < dispute.timeline.length - 1 && <div className="w-0.5 h-10 bg-gray-200" />}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-semibold text-navy-900">{entry.status}</p>
                      <p className="text-xs text-gray-500">{entry.note}</p>
                      <p className="mt-0.5 text-xs font-medium text-gray-400">{entry.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Admin notes */}
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-navy-900">Admin Notes</h3>
              <button onClick={() => setNoteModalOpen(true)} className="text-sm font-medium text-electric-600 hover:text-electric-700">
                + Add Note
              </button>
            </div>
            <div className="mt-4 space-y-3">
              {dispute.adminNotes.length === 0 ? (
                <p className="py-4 text-center text-sm text-gray-400">No admin notes yet</p>
              ) : (
                dispute.adminNotes.map((note, i) => (
                  <div key={i} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-navy-700">{note.author}</span>
                      <span className="text-xs text-gray-400">{note.date}</span>
                    </div>
                    <p className="mt-1 text-sm text-navy-700">{note.note}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-navy-900">Dispute Summary</h3>
            <div className="mt-4 space-y-3">
              <SummaryRow label="Dispute ID" value={dispute.id} />
              <SummaryRow label="Customer" value={dispute.customer} />
              <SummaryRow label="Merchant" value={dispute.merchant} />
              <SummaryRow label="Amount" value={formatINR(dispute.amount)} />
              <SummaryRow label="Type" value={dispute.disputeType} />
              <SummaryRow label="Created" value={dispute.createdDate} />
              <SummaryRow label="Deadline" value={dispute.deadline} />
              <SummaryRow label="Status" value={dispute.status} />
              <SummaryRow label="Priority" value={dispute.priority} />
              <SummaryRow label="Refund" value={dispute.refundStatus} />
              <SummaryRow label="Risk" value={dispute.riskLevel} />
            </div>
          </div>
        </div>
      </div>

      {/* Status Modal */}
      <Modal open={statusModalOpen} onClose={() => setStatusModalOpen(false)} title="Update Status">
        <div className="space-y-3">
          {allDisputeStatuses.map((s) => (
            <button
              key={s}
              onClick={() => setNewStatus(s)}
              className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all ${
                newStatus === s ? 'border-electric-500 bg-electric-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-sm font-medium text-navy-900">{s}</span>
              {newStatus === s && <CheckCircle2 className="h-5 w-5 text-electric-500" />}
            </button>
          ))}
          <button onClick={handleSaveStatus} className="btn-primary w-full mt-4">Save Changes</button>
        </div>
      </Modal>

      {/* Priority Modal */}
      <Modal open={priorityModalOpen} onClose={() => setPriorityModalOpen(false)} title="Change Priority">
        <div className="space-y-3">
          {allPriorities.map((p) => (
            <button
              key={p}
              onClick={() => setNewPriority(p)}
              className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all ${
                newPriority === p ? 'border-electric-500 bg-electric-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <PriorityBadge priority={p} />
              {newPriority === p && <CheckCircle2 className="h-5 w-5 text-electric-500" />}
            </button>
          ))}
          <button onClick={handleSavePriority} className="btn-primary w-full mt-4">Save Changes</button>
        </div>
      </Modal>

      {/* Refund Modal */}
      <Modal open={refundModalOpen} onClose={() => setRefundModalOpen(false)} title="Update Refund Status">
        <div className="space-y-3">
          {allRefundStatuses.map((r) => (
            <button
              key={r}
              onClick={() => setNewRefund(r)}
              className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all ${
                newRefund === r ? 'border-electric-500 bg-electric-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <RefundStatusBadge status={r} />
              {newRefund === r && <CheckCircle2 className="h-5 w-5 text-electric-500" />}
            </button>
          ))}
          <button onClick={handleSaveRefund} className="btn-primary w-full mt-4">Save Changes</button>
        </div>
      </Modal>

      {/* Note Modal */}
      <Modal open={noteModalOpen} onClose={() => setNoteModalOpen(false)} title="Add Admin Note">
        <div className="space-y-4">
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            rows={4}
            className="input-field resize-none"
            placeholder="Enter your note about this dispute..."
          />
          <button onClick={handleAddNote} disabled={!noteText.trim()} className="btn-primary w-full">
            <Send className="h-4 w-4" />
            Add Note
          </button>
        </div>
      </Modal>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: typeof User; label: string; value: string }) {
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
