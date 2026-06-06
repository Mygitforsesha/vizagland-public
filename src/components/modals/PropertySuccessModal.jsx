import { CheckCircle2 } from "lucide-react";

export default function PropertySuccessModal({
  isOpen,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center px-4">

      <div className="bg-white rounded-2xl p-6 max-w-md w-full text-center">

        <CheckCircle2
          size={72}
          className="mx-auto text-green-500"
        />

        <h3 className="mt-4 text-2xl font-bold text-primary">
          Request Submitted!
        </h3>

        <p className="mt-3 text-gray-600">
          Thank you for choosing Vizag Land.
        </p>

        <p className="text-gray-500 text-sm mt-2">
          Our team will review your property details and
          contact you within 24-48 hours.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-xl p-3 mt-5">
          <p className="text-sm font-medium text-green-700">
            Ref ID: VL-{Date.now().toString().slice(-6)}
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full bg-primary text-white py-3 rounded-xl"
        >
          Back To Home
        </button>
      </div>
    </div>
  );
}