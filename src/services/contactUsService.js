import { getContactUs } from '../api/contactUsApi';

export const sampleContactUs = {
  contact_us_helpline: {
    phone: '1234567989',
    phone_label: 'Toll Free - Mon-Fri 9AM-5:30PM',
    email: 'support@aprealestate.ap.gov.in',
    email_label: 'Response within 24 hours',
    office_name: 'Vizag Land Office',
    address: 'Visakhapatnam - 530003',
  },
  contact_us_district_offices: [
    { district: 'Hyderabad', phone: '040-23456789' },
    { district: 'Vijayawada', phone: '0866-2345678' },
    { district: 'Visakhapatnam', phone: '0891-2345678' },
    { district: 'Tirupati', phone: '0877-2345678' },
    { district: 'Guntur', phone: '0863-2345678' },
    { district: 'Nellore', phone: '0861-2345678' },
  ],
  contact_us_working_hours: [
    { day: 'Mon - Fri', hours: '9:00 AM - 5:30 PM', closed: false },
    { day: 'Saturday', hours: '9:00 AM - 1:00 PM', closed: false },
    { day: 'Sunday', hours: 'Closed', closed: true },
    { day: 'Holidays', hours: 'Closed', closed: true },
  ],
  contact_us_faqs: [
    {
      q: 'How do I verify if a property is genuine?',
      a: 'All properties on this portal are verified by our team before publishing. You can view property documents and approval details on each listing.',
    },
    {
      q: 'How can an agent register on the portal?',
      a: 'Agents can register at this portal with their credentials for verification and approval by our team.',
    },
    {
      q: 'Is there a fee to list properties on this portal?',
      a: 'Listing on Vizag Land is free for all verified agents. Citizens can browse and enquire at no cost.',
    },
  ],
};

function pickString(...values) {
  for (const value of values) {
    if (value == null) continue;
    const trimmed = typeof value === 'string' ? value.trim() : String(value).trim();
    if (trimmed) return trimmed;
  }
  return '';
}

function pickBoolean(...values) {
  for (const value of values) {
    if (typeof value === 'boolean') return value;
    if (value === 1 || value === '1' || value === 'true') return true;
    if (value === 0 || value === '0' || value === 'false') return false;
  }
  return false;
}

function hasHelplineData(helpline) {
  if (!helpline || typeof helpline !== 'object') return false;

  return Boolean(
    pickString(
      helpline.phone,
      helpline.contact_us_helpline_phone,
      helpline.helpline_phone,
      helpline.toll_free,
      helpline.email,
      helpline.contact_us_helpline_email,
      helpline.office_name,
      helpline.contact_us_helpline_office_name,
      helpline.address,
      helpline.contact_us_helpline_address,
    ),
  );
}

function mapHelpline(raw = {}) {
  const fallback = sampleContactUs.contact_us_helpline;

  return {
    phone: pickString(
      raw.phone,
      raw.contact_us_helpline_phone,
      raw.helpline_phone,
      raw.toll_free,
      fallback.phone,
    ),
    phoneLabel: pickString(
      raw.phone_label,
      raw.contact_us_helpline_phone_label,
      raw.phone_description,
      raw.toll_free_label,
      fallback.phone_label,
    ),
    email: pickString(
      raw.email,
      raw.contact_us_helpline_email,
      raw.support_email,
      fallback.email,
    ),
    emailLabel: pickString(
      raw.email_label,
      raw.contact_us_helpline_email_label,
      raw.email_description,
      fallback.email_label,
    ),
    officeName: pickString(
      raw.office_name,
      raw.contact_us_helpline_office_name,
      raw.office,
      raw.location,
      fallback.office_name,
    ),
    address: pickString(
      raw.address,
      raw.contact_us_helpline_address,
      raw.office_address,
      fallback.address,
    ),
  };
}

function mapDistrictOffice(raw = {}) {
  return [
    pickString(raw.district, raw.district_name, raw.contact_us_district_office_name, raw.name),
    pickString(raw.phone, raw.contact_us_district_office_phone, raw.phone_number, raw.contact_phone),
  ];
}

function mapWorkingHour(raw = {}) {
  const closed = pickBoolean(
    raw.closed,
    raw.is_closed,
    raw.contact_us_working_hours_closed,
  );
  const hours = pickString(
    raw.hours,
    raw.time,
    raw.working_hours,
    raw.contact_us_working_hours_time,
  );

  return [
    pickString(raw.day, raw.day_name, raw.label, raw.contact_us_working_hours_day),
    hours || (closed ? 'Closed' : ''),
    closed,
  ];
}

function mapFaq(raw = {}) {
  return {
    q: pickString(raw.q, raw.question, raw.contact_us_faq_question, raw.faq_question),
    a: pickString(raw.a, raw.answer, raw.contact_us_faq_answer, raw.faq_answer),
  };
}

function mapContactUsView(data = sampleContactUs) {
  const helpline = mapHelpline(data.contact_us_helpline);
  const districtOffices = (data.contact_us_district_offices ?? []).map(mapDistrictOffice);
  const workingHours = (data.contact_us_working_hours ?? []).map(mapWorkingHour);
  const faqs = (data.contact_us_faqs ?? []).map(mapFaq);

  return {
    helpline,
    districtOffices: districtOffices.length
      ? districtOffices
      : sampleContactUs.contact_us_district_offices.map(mapDistrictOffice),
    workingHours: workingHours.length
      ? workingHours
      : sampleContactUs.contact_us_working_hours.map(mapWorkingHour),
    faqs: faqs.filter((faq) => faq.q && faq.a).length
      ? faqs.filter((faq) => faq.q && faq.a)
      : sampleContactUs.contact_us_faqs,
  };
}

function resolveContactUsData(apiData) {
  const helpline = hasHelplineData(apiData?.contact_us_helpline)
    ? apiData.contact_us_helpline
    : sampleContactUs.contact_us_helpline;

  const districtOffices = apiData?.contact_us_district_offices?.length
    ? apiData.contact_us_district_offices
    : sampleContactUs.contact_us_district_offices;

  const workingHours = apiData?.contact_us_working_hours?.length
    ? apiData.contact_us_working_hours
    : sampleContactUs.contact_us_working_hours;

  const faqs = apiData?.contact_us_faqs?.length
    ? apiData.contact_us_faqs
    : sampleContactUs.contact_us_faqs;

  return mapContactUsView({
    contact_us_helpline: helpline,
    contact_us_district_offices: districtOffices,
    contact_us_working_hours: workingHours,
    contact_us_faqs: faqs,
  });
}

export function getInitialContactUsView() {
  return mapContactUsView(sampleContactUs);
}

/**
 * Fetches contact-us content and returns UI-ready data with sample fallbacks.
 */
export async function fetchContactUs() {
  try {
    const response = await getContactUs();

    if (response?.status !== 'success' || response?.data == null) {
      return mapContactUsView(sampleContactUs);
    }

    return resolveContactUsData(response.data);
  } catch {
    return mapContactUsView(sampleContactUs);
  }
}
