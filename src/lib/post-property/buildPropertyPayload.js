import { generateReferenceId } from './generateReferenceId';
import { buildPropertyGroupAndTypesPayload } from './formOptions';

// FUTURE:
// Persist PropertyImages and PropertyDocuments metadata when media services are available.
//
// import {
//   mapPropertyDocumentsForPayload,
//   mapPropertyImagesForPayload,
// } from './media/mapMediaForPayload';

// FUTURE:
// Persist server-side metadata when backend services are available.
//
// /** Default server-side metadata for new property submissions. */
// const DEFAULT_METADATA = {
//   isFeatured: false,
//   propertyViews: 0,
//   propertyLeads: 0,
//   isDeleted: false,
//
//   assignedTo: null,
//
//   reviewRemarks: '',
//   rejectedReason: '',
//
//   approvedAt: null,
//   approvedByUser: null,
// };

/**
 * Builds the complete property submission payload for API integration.
 * Single source of truth — do not duplicate this structure in components.
 */
export function buildPropertyPayload({ formState, customer, referenceId }) {
  const now = new Date().toISOString();
  const resolvedReferenceId = referenceId ?? generateReferenceId();

  return {
    // referenceId: resolvedReferenceId,
    // submissionSource: 'post-property',
    // platform: 'web',
    // status: 'pending',
    // verified: false,
    // submittedAt: now,
    // createdAt: now,
    // updatedAt: now,

    property_approval: {
      property_approval_authority: formState.approvedBy ?? '',
    },

    property_location: {
      property_village: formState.village ?? '',
      property_nearby_location: formState.nearbyLocation ?? '',
      property_custom_nearby_location: formState.customNearby ?? '',
      property_district: formState.district ?? '',
      property_mandal: formState.mandal ?? '',
      property_panchayati: formState.panchayati ?? '',
      property_gvmc: formState.gvmc ?? '',
      property_vmrda: formState.vmrda ?? '',
      property_registration_area: formState.regArea ?? '',
      property_authority: formState.gvmcVmrda ?? '',
    },

    property_group_and_types: buildPropertyGroupAndTypesPayload(formState.propertyCategory),

    property_details: {
      property_price: formState.priceValue
        ? Number(formState.priceValue)
        : null,

      property_price_range: formState.priceRange ?? '',

      property_area: formState.areaValue
        ? Number(formState.areaValue)
        : null,

      property_area_unit: formState.areaUnit ?? '',

      property_price_per_sqft: formState.pricePerSqft ?? '',

      property_age: formState.propertyAge ?? '',

      property_facing: formState.facing ?? '',

      property_total_floors: formState.totalFloors
        ? Number(formState.totalFloors)
        : null,

      property_floor_number: formState.floorNumber ?? '',

      property_furnishing: formState.furnishing ?? '',

      property_under: formState.propertyUnder ?? '',

      property_lp_no: formState.lpNo ?? '',

      property_plot_no: formState.plotNo ?? '',

      property_flat_door_no: formState.propertyFlatDoorNo ?? '',

      property_year: formState.year
        ? Number(formState.year)
        : null,

      property_bedrooms: formState.bedRooms
        ? Number(formState.bedRooms)
        : null,
    },

    property_owner: {
      property_owner_name: customer?.name?.trim() ?? '',
      property_owner_phone: customer?.phone?.trim() ?? '',
      property_owner_email: customer?.email?.trim() ?? '',
    },

    property_other_services: {
      property_service_name: formState.selectedOtherService ?? '',
      property_youtube_video_link: formState.youtubeVideoLink ?? '',
      property_location_link: formState.propertyLocationLink ?? '',
    },

    // FUTURE:
    // Persist PropertyImages metadata when media services are available.
    //
    // propertyImages: mapPropertyImagesForPayload(formState.propertyImages),

    // FUTURE:
    // Persist PropertyDocuments metadata when media services are available.
    //
    // propertyDocuments: mapPropertyDocumentsForPayload(formState.propertyDocuments),

    // FUTURE:
    // Persist server-side metadata when backend services are available.
    //
    // metadata: { ...DEFAULT_METADATA },
  };
}
