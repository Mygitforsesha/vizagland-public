/** Maps a master location API object to the home/search village display shape. */
export function mapMasterLocationToDisplay(location) {
  return {
    name: location.village ?? '',
    mandal: location.mandal ?? '',
    panchayat: location.panchayati ?? '',
    gvmc: location.gvmc_zone ?? '',
    vmrda: location.vmrda ?? '',
    registration: location.registration_office ?? '',
    gvmcvmrda: location.authority ?? '',
    location,
  };
}
