# google-map-extension

[![NPM](https://img.shields.io/npm/v/google-map-extension.svg)](https://www.npmjs.com/package/google-map-extension)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Drop a `<google-map>` tag. Get a map. That's it.

No boilerplate, no framework lock-in &mdash; just one Custom Element that wraps the Google Maps JavaScript API with a clean, declarative interface.

<p align="center">
  <img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/all.jpg" alt="google-map-extension overview" width="720">
</p>

---

## Why?

- **One tag, full map** &mdash; works out of the box with zero config
- **6 built-in themes** &mdash; standard, silver, retro, dark, night, aubergine
- **Markers that pop** &mdash; circles, images, and rich HTML balloons
- **Geocoding baked in** &mdash; address &harr; coordinates in one call
- **Distance measurement** &mdash; meters between any two points on Earth

## Install

```sh
npm install google-map-extension
```

## Quick Start

```html
<google-map
  zoom="12"
  center="35.658584,139.7454316"
  type="roadmap"
  theme="dark"
  zoom-control
  streetview-control
  fullscreen-control
  theme-control></google-map>

<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
<script type="module">
  import 'google-map-extension';
</script>
```

Done. You've got a dark-themed, fully interactive map with controls.

## Usage

### React to clicks

```js
const map = document.querySelector('#map');

map.on('click.map', event => {
  const position = event.detail;
  map.moveToPosition(position);
});
```

### Drop a circle marker

<img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/simple-circle-marker.png" alt="circle marker" height="200">

```js
const marker = await map.addMarker({
  color: 'rgb(0,122,255)',
  size: 60,
  position: { lat: 35.650584, lng: 139.7454316 }
});
```

### Use your own image

<img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/custom-image-marker.png" alt="image marker" height="200">

```js
const marker = await map.addMarker({
  image: 'avatar.png',
  color: 'rgb(0,122,255)',
  size: 60,
  position: { lat: 35.650584, lng: 139.7454316 }
});
```

### Attach a balloon

<img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/marker-balloon.png" alt="marker balloon" height="200">

```js
const marker = await map.addMarker({
  position: { lat: 35.650584, lng: 139.7454316 },
  info: '<strong>Hello!</strong>'
});
```

### Move & remove

```js
marker.moveToPosition({ lat: 35.660584, lng: 139.7554316 });

map.removeMarker(marker);
```

### Geocoding & distance

<img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/utils.png" alt="utilities" height="200">

```js
import { GoogleMapUtils } from 'google-map-extension';

// Address to coordinates
const latlng = await GoogleMapUtils.getLatLngFromAddress('Tokyo Tower, Japan');
// => { lat: 35.6585..., lng: 139.7454... }

// Coordinates to address
const address = await GoogleMapUtils.getAddressFromLatLng({ lat: 35.6585, lng: 139.7454 });

// Distance in meters (requires libraries=geometry)
const meters = GoogleMapUtils.computeDistanceBetween(
  { lat: 35.6581, lng: 139.7414 },
  { lat: 35.6706, lng: 139.7672 }
);
```

---

## API Reference

### `<google-map>` Element

#### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `zoom` | `number` | `13` | Zoom level, 1 (world) to 21 (building) |
| `center` | `string` | `"0,0"` | Starting position &mdash; `"lat,lng"` |
| `type` | `string` | `"roadmap"` | `roadmap` / `satellite` / `hybrid` / `terrain` |
| `theme` | `string` | `"standard"` | `standard` / `silver` / `retro` / `dark` / `night` / `aubergine` |
| `zoom-control` | `boolean` | &mdash; | Show zoom buttons |
| `streetview-control` | `boolean` | &mdash; | Show Street View pegman |
| `fullscreen-control` | `boolean` | &mdash; | Show fullscreen toggle |
| `theme-control` | `boolean` | &mdash; | Show theme picker |

<details>
<summary>Zoom level previews</summary>

<table>
  <tr><th>Level</th><th>Preview</th><th>Level</th><th>Preview</th><th>Level</th><th>Preview</th></tr>
  <tr><td>1</td><td><img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/zoom1.png" height="80"></td><td>8</td><td><img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/zoom8.png" height="80"></td><td>15</td><td><img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/zoom15.png" height="80"></td></tr>
  <tr><td>2</td><td><img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/zoom2.png" height="80"></td><td>9</td><td><img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/zoom9.png" height="80"></td><td>16</td><td><img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/zoom16.png" height="80"></td></tr>
  <tr><td>3</td><td><img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/zoom3.png" height="80"></td><td>10</td><td><img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/zoom10.png" height="80"></td><td>17</td><td><img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/zoom17.png" height="80"></td></tr>
  <tr><td>4</td><td><img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/zoom4.png" height="80"></td><td>11</td><td><img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/zoom11.png" height="80"></td><td>18</td><td><img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/zoom18.png" height="80"></td></tr>
  <tr><td>5</td><td><img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/zoom5.png" height="80"></td><td>12</td><td><img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/zoom12.png" height="80"></td><td>19</td><td><img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/zoom19.png" height="80"></td></tr>
  <tr><td>6</td><td><img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/zoom6.png" height="80"></td><td>13</td><td><img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/zoom13.png" height="80"></td><td>20</td><td><img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/zoom20.png" height="80"></td></tr>
  <tr><td>7</td><td><img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/zoom7.png" height="80"></td><td>14</td><td><img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/zoom14.png" height="80"></td><td>21</td><td><img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/zoom21.png" height="80"></td></tr>
</table>

</details>

<details>
<summary>Map type previews</summary>

| Type | What you get | Preview |
|------|-------------|---------|
| `roadmap` | Classic road map | <img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/type-roadmap.png" height="120"> |
| `satellite` | Google Earth imagery | <img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/type-satellite.png" height="120"> |
| `hybrid` | Satellite + road labels | <img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/type-hybrid.png" height="120"> |
| `terrain` | Elevation & terrain | <img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/type-terrain.png" height="120"> |

</details>

<details>
<summary>Theme previews</summary>

| Theme | Preview |
|-------|---------|
| `standard` | <img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/theme-standard.png" height="120"> |
| `silver` | <img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/theme-silver.png" height="120"> |
| `retro` | <img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/theme-retro.png" height="120"> |
| `dark` | <img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/theme-dark.png" height="120"> |
| `night` | <img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/theme-night.png" height="120"> |
| `aubergine` | <img src="https://raw.githubusercontent.com/shumatsumonobu/google-map-extension/master/screencap/theme-aubergine.png" height="120"> |

</details>

#### Events

##### `click.map`

Fires on map click. The tapped coordinates come through `event.detail`.

```js
map.on('click.map', event => {
  const position = event.detail; // { lat, lng }
});
```

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `map` | `google.maps.Map` | Raw [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/reference/map) instance &mdash; full power when you need it |

#### Methods

##### `addMarker(option?)`

Drop a marker on the map.

```ts
map.addMarker(option?: {
  position?: { lat: number, lng: number },
  size?: number,
  visible?: boolean,
  image?: string,
  color?: string,
  info?: string
}): Promise<GoogleMapCircleMarker>
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `position` | `{ lat, lng }` | Map center | Where to place the marker |
| `size` | `number` | `50` | Diameter in pixels |
| `visible` | `boolean` | `true` | Show on creation |
| `image` | `string` | `undefined` | Image URL inside the marker |
| `color` | `string` | `"rgb(0,122,255)"` | Fill color |
| `info` | `string` | `undefined` | Balloon content (HTML ok) |

**Returns** `Promise<GoogleMapCircleMarker>`

##### `removeMarker(marker)`

Remove a marker from the map.

```ts
map.removeMarker(marker: GoogleMapCircleMarker): GoogleMap
```

##### `moveToPosition(latlng, zoomToCurrentPosition?)`

Pan the map to a new location.

```ts
map.moveToPosition(
  latlng: google.maps.LatLng | google.maps.LatLngLiteral,
  zoomToCurrentPosition?: boolean  // default: true
): GoogleMap
```

##### `zoomToFitAllPositions(positions)`

Auto-zoom to fit every marker or coordinate in view.

```ts
map.zoomToFitAllPositions(
  positions: google.maps.LatLng[] |
             google.maps.LatLngLiteral[] |
             google.maps.Marker[] |
             GoogleMapCircleMarker[]
): GoogleMap
```

---

### GoogleMapCircleMarker

The marker object returned by `addMarker()`.

#### Methods

##### `moveToPosition(latlng, zoomToCurrentPosition?)`

Slide the marker to a new spot.

```ts
marker.moveToPosition(
  latlng: google.maps.LatLng | google.maps.LatLngLiteral,
  zoomToCurrentPosition?: boolean  // default: true
): GoogleMapCircleMarker
```

##### `getPosition()`

Get the marker's current coordinates.

```ts
marker.getPosition(): google.maps.LatLngLiteral
```

##### `setVisible(visible)`

Show or hide the marker.

```ts
marker.setVisible(visible: boolean): GoogleMapCircleMarker
```

##### `setInfo(content)`

Set the balloon content. HTML is supported.

```ts
marker.setInfo(content: string): GoogleMapCircleMarker
```

##### `clearInfo()`

Dismiss the balloon.

```ts
marker.clearInfo(): GoogleMapCircleMarker
```

---

### GoogleMapUtils

Standalone helpers &mdash; no map instance required.

```js
import { GoogleMapUtils } from 'google-map-extension';
```

#### Methods

##### `getCurrentPosition(option?)`

Grab the device's current location.

```ts
GoogleMapUtils.getCurrentPosition(option?: {
  timeout?: number,    // ms, default: 5000
  maximumAge?: number  // ms, default: 0
}): Promise<google.maps.LatLngLiteral>
```

##### `getLatLngFromAddress(address)`

Turn an address into coordinates.

```ts
GoogleMapUtils.getLatLngFromAddress(address: string): Promise<google.maps.LatLngLiteral>
```

##### `getAddressFromLatLng(latlng)`

Turn coordinates into an address.

```ts
GoogleMapUtils.getAddressFromLatLng(
  latlng: google.maps.LatLng | google.maps.LatLngLiteral
): Promise<string | undefined>
```

##### `computeDistanceBetween(from, to)`

Meters between two points on the globe.

> Requires `libraries=geometry` in your API script tag.

```ts
GoogleMapUtils.computeDistanceBetween(
  from: google.maps.LatLng | google.maps.LatLngLiteral,
  to: google.maps.LatLng | google.maps.LatLngLiteral
): number
```

---

## Examples

Check the [examples/](./examples) directory for working demos.

## License

[MIT](./LICENSE)
