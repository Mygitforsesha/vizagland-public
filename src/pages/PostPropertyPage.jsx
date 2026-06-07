import { useState } from 'react';
import { Building, MapPin, Phone, Send } from 'lucide-react';
import PropertySuccessModal from '../components/modals/PropertySuccessModal';
import PropertyLeadModal from '../components/modals/PropertyLeadModal';
import PropertyGroupSelector from '@/components/post-property/PropertyGroupSelector';
import { MultiSelect } from "react-multi-select-component";
import { X } from "lucide-react";
import MultiSelectField from '@/components/post-property/MultiSelectField';

const approvalOptions = ["Don't know", 'Panchayati', 'GVMC', 'VMRDA', 'DTCP', 'RERA', 'Un Approved'];

const nearbyLocations = ['Bus Stand', 'Railway Station', 'Highway', 'School', 'Hospital', 'Market'];

const priceRanges = [
  'Below 5 Lakhs', '6 - 10 Lakhs', '11 - 15 Lakhs', '16 - 20 Lakhs', '21 - 25 Lakhs',
  '26 - 30 Lakhs', '31 - 35 Lakhs', '36 - 40 Lakhs', '41 - 45 Lakhs', '46 - 50 Lakhs',
  '51 - 55 Lakhs', '56 - 60 Lakhs', '61 - 65 Lakhs', '66 - 70 Lakhs', '71 - 75 Lakhs',
  '76 - 80 Lakhs', '81 - 85 Lakhs', '86 - 90 Lakhs', '91 - 95 Lakhs', '96 Lakhs - 1 Crore',
  '1 - 1.5 Crore', '1.5 - 2 Crore', '2 - 2.5 Crore', '2.5 - 3 Crore', '3 - 3.5 Crore',
  '3.5 - 4 Crore', '4 - 4.5 Crore', '4.5 - 5 Crore & above',
];

const areaUnits = ['Sq.Ft', 'Sq.Yds', 'Sq.Mts', 'Acres', 'Cents', 'Grounds', 'Gunthas', 'Hectare'];

const facingOptions = ['East', 'West', 'North', 'South', 'North-East', 'North-West', 'South-East', 'South-West'];

const residentialTypes = [
  ' Flats', ' Plot', ' House', 'Builder Floor Apartment',
  'Villas', 'Group House', 'Individual House', 'Pent House', 'Studio Apartment',
];

const commercialTypes = [
  'Office', 'Commercial Space', 'Office in IT Park/SEZ', 'Shop', 'Showroom', 'Land',
  'Warehouse/Godown', 'Industrial Land', 'Industrial Building', 'Industrial Shed',
  'Factory', 'Lease', 'Rent',
];

const developmentTypes = ['Open Plots', 'Gated Community', 'Township'];

const layoutTypes = ['Approved Layout', 'Venture', 'Farm Plots'];

const houseDevTypes = ['Ready to Move', 'Under Construction', 'Pre Launch'];

const constructionTypes = [
  'Individual House', 'Group House', 'Apartments', 'Highrise Apartments', 'Villas',
  'Warehouse', 'Factories', 'Compound Walls', 'Layout Civil Works', 'Roads', 'Parks',
  'Electricity', 'Drainage', 'Interior Design',
];

const otherServices = [
  'Documentation', 'Encumbrance Certificate (EC)', 'Market Value', 'Sale Deed',
  'Link Document', 'GPA Document', 'Veelunama Document', 'FMB', 'LPM',
  'Village Map', 'Adangal', '1B',
];

const residentialOptions =
  residentialTypes.map(x => ({ label: x, value: x }));

const commercialOptions =
  commercialTypes.map(x => ({ label: x, value: x }));

const developmentOptions =
  developmentTypes.map(x => ({ label: x, value: x }));

const layoutOptions =
  layoutTypes.map(x => ({ label: x, value: x }));

const houseDevOptions =
  houseDevTypes.map(x => ({ label: x, value: x }));

const constructionOptions =
  constructionTypes.map(x => ({ label: x, value: x }));

