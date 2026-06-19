/**
 * Maps Contact page form fields to the public contact-enquiries API contract.
 */
export function buildContactEnquiryPayload(formData) {
  const email = formData.email?.trim();

  return {
    contact_enquiry_full_name: formData.name?.trim() ?? '',
    contact_enquiry_phone: formData.mobile?.trim() ?? '',
    contact_enquiry_email: email || '',
    contact_enquiry_subject: formData.subject ?? '',
    contact_enquiry_property_reference_id: formData.propertyId?.trim() ?? '',
    contact_enquiry_district: formData.district ?? '',
    contact_enquiry_message: formData.message?.trim() ?? '',
    contact_enquiry_consent: Boolean(formData.consent),
  };
}
