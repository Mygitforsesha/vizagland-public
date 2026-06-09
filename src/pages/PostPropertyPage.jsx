import { useState } from 'react';
import { Building, Phone, Send } from 'lucide-react';
import PropertySuccessModal from '../components/modals/PropertySuccessModal';
import PropertyLeadModal from '../components/modals/PropertyLeadModal';
import FormSection from '@/components/post-property/FormSection';
import FormTextField from '@/components/post-property/FormTextField';
import PropertyTypeSelectField from '@/components/post-property/PropertyTypeSelectField';
import SearchableSelectField from '@/components/post-property/SearchableSelectField';
import ImageUploadField from '@/components/post-property/ImageUploadField';
import DocumentUploadField from '@/components/post-property/DocumentUploadField';
import {
  formCheckboxClass,
  formCheckboxLabelClass,
  formContainerClass,
  formGrid2Class,
  formGrid4Class,
  formGridClass,
  formHelpLinkClass,
  formInnerCardClass,
  formPageClass,
  formPrimaryButtonClass,
} from '@/components/post-property/formStyles';

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

// const residentialTypes = [
//   ' Flats', ' Plot', ' House', 'Builder Floor Apartment',
//   'Villas', 'Group House', 'Individual House', 'Pent House', 'Studio Apartment',
// ];

// const commercialTypes = [
//   'Office', 'Commercial Space', 'Office in IT Park/SEZ', 'Shop', 'Showroom', 'Land',
//   'Warehouse/Godown', 'Industrial Land', 'Industrial Building', 'Industrial Shed',
//   'Factory', 'Lease', 'Rent',
// ];

// const developmentTypes = ['Open Plots', 'Gated Community', 'Township'];

// const layoutTypes = ['Approved Layout', 'Venture', 'Farm Plots'];

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

// const residentialOptions =
//   residentialTypes.map(x => ({ label: x, value: x }));

// const commercialOptions =
//   commercialTypes.map(x => ({ label: x, value: x }));

// const developmentOptions =
//   developmentTypes.map(x => ({ label: x, value: x }));

// const layoutOptions =
//   layoutTypes.map(x => ({ label: x, value: x }));

const residentialOptions = [
  { label: 'Flats', value: 'Flats', units: ['SFT'] },
  { label: 'Plot', value: 'Plot', units: ['Sq.Yards'] },
  { label: 'House', value: 'House', units: ['Sq.Yards'] },
  { label: 'Builder Floor Apartment', value: 'Builder Floor Apartment', units: ['SFT'] },
  { label: 'Villas', value: 'Villas', units: ['Sq.Yards', 'SFT'] },
  { label: 'Group House', value: 'Group House', units: ['SFT'] },
  { label: 'Individual House', value: 'Individual House', units: ['Sq.Yards'] },
  { label: 'Pent House', value: 'Pent House', units: ['SFT'] },
  { label: 'Studio Apartment', value: 'Studio Apartment', units: ['SFT'] },
  ];
  
  const commercialOptions = [
  { label: 'Office', value: 'Office', units: ['SFT'] },
  { label: 'Commercial Space', value: 'Commercial Space', units: ['SFT'] },
  { label: 'Office in IT Park/SEZ', value: 'Office in IT Park/SEZ', units: ['SFT'] },
  { label: 'Shop', value: 'Shop', units: ['SFT'] },
  { label: 'Showroom', value: 'Showroom', units: ['SFT'] },
  { label: 'Land', value: 'Land', units: ['Sq.Yards'] },
  { label: 'Warehouse/Godown', value: 'Warehouse/Godown', units: ['Sq.Yards'] },
  { label: 'Industrial Land', value: 'Industrial Land', units: ['Sq.Yards'] },
  { label: 'Industrial Building', value: 'Industrial Building', units: ['SFT'] },
  { label: 'Industrial Shed', value: 'Industrial Shed', units: ['SFT'] },
  { label: 'Factory', value: 'Factory', units: ['Acres', 'Cents'] },
  { label: 'Lease', value: 'Lease', units: ['SFT'] },
  { label: 'Rent', value: 'Rent', units: ['SFT'] },
  ];
  
  const developmentOptions = [
  { label: 'Open Plots', value: 'Open Plots', units: ['Acres', 'Cents'] },
  { label: 'Gated Community', value: 'Gated Community', units: ['Acres', 'Cents'] },
  { label: 'Township', value: 'Township', units: ['Acres', 'Cents'] },
  ];
  
  const layoutOptions = [
  { label: 'Approved Layout', value: 'Approved Layout', units: ['Acres', 'Cents'] },
  { label: 'Venture', value: 'Venture', units: ['Acres', 'Cents'] },
  { label: 'Farm Plots', value: 'Farm Plots', units: ['Acres', 'Cents'] },
  ];
  

