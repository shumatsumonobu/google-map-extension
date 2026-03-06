/// <reference types="googlemaps" />
import GoogleMapCircleMarkerOption from '~/interface/GoogleMapCircleMarkerOption';
/**
 * A circle-shaped map marker rendered as an SVG overlay.
 *
 * Supports plain coloured circles, custom image fills, and optional
 * info-window balloons. Created via {@link GoogleMap.addMarker} — do not
 * instantiate directly.
 *
 * Each marker includes a pulsing ring animation and is clickable by default.
 * If an `image` URL is provided, the image is fetched, base64-encoded, and
 * embedded as an SVG pattern fill.
 */
export default class GoogleMapCircleMarker {
    /** Reference to the parent map that owns this marker. */
    private map;
    /** The underlying Google Maps marker instance. */
    marker: google.maps.Marker;
    /** The info window (balloon) attached to this marker. */
    private info;
    /**
     * @param map - The `google.maps.Map` instance this marker belongs to.
     */
    constructor(map: google.maps.Map);
    /**
     * Build the SVG icon, create the native marker, and place it on the map.
     *
     * This method is called internally by {@link GoogleMap.addMarker}.
     * It handles two rendering paths:
     *
     * 1. **Plain circle** — a solid colour circle with a white centre dot.
     * 2. **Image circle** — fetches the image, converts it to base64, and
     *    fills the circle with an SVG `<pattern>`.
     *
     * Both variants include a pulsing ring animation via CSS `@keyframes`.
     *
     * @param option - Marker appearance and behaviour options.
     */
    attach(option?: GoogleMapCircleMarkerOption): Promise<void>;
    /**
     * Animate the marker to a new position.
     *
     * When `zoomToCurrentPosition` is `true` (default), the map pans smoothly
     * to the new location and the marker plays a brief bounce animation.
     *
     * @param latlng              - Target coordinates.
     * @param zoomToCurrentPosition - Whether to pan the map to follow the marker.
     * @returns This marker instance (for chaining).
     */
    moveToPosition(latlng: google.maps.LatLng | google.maps.LatLngLiteral, zoomToCurrentPosition?: boolean): GoogleMapCircleMarker;
    /**
     * Get the marker's current position as a plain `{ lat, lng }` object.
     *
     * @returns The latitude/longitude literal.
     */
    getPosition(): google.maps.LatLngLiteral;
    /**
     * Show or hide the marker on the map.
     *
     * @param visible - `true` to show, `false` to hide.
     * @returns This marker instance (for chaining).
     */
    setVisible(visible: boolean): GoogleMapCircleMarker;
    /**
     * Detach the marker from the map.
     *
     * Called internally by {@link GoogleMap.removeMarker}. After this call
     * the marker is no longer rendered and should not be reused.
     */
    remove(): void;
    /**
     * Set or replace the info-window (balloon) content and open it.
     *
     * HTML strings are supported, allowing rich content inside the balloon.
     *
     * @param content - HTML string to display in the balloon.
     * @returns This marker instance (for chaining).
     *
     * @example
     * ```js
     * marker.setInfo('<strong>Hello!</strong>');
     * ```
     */
    setInfo(content: string): GoogleMapCircleMarker;
    /**
     * Close and clear the info-window balloon.
     *
     * @returns This marker instance (for chaining).
     */
    clearInfo(): GoogleMapCircleMarker;
}
