# Homepage backup

This folder preserves previous homepage layouts for restoration. No code is permanently deleted.

## Files

| File | Description |
|------|-------------|
| `HomePage.backup.jsx` | Original homepage before directory-style Browse by Area (Hero, StatsStrip, Categories, Featured, etc.) |
| `HomePage.pre-three-section.backup.jsx` | Homepage with Browse by Area first, Hero, and all remaining sections (StatsStrip, Categories, Featured, etc.) |

## Preserved components (not rendered on live homepage)

- `src/components/home/RemainingHomeSections.jsx`
- `src/components/home/FeaturedPropertiesSection.jsx`
- `src/components/home/AdvertisementSection.jsx`
- `src/components/home/SponsoredProjectsSection.jsx`
- Other home section components in `src/components/home/`

## Restore

1. Copy the desired backup file to `src/pages/HomePage.jsx`
2. Re-add section imports as needed

The live `HeroSection` at `src/components/home/HeroSection.jsx` keeps the original hero API integration unchanged.
