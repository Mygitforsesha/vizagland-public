

export const villages = [
  { name: 'Vizag', nearby: 'Beach Road', mandal: 'Visakhapatnam Urban', panchayat: 'N/A', gvmc: 'Yes', vmrda: 'Yes', registration: 'Vizag Urban', gvmcvmrda: 'Both' },
  { name: 'Visakhapatnam', nearby: 'Beach Road', mandal: 'Urban', panchayat: 'N/A', gvmc: 'Yes', vmrda: 'Yes', registration: 'Vizag', gvmcvmrda: 'GVMC' },
  { name: 'Anandapuram', nearby: 'Highway', mandal: 'Anandapuram', panchayat: 'Anandapuram GP', gvmc: 'No', vmrda: 'Yes', registration: 'Anandapuram', gvmcvmrda: 'VMRDA' },
  { name: 'Gajuwaka', nearby: 'Industrial Area', mandal: 'Gajuwaka', panchayat: 'N/A', gvmc: 'Yes', vmrda: 'Yes', registration: 'Gajuwaka', gvmcvmrda: 'Both' },
  { name: 'Bheemunipatnam', nearby: 'Beach Road', mandal: 'Bheemunipatnam', panchayat: 'Bheemunipatnam TP', gvmc: 'No', vmrda: 'Yes', registration: 'Bheemunipatnam', gvmcvmrda: 'VMRDA' },
  { name: 'Narsipatnam', nearby: 'Highway', mandal: 'Narsipatnam', panchayat: 'Narsipatnam Town', gvmc: 'No', vmrda: 'No', registration: 'Narsipatnam', gvmcvmrda: 'Panchayati' },
  { name: 'Amaravathi', nearby: 'State Capital', mandal: 'Thullur', panchayat: 'N/A', gvmc: 'No', vmrda: 'No', registration: 'Amaravathi', gvmcvmrda: 'CRDA' },
  { name: 'Vijayawada', nearby: 'City Center', mandal: 'Urban', panchayat: 'N/A', gvmc: 'No', vmrda: 'No', registration: 'Vijayawada Urban', gvmcvmrda: 'VDA' },
  { name: 'Guntur', nearby: 'City Center', mandal: 'Urban', panchayat: 'N/A', gvmc: 'No', vmrda: 'No', registration: 'Guntur Urban', gvmcvmrda: 'GMADA' },
  { name: 'Tirupati', nearby: 'Railway Station', mandal: 'Urban', panchayat: 'N/A', gvmc: 'No', vmrda: 'No', registration: 'Tirupati Urban', gvmcvmrda: 'TUDA' },
  { name: 'Nellore', nearby: 'City Center', mandal: 'Urban', panchayat: 'N/A', gvmc: 'No', vmrda: 'No', registration: 'Nellore Urban', gvmcvmrda: 'NUDA' },
  { name: 'Kurnool', nearby: 'City Center', mandal: 'Urban', panchayat: 'N/A', gvmc: 'No', vmrda: 'No', registration: 'Kurnool Urban', gvmcvmrda: 'KDA' },
];

