import VillageCard from './VillageCard';

export default function VillageGrid({ villages }) {
  return (
    <div className="grid auto-rows-fr grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5 lg:grid-cols-6 lg:gap-3 min-[1440px]:grid-cols-7 min-[1536px]:grid-cols-8">
      {villages.map((village) => (
        <VillageCard key={village.name} village={village} />
      ))}
    </div>
  );
}
