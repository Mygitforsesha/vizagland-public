import { CheckCircle2 } from 'lucide-react';

export default function PropertySuccessModal({
  isOpen,
  onClose,
  referenceId,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center">
        <CheckCircle2 size={72} className="mx-auto text-green-500" aria-hidden />

        <h3 className="mt-4 text-2xl font-bold text-primary">Request Submitted!</h3>

        <p className="mt-3 text-gray-600">Thank you for choosing Vizag Land.</p>

        <p className="mt-2 text-sm text-gray-500">
          Our team will review your property details and contact you within 24–48 hours.
        </p>

        {referenceId && (
          <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-3">
            <p className="text-sm font-medium text-green-700">Ref ID: {referenceId}</p>
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-xl bg-primary py-3 text-white transition-colors hover:bg-primary-dark"
        >
          Back To Home
        </button>
      </div>
    </div>
  );
}
