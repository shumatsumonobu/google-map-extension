<h1 align="center">
  <br>
  <code>&lt;google-map&gt;</code>
  <br>
</h1>

<p align="center">
  <b>Google Maps as a Web Component.</b><br>
  One tag. Zero config. Full power.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/google-map-extension"><img src="https://img.shields.io/npm/v/google-map-extension.svg?style=flat-square" alt="npm"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license"></a>
</p>

<p align="center">
  <img src="./screenshots/all.jpg" alt="google-map-extension overview" width="720">
</p>

<br>

## What is this?

A single Custom Element that wraps the Google Maps JavaScript API.
No boilerplate. No framework lock-in. Just drop a tag and go.

```html
<google-map zoom="12" center="35.658584,139.7454316" theme="dark"></google-map>
```

That's a fully interactive dark-themed map. Really.

<br>

## Highlights

| | |
|---|---|
| **One tag, full map** | Works out of the box &mdash; zero config needed |
| **6 built-in themes** | standard, silver, retro, dark, night, aubergine |
| **Markers that pop** | Circles, images, and rich HTML balloons |
| **Geocoding baked in** | Address &harr; coordinates in a single call |
| **Distance math** | Meters between any two points on Earth |

<br>

## Getting Started

### Install

```sh
npm install google-map-extension
```

### Minimal Setup

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

That's it. You have a dark-themed, fully interactive map with controls.

<br>

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

<img src="./screenshots/simple-circle-marker.png" alt="circle marker" height="200">

```js
const marker = await map.addMarker({
  color: 'rgb(0,122,255)',
  size: 60,
  position: { lat: 35.650584, lng: 139.7454316 }
});
```

### Use your own image

<img src="./screenshots/custom-image-marker.png" alt="image marker" height="200">

```js
const marker = await map.addMarker({
  image: 'avatar.png',
  color: 'rgb(0,122,255)',
  size: 60,
  position: { lat: 35.650584, lng: 139.7454316 }
});
```

### Attach a balloon

<img src="./screenshots/marker-balloon.png" alt="marker balloon" height="200">

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

<img src="./screenshots/utils.png" alt="utilities" height="200">

```js
import { GoogleMapUtils } from 'google-map-extension';

// Address -> coordinates
const latlng = await GoogleMapUtils.getLatLngFromAddress('Tokyo Tower, Japan');
// => { lat: 35.6585..., lng: 139.7454... }

// Coordinates -> address
const address = await GoogleMapUtils.getAddressFromLatLng({ lat: 35.6585, lng: 139.7454 });

// Distance in meters (requires libraries=geometry)
const meters = GoogleMapUtils.computeDistanceBetween(
  { lat: 35.6581, lng: 139.7414 },
  { lat: 35.6706, lng: 139.7672 }
);
```

<br>

## API Reference

### `<google-map>` Element

#### Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `zoom` | `number` | `13` | Zoom level, 1 (world) &ndash; 21 (building) |
| `center` | `string` | `"0,0"` | Starting position &mdash; `"lat,lng"` |
| `type` | `string` | `"roadmap"` | `roadmap` / `satellite` / `hybrid` / `terrain` |
| `theme` | `string` | `"standard"` | `standard` / `silver` / `retro` / `dark` / `night` / `aubergine` |
| `zoom-control` | `boolean` | &mdash; | Show zoom buttons |
| `streetview-control` | `boolean` | &mdash; | Show Street View pegman |
| `fullscreen-control` | `boolean` | &mdash; | Show fullscreen toggle |
| `theme-control` | `boolean` | &mdash; | Show theme picker |

##### Zoom level previews

<table>
  <tr><th>Level</th><th>Preview</th><th>Level</th><th>Preview</th><th>Level</th><th>Preview</th></tr>
  <tr><td>1</td><td><img src="./screenshots/zoom1.png" height="80"></td><td>8</td><td><img src="./screenshots/zoom8.png" height="80"></td><td>15</td><td><img src="./screenshots/zoom15.png" height="80"></td></tr>
  <tr><td>2</td><td><img src="./screenshots/zoom2.png" height="80"></td><td>9</td><td><img src="./screenshots/zoom9.png" height="80"></td><td>16</td><td><img src="./screenshots/zoom16.png" height="80"></td></tr>
  <tr><td>3</td><td><img src="./screenshots/zoom3.png" height="80"></td><td>10</td><td><img src="./screenshots/zoom10.png" height="80"></td><td>17</td><td><img src="./screenshots/zoom17.png" height="80"></td></tr>
  <tr><td>4</td><td><img src="./screenshots/zoom4.png" height="80"></td><td>11</td><td><img src="./screenshots/zoom11.png" height="80"></td><td>18</td><td><img src="./screenshots/zoom18.png" height="80"></td></tr>
  <tr><td>5</td><td><img src="./screenshots/zoom5.png" height="80"></td><td>12</td><td><img src="./screenshots/zoom12.png" height="80"></td><td>19</td><td><img src="./screenshots/zoom19.png" height="80"></td></tr>
  <tr><td>6</td><td><img src="./screenshots/zoom6.png" height="80"></td><td>13</td><td><img src="./screenshots/zoom13.png" height="80"></td><td>20</td><td><img src="./screenshots/zoom20.png" height="80"></td></tr>
  <tr><td>7</td><td><img src="./screenshots/zoom7.png" height="80"></td><td>14</td><td><img src="./screenshots/zoom14.png" height="80"></td><td>21</td><td><img src="./screenshots/zoom21.png" height="80"></td></tr>
</table>

##### Map type previews

| Type | What you get | Preview |
|---|---|---|
| `roadmap` | Classic road map | <img src="./screenshots/type-roadmap.png" height="120"> |
| `satellite` | Google Earth imagery | <img src="./screenshots/type-satellite.png" height="120"> |
| `hybrid` | Satellite + road labels | <img src="./screenshots/type-hybrid.png" height="120"> |
| `terrain` | Elevation & terrain | <img src="./screenshots/type-terrain.png" height="120"> |

##### Theme previews

| Theme | Preview |
|---|---|
| `standard` | <img src="./screenshots/theme-standard.png" height="120"> |
| `silver` | <img src="./screenshots/theme-silver.png" height="120"> |
| `retro` | <img src="./screenshots/theme-retro.png" height="120"> |
| `dark` | <img src="./screenshots/theme-dark.png" height="120"> |
| `night` | <img src="./screenshots/theme-night.png" height="120"> |
| `aubergine` | <img src="./screenshots/theme-aubergine.png" height="120"> |

<br>

#### Events

##### `click.map`

Fires on map click. The tapped coordinates come through `event.detail`.

```js
map.on('click.map', event => {
  const position = event.detail; // { lat, lng }
});
```

<br>

#### Properties

| Property | Type | Description |
|---|---|---|
| `map` | `google.maps.Map` | Raw [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/reference/map) instance &mdash; full power when you need it |

<br>

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
|---|---|---|---|
| `position` | `{ lat, lng }` | Map center | Where to place the marker |
| `size` | `number` | `50` | Diameter in pixels |
| `visible` | `boolean` | `true` | Show on creation |
| `image` | `string` | &mdash; | Image URL inside the marker |
| `color` | `string` | `"rgb(0,122,255)"` | Fill color |
| `info` | `string` | &mdash; | Balloon content (HTML ok) |

Returns `Promise<GoogleMapCircleMarker>`

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

<br>

### `GoogleMapCircleMarker`

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

<br>

### `GoogleMapUtils`

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

<br>

## Examples

Working demos are in the [examples/](./examples) directory.

## License

[MIT](./LICENSE)
