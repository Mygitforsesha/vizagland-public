const REGISTRATION_TYPES = [
  { group: 'Owner / Agent', items: ['Buyer', 'Seller', 'Owner', 'Owner Relative', 'Owner Friend', 'Realtor', 'Agent', 'Employee', 'Marketing Person', 'Promoter', 'Company', 'Builder', 'Developer', 'NRI'] },
  { group: 'Professional', items: ['Civil Engineer', 'Architect', 'Structural Engineer', 'Software Engineer', 'Advocate'] },
  { group: 'Membership', items: ['Diamond Member', 'Gold Member', 'Platinum Member', 'Bronze Member'] },
  { group: 'Media', items: ['Eenadu', 'Sakshi', 'Vaartha', 'Andhra Jyothi', 'Hindu', 'Indian Express'] },
  { group: 'Social Media', items: ['Facebook', 'Twitter', 'Instagram', 'YouTube', 'WhatsApp', 'Telegram', 'Social Media'] },
  { group: 'Other', items: ['Others'] },
];

const REGISTRATION_GROUP_KEYS = {
  Membership: 'membership',
  'Owner / Agent': 'roles',
  Professional: 'professional',
  Media: 'media',
  'Social Media': 'socialMedia',
  Other: 'other',
};

const REGISTRATION_TYPE_DISPLAY_ORDER = [
  'Buyer',
  'Seller',
  'Owner',
  'Owner Relative',
  'Owner Friend',
  'Realtor',
  'Civil Engineer',
  'Structural Engineer',
  'Architect',
  'Software Engineer',
  'NRI',
  'Advocate',
  'Diamond Member',
  'Gold Member',
  'Platinum Member',
  'Bronze Member',
  'Eenadu',
  'Sakshi',
  'Vaartha',
  'Andhra Jyothi',
  'Hindu',
  'Indian Express',
  'Facebook',
  'Twitter',
  'Instagram',
  'YouTube',
  'WhatsApp',
  'Telegram',
];

function buildRegistrationTypeRegistry() {
  const byValue = new Map();

  for (const group of REGISTRATION_TYPES) {
    const stateKey = REGISTRATION_GROUP_KEYS[group.group];

    for (const item of group.items) {
      if (byValue.has(item)) continue;

      byValue.set(item, {
        label: item,
        value: item,
        stateKey,
      });
    }
  }

  return byValue;
}

function buildRegistrationTypeOptions(registry) {
  const seen = new Set();
  const ordered = [];

  for (const value of REGISTRATION_TYPE_DISPLAY_ORDER) {
    const option = registry.get(value);
    if (!option || seen.has(value)) continue;
    ordered.push({ label: option.label, value: option.value });
    seen.add(value);
  }

  for (const group of REGISTRATION_TYPES) {
    for (const item of group.items) {
      if (seen.has(item)) continue;
      const option = registry.get(item);
      if (!option) continue;
      ordered.push({ label: option.label, value: option.value });
      seen.add(item);
    }
  }

  return ordered;
}

export const registrationTypeRegistry = buildRegistrationTypeRegistry();

export const registrationTypeOptions = buildRegistrationTypeOptions(registrationTypeRegistry);

export { REGISTRATION_TYPES, REGISTRATION_GROUP_KEYS };

const AGENT_REGISTRATION_TYPES = new Set(['Agent', 'Employee']);

export function getPostModeFromRegistrationType(registrationType) {
  return AGENT_REGISTRATION_TYPES.has(registrationType) ? 'agent' : 'owner';
}
