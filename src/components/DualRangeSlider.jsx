import { useState, useRef, useCallback } from 'react';

function defaultFormat(value) {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(0)} L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
  return `₹${value}`;
}

export function DualRangeSlider({ min, max, minValue, maxValue, onChange, formatLabel = defaultFormat }) {
  const trackRef = useRef(null);
  const [dragging, setDragging] = useState(null);

  const getPercent = (value) => ((value - min) / (max - min)) * 100;

  const getValueFromPosition = useCallback((clientX) => {
    if (!trackRef.current) return min;
    const rect = trackRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return min + percent * (max - min);
  }, [min, max]);

  const snapToStep = (value) => {
    if (value >= 10000000) return Math.round(value / 5000000) * 5000000;
    if (value >= 1000000) return Math.round(value / 1000000) * 1000000;
    if (value >= 500000) return Math.round(value / 500000) * 500000;
    return Math.round(value / 100000) * 100000;
  };

  const handlePointerDown = (handle) => (e) => {
    e.preventDefault();
    setDragging(handle);
    (e.target).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = useCallback((e) => {
    if (!dragging) return;
    const raw = getValueFromPosition(e.clientX);
    const snapped = snapToStep(raw);

    if (dragging === 'min') {
      const newMin = Math.min(snapped, maxValue - 100000);
      onChange(Math.max(min, newMin), maxValue);
    } else {
      const newMax = Math.max(snapped, minValue + 100000);
      onChange(minValue, Math.min(max, newMax));
    }
  }, [dragging, minValue, maxValue, min, max, getValueFromPosition, onChange]);

  const handlePointerUp = useCallback(() => {
    setDragging(null);
  }, []);

  const minPercent = getPercent(minValue);
  const maxPercent = getPercent(maxValue);

  return (
    <div className="pt-8 pb-2 px-1">
      {/* Labels */}
      <div className="relative h-6 mb-1">
        <div
          className="absolute -translate-x-1/2 bg-gray-800 text-white text-[10px] font-semibold px-2 py-0.5 rounded whitespace-nowrap shadow-sm"
          style={{ left: `${minPercent}%` }}
        >
          {formatLabel(minValue)}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent border-t-gray-800" />
        </div>
        <div
          className="absolute -translate-x-1/2 bg-gray-800 text-white text-[10px] font-semibold px-2 py-0.5 rounded whitespace-nowrap shadow-sm"
          style={{ left: `${maxPercent}%` }}
        >
          {formatLabel(maxValue)}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent border-t-gray-800" />
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="relative h-2 rounded-full bg-gray-200 cursor-pointer"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Active track with gradient */}
        <div
          className="absolute h-full rounded-full"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
            background: 'linear-gradient(90deg, #f97316, #ec4899)',
          }}
        />

        {/* Min handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-[3px] border-orange-500 shadow-md cursor-grab active:cursor-grabbing hover:scale-110 transition-transform z-10"
          style={{ left: `${minPercent}%` }}
          onPointerDown={handlePointerDown('min')}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        />

        {/* Max handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-[3px] border-pink-500 shadow-md cursor-grab active:cursor-grabbing hover:scale-110 transition-transform z-10"
          style={{ left: `${maxPercent}%` }}
          onPointerDown={handlePointerDown('max')}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        />
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-medium">
        <span>{formatLabel(min)}</span>
        <span>{formatLabel(max)}</span>
      </div>
    </div>
  );
}
