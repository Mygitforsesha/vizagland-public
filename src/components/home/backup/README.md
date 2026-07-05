# Homepage backup

This folder preserves previous homepage layouts and components for restoration. No code is permanently deleted.

## Files

| File | Description |
|------|-------------|
| `HomePage.backup.jsx` | Original homepage before directory-style Browse by Area (Hero, StatsStrip, Categories, Featured, etc.) |
| `HomePage.pre-three-section.backup.jsx` | Browse by Area first, Hero, and all remaining sections |
| `HomePage.pre-hero-removal.backup.jsx` | Browse by Area, Hero + Latest Updates side-by-side (before Hero removal) |
| `AdvertisementSection.placeholder.backup.jsx` | Previous two-slot advertisement placeholder |

## Preserved components (not rendered on live homepage)

- `src/components/home/HeroSection.jsx` — original hero with API integration
- `src/components/home/RemainingHomeSections.jsx`
- `src/components/home/FeaturedPropertiesSection.jsx`
- `src/components/home/SponsoredProjectsSection.jsx`
- Other home section components in `src/components/home/`

## Live homepage structure

1. Browse by Area
2. Advertisement Section (Village Wise Ads, General Ads, Latest Ads — unified `AdvertisementFeed` design)

`LatestUpdatesSection.jsx` is preserved as a wrapper around `AdvertisementFeed` for backup/restore use.

## Restore

1. Copy the desired backup file to `src/pages/HomePage.jsx`
2. Re-add section imports as needed

`HeroSection` at `src/components/home/HeroSection.jsx` is preserved for future use.
