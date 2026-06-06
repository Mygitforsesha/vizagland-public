import { SectionLabel, FloatingSelect, BuyRentToggle } from './shared';
import { facingOptions, propertyGroups } from '../../lib/searchData';

const CARDINAL_FACINGS = ['East', 'West', 'North', 'South'];

export function FilterFormFields({
  search,
  showExtended = true,
}) {
  const {
    district,
    mandal,
    panchayati,
    listingType,
    propertyGroup,
    propertyType,
    priceRange,
    areaRange,
    areaUnit,
    propertyAge,
    facing,
    totalFloors,
    floorNumber,
    furnishing,
    areaMinInput,
    areaMaxInput,
    districtOptions,
    mandalOptions,
    panchayatOptions,
    availablePropertyTypes,
    availableAreaUnits,
    uniqueFloors,
    uniqueFloorNumbers,
    priceRanges,
    areaRangesByUnit,
    propertyAges,
    furnishingOptions,
    handleFilterChange,
    handlePropertyGroupChange,
    setDistrict,
    setMandal,
    setPanchayati,
    setListingPreference,
    setAreaMinInput,
    setAreaMaxInput,
    setPriceRange,
    setAreaRange,
    setCurrentPage,
    triggerLoading,
  } = search;

  const areaRangeOptions =
    areaRangesByUnit[areaUnit === 'All' ? 'sq.ft' : areaUnit] || areaRangesByUnit['sq.ft'];

  return (
    <div className="space-y-6">
      <div>
        <SectionLabel>Location Details</SectionLabel>
        <div className="space-y-4">
          <FloatingSelect
            label="District"
            value={district || 'All'}
            onChange={(v) => handleFilterChange(setDistrict, v)}
            options={districtOptions}
          />
          <FloatingSelect
            label="Mandal"
            value={mandal || 'All'}
            onChange={(v) => handleFilterChange(setMandal, v)}
            options={mandalOptions}
          />
          <FloatingSelect
            label="Panchayat"
            value={panchayati || 'All'}
            onChange={(v) => handleFilterChange(setPanchayati, v)}
            options={panchayatOptions}
          />
        </div>
      </div>

      <div>
        <SectionLabel>Listing Preference</SectionLabel>
        <BuyRentToggle
          value={listingType}
          onChange={setListingPreference}
        />
        <div className="mt-4">
          <FloatingSelect
            label="Property Group"
            value={propertyGroup}
            onChange={handlePropertyGroupChange}
            options={['All', ...Object.keys(propertyGroups)]}
          />
        </div>
      </div>

      <div>
        <SectionLabel
          trailing={
            areaMinInput || areaMaxInput ? (
              <span className="text-xs font-medium text-gray-500 normal-case tracking-normal">
                {areaMinInput || '0'} - {areaMaxInput || '5000+'}
              </span>
            ) : null
          }
        >
          Area Range (Sq. Yds)
        </SectionLabel>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <label htmlFor="area-min" className="absolute -top-2 left-3 px-1 text-[11px] font-medium text-gray-500 bg-white z-[1]">
              Min Area
            </label>
            <input
              id="area-min"
              type="number"
              min={0}
              value={areaMinInput}
              onChange={(e) => setAreaMinInput(e.target.value)}
              placeholder="100"
              className="w-full border border-gray-200 rounded-lg px-3 pt-3.5 pb-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              aria-label="Minimum area"
            />
          </div>
          <div className="relative">
            <label htmlFor="area-max" className="absolute -top-2 left-3 px-1 text-[11px] font-medium text-gray-500 bg-white z-[1]">
              Max Area
            </label>
            <input
              id="area-max"
              type="number"
              min={0}
              value={areaMaxInput}
              onChange={(e) => setAreaMaxInput(e.target.value)}
              placeholder="5000"
              className="w-full border border-gray-200 rounded-lg px-3 pt-3.5 pb-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              aria-label="Maximum area"
            />
          </div>
        </div>
      </div>

      {showExtended && (
        <>
          <div>
            <SectionLabel>Property Specifications</SectionLabel>
            <div className="space-y-4">
              <FloatingSelect
                label="Property Type"
                value={propertyType}
                onChange={(v) => handleFilterChange(search.setPropertyType, v)}
                options={availablePropertyTypes}
              />
              <div>
                <label className="text-[11px] font-semibold text-gray-500 block mb-1">Price Range</label>
                <select
                  value={priceRange}
                  onChange={(e) => {
                    setPriceRange(parseInt(e.target.value));
                    setCurrentPage(1);
                    triggerLoading();
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent bg-white cursor-pointer"
                  aria-label="Price range"
                >
                  {priceRanges.map((r, i) => (
                    <option key={i} value={i}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              <FloatingSelect
                label="Area Unit"
                value={areaUnit}
                onChange={(v) => {
                  setAreaRange(0);
                  handleFilterChange(search.setAreaUnit, v);
                }}
                options={availableAreaUnits}
              />

              <div>
                <label className="text-[11px] font-semibold text-gray-500 block mb-1">Area Range Preset</label>
                <select
                  value={areaRange}
                  onChange={(e) => {
                    setAreaRange(parseInt(e.target.value));
                    setCurrentPage(1);
                    triggerLoading();
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent bg-white cursor-pointer"
                  aria-label="Area range preset"
                >
                  {areaRangeOptions.map((r, i) => (
                    <option key={i} value={i}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              <FloatingSelect
                label="Property Age"
                value={propertyAge}
                onChange={(v) => handleFilterChange(search.setPropertyAge, v)}
                options={propertyAges}
              />

              <FloatingSelect
                label="Furnishing"
                value={furnishing}
                onChange={(v) => handleFilterChange(search.setFurnishing, v)}
                options={furnishingOptions}
              />

              <FloatingSelect
                label="Total Floors"
                value={totalFloors}
                onChange={(v) => handleFilterChange(search.setTotalFloors, v)}
                options={['All', ...uniqueFloors.map(String)]}
              />

              <FloatingSelect
                label="Floor Number"
                value={floorNumber}
                onChange={(v) => handleFilterChange(search.setFloorNumber, v)}
                options={['All', ...uniqueFloorNumbers.map(String)]}
              />
            </div>
          </div>

          <div>
            <SectionLabel>Facing</SectionLabel>
            <FacingCheckboxes
              selected={facing}
              onChange={(v) => handleFilterChange(search.setFacing, v)}
            />
          </div>
        </>
      )}
    </div>
  );
}

export function FacingCheckboxes({
  selected,
  onChange,
}) {
  const allOptions = facingOptions.filter((f) => f !== 'All');

  return (
    <div className="grid grid-cols-2 gap-2" role="group" aria-label="Property facing">
      {allOptions.map((dir) => {
        const checked = selected === dir;

        return (
          <label
            key={dir}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm transition-colors ${
              checked
                ? 'border-primary bg-primary/5 text-primary font-medium'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onChange(checked ? 'All' : dir)}
              className="rounded border-gray-300 text-primary focus:ring-accent"
              aria-label={`Facing ${dir}`}
            />
            {dir}
          </label>
        );
      })}
    </div>
  );
}

export function SidebarFacingCheckboxes({
  selected,
  onChange,
}) {
  return (
    <div className="grid grid-cols-2 gap-2" role="group" aria-label="Property facing">
      {CARDINAL_FACINGS.map((dir) => {
        const checked = selected === dir;

        return (
          <label
            key={dir}
            className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onChange(checked ? 'All' : dir)}
              className="rounded border-gray-300 text-primary focus:ring-accent"
              aria-label={`Facing ${dir}`}
            />
            {dir}
          </label>
        );
      })}
    </div>
  );
}