/// <reference types="googlemaps" />
import './style/map.css';
import GoogleMapCircleMarker from '~/GoogleMapCircleMarker';
import GoogleMapCircleMarkerOption from '~/interface/GoogleMapCircleMarkerOption';
/**
 * `<google-map>` Custom Element.
 *
 * A Web Component that wraps the Google Maps JavaScript API, providing a
 * declarative, zero-config way to embed interactive maps.
 *
 * Supports HTML attributes for zoom, center, map type, theme, and UI controls.
 * Emits custom DOM events (e.g. `click.map`) and exposes methods for marker
 * management and viewport manipulation.
 *
 * @example
 * ```html
 * <google-map
 *   zoom="12"
 *   center="35.658584,139.7454316"
 *   theme="dark"
 *   zoom-control
 *   fullscreen-control></google-map>
 * ```
 */
declare class GoogleMap extends HTMLElement {
    /** The underlying Google Maps instance. Exposed for advanced use cases. */
    map: google.maps.Map;
    /** The `<select>` element used for the theme picker control. */
    private theme;
    /**
     * Create a new `<google-map>` element.
     *
     * Reads HTML attributes to configure the map, initialises the
     * `google.maps.Map` instance, optionally attaches the theme picker,
     * and wires up the `click.map` custom event.
     */
    constructor();
    /**
     * Lifecycle callback — invoked each time the element is inserted into the DOM.
     *
     * Ensures the element has `display: block` so the map renders correctly,
     * since custom elements default to `display: inline`.
     */
    protected connectedCallback(): void;
    /**
     * Register the `<google-map>` custom element in the browser's Custom
     * Elements registry. Safe to call multiple times — subsequent calls are
     * no-ops.
     *
     * @returns The `GoogleMap` class itself (for chaining).
     */
    static define(): any;
    /**
     * Convenience factory: defines the custom element (if not already defined)
     * and returns a new instance.
     *
     * @returns A new `<google-map>` element instance.
     */
    static createElement(): any;
    /**
     * Add a circle marker to the map.
     *
     * The returned marker can be moved, hidden, annotated with a balloon,
     * or removed later via {@link removeMarker}.
     *
     * @param option - Marker configuration (position, size, color, image, etc.).
     * @returns A promise that resolves to the newly created marker.
     *
     * @example
     * ```js
     * const marker = await map.addMarker({
     *   color: 'rgb(0,122,255)',
     *   size: 60,
     *   position: { lat: 35.650584, lng: 139.7454316 }
     * });
     * ```
     */
    addMarker(option?: GoogleMapCircleMarkerOption): Promise<GoogleMapCircleMarker>;
    /**
     * Remove a marker from the map and release its resources.
     *
     * @param marker - The marker instance returned by {@link addMarker}.
     * @returns This `GoogleMap` instance (for chaining).
     */
    removeMarker(marker: GoogleMapCircleMarker): GoogleMap;
    /**
     * Auto-zoom the viewport so that every given position or marker is visible.
     *
     * Accepts any mix of raw `LatLng` / `LatLngLiteral` objects, native
     * `google.maps.Marker` instances, or `GoogleMapCircleMarker` instances.
     *
     * @param positions - Array of coordinates or markers to fit in view.
     * @returns This `GoogleMap` instance (for chaining).
     *
     * @example
     * ```js
     * map.zoomToFitAllPositions([markerA, markerB, markerC]);
     * ```
     */
    zoomToFitAllPositions(positions: google.maps.LatLng[] | google.maps.LatLngLiteral[] | google.maps.Marker[] | GoogleMapCircleMarker[]): GoogleMap;
    /**
     * Pan (or jump) the map to a new centre position.
     *
     * When `zoomToCurrentPosition` is `true` (default) the transition is a
     * smooth pan animation. When `false` the map snaps instantly.
     *
     * @param latlng              - Target coordinates.
     * @param zoomToCurrentPosition - `true` = smooth pan, `false` = instant jump.
     * @returns This `GoogleMap` instance (for chaining).
     */
    moveToPosition(latlng: google.maps.LatLng | google.maps.LatLngLiteral, zoomToCurrentPosition?: boolean): GoogleMap;
    /**
     * Subscribe to a custom DOM event on this element.
     *
     * This is a convenience wrapper around `addEventListener` that returns
     * `this` for method chaining.
     *
     * @param type     - Event name (e.g. `"click.map"`).
     * @param listener - Callback invoked when the event fires.
     * @param option   - Standard listener options. Set `once: true` to auto-remove.
     * @returns This `GoogleMap` instance (for chaining).
     *
     * @example
     * ```js
     * map.on('click.map', e => console.log(e.detail));
     * ```
     */
    on(type: string, listener: (event?: Event) => void, option?: {
        once: boolean;
    }): GoogleMap;
    /**
     * Unsubscribe from a custom DOM event.
     *
     * @param type     - Event name.
     * @param listener - The same callback reference passed to {@link on}.
     * @returns This `GoogleMap` instance (for chaining).
     */
    off(type: string, listener: (event?: Event) => void): GoogleMap;
    /**
     * Dispatch a custom DOM event with an optional detail payload.
     *
     * @param type   - Event name to dispatch.
     * @param detail - Arbitrary data attached to `event.detail`.
     */
    private invoke;
    /**
     * Build and attach the theme picker `<select>` control to the map.
     *
     * The dropdown is placed at `TOP_LEFT` and persists the user's choice
     * in a cookie so it survives page reloads.
     */
    private addThemeControl;
}
export default GoogleMap;
