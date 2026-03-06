/**
 * Internal options passed to the `google.maps.Map` constructor.
 *
 * These mirror a subset of `google.maps.MapOptions` and are built
 * from the `<google-map>` element's HTML attributes at construction time.
 */
export default interface {
  /** Initial zoom level (1 = world, 21 = building). */
  zoom: number,

  /** Initial map centre. */
  center: google.maps.LatLng | google.maps.LatLngLiteral,

  /** Base map type (roadmap, satellite, hybrid, terrain). */
  mapTypeId: google.maps.MapTypeId,

  /** Custom JSON styles for theming. `undefined` = default Google styling. */
  styles?: google.maps.MapTypeStyle[]|undefined

  // disableDefaultUI: boolean,

  /** Show the +/- zoom buttons. */
  zoomControl: boolean,

  /** Show the Street View pegman. */
  streetViewControl: boolean,

  /** Show the map-type toggle (hidden — themes are used instead). */
  mapTypeControl: boolean,

  /** Show the fullscreen toggle. */
  fullscreenControl: boolean,

  /** Allow clicking on default POI icons. */
  clickableIcons: boolean
}
