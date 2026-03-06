# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/).

---

## [1.0.14] - 2020-11-07

### Added

- `GoogleMapUtils.computeDistanceBetween()` &mdash; get the distance in meters between any two points.

## [1.0.13] - 2020-10-14

### Changed

- Bumped marker tooltip max-width from 200px to 400px for better readability.

## [1.0.12] - 2020-10-13

### Fixed

- `click.map` event was silently failing &mdash; now fires correctly.

## [1.0.11] - 2020-10-13

### Fixed

- Squashed CSS typos that broke map styling.

## [1.0.10] - 2020-10-11

### Added

- Marker balloons &mdash; attach rich HTML callouts to any marker via `info` option, `setInfo()`, and `clearInfo()`.

  <img src="./screenshots/marker-balloon.png" alt="marker balloon" height="160">

## [1.0.9] - 2020-10-11

### Added

- `GoogleMapCircleMarker.setVisible()` &mdash; show/hide markers on the fly.

## [1.0.8] - 2020-10-11

### Added

- `GoogleMapUtils.getCurrentPosition()` &mdash; grab the device's current lat/lng.

## [1.0.7] - 2020-10-11

### Added

- `GoogleMap.moveToPosition()` &mdash; pan the map to any coordinate.

### Changed

- `GoogleMapCircleMarker.moveToPosition()` now takes an optional `zoomToCurrentPosition` flag.

## [1.0.6] - 2020-10-10

### Added

- `GoogleMap.zoomToFitAllPositions()` &mdash; auto-zoom to fit every marker in view.
- `GoogleMapCircleMarker.getPosition()` &mdash; read back the marker's current lat/lng.

## [1.0.5] - 2020-10-09

### Added

- `GoogleMapUtils` class &mdash; geocoding helpers for address/coordinate conversion.

## [1.0.4] - 2020-10-07

### Added

- `GoogleMap.addMarker()` / `GoogleMap.removeMarker()` &mdash; programmatic marker management.

## [1.0.3] - 2020-09-28

### Fixed

- More wording fixes in API docs.

## [1.0.2] - 2020-09-28

### Fixed

- Wording issues in API docs.

## [1.0.1] - 2020-09-28

### Added

- First public release with core features.

## [1.0.0] - 2020-09-27

- Package name reserved. Stay tuned.
