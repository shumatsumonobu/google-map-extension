/// <reference types="googlemaps" />
/**
 * Standalone utility helpers for Google Maps operations.
 *
 * All methods are static — no map instance is required.
 * Covers geocoding (address ↔ coordinates), device geolocation,
 * and distance calculation between two points.
 *
 * @example
 * ```js
 * import { GoogleMapUtils } from 'google-map-extension';
 *
 * const latlng = await GoogleMapUtils.getLatLngFromAddress('Tokyo Tower, Japan');
 * ```
 */
export default class {
    /**
     * Geocode an address string into geographic coordinates.
     *
     * Uses the Google Maps Geocoder service. The first result is returned.
     *
     * @param address - A human-readable address (e.g. `"Tokyo Tower, Japan"`).
     * @returns A promise resolving to `{ lat, lng }`.
     * @throws If the geocoder request fails (e.g. ZERO_RESULTS, OVER_QUERY_LIMIT).
     *
     * @example
     * ```js
     * const pos = await GoogleMapUtils.getLatLngFromAddress('Shibuya Station');
     * // => { lat: 35.658..., lng: 139.701... }
     * ```
     */
    static getLatLngFromAddress(address: string): Promise<google.maps.LatLngLiteral>;
    /**
     * Reverse-geocode coordinates into a human-readable address.
     *
     * Returns the `formatted_address` of the first geocoder result,
     * or `undefined` if no results are found.
     *
     * @param latlng - The coordinates to look up.
     * @returns A promise resolving to the address string, or `undefined`.
     * @throws If the geocoder request fails.
     *
     * @example
     * ```js
     * const addr = await GoogleMapUtils.getAddressFromLatLng({ lat: 35.6585, lng: 139.7454 });
     * // => "4 Chome-2-8 Shibakoen, Minato City, Tokyo, Japan"
     * ```
     */
    static getAddressFromLatLng(latlng: google.maps.LatLng | google.maps.LatLngLiteral): Promise<string | undefined>;
    /**
     * Get the device's current geographic position via the Geolocation API.
     *
     * Prompts the user for location permission if not already granted.
     *
     * @param option          - Geolocation options.
     * @param option.timeout  - Maximum wait time in milliseconds (default `5000`).
     * @param option.maximumAge - Accept a cached position up to this age in ms (default `0`).
     * @returns A promise resolving to `{ lat, lng }`.
     * @throws {GeolocationPositionError} If the user denies permission or the request times out.
     *
     * @example
     * ```js
     * const here = await GoogleMapUtils.getCurrentPosition({ timeout: 10000 });
     * map.moveToPosition(here);
     * ```
     */
    static getCurrentPosition(option?: {
        timeout?: number;
        maximumAge?: number;
    }): Promise<google.maps.LatLngLiteral>;
    /**
     * Compute the distance in meters between two points on the globe.
     *
     * Uses the Haversine formula via `google.maps.geometry.spherical`.
     *
     * > **Prerequisite:** Load the Geometry library by adding
     * > `libraries=geometry` to your Maps API script tag.
     *
     * @param from - Start point.
     * @param to   - End point.
     * @returns Distance in meters.
     *
     * @example
     * ```js
     * const meters = GoogleMapUtils.computeDistanceBetween(
     *   { lat: 35.6581, lng: 139.7414 },  // Tokyo Tower
     *   { lat: 35.6706, lng: 139.7672 }   // Tsukiji
     * );
     * // => ~3080
     * ```
     */
    static computeDistanceBetween(from: google.maps.LatLng | google.maps.LatLngLiteral, to: google.maps.LatLng | google.maps.LatLngLiteral): number;
}
