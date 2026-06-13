import { generateReferenceId } from './generateReferenceId';
import {
  mapPropertyDocumentsForPayload,
  mapPropertyImagesForPayload,
} from './media/mapMediaForPayload';

/** Default server-side metadata for new property submissions. */
const DEFAULT_METADATA = {
  isFeatured: false,
  propertyViews: 0,
  propertyLeads: 0,
  isDeleted: false,

  assignedTo: null,

  reviewRemarks: '',
  rejectedReason: '',

  approvedAt: null,
  approvedByUser: null,
};

/**
 * Builds the complete property submission payload for API integration.
 * Single source of truth — do not duplicate this structure in components.
 */
export function buildPropertyPayload({ formState, customer, referenceId }) {
  const now = new Date().toISOString();
  const resolvedReferenceId = referenceId ?? generateReferenceId();

  return {
    referenceId: resolvedReferenceId,
    submissionSource: 'post-property',
    platform: 'web',
    status: 'pending',
    verified: false,
    submittedAt: now,
    createdAt: now,
    updatedAt: now,

    propertyApproval: {
      approvedBy: formState.approvedBy ?? '',
    },

    villageDetails: {
      village: formState.village ?? '',
      nearbyLocation: formState.nearbyLocation ?? '',
      customNearby: formState.customNearby ?? '',
      district: formState.district ?? '',
      mandal: formState.mandal ?? '',
      panchayati: formState.panchayati ?? '',
      gvmc: formState.gvmc ?? '',
      vmrda: formState.vmrda ?? '',
      regArea: formState.regArea ?? '',
      gvmcVmrda: formState.gvmcVmrda ?? '',
    },

    propertyGroupAndTypes: {
      residentialType: formState.selectedResidential ?? '',
      commercialType: formState.selectedCommercial ?? '',
      developmentType: formState.selectedDevelopments ?? '',
      layoutType: formState.selectedLayout ?? '',
      propertyStatus: formState.selectedHouseDev ?? '',
      constructionType: formState.selectedConstruction ?? '',
    },

    propertyDetails: {
      priceValue: formState.priceValue
        ? Number(formState.priceValue)
        : null,
    
      priceRange: formState.priceRange ?? '',
    
      areaValue: formState.areaValue
        ? Number(formState.areaValue)
        : null,
    
      areaUnit: formState.areaUnit ?? '',
    
      pricePerSqft: formState.pricePerSqft ?? '',
    
      propertyAge: formState.propertyAge ?? '',
    
      facing: formState.facing ?? '',
    
      totalFloors: formState.totalFloors
        ? Number(formState.totalFloors)
        : null,
    
      floorNumber: formState.floorNumber ?? '',
    
      furnishing: formState.furnishing ?? '',
    
      propertyUnder: formState.propertyUnder ?? '',
    
      // Keep these as strings for future values like LP-101, Plot-8A
      lpNo: formState.lpNo ?? '',
    
      plotNo: formState.plotNo ?? '',
    
      year: formState.year
        ? Number(formState.year)
        : null,
    
      bedRooms: formState.bedRooms
        ? Number(formState.bedRooms)
        : null,
    },

    otherServices: {
      service: formState.selectedOtherService ?? '',
    },

    propertyImages: mapPropertyImagesForPayload(formState.propertyImages),
    propertyDocuments: mapPropertyDocumentsForPayload(formState.propertyDocuments),

    customer: {
      name: customer?.name?.trim() ?? '',
      phone: customer?.phone?.trim() ?? '',
      email: customer?.email?.trim() ?? '',
    },

    metadata: { ...DEFAULT_METADATA },
  };
}
