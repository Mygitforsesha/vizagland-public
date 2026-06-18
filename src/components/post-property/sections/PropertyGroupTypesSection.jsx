import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import FormSection from '@/components/post-property/FormSection';
import PropertyTypeSelectField from '@/components/post-property/PropertyTypeSelectField';
import { formGrid2Class } from '@/components/post-property/formStyles';
import {
  commercialTypeOptions,
  constructionTypeOptions,
  developmentTypeOptions,
  layoutTypeOptions,
  propertyStatusOptions,
  residentialTypeOptions,
} from '@/lib/post-property/formOptions';

const springTransition = {
  type: 'spring',
  stiffness: 250,
  damping: 24,
};

const CATEGORY_FIELDS = [
  { stateKey: 'selectedResidential', chipLabel: 'Residential', options: residentialTypeOptions },
  { stateKey: 'selectedCommercial', chipLabel: 'Commercial', options: commercialTypeOptions },
  { stateKey: 'selectedDevelopments', chipLabel: 'Developments', options: developmentTypeOptions },
  { stateKey: 'selectedLayout', chipLabel: 'Layout', options: layoutTypeOptions },
  { stateKey: 'selectedHouseDev', chipLabel: 'House/Villas', options: propertyStatusOptions },
  { stateKey: 'selectedConstruction', chipLabel: 'Construction', options: constructionTypeOptions },
];

function getOptionLabel(options, value) {
  if (!value) return null;
  const match = options.find((option) => option.value === value);
  return match?.label ?? value;
}

function buildSelectedChips(formState) {
  return CATEGORY_FIELDS.map(({ stateKey, chipLabel, options }) => {
    const displayValue = getOptionLabel(options, formState[stateKey]);
    if (!displayValue) return null;
    return { id: stateKey, text: `${chipLabel}: ${displayValue}` };
  }).filter(Boolean);
}

export default function PropertyGroupTypesSection({ formState, updateField }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedChips = useMemo(() => buildSelectedChips(formState), [formState]);

  return (
    <FormSection title="Property Group & Types">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition-colors hover:bg-surface/60 sm:px-5 sm:py-5"
        >
          <div className="min-w-0">
            <span className="block text-sm font-bold text-primary sm:text-[15px]">
              Select Property Categories
            </span>
            <span className="mt-0.5 block text-xs text-gray-500">
              {isOpen ? 'Tap to collapse category filters' : 'Tap to choose residential, commercial and more'}
            </span>
          </div>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={springTransition}
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-primary shadow-sm"
          >
            <ChevronDown size={18} aria-hidden />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {!isOpen && selectedChips.length > 0 && (
            <motion.div
              key="chips"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={springTransition}
              className="overflow-hidden border-t border-gray-100"
            >
              <div className="flex flex-wrap gap-2 px-4 pb-4 pt-3 sm:px-5">
                {selectedChips.map((chip) => (
                  <span
                    key={chip.id}
                    className="inline-flex max-w-full items-center rounded-full border border-primary/10 bg-primary/[0.04] px-3 py-1.5 text-[11px] font-semibold leading-snug text-primary sm:text-xs"
                  >
                    <span className="truncate">{chip.text}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={springTransition}
              className="overflow-hidden border-t border-gray-100"
            >
              <div className="px-4 py-4 sm:p-5 sm:pt-5">
                <div className={formGrid2Class}>
                  <PropertyTypeSelectField
                    label="Select Residential Types"
                    placeholder="Select Residential Type"
                    value={formState.selectedResidential}
                    onValueChange={(value) => updateField('selectedResidential', value)}
                    options={residentialTypeOptions}
                  />
                  <PropertyTypeSelectField
                    label="Commercial Types"
                    placeholder="Select Commercial Type"
                    value={formState.selectedCommercial}
                    onValueChange={(value) => updateField('selectedCommercial', value)}
                    options={commercialTypeOptions}
                  />
                  <PropertyTypeSelectField
                    label="Developments"
                    placeholder="Select Development"
                    value={formState.selectedDevelopments}
                    onValueChange={(value) => updateField('selectedDevelopments', value)}
                    options={developmentTypeOptions}
                  />
                  <PropertyTypeSelectField
                    label="Layout Developers"
                    placeholder="Select Layout Developer"
                    value={formState.selectedLayout}
                    onValueChange={(value) => updateField('selectedLayout', value)}
                    options={layoutTypeOptions}
                  />
                  <PropertyTypeSelectField
                    label="House/Villas Developers"
                    placeholder="Select House/Villas Developer"
                    value={formState.selectedHouseDev}
                    onValueChange={(value) => updateField('selectedHouseDev', value)}
                    options={propertyStatusOptions}
                  />
                  <PropertyTypeSelectField
                    label="Construction Types"
                    placeholder="Select Construction Type"
                    value={formState.selectedConstruction}
                    onValueChange={(value) => updateField('selectedConstruction', value)}
                    options={constructionTypeOptions}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FormSection>
  );
}