export function PostPropertyPage() {
  const [approvedBy, setApprovedBy] = useState([]);
  const [village, setVillage] = useState('');
  const [nearbyLocation, setNearbyLocation] = useState('');
  const [customNearby, setCustomNearby] = useState('');
  const [district, setDistrict] = useState('');
  const [mandal, setMandal] = useState('');
  const [panchayati, setPanchayati] = useState('');
  const [gvmc, setGvmc] = useState('');
  const [vmrda, setVmrda] = useState('');
  const [regArea, setRegArea] = useState('');
  const [gvmcVmrda, setGvmcVmrda] = useState('');
  const [priceValue, setPriceValue] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [areaValue, setAreaValue] = useState('');
  const [areaUnit, setAreaUnit] = useState('');
  const [pricePerSqft, setPricePerSqft] = useState('');
  const [propertyAge, setPropertyAge] = useState('');
  const [facing, setFacing] = useState('');
  const [totalFloors, setTotalFloors] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [furnishing, setFurnishing] = useState('');
  const [propertyGroup, setPropertyGroup] = useState('Residential');
  const [selectedResidential, setSelectedResidential] = useState([]);
  const [selectedCommercial, setSelectedCommercial] = useState([]);
  const [selectedDevelopments, setSelectedDevelopments] = useState([]);
  const [selectedLayout, setSelectedLayout] = useState([]);
  const [selectedHouseDev, setSelectedHouseDev] = useState([]);
  const [selectedConstruction, setSelectedConstruction] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  function toggleCheckbox(value, list, setter) {
    setter(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);
  }

  function handleSubmit() {
    const formData = {
      approvedBy, village, nearbyLocation, customNearby, mandal, panchayati,
      gvmc, vmrda, regArea, gvmcVmrda, priceValue, priceRange, areaValue,
      areaUnit, pricePerSqft, propertyAge, facing, totalFloors, floorNumber,
      furnishing, propertyGroup, selectedResidential, selectedCommercial,
      selectedDevelopments, selectedLayout, selectedHouseDev, selectedConstruction,
      selectedServices,
    };
    console.log('Property submitted:', formData);
    alert('Property submitted successfully!');
  }

  const chipRenderer = (selected, onChange) => {
    if (!selected.length) return "Select...";

    return (
      <div className="flex flex-wrap gap-2 py-1">
        {selected.map((item) => (
          <div
            key={item.value}
            className="inline-flex items-center gap-1 rounded-full bg-accent-light text-accent px-3 py-1 text-xs font-semibold"
          >
            <span>{item.label}</span>

            <button
              type="button"
              className="ml-1 rounded-full hover:bg-accent/10 p-0.5"
              onClick={(e) => {
                e.stopPropagation();

                setSelectedResidential(
                  selectedResidential.filter(
                    (selectedItem) => selectedItem.value !== item.value
                  )
                );
              }}
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Page Header */}
      <div className="bg-primary py-5">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-white text-xl font-bold m-0 flex items-center gap-2">
            <Building size={20} /> Post Property
          </h2>
          <p className="text-blue-200 text-[13px] mt-1 mb-0">List your property across Visakhapatnam GVMC &amp; VMRDA area</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-2.5">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-[12px] text-gray-500">
            <a href="/" className="text-gray-500 no-underline hover:text-accent">Home</a>
            <span className="mx-1.5">/</span>
            <span className="text-gray-800 font-medium">Post Property</span>
          </nav>
        </div>
      </div>

      <section className="py-8 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">

          {/* Property Approved By */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-6">
            <div className="bg-primary text-white text-sm font-bold px-5 py-3">Property Approved By</div>
            <div className="p-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {approvalOptions.map(opt => (
                  <label key={opt} className="flex items-center gap-2 text-[13px] text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={approvedBy.includes(opt)}
                      onChange={() => toggleCheckbox(opt, approvedBy, setApprovedBy)}
                      className="w-4 h-4 rounded border-gray-300 text-primary accent-primary"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Village Details */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
            <div className="bg-gray-700 text-white text-sm font-bold px-5 py-3 flex items-center gap-2">
              <MapPin size={15} /> Village Details
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[12px] font-semibold text-gray-600 block mb-1">Village</label>
                  <input type="text" value={village} onChange={e => setVillage(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-accent" placeholder="Enter village name" />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-gray-600 block mb-1">Nearby Location / Landmark</label>
                  <select value={nearbyLocation} onChange={e => setNearbyLocation(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-accent">
                    <option value="">Select Nearby Location</option>
                    {nearbyLocations.map(loc => <option key={loc}>{loc}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-gray-600 block mb-1">Add Nearby Location</label>
                  <input type="text" value={customNearby} onChange={e => setCustomNearby(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-accent" placeholder="Enter nearby location" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[12px] font-semibold text-gray-600 block mb-1">District</label>
                  <input type="text" value={district} onChange={e => setDistrict(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-gray-600 block mb-1">Mandal</label>
                  <input type="text" value={mandal} onChange={e => setMandal(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-gray-600 block mb-1">Panchayati</label>
                  <input type="text" value={panchayati} onChange={e => setPanchayati(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-gray-600 block mb-1">GVMC Zone, Ward Number</label>
                  <input type="text" value={gvmc} onChange={e => setGvmc(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-accent" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[12px] font-semibold text-gray-600 block mb-1">VMRDA</label>
                  <input type="text" value={vmrda} onChange={e => setVmrda(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-gray-600 block mb-1">Registration Area</label>
                  <input type="text" value={regArea} onChange={e => setRegArea(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-gray-600 block mb-1">GVMC / VMRDA</label>
                  <input type="text" value={gvmcVmrda} onChange={e => setGvmcVmrda(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-accent" />
                </div>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
            <div className="bg-gray-700 text-white text-sm font-bold px-5 py-3">Property Details</div>
            <div className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-[12px] font-semibold text-gray-600 block mb-1">Price (value)</label>
                  <input type="number" value={priceValue} onChange={e => setPriceValue(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-accent" placeholder="Enter value" />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-gray-600 block mb-1">Price Range</label>
                  <select value={priceRange} onChange={e => setPriceRange(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-accent">
                    <option value="">Select Price</option>
                    {priceRanges.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-gray-600 block mb-1">Area</label>
                  <input type="number" value={areaValue} onChange={e => setAreaValue(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-accent" placeholder="Enter area" />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-gray-600 block mb-1">Area Unit</label>
                  <select value={areaUnit} onChange={e => setAreaUnit(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-accent">
                    <option value="">Select Unit</option>
                    {areaUnits.map(u => <option key={u}>{u}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-gray-600 block mb-1">Price per Sq Ft</label>
                  <select value={pricePerSqft} onChange={e => setPricePerSqft(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-accent">
                    <option value="">Select</option>
                    <option>Below 1000</option>
                    <option>1000 - 3000</option>
                    <option>3000 - 5000</option>
                    <option>5000+</option>
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-gray-600 block mb-1">Property Age</label>
                  <select value={propertyAge} onChange={e => setPropertyAge(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-accent">
                    <option value="">Select</option>
                    <option>New</option>
                    <option>1-5 Years</option>
                    <option>5-10 Years</option>
                    <option>10+ Years</option>
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-gray-600 block mb-1">Facing</label>
                  <select value={facing} onChange={e => setFacing(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-accent">
                    <option value="">Select</option>
                    {facingOptions.map(f => <option key={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-gray-600 block mb-1">Total Floors</label>
                  <select value={totalFloors} onChange={e => setTotalFloors(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-accent">
                    <option value="">Select</option>
                    {Array.from({ length: 50 }, (_, i) => <option key={i + 1}>{i + 1}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-gray-600 block mb-1">Floor Number</label>
                  <select value={floorNumber} onChange={e => setFloorNumber(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-accent">
                    <option value="">Select</option>
                    <option>Ground Floor</option>
                    <option>1st Floor</option>
                    <option>2nd Floor</option>
                    <option>3rd Floor</option>
                    <option>4+</option>
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-gray-600 block mb-1">Furnishing</label>
                  <select value={furnishing} onChange={e => setFurnishing(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-accent">
                    <option value="">Select</option>
                    <option>Furnished</option>
                    <option>Semi-Furnished</option>
                    <option>Unfurnished</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Property Group & Types */}
          {/* <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
            <div className="bg-gray-900 text-white text-sm font-bold px-5 py-3">Property Group & Types</div>
            <div className="p-5 space-y-6">
              <div>
                <label className="text-[12px] font-semibold text-gray-600 block mb-1">Property Group</label>
                <select value={propertyGroup} onChange={e => setPropertyGroup(e.target.value)} className="w-full max-w-xs border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-accent">
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Agricultural</option>
                  <option>Industrial</option>
                  <option>Developments</option>
                  <option>Layout Developers</option>
                  <option>House / Villas / Apartment Developers</option>
                </select>
              </div>

              <CheckboxGroup title="Residential Types" items={residentialTypes} selected={selectedResidential} onToggle={(v) => toggleCheckbox(v, selectedResidential, setSelectedResidential)} />
              <CheckboxGroup title="Commercial Types" items={commercialTypes} selected={selectedCommercial} onToggle={(v) => toggleCheckbox(v, selectedCommercial, setSelectedCommercial)} />
              <CheckboxGroup title="Developments" items={developmentTypes} selected={selectedDevelopments} onToggle={(v) => toggleCheckbox(v, selectedDevelopments, setSelectedDevelopments)} />
              <CheckboxGroup title="Layout Developers" items={layoutTypes} selected={selectedLayout} onToggle={(v) => toggleCheckbox(v, selectedLayout, setSelectedLayout)} />
              <CheckboxGroup title="House / Villas / Apartment Developers" items={houseDevTypes} selected={selectedHouseDev} onToggle={(v) => toggleCheckbox(v, selectedHouseDev, setSelectedHouseDev)} />
              <CheckboxGroup title="Construction Types" items={constructionTypes} selected={selectedConstruction} onToggle={(v) => toggleCheckbox(v, selectedConstruction, setSelectedConstruction)} />
            </div>
          </div> */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">

            <div className="bg-primary px-5 py-5">
              <h3 className="text-white text-lg font-bold">
                Property Group & Types
              </h3>
            </div>

          <div className="p-4 sm:p-5 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
           

              
              <MultiSelectField
                label="Select Residential Types"
                options={residentialOptions}
                value={selectedResidential}
                onChange={setSelectedResidential}
              />

          

              <MultiSelectField
                label="Commercial Types"
                options={commercialOptions}
                value={selectedCommercial}
                onChange={setSelectedCommercial}
              />

              <MultiSelectField
                label="Developments"
                options={developmentOptions}
                value={selectedDevelopments}
                onChange={setSelectedDevelopments}
              />

              <MultiSelectField
                label="Layout Developers"
                options={layoutOptions}
                value={selectedLayout}
                onChange={setSelectedLayout}
              />

              <MultiSelectField
                label="House/Villas Developers"
                options={houseDevOptions}
                value={selectedHouseDev}
                onChange={setSelectedHouseDev}
              />

              <MultiSelectField
                label="Construction Types"
                options={constructionOptions}
                value={selectedConstruction}
                onChange={setSelectedConstruction}
              />

            </div>

          </div>

          {/* Other Services */}
          <div className="bg-white border border-gray-200 rounded-xl mb-6">
            <div className="bg-gray-700 text-white text-sm font-bold px-5 py-3">Other Services</div>
            <div className="p-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {otherServices.map(svc => (
                  <label key={svc} className="flex items-center gap-2 text-[13px] text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(svc)}
                      onChange={() => toggleCheckbox(svc, selectedServices, setSelectedServices)}
                      className="w-4 h-4 rounded border-gray-300 text-primary accent-primary"
                    />
                    {svc}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center sm:justify-end">
            <button onClick={() => setShowLeadModal(true)} className="w-full sm:w-auto bg-primary text-white text-sm font-semibold px-8 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors shadow-md">
              <Send size={16} /> Submit Property
            </button>
          </div>
        </div>
      </section>

      {/* Sticky Help */}
      <a href="tel:9030002266" className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 bg-accent text-white font-semibold px-3 sm:px-4 py-2.5 sm:py-3 rounded-full shadow-lg hover:bg-accent-hover transition-colors flex items-center gap-2 text-[12px] sm:text-sm no-underline">
        <Phone size={14} className="sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Need Help?</span> 9030002266
      </a>



      <PropertyLeadModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        onSubmit={(userDetails) => {

          const formData = {
            approvedBy,
            village,
            nearbyLocation,
            customNearby,
            district,
            mandal,
            panchayati,
            gvmc,
            vmrda,
            regArea,
            gvmcVmrda,
            priceValue,
            priceRange,
            areaValue,
            areaUnit,
            pricePerSqft,
            propertyAge,
            facing,
            totalFloors,
            floorNumber,
            furnishing,
            propertyGroup,
            selectedResidential,
            selectedCommercial,
            selectedDevelopments,
            selectedLayout,
            selectedHouseDev,
            selectedConstruction,
            selectedServices,
            userDetails,
          };

          console.log(formData);

          setShowLeadModal(false);
          setShowSuccessModal(true);
        }}
      />

      <PropertySuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          window.location.href = "/";
        }}
      />
    </>
  );
}

function CheckboxGroup({ title, items, selected, onToggle }) {
  return (
    <div className="border-t border-gray-100 pt-4">
      <h4 className="text-[13px] font-bold text-gray-800 mb-3">{title}</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {items.map(item => (
          <label key={item} className="flex items-center gap-2 text-[13px] text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes(item)}
              onChange={() => onToggle(item)}
              className="w-4 h-4 rounded border-gray-300 text-primary accent-primary"
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}
