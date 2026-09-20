import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import {
  Check, ArrowRight, ArrowLeft, AlertCircle, FileText,
  CheckCircle2, Building, CreditCard, Calendar, Hash,
} from 'lucide-react';
import { useAppData } from '@/context/AppDataContext';
import { useAuth } from '@/context/AuthContext';
import { FileUpload } from '@/components/FileUpload';
import { TransactionStatusBadge } from '@/components/Badges';
import { formatINR, generateDisputeId, disputeTypeOptions, type DisputeType, type Dispute } from '@/data/mockData';

const steps = ['Transaction', 'Dispute Type', 'Description', 'Evidence', 'Review'];

export function RaiseDisputePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { transactions, addDispute } = useAppData();
  const { user } = useAuth();

  const txnId = searchParams.get('txn');
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTxn, setSelectedTxn] = useState(
    transactions.find((t) => t.id === txnId) || transactions[0]
  );
  const [disputeType, setDisputeType] = useState<DisputeType | ''>('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<{ name: string; type: string; size: string }[]>([]);
  const [error, setError] = useState('');

  const canProceed = () => {
    if (currentStep === 0) return !!selectedTxn;
    if (currentStep === 1) return !!disputeType;
    if (currentStep === 2) return description.trim().length >= 20;
    if (currentStep === 3) return true;
    return true;
  };

  const getError = () => {
    if (currentStep === 2 && description.trim().length < 20) return 'Please enter at least 20 characters';
    return '';
  };

  const handleNext = () => {
    if (!canProceed()) { setError(getError()); return; }
    setError('');
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const handleBack = () => {
    setError('');
    setCurrentStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = () => {
    const disputeId = generateDisputeId();
    const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const newDispute: Dispute = {
      id: disputeId,
      transactionId: selectedTxn.id,
      merchant: selectedTxn.merchant,
      amount: selectedTxn.amount,
      disputeType: disputeType as DisputeType,
      description,
      status: 'Raised',
      priority: 'Medium',
      refundStatus: 'Pending',
      createdDate: today,
      customer: user?.name || 'Rahul Sharma',
      customerEmail: user?.email || 'rahul.sharma@email.com',
      evidence: files,
      timeline: [{ date: today, status: 'Raised', note: 'Dispute submitted by customer' }],
      adminNotes: [],
    };
    addDispute(newDispute);
    navigate(`/app/dispute-success?id=${disputeId}`, {
      state: { dispute: newDispute },
    });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Raise a Dispute</h1>
        <p className="text-sm text-gray-500">Follow the steps to submit your payment dispute</p>
      </div>

      {/* Stepper */}
      <div className="card p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                  i < currentStep ? 'border-green-500 bg-green-500 text-white' :
                  i === currentStep ? 'border-electric-500 bg-electric-500 text-white' :
                  'border-gray-300 bg-white text-gray-400'
                }`}>
                  {i < currentStep ? <Check className="h-5 w-5" /> : <span className="text-sm font-semibold">{i + 1}</span>}
                </div>
                <span className={`mt-2 hidden text-xs font-medium sm:block ${i <= currentStep ? 'text-navy-900' : 'text-gray-400'}`}>
                  {step}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`mx-2 h-0.5 flex-1 transition-colors ${i < currentStep ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="card p-6">
        {/* Step 1: Transaction */}
        {currentStep === 0 && (
          <div className="animate-fade-in space-y-4">
            <h2 className="text-lg font-bold text-navy-900">Select Transaction</h2>
            <p className="text-sm text-gray-500">Choose the transaction you want to dispute</p>
            <div className="space-y-2">
              {transactions.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTxn(t)}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all ${
                    selectedTxn?.id === t.id ? 'border-electric-500 bg-electric-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                      selectedTxn?.id === t.id ? 'border-electric-500 bg-electric-500' : 'border-gray-300'
                    }`}>
                      {selectedTxn?.id === t.id && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{t.id} · {t.merchant}</p>
                      <p className="text-xs text-gray-500">{t.date} · {t.paymentType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-navy-900">{formatINR(t.amount)}</span>
                    <TransactionStatusBadge status={t.status} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Dispute Type */}
        {currentStep === 1 && (
          <div className="animate-fade-in space-y-4">
            <h2 className="text-lg font-bold text-navy-900">Select Dispute Type</h2>
            <p className="text-sm text-gray-500">What type of issue are you experiencing?</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {disputeTypeOptions.map((type) => (
                <button
                  key={type}
                  onClick={() => setDisputeType(type)}
                  className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                    disputeType === type ? 'border-electric-500 bg-electric-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                    disputeType === type ? 'border-electric-500 bg-electric-500' : 'border-gray-300'
                  }`}>
                    {disputeType === type && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <span className="text-sm font-medium text-navy-900">{type}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Description */}
        {currentStep === 2 && (
          <div className="animate-fade-in space-y-4">
            <h2 className="text-lg font-bold text-navy-900">Complaint Description</h2>
            <p className="text-sm text-gray-500">Describe the issue in detail (minimum 20 characters)</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="input-field resize-none"
              placeholder="Please describe what happened with your transaction. Include details like when you noticed the issue, what you expected, and what actually happened..."
            />
            <p className="text-xs text-gray-400">{description.length} characters</p>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        )}

        {/* Step 4: Evidence */}
        {currentStep === 3 && (
          <div className="animate-fade-in space-y-4">
            <h2 className="text-lg font-bold text-navy-900">Evidence / Proof</h2>
            <p className="text-sm text-gray-500">Upload screenshots, bank statements, or receipts to support your claim</p>
            <FileUpload
              files={files}
              onAdd={(f) => setFiles([...files, f])}
              onRemove={(i) => setFiles(files.filter((_, idx) => idx !== i))}
            />
            {files.length === 0 && (
              <p className="text-xs text-gray-400">Evidence is optional but recommended for faster resolution</p>
            )}
          </div>
        )}

        {/* Step 5: Review */}
        {currentStep === 4 && (
          <div className="animate-fade-in space-y-5">
            <h2 className="text-lg font-bold text-navy-900">Review Your Dispute</h2>
            <p className="text-sm text-gray-500">Please review all information before submitting</p>

            {/* Transaction */}
            <div className="rounded-xl border border-gray-200 p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Transaction</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-navy-400" />
                  <div>
                    <p className="text-sm font-semibold text-navy-900">{selectedTxn?.merchant}</p>
                    <p className="text-xs text-gray-500">{selectedTxn?.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-navy-900">{formatINR(selectedTxn?.amount || 0)}</p>
                  <p className="text-xs text-gray-500">{selectedTxn?.date}</p>
                </div>
              </div>
            </div>

            {/* Dispute Type */}
            <div className="rounded-xl border border-gray-200 p-4">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Dispute Type</h3>
              <p className="text-sm font-medium text-navy-900">{disputeType}</p>
            </div>

            {/* Description */}
            <div className="rounded-xl border border-gray-200 p-4">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Description</h3>
              <p className="text-sm text-navy-700">{description}</p>
            </div>

            {/* Evidence */}
            <div className="rounded-xl border border-gray-200 p-4">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Evidence</h3>
              {files.length > 0 ? (
                <div className="space-y-2">
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-navy-700">
                      <FileText className="h-4 w-4 text-electric-500" />
                      {f.name} ({f.size})
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No evidence uploaded</p>
              )}
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          {currentStep < steps.length - 1 ? (
            <button onClick={handleNext} className="btn-primary">
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn-primary bg-green-600 hover:bg-green-700">
              <CheckCircle2 className="h-4 w-4" />
              Submit Dispute
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
