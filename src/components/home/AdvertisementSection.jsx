/**
 * Advertisement section — minimal placeholder slots ready for backend ad content.
 * No API integration yet; swap AD_SLOTS when an ads API is available.
 */
const AD_SLOTS = [
  {
    id: 'ad-primary',
    label: 'Advertisement',
    description: 'Promote your property or service here.',
  },
  {
    id: 'ad-secondary',
    label: 'Advertisement',
    description: 'Reach buyers searching land across Visakhapatnam.',
  },
];

export function AdvertisementSection() {
  return (
    <section className="border-t border-gray-200 bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {AD_SLOTS.map((slot) => (
            <article
              key={slot.id}
              className="flex min-h-[7rem] flex-col justify-center rounded-lg border border-gray-200 bg-gray-50 px-5 py-4"
            >
              <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                {slot.label}
              </span>
              <p className="mt-1 text-sm text-gray-600">{slot.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
