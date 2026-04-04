# Operational Notes

## Development Workflow

1. Source files are in CoffeeScript (`sources/source/*/*.coffee`)
2. Build scripts are in `package.json` and the `toolset/` directory
3. Tests in `testing/...`
4. It is generally not my task to execute the build-steps or the testing

## FRED API Details

- Base URL: `https://api.stlouisfed.org/fred/`
- Rate limit: 2 requests/second
- Requires API key (get from https://fred.stlouisfed.org/docs/api/api_key.html)

## Key Files

- `sources/source/index/index.coffee` - Main FRED class
- `sources/source/request/throttledrequest.coffee` - Request queue implementation
- `sources/ressources/README.md` - Package documentation

## Current Status

Package is feature-complete and ready for publication. Implements:
- getCurrentMRR() - Federal Funding Rate - Upper Bound
- getTodaysDataReleases() - Today's scheduled releases
- getDataReleasesForDate(date) - Releases for specific date
- getReleaseDatesForId(id) - All release dates for an ID
- getFutureReleaseDatesForId(id) - Future release dates for an ID
