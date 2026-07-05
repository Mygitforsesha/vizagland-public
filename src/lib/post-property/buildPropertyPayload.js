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
      property_project_name: formState.projectName ?? '',

      property_lp_no: formState.lpNo ?? '',

      property_year: formState.year
        ? Number(formState.year)
        : null,

      property_total_floors: formState.totalFloors
        ? Number(formState.totalFloors)
        : null,

      property_block_phase: formState.blockPhase ?? '',

      property_plot_no: formState.plotNo ?? '',

      property_floor_number: formState.floorNumber ?? '',

      property_facing: formState.facing ?? '',

      property_area: formState.areaValue
        ? Number(formState.areaValue)
        : null,

      property_area_unit: formState.areaUnit ?? '',

      property_price: formState.priceValue
        ? Number(formState.priceValue)
        : null,

      property_price_range: formState.priceRange ?? '',

      property_age: formState.propertyAge ?? '',

      property_bedrooms: formState.bedRooms
        ? Number(formState.bedRooms)
        : null,

      property_furnishing: formState.furnishing ?? '',

      property_under: formState.propertyUnder ?? '',

      property_document_no: formState.documentNo ?? '',

      property_document_year: formState.documentYear
        ? Number(formState.documentYear)
        : null,

      property_registration_office_area: formState.registrationOfficeArea ?? '',

      property_price_per_sqft: formState.pricePerSqft ?? '',

      property_flat_door_no: formState.propertyFlatDoorNo ?? '',
    },

    property_auth: {
      username_or_mobile: customer?.usernameOrMobile?.trim() ?? '',
      password: customer?.password ?? '',
      email: customer?.email?.trim() ?? '',
    },

    property_other_services: {
      property_service_name: formState.selectedOtherService ?? '',
      property_youtube_video_link: formState.youtubeVideoLink ?? '',
      property_location_link: formState.propertyLocationLink ?? '',
    },

    property_contact_numbers: (formState.propertyContactNumbers ?? []).map((row) => ({
      registration_type: row.registrationType ?? '',
      phone_number: row.phoneNumber?.trim() ?? '',
    })),

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