const houseDevOptions =
  houseDevTypes.map(x => ({ label: x, value: x }));

const constructionOptions =
  constructionTypes.map(x => ({ label: x, value: x }));

const priceRangeOptions = priceRanges.map((x) => ({ label: x, value: x }));
const areaUnitOptions = areaUnits.map((x) => ({ label: x, value: x }));
const pricePerSqftOptions = ['Below 1000', '1000 - 3000', '3000 - 5000', '5000+'].map((x) => ({
  label: x,
  value: x,
}));
const propertyAgeOptions = ['New', '1-5 Years', '5-10 Years', '10+ Years'].map((x) => ({
  label: x,
  value: x,
}));
const facingSelectOptions = facingOptions.map((x) => ({ label: x, value: x }));
const totalFloorsOptions = Array.from({ length: 50 }, (_, i) => {
  const value = String(i + 1);
  return { label: value, value };
});
const floorNumberOptions = ['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor', '4+'].map((x) => ({
  label: x,
  value: x,
}));
const furnishingOptions = ['Furnished', 'Semi-Furnished', 'Unfurnished'].map((x) => ({
  label: x,
  value: x,
}));

const propertyUnderOptions = ['Government', 'Private'].map((x) => ({ label: x, value: x }));
const bedRoomsOptions = ['1', '2', '3'].map((x) => ({ label: x, value: x }));

const lpPlotOptions = Array.from({ length: 1000 }, (_, i) => {
  const value = String(i + 1);
  return { label: value, value };
});

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 101 }, (_, i) => {
  const value = String(currentYear - i);
  return { label: value, value };
});

