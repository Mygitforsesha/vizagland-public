import { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { ScrollArea } from "@/components/ui/scroll-area";

export default function MultiSelectDropdown({
  placeholder = "Select options",
  options = [],
  selected = [],
  onChange,
}) {
  const [open, setOpen] = useState(false);

  const toggleOption = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const removeChip = (value) => {
    onChange(selected.filter((item) => item !== value));
  };

  return (
    <div className="space-y-3">
      {/* Chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((item) => (
            <Badge
              key={item}
              className="bg-accent-light text-accent border border-accent/20 rounded-full px-3 py-1"
            >
              {item}

              <button
                type="button"
                onClick={() => removeChip(item)}
                className="ml-2"
              >
                <X size={14} />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between rounded-xl h-12 border-gray-200"
          >
            {selected.length > 0
              ? `${selected.length} selected`
              : placeholder}

            <ChevronDown size={18} />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-[320px] p-0 rounded-2xl"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Search..." />

            <CommandEmpty>
              No results found.
            </CommandEmpty>

            <ScrollArea className="h-64">
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option}
                    onSelect={() => toggleOption(option)}
                    className="cursor-pointer"
                  >
                    <div
                      className={`mr-3 flex h-4 w-4 items-center justify-center rounded border
                      ${
                        selected.includes(option)
                          ? "bg-primary border-primary text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {selected.includes(option) && (
                        <Check size={12} />
                      )}
                    </div>

                    {option}
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}