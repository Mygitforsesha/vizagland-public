import { useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export function SectionLabel({ children, trailing }) {  return (
    <div className="flex items-center justify-between mb-3">
      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{children}</span>
      {trailing}
    </div>
  );
}

export function FloatingSelect({
  label,
  value,
  onChange,
  options,
  id,
  className = '',
}) {
  const selectId = id ?? label.replace(/\s+/g, '-').toLowerCase();
  return (
    <div className={`relative ${className}`}>
      <label
        htmlFor={selectId}
        className="absolute -top-2 left-3 px-1 text-[11px] font-medium text-gray-500 bg-white z-[1]"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none border border-gray-200 rounded-xl px-3 pt-3.5 pb-2.5 text-sm text-primary bg-white outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors cursor-pointer"
          aria-label={label}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt === 'All' && label.includes('Panchayat') ? 'Select Panchayat' : opt}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          aria-hidden
        />
      </div>
    </div>
  );
}

export function FloatingNumberField({
  label,
  id,
  value,
  onChange,
  placeholder,
  min,
}) {
  const fieldId = id ?? label.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className="relative">
      <label
        htmlFor={fieldId}
        className="absolute -top-2 left-3 px-1 text-[11px] font-medium text-gray-500 bg-white z-[1]"
      >
        {label}
      </label>
      <input
        id={fieldId}
        type="number"
        min={min}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-200 bg-white px-3 pt-3.5 pb-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </div>
  );
}

export function BuyRentToggle({
  value,
  onChange,
  compact = false,
}) {
  const isBuyActive = value === 'All' || value === 'Buy' || value === 'Sell';
  const isRentActive = value === 'Rent' || value === 'Lease';
  return (
    <div
      className={`flex rounded-xl overflow-hidden border border-gray-200 ${compact ? 'text-sm' : ''}`}
      role="group"
      aria-label="Listing type"
    >
      <button
        type="button"
        onClick={() => onChange('Buy')}
        className={`flex-1 py-2.5 font-semibold border-0 cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
          isBuyActive ? 'bg-primary text-white' : 'bg-surface text-gray-500 hover:bg-gray-100'
        }`}
        aria-pressed={isBuyActive}
      >
        Buy
      </button>
      <button
        type="button"
        onClick={() => onChange('Rent')}
        className={`flex-1 py-2.5 font-semibold border-0 cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
          isRentActive ? 'bg-primary text-white' : 'bg-surface text-gray-500 hover:bg-gray-100'
        }`}
        aria-pressed={isRentActive}
      >
        Rent
      </button>
    </div>
  );
}

export function OverlayPanel({
  open,
  onClose,
  children,
  side,
  ariaLabel,
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const panelClassName =
    side === 'right'
      ? 'absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right'
      : side === 'fullscreen'
        ? 'absolute inset-0 h-full w-full bg-white flex flex-col animate-fade-in'
        : 'absolute bottom-0 left-0 right-0 max-h-[92vh] bg-white rounded-t-2xl shadow-2xl flex flex-col animate-slide-in-up';

  return (
    <div className="fixed inset-0 z-[100]" role="presentation">
      {side !== 'fullscreen' && (
        <button
          type="button"
          className="absolute inset-0 bg-primary/40 backdrop-blur-[2px] border-0 cursor-pointer animate-fade-in"
          aria-label="Close panel"
          onClick={onClose}
        />
      )}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className={panelClassName}
      >
        {children}
      </div>
    </div>
  );
}
