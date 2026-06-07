import { MultiSelect } from "react-multi-select-component";
import { X } from "lucide-react";

export default function MultiSelectField({
  label,
  options,
  value,
  onChange,
}) {
  return (
    <div className="space-y-3 pb-6 border-b border-gray-100 last:border-b-0 last:pb-0">

      <label className="block text-base font-bold text-primary">
        {label}
      </label>

      <MultiSelect
        options={options}
        value={value}
        onChange={onChange}
        labelledBy={`Select ${label}`}
        hasSelectAll={false}
        valueRenderer={(selected) =>
          selected.length
            ? `${selected.length} selected`
            : `Select ${label}`
        }
      />

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((item) => (
            <div
              key={item.value}
              className="
                inline-flex
                items-center
                gap-1
                rounded-full
                bg-accent-light
                text-accent
                px-3
                py-2
                text-xs
                font-semibold
                transition-all
                hover:bg-accent
                hover:text-white
              "
            >
              <span className="truncate max-w-[140px]">
                {item.label}
              </span>

              <button
                type="button"
                className="rounded-full"
                onClick={() =>
                  onChange(
                    value.filter(
                      (x) => x.value !== item.value
                    )
                  )
                }
              >
                <X size={13} />
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}