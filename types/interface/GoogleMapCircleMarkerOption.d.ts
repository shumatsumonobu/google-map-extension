/**
 * Options for creating a {@link GoogleMapCircleMarker} via
 * {@link GoogleMap.addMarker}.
 */
export default interface  {
    /** Where to place the marker. Defaults to the current map centre. */
    position: {
        lat: number;
        lng: number;
    };
    /** Marker diameter in pixels. Default `50`. */
    size: number;
    /** Whether the marker is visible on creation. Default `true`. */
    visible: boolean;
    /** Optional image URL to fill the circle (fetched and base64-encoded). */
    image?: string;
    /** Fill colour for the circle. Default `"rgb(0,122,255)"`. */
    color?: string;
    /** HTML content for the info-window balloon. `undefined` = no balloon. */
    info?: string;
}
