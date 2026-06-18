import { motion } from 'framer-motion';

const MODES = [
  { id: 'owner', label: 'Owner' },
  { id: 'agent', label: 'Agent' },
];

const springTransition = {
  type: 'spring',
  stiffness: 350,
  damping: 30,
};

export default function PostModeToggle({ value, onChange }) {
  return (
    <div
      className="relative flex w-full rounded-full border border-gray-200/80 bg-white p-1 shadow-[0_4px_14px_-4px_rgba(0,31,84,0.18)] sm:w-auto sm:min-w-[220px]"
      role="tablist"
      aria-label="Post property as owner or agent"
    >
      {MODES.map((mode) => {
        const isActive = value === mode.id;

        return (
          <button
            key={mode.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(mode.id)}
            className={`relative z-10 min-h-[44px] flex-1 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 sm:min-w-[100px] sm:flex-none ${
              isActive ? 'text-white' : 'text-primary hover:text-accent'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="post-mode-pill"
                className="absolute inset-0 rounded-full bg-primary shadow-[0_4px_12px_-2px_rgba(0,31,84,0.35)]"
                transition={springTransition}
              />
            )}
            <span className="relative z-10">{mode.label}</span>
          </button>
        );
      })}
    </div>
  );
}