export const properties = [
  // BUY properties
  {
    id: 'VZL-1001', title: '3 BHK Premium Apartment in Madhurawada', price: '₹1.25 Cr', location: 'Madhurawada', city: 'Visakhapatnam', type: 'Residential Flats', category: 'Buy', beds: 3, baths: 3, area: '1,850 sq.ft', image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600', rera_id: 'APRERA/VSP/2024/001', featured: true, verified: true, tag: 'Premium', sqft: 1850, balcony: 2, parking: 2, createdAt: '2026-05-15', priceNumeric: 12500000
  },
  {
    id: 'VZL-1002', title: 'Luxury 4 BHK Villa with Garden in Rushikonda', price: '₹3.80 Cr', location: 'Rushikonda', city: 'Visakhapatnam', type: 'Villas', category: 'Buy', beds: 4, baths: 4, area: '3,500 sq.ft', image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600', rera_id: 'APRERA/VSP/2024/002', featured: true, verified: true, tag: 'Luxury', sqft: 3500, parking: 2, garden: true, createdAt: '2026-05-14', priceNumeric: 38000000
  },
  {
    id: 'VZL-1003', title: '2 BHK Apartment near Beach Road', price: '₹68 Lakh', location: 'Beach Road', city: 'Visakhapatnam', type: 'Residential Flats', category: 'Buy', beds: 2, baths: 2, area: '1,200 sq.ft', image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600', rera_id: 'APRERA/VSP/2024/003', featured: true, verified: true, tag: 'Hot Deal', sqft: 1200, balcony: 1, parking: 1, createdAt: '2026-05-12', priceNumeric: 6800000
  },
  {
    id: 'VZL-1004', title: 'VMRDA Approved Plot in Anandapuram', price: '₹42 Lakh', location: 'Anandapuram', city: 'Visakhapatnam', type: 'Residential Plot', category: 'Buy', beds: 0, baths: 0, area: '200 sq.yds', image: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=600', rera_id: 'APRERA/VSP/2024/004', featured: true, verified: true, tag: 'VMRDA', plotSize: '200 sq.yds', facing: 'East', roadWidth: '40 ft', approvalType: 'VMRDA', createdAt: '2026-05-10', priceNumeric: 4200000
  },
  {
    id: 'VZL-1005', title: 'Commercial Office Space at IT SEZ Rushikonda', price: '₹1.65 Cr', location: 'Rushikonda', city: 'Visakhapatnam', type: 'Office in IT Park/SEZ', category: 'Buy', beds: 0, baths: 3, area: '2,800 sq.ft', image: 'https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=600', rera_id: 'APRERA/VSP/2024/005', featured: true, verified: true, tag: 'IT Hub', sqft: 2800, furnishing: 'Semi-Furnished', parking: 4, createdAt: '2026-05-09', priceNumeric: 16500000
  },
  {
    id: 'VZL-1006', title: '3 BHK Independent House in Seethammadhara', price: '₹1.95 Cr', location: 'Seethammadhara', city: 'Visakhapatnam', type: 'Individual House', category: 'Buy', beds: 3, baths: 3, area: '2,400 sq.ft', image: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600', rera_id: 'APRERA/VSP/2024/006', featured: false, verified: true, tag: 'Independent', sqft: 2400, parking: 1, garden: true, createdAt: '2026-05-08', priceNumeric: 19500000
  },
  {
    id: 'VZL-1007', title: 'Farm Plot near Bheemunipatnam', price: '₹35 Lakh', location: 'Bheemunipatnam (Bheemili)', city: 'Visakhapatnam', type: 'Farm Plots', category: 'Buy', beds: 0, baths: 0, area: '1.5 Acres', image: 'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=600', rera_id: 'APRERA/VSP/2024/007', featured: false, verified: true, tag: 'Farm Land', plotSize: '1.5 Acres', facing: 'North', roadWidth: '30 ft', approvalType: 'Panchayat', createdAt: '2026-05-07', priceNumeric: 3500000
  },
  {
    id: 'VZL-1008', title: '2 BHK Flat in Pendurthi', price: '₹48 Lakh', location: 'Pendurthi', city: 'Visakhapatnam', type: 'Residential Flats', category: 'Buy', beds: 2, baths: 2, area: '1,050 sq.ft', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600', rera_id: 'APRERA/VSP/2024/008', featured: false, verified: false, tag: 'New Launch', sqft: 1050, balcony: 1, parking: 1, createdAt: '2026-05-06', priceNumeric: 4800000
  },

  // SELL properties
  {
    id: 'VZL-2001', title: '3 BHK Apartment - Owner Looking to Sell', price: '₹95 Lakh', location: 'MVP Colony', city: 'Visakhapatnam', type: 'Residential Flats', category: 'Sell', beds: 3, baths: 2, area: '1,650 sq.ft', image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=600', rera_id: 'APRERA/VSP/2024/009', featured: true, verified: true, tag: 'Owner Sell', sqft: 1650, balcony: 2, parking: 1, createdAt: '2026-05-16', priceNumeric: 9500000
  },
  {
    id: 'VZL-2002', title: 'Prime Corner Plot for Sale in Gajuwaka', price: '₹58 Lakh', location: 'Gajuwaka', city: 'Visakhapatnam', type: 'Residential Plot', category: 'Sell', beds: 0, baths: 0, area: '267 sq.yds', image: 'https://images.pexels.com/photos/1546166/pexels-photo-1546166.jpeg?auto=compress&cs=tinysrgb&w=600', rera_id: 'APRERA/VSP/2024/010', featured: true, verified: true, tag: 'Corner Plot', plotSize: '267 sq.yds', facing: 'South-East', roadWidth: '60 ft', approvalType: 'GVMC', createdAt: '2026-05-15', priceNumeric: 5800000
  },
  {
    id: 'VZL-2003', title: 'Duplex Villa for Immediate Sale in Kommadi', price: '₹2.10 Cr', location: 'Kommadi', city: 'Visakhapatnam', type: 'Villas', category: 'Sell', beds: 4, baths: 3, area: '2,800 sq.ft', image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600', rera_id: 'APRERA/VSP/2024/011', featured: true, verified: true, tag: 'Urgent Sale', sqft: 2800, parking: 2, garden: true, createdAt: '2026-05-14', priceNumeric: 21000000
  },
  {
    id: 'VZL-2004', title: 'Commercial Building for Sale near NAD', price: '₹4.5 Cr', location: 'NAD Junction', city: 'Visakhapatnam', type: 'Commercial Space', category: 'Sell', beds: 0, baths: 4, area: '5,000 sq.ft', image: 'https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg?auto=compress&cs=tinysrgb&w=600', rera_id: 'APRERA/VSP/2024/012', featured: true, verified: true, tag: 'Investment', sqft: 5000, furnishing: 'Unfurnished', parking: 6, createdAt: '2026-05-13', priceNumeric: 45000000
  },
  {
    id: 'VZL-2005', title: '2 BHK Resale Flat in Dwaraka Nagar', price: '₹55 Lakh', location: 'Dwaraka Nagar', city: 'Visakhapatnam', type: 'Residential Flats', category: 'Sell', beds: 2, baths: 2, area: '1,100 sq.ft', image: 'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=600', rera_id: 'APRERA/VSP/2024/013', featured: false, verified: true, tag: 'Resale', sqft: 1100, balcony: 1, parking: 1, createdAt: '2026-05-11', priceNumeric: 5500000
  },
  {
    id: 'VZL-2006', title: 'Farm Land for Sale near Sabbavaram', price: '₹22 Lakh', location: 'Sabbavaram', city: 'Visakhapatnam', type: 'Farm Plots', category: 'Sell', beds: 0, baths: 0, area: '1 Acre', image: 'https://images.pexels.com/photos/1237119/pexels-photo-1237119.jpeg?auto=compress&cs=tinysrgb&w=600', rera_id: 'APRERA/VSP/2024/014', featured: false, verified: false, tag: 'Farm Land', plotSize: '1 Acre', facing: 'West', roadWidth: '20 ft', approvalType: 'Revenue', createdAt: '2026-05-10', priceNumeric: 2200000
  },

  // RENT properties
  {
    id: 'VZL-3001', title: '2 BHK Furnished Flat for Rent in Gajuwaka', price: '₹18,000/mo', location: 'Gajuwaka', city: 'Visakhapatnam', type: 'Residential Flats', category: 'Rent', beds: 2, baths: 1, area: '950 sq.ft', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600', rera_id: 'APRERA/VSP/2024/015', featured: true, verified: true, tag: 'Furnished', sqft: 950, balcony: 1, parking: 1, furnishing: 'Fully Furnished', createdAt: '2026-05-17', priceNumeric: 18000
  },
  {
    id: 'VZL-3002', title: '3 BHK Apartment for Rent near GITAM', price: '₹25,000/mo', location: 'Rushikonda', city: 'Visakhapatnam', type: 'Residential Flats', category: 'Rent', beds: 3, baths: 2, area: '1,400 sq.ft', image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600', rera_id: 'APRERA/VSP/2024/016', featured: true, verified: true, tag: 'Near College', sqft: 1400, balcony: 2, parking: 1, furnishing: 'Semi-Furnished', createdAt: '2026-05-16', priceNumeric: 25000
  },
  {
    id: 'VZL-3003', title: 'Commercial Office for Rent at Dwaraka Nagar', price: '₹45,000/mo', location: 'Dwaraka Nagar', city: 'Visakhapatnam', type: 'Office', category: 'Rent', beds: 0, baths: 2, area: '2,200 sq.ft', image: 'https://images.pexels.com/photos/1743555/pexels-photo-1743555.jpeg?auto=compress&cs=tinysrgb&w=600', rera_id: 'APRERA/VSP/2024/017', featured: true, verified: true, tag: 'Office Space', sqft: 2200, furnishing: 'Fully Furnished', parking: 3, createdAt: '2026-05-15', priceNumeric: 45000
  },
  {
    id: 'VZL-3004', title: 'Independent Villa for Rent in Seethammadhara', price: '₹55,000/mo', location: 'Seethammadhara', city: 'Visakhapatnam', type: 'Villas', category: 'Rent', beds: 4, baths: 3, area: '2,600 sq.ft', image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=600', rera_id: 'APRERA/VSP/2024/018', featured: true, verified: true, tag: 'Family Home', sqft: 2600, parking: 2, garden: true, createdAt: '2026-05-14', priceNumeric: 55000
  },
  {
    id: 'VZL-3005', title: '1 BHK Studio Apartment near Railway Station', price: '₹10,000/mo', location: 'Railway New Colony', city: 'Visakhapatnam', type: 'Studio Apartment', category: 'Rent', beds: 1, baths: 1, area: '550 sq.ft', image: 'https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=600', rera_id: 'APRERA/VSP/2024/019', featured: false, verified: true, tag: 'Budget', sqft: 550, balcony: 0, parking: 0, furnishing: 'Unfurnished', createdAt: '2026-05-13', priceNumeric: 10000
  },
  {
    id: 'VZL-3006', title: '2 BHK Flat for Rent in Madhurawada', price: '₹15,000/mo', location: 'Madhurawada', city: 'Visakhapatnam', type: 'Residential Flats', category: 'Rent', beds: 2, baths: 2, area: '1,100 sq.ft', image: 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=600', rera_id: 'APRERA/VSP/2024/020', featured: false, verified: true, tag: 'Ready Move', sqft: 1100, balcony: 1, parking: 1, furnishing: 'Semi-Furnished', createdAt: '2026-05-12', priceNumeric: 15000
  },

  // LEASE properties
  {
    id: 'VZL-4001', title: 'Warehouse for Lease in Auto Nagar', price: '₹1.2 Lakh/mo', location: 'Gajuwaka', city: 'Visakhapatnam', type: 'Warehouse/Godown', category: 'Lease', beds: 0, baths: 2, area: '8,000 sq.ft', image: 'https://images.pexels.com/photos/236705/pexels-photo-236705.jpeg?auto=compress&cs=tinysrgb&w=600', rera_id: 'APRERA/VSP/2024/021', featured: true, verified: true, tag: 'Industrial', sqft: 8000, furnishing: 'Unfurnished', parking: 10, createdAt: '2026-05-17', priceNumeric: 120000
  },
  {
    id: 'VZL-4002', title: 'Commercial Shop for Lease in CMR Central', price: '₹85,000/mo', location: 'Dwaraka Nagar', city: 'Visakhapatnam', type: 'Shop', category: 'Lease', beds: 0, baths: 1, area: '1,500 sq.ft', image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=600', rera_id: 'APRERA/VSP/2024/022', featured: true, verified: true, tag: 'Retail', sqft: 1500, furnishing: 'Semi-Furnished', parking: 0, createdAt: '2026-05-16', priceNumeric: 85000
  },
  {
    id: 'VZL-4003', title: 'Office Floor for Lease at IT Park', price: '₹2.5 Lakh/mo', location: 'Rushikonda', city: 'Visakhapatnam', type: 'Office in IT Park/SEZ', category: 'Lease', beds: 0, baths: 4, area: '5,500 sq.ft', image: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=600', rera_id: 'APRERA/VSP/2024/023', featured: true, verified: true, tag: 'IT Office', sqft: 5500, furnishing: 'Fully Furnished', parking: 8, createdAt: '2026-05-15', priceNumeric: 250000
  },
  {
    id: 'VZL-4004', title: 'Industrial Land on Lease near Port', price: '₹3 Lakh/mo', location: 'Parawada', city: 'Visakhapatnam', type: 'Industrial Land', category: 'Lease', beds: 0, baths: 0, area: '2 Acres', image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600', rera_id: 'APRERA/VSP/2024/024', featured: true, verified: true, tag: 'Port Area', plotSize: '2 Acres', facing: 'East', roadWidth: '80 ft', approvalType: 'Industrial', createdAt: '2026-05-14', priceNumeric: 300000
  },
  {
    id: 'VZL-4005', title: 'Showroom Space for Lease on NH-16', price: '₹1.8 Lakh/mo', location: 'Pendurthi', city: 'Visakhapatnam', type: 'Showroom', category: 'Lease', beds: 0, baths: 2, area: '3,200 sq.ft', image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600', rera_id: 'APRERA/VSP/2024/025', featured: false, verified: true, tag: 'Showroom', sqft: 3200, furnishing: 'Unfurnished', parking: 5, createdAt: '2026-05-13', priceNumeric: 180000
  },
  {
    id: 'VZL-4006', title: 'Restaurant Space for Lease at Beach Road', price: '₹95,000/mo', location: 'Beach Road', city: 'Visakhapatnam', type: 'Commercial Space', category: 'Lease', beds: 0, baths: 2, area: '1,800 sq.ft', image: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=600', rera_id: 'APRERA/VSP/2024/026', featured: false, verified: false, tag: 'F&B', sqft: 1800, furnishing: 'Semi-Furnished', parking: 2, createdAt: '2026-05-11', priceNumeric: 95000
  },
];
