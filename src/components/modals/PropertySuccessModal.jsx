import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, ChevronRight } from 'lucide-react';

function fireCelebrationConfetti(confettiInstance) {
  const colors = ['#22c55e', '#16a34a', '#15803d', '#ffffff'];

  confettiInstance({
    particleCount: 50,
    spread: 80,
    startVelocity: 30,
    origin: { x: 0.5, y: 0.05 },
    colors,
  });

  setTimeout(() => {
    confetti({
      particleCount: 40,
      spread: 100,
      startVelocity: 25,
      origin: { x: 0.4, y: 0.05 },
      colors,
    });
  }, 150);

  setTimeout(() => {
    confetti({
      particleCount: 40,
      spread: 100,
      startVelocity: 25,
      origin: { x: 0.6, y: 0.05 },
      colors,
    });
  }, 300);
}

const STATUS_CHIPS = [
  { label: '✓ Property Received', className: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  { label: '✓ Review Started', className: 'bg-green-50 text-green-700 border-green-100' },
  { label: '✓ Contact Within 24–48 Hours', className: 'bg-teal-50 text-teal-700 border-teal-100' },
  { label: '✓ Trusted Vizag Land Team', className: 'bg-lime-50 text-lime-700 border-lime-100' },
];

const TIMELINE_STEPS = ['Received', 'Verification', 'Contact You'];

const fadeUp = (delay, duration = 0.45) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration, ease: [0.22, 1, 0.36, 1] },
});

export default function PropertySuccessModal({
  isOpen,
  onClose,
  referenceId,
}) {
  const confettiFiredRef = useRef(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      confettiFiredRef.current = false;
      return;
    }

    document.body.style.overflow = 'hidden';
    const confettiInstance = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });

    if (!confettiFiredRef.current) {
      confettiFiredRef.current = true;
      fireCelebrationConfetti(confettiInstance);
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-[1001]"
          />

          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/55 px-3 py-6 backdrop-blur-sm sm:px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          >
            <div className="relative mx-auto w-full max-w-md pt-6 sm:pt-7">
              {/* <motion.div
                className="absolute -top-1 left-1/2 z-20 w-[calc(100%-1.5rem)] max-w-[19rem] -translate-x-1/2 rounded-full border border-green-200 bg-white px-3 py-1.5 text-center text-[11px] font-semibold text-green-700 shadow-lg shadow-green-900/10 sm:max-w-none sm:px-4 sm:text-xs"
                initial={{ opacity: 0, scale: 0.88, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 220, damping: 20, delay: 0.05 }}
              >
                🎉 Property Submitted Successfully
              </motion.div> */}

              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="property-success-title"
                className="relative overflow-hidden rounded-2xl bg-white text-center shadow-2xl shadow-green-900/10 sm:rounded-3xl"
                initial={{ opacity: 0, y: 50, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                onClick={(event) => event.stopPropagation()}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full bg-emerald-200/30 blur-2xl sm:h-36 sm:w-36"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-green-200/25 blur-2xl sm:h-40 sm:w-40"
                />

                <div className="relative bg-gradient-to-b from-green-50 via-emerald-50 to-white px-4 pb-5 pt-8 sm:px-6 sm:pb-6 sm:pt-10">
                  <motion.div
                    className="relative mx-auto flex h-[5.5rem] w-[5.5rem] items-center justify-center sm:h-[6.5rem] sm:w-[6.5rem]"
                    {...fadeUp(0.1, 0.5)}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full bg-green-400/25 blur-xl"
                      animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.7, 0.45] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border border-green-300/50"
                      animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0, 0.55] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                    />
                    <motion.div
                      className="absolute inset-1 rounded-full border border-emerald-300/40"
                      animate={{ scale: [1, 1.28, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 0.35 }}
                    />
                    <motion.div
                      className="relative flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full bg-gradient-to-br from-green-100 via-emerald-50 to-white shadow-inner sm:h-[5rem] sm:w-[5rem]"
                      animate={{ scale: [1, 1.03, 1] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.15, 1] }}
                        transition={{ duration: 0.55, times: [0, 0.72, 1], ease: 'easeOut', delay: 0.1 }}
                      >
                        <CheckCircle2
                          className="h-14 w-14 text-green-500 sm:h-[4.25rem] sm:w-[4.25rem]"
                          aria-hidden
                        />
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="mt-5 flex flex-wrap justify-center gap-1.5 sm:mt-6 sm:gap-2"
                    {...fadeUp(0.2, 0.45)}
                  >
                    {STATUS_CHIPS.map((chip, index) => (
                      <motion.span
                        key={chip.label}
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-medium sm:px-3 sm:text-[11px] ${chip.className}`}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          delay: 0.2 + index * 0.07,
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        {chip.label}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>

                <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                  <motion.h3
                    id="property-success-title"
                    className="text-xl font-bold text-primary sm:text-2xl"
                    {...fadeUp(0.4, 0.45)}
                  >
                    Request Submitted!
                  </motion.h3>

                  <motion.p
                    className="mt-2.5 text-sm text-gray-600 sm:mt-3 sm:text-base"
                    {...fadeUp(0.5, 0.45)}
                  >
                    Thank you for choosing Vizag Land.
                  </motion.p>

                  <motion.p
                    className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm"
                    {...fadeUp(0.55, 0.45)}
                  >
                    Our team will review your property details and contact you within 24–48 hours.
                  </motion.p>

                  {referenceId && (
                    <motion.div
                      className="mt-5 rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 via-emerald-50 to-white p-4 shadow-md shadow-green-900/5 sm:mt-6 sm:rounded-3xl sm:p-5"
                      {...fadeUp(0.7, 0.5)}
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-green-600/80 sm:text-[11px]">
                        Reference ID
                      </p>
                      <motion.p
                        className="mt-2 break-all text-lg font-bold tracking-wide text-green-800 sm:text-xl"
                        animate={{ scale: [1, 1.018, 1] }}
                        transition={{
                          duration: 1.6,
                          repeat: Infinity,
                          repeatDelay: 3.4,
                          ease: 'easeInOut',
                        }}
                      >
                        {referenceId}
                      </motion.p>
                    </motion.div>
                  )}

                  <motion.div
                    className="mt-5 flex flex-wrap items-center justify-center gap-1.5 sm:mt-6 sm:gap-2"
                    {...fadeUp(0.9, 0.45)}
                  >
                    {TIMELINE_STEPS.map((step, index) => (
                      <div key={step} className="flex items-center gap-1.5">
                        <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-[10px] font-medium text-gray-600 sm:px-3 sm:text-[11px]">
                          {step}
                        </span>
                        {index < TIMELINE_STEPS.length - 1 && (
                          <ChevronRight
                            size={14}
                            className="text-gray-300"
                            aria-hidden
                          />
                        )}
                      </div>
                    ))}
                  </motion.div>

                  <motion.button
                    type="button"
                    onClick={onClose}
                    className="relative mt-5 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-emerald-700 to-primary py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 sm:mt-6 sm:py-4 sm:text-base"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -2, scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ delay: 1.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-120%' }}
                      animate={{ x: '220%' }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        repeatDelay: 2.2,
                        ease: 'easeInOut',
                      }}
                    />
                    <span className="relative z-10">Back To Home</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
