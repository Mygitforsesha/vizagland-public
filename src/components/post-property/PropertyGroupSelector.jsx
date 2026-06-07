import {
  Home,
  Building2,
  Wheat,
  Factory,
  LayoutGrid,
  Landmark,
} from "lucide-react";

const groups = [
  {
    value: "Residential",
    icon: Home,
    desc: "Plots, Flats, Villas",
  },
  {
    value: "Commercial",
    icon: Building2,
    desc: "Offices, Shops",
  },
  {
    value: "Agricultural",
    icon: Wheat,
    desc: "Farm Lands",
  },
  {
    value: "Industrial",
    icon: Factory,
    desc: "Factories, Warehouses",
  },
  {
    value: "Developments",
    icon: LayoutGrid,
    desc: "Layouts & Projects",
  },
  {
    value: "House/Villas Developers",
    icon: Landmark,
    desc: "Builders & Developers",
  },
];

export default function PropertyGroupSelector({
  value,
  onChange,
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {groups.map((group) => {
        const Icon = group.icon;
        const active = value === group.value;

        return (
          <button
            key={group.value}
            type="button"
            onClick={() => onChange(group.value)}
            className={`rounded-2xl border p-4 text-left transition-all duration-200
            ${
              active
                ? "bg-primary text-white border-primary shadow-lg"
                : "bg-white border-gray-200 hover:border-accent"
            }`}
          >
            <Icon
              className={`mb-3 ${
                active ? "text-white" : "text-accent"
              }`}
              size={22}
            />

            <div className="font-semibold text-sm">
              {group.value}
            </div>

            <div
              className={`text-xs mt-1 ${
                active ? "text-white/80" : "text-gray-500"
              }`}
            >
              {group.desc}
            </div>
          </button>
        );
      })}
    </div>
  );
}