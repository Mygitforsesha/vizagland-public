import AdvertisementCard from './AdvertisementCard';

export default function AdvertisementGrid({ items, showMeta = true }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 min-[1440px]:grid-cols-4">
      {items.map((item) => (
        <AdvertisementCard key={item.id} item={item} showMeta={showMeta} />
      ))}
    </div>
  );
}