export function PostPropertyPage() {
  const [approvedBy, setApprovedBy] = useState("");
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
  const [propertyUnder, setPropertyUnder] = useState('');
  const [lpNo, setLpNo] = useState('');
  const [plotNo, setPlotNo] = useState('');
  const [year, setYear] = useState('');
  const [bedRooms, setBedRooms] = useState('');
  const [propertyGroup, setPropertyGroup] = useState('Residential');
  const [selectedResidential, setSelectedResidential] = useState('');
  const [selectedCommercial, setSelectedCommercial] = useState('');
  const [selectedDevelopments, setSelectedDevelopments] = useState('');
  const [selectedLayout, setSelectedLayout] = useState('');
  const [selectedHouseDev, setSelectedHouseDev] = useState('');
  const [selectedConstruction, setSelectedConstruction] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [propertyImages, setPropertyImages] = useState([]);
  const [propertyDocuments, setPropertyDocuments] = useState([]);

  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  function toggleCheckbox(value, list, setter) {
    setter(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);
  }

  const selectedProperty =
residentialOptions.find(x => x.value === selectedResidential) ||
commercialOptions.find(x => x.value === selectedCommercial) ||
developmentOptions.find(x => x.value === selectedDevelopments) ||
layoutOptions.find(x => x.value === selectedLayout);

const dynamicAreaUnitOptions =
selectedProperty?.units?.map(unit => ({
label: unit,
value: unit,
})) || areaUnitOptions;


  function handleSubmit() {
    const formData = {
      approvedBy, village, nearbyLocation, customNearby, mandal, panchayati,
      gvmc, vmrda, regArea, gvmcVmrda, priceValue, priceRange, areaValue,
      areaUnit, pricePerSqft, propertyAge, facing, totalFloors, floorNumber,
      furnishing, propertyUnder, lpNo, plotNo, year, bedRooms,
      propertyGroup, selectedResidential, selectedCommercial,
      selectedDevelopments, selectedLayout, selectedHouseDev, selectedConstruction,
      selectedServices, propertyImages, propertyDocuments,
    };
    console.log('Property submitted:', formData);
    alert('Property submitted successfully!');
  }

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

      <section className={formPageClass}>
        <div className={formContainerClass}>

          <FormSection title="Property Approved By">
            <div className={formGridClass}>
              <PropertyTypeSelectField
                label="Approval Authority"
                placeholder="Select Approval Type"
                value={approvedBy}
                onValueChange={setApprovedBy}
                options={approvalOptions.map((option) => ({
                  label: option,
                  value: option,
                }))}
              />
            </div>
          </FormSection>

          <FormSection title="Village Details">
            <div className={formGridClass}>
              <FormTextField
                label="Village"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                placeholder="Enter village name"
              />
              <PropertyTypeSelectField
                label="Nearby Location / Landmark"
                placeholder="Select Nearby Location"
                value={nearbyLocation}
                onValueChange={setNearbyLocation}
                options={nearbyLocations.map((loc) => ({ label: loc, value: loc }))}
              />
              <FormTextField
                label="Add Nearby Location"
                value={customNearby}
                onChange={(e) => setCustomNearby(e.target.value)}
                placeholder="Enter nearby location"
              />
              <FormTextField
                label="District"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="Enter district"
              />
              <FormTextField
                label="Mandal"
                value={mandal}
                onChange={(e) => setMandal(e.target.value)}
                placeholder="Enter mandal"
              />
              <FormTextField
                label="Panchayati / sachivalayam"
                value={panchayati}
                onChange={(e) => setPanchayati(e.target.value)}
                placeholder="Enter panchayati"
              />
              <FormTextField
                label="GVMC Zone, Ward Number"
                value={gvmc}
                onChange={(e) => setGvmc(e.target.value)}
                placeholder="Enter GVMC zone / ward"
              />
              <FormTextField
                label="VMRDA"
                value={vmrda}
                onChange={(e) => setVmrda(e.target.value)}
                placeholder="Enter VMRDA"
              />
              <FormTextField
                label="Register office location"
                value={regArea}
                onChange={(e) => setRegArea(e.target.value)}
                placeholder="Enter register office"
              />
              <FormTextField
                label="GVMC / VMRDA"
                value={gvmcVmrda}
                onChange={(e) => setGvmcVmrda(e.target.value)}
                placeholder="Enter GVMC / VMRDA"
              />
            </div>
          </FormSection>

          <FormSection title="Property Group & Types">
            <div className={formGrid2Class}>
                <PropertyTypeSelectField
                  label="Select Residential Types"
                  placeholder="Select Residential Type"
                  value={selectedResidential}
                  onValueChange={setSelectedResidential}
                  options={residentialOptions}
                />

                <PropertyTypeSelectField
                  label="Commercial Types"
                  placeholder="Select Commercial Type"
                  value={selectedCommercial}
                  onValueChange={setSelectedCommercial}
                  options={commercialOptions}
                />

                <PropertyTypeSelectField
                  label="Developments"
                  placeholder="Select Development"
                  value={selectedDevelopments}
                  onValueChange={setSelectedDevelopments}
                  options={developmentOptions}
                />

                <PropertyTypeSelectField
                  label="Layout Developers"
                  placeholder="Select Layout Developer"
                  value={selectedLayout}
                  onValueChange={setSelectedLayout}
                  options={layoutOptions}
                />

                <PropertyTypeSelectField
                  label="House/Villas Developers"
                  placeholder="Select House/Villas Developer"
                  value={selectedHouseDev}
                  onValueChange={setSelectedHouseDev}
                  options={houseDevOptions}
                />

                <PropertyTypeSelectField
                  label="Construction Types"
                  placeholder="Select Construction Type"
                  value={selectedConstruction}
                  onValueChange={setSelectedConstruction}
                  options={constructionOptions}
                />
            </div>
          </FormSection>

          <FormSection title="Property Details">
            <div className={formGrid4Class}>
              <FormTextField
                label="Price (value)"
                type="number"
                value={priceValue}
                onChange={(e) => setPriceValue(e.target.value)}
                placeholder="Enter value"
              />
                <PropertyTypeSelectField
                  label="Price Range"
                  placeholder="Select Price"
                  value={priceRange}
                  onValueChange={setPriceRange}
                  options={priceRangeOptions}
                />
              <FormTextField
                label="Area"
                type="number"
                value={areaValue}
                onChange={(e) => setAreaValue(e.target.value)}
                placeholder="Enter area"
              />
                <PropertyTypeSelectField
                  label="Area Unit"
                  placeholder="Select Unit"
                  value={areaUnit}
                  onValueChange={setAreaUnit}
                  options={dynamicAreaUnitOptions}
                />
                <PropertyTypeSelectField
                  label="Price per Sq Ft"
                  placeholder="Select"
                  value={pricePerSqft}
                  onValueChange={setPricePerSqft}
                  options={pricePerSqftOptions}
                />
                <PropertyTypeSelectField
                  label="Property Age"
                  placeholder="Select"
                  value={propertyAge}
                  onValueChange={setPropertyAge}
                  options={propertyAgeOptions}
                />
                <PropertyTypeSelectField
                  label="Facing"
                  placeholder="Select"
                  value={facing}
                  onValueChange={setFacing}
                  options={facingSelectOptions}
                />
                <PropertyTypeSelectField
                  label="Total Floors"
                  placeholder="Select"
                  value={totalFloors}
                  onValueChange={setTotalFloors}
                  options={totalFloorsOptions}
                />
                <PropertyTypeSelectField
                  label="Floor Number"
                  placeholder="Select"
                  value={floorNumber}
                  onValueChange={setFloorNumber}
                  options={floorNumberOptions}
                />
                <PropertyTypeSelectField
                  label="Furnishing"
                  placeholder="Select"
                  value={furnishing}
                  onValueChange={setFurnishing}
                  options={furnishingOptions}
                />
                <PropertyTypeSelectField
                  label="Property Under"
                  placeholder="Select"
                  value={propertyUnder}
                  onValueChange={setPropertyUnder}
                  options={propertyUnderOptions}
                />
                <SearchableSelectField
                  label="LP No."
                  placeholder="Select LP No."
                  searchPlaceholder="Search LP No..."
                  value={lpNo}
                  onValueChange={setLpNo}
                  options={lpPlotOptions}
                />
                <SearchableSelectField
                  label="Plot No."
                  placeholder="Select Plot No."
                  searchPlaceholder="Search Plot No..."
                  value={plotNo}
                  onValueChange={setPlotNo}
                  options={lpPlotOptions}
                />
                <SearchableSelectField
                  label="Year"
                  placeholder="Select Year"
                  searchPlaceholder="Search Year..."
                  value={year}
                  onValueChange={setYear}
                  options={yearOptions}
                />
                <PropertyTypeSelectField
                  label="Bed Rooms"
                  placeholder="Select"
                  value={bedRooms}
                  onValueChange={setBedRooms}
                  options={bedRoomsOptions}
                />
            </div>
          </FormSection>

          <FormSection title="Other Services">
            <div className={formGrid4Class}>
              {otherServices.map((svc) => (
                <label key={svc} className={formCheckboxLabelClass}>
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(svc)}
                    onChange={() => toggleCheckbox(svc, selectedServices, setSelectedServices)}
                    className={formCheckboxClass}
                  />
                  {svc}
                </label>
              ))}
            </div>
          </FormSection>

          <FormSection title="Media & Documents">
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-6">
              <div className={formInnerCardClass}>
                <ImageUploadField
                  label="Property Images"
                  description="Drag and drop property photos here, or click to browse"
                  value={propertyImages}
                  onChange={setPropertyImages}
                />
              </div>
              <div className={formInnerCardClass}>
                <DocumentUploadField
                  label="Property Documents"
                  description="Drag and drop deeds, approvals, or plans here"
                  value={propertyDocuments}
                  onChange={setPropertyDocuments}
                />
              </div>
            </div>
          </FormSection>

          <div className="flex justify-center sm:justify-end">
            <button type="button" onClick={() => setShowLeadModal(true)} className={formPrimaryButtonClass}>
              <Send size={16} aria-hidden /> Submit Property
            </button>
          </div>
        </div>
      </section>

      {/* Sticky Help */}
      <a href="tel:9030002266" className={formHelpLinkClass}>
        <Phone size={14} className="sm:size-4" aria-hidden />
        <span className="hidden sm:inline">Need Help?</span> 9030002266
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
            propertyUnder,
            lpNo,
            plotNo,
            year,
            bedRooms,
            propertyGroup,
            selectedResidential,
            selectedCommercial,
            selectedDevelopments,
            selectedLayout,
            selectedHouseDev,
            selectedConstruction,
            selectedServices,
            propertyImages,
            propertyDocuments,
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
