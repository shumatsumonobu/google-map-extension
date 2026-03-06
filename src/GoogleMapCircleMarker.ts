import GoogleMapCircleMarkerOption from '~/interface/GoogleMapCircleMarkerOption';
import { Template } from 'js-shared';

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
  private map: google.maps.Map;

  /** The underlying Google Maps marker instance. */
  public marker!: google.maps.Marker;

  /** The info window (balloon) attached to this marker. */
  private info!: google.maps.InfoWindow;

  /**
   * @param map - The `google.maps.Map` instance this marker belongs to.
   */
  constructor(map: google.maps.Map) {
    this.map = map;
  }

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
  public async attach(option? : GoogleMapCircleMarkerOption) {
    // ── Merge caller options with defaults ──────────────────────────
    option = Object.assign({
      position: {
        lat: this.map.getCenter().lat(),
        lng: this.map.getCenter().lng()
      },
      size: 50,
      visible: true,
      image: undefined,
      color: 'rgb(0,122,255)',
      info: undefined
    }, option || {});

    // ── Generate the SVG icon ───────────────────────────────────────
    // Default: a coloured circle with a pulsing outer ring.
    let html = Template.compile(`
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="48" height="48" viewBox="0 0 48 48">
        <style>@keyframes inflate{from{stroke-width:20px;stroke-opacity:1;transform:scale(.3)}to{stroke-width:0;stroke-opacity:0;transform:scale(2)}}</style>
        <g>
          <circle style="transform-origin: 50% 50%; transform-box: fill-box; animation: inflate 1.5s infinite;" cx="50%" cy="50%" r="25%" fill="rgb(255,255,255)" stroke="{{color}}" fill-opacity="0"></circle>
          <circle cx="50%" cy="50%" r="25%" fill="{{color}}"></circle>
          <circle cx="50%" cy="50%" r="12.5%" fill="rgb(255,255,255)"></circle>
        </g>
      </svg>`)({ color: option.color });;

    // If a custom image is provided, fetch it, encode it as base64, and
    // embed it inside an SVG <pattern> so the circle is filled with the image.
    if (option.image) {
      const blob = (await (await fetch(option.image)).blob());
      const base64 = await new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
      // Random ID to avoid SVG pattern collisions when multiple image
      // markers exist on the same map.
      const rand = Math.random().toString(36).slice(2);
      html = Template.compile(`
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="48" height="48" viewBox="0 0 48 48">
          <style>@keyframes inflate{from{stroke-width:20px;stroke-opacity:1;transform:scale(.3)}to{stroke-width:0;stroke-opacity:0;transform:scale(2)}}</style>
          <defs>
            <pattern id="{{rand}}" x="0%" y="0%" height="100%" width="100%" viewBox="0 0 48 48">
              <image x="0%" y="0%" width="48" height="48" xlink:href="{{base64}}"></image>
            </pattern>
          </defs>
          <g>
            <circle style="transform-origin: 50% 50%; transform-box: fill-box; animation: inflate 1.5s infinite;" cx="50%" cy="50%" r="25%" fill="rgb(255,255,255)" stroke="{{color}}" fill-opacity="0"></circle>
            <!-- <circle cx="50%" cy="50%" r="27%" fill="rgba(28,28,28,1)"></circle> -->
            <circle cx="50%" cy="50%" r="25%" fill="url(#{{rand}})"></circle>
          </g>
        </svg>`)({ rand, base64, color: option.color });
    }

    // ── Create the native Google Maps marker ────────────────────────
    // The SVG string is data-URI-encoded and used as the marker icon.
    // `scaledSize` is doubled to account for high-DPI displays.
    this.marker = new google.maps.Marker({
      map: this.map,
      position: option.position,
      visible: option.visible,
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(html),
        scaledSize: new google.maps.Size(option.size * 2, option.size * 2)
      },
      draggable: false,
      clickable: true,
      optimized: false
    });

    // ── Info window (balloon) ───────────────────────────────────────
    this.info = new google.maps.InfoWindow({
      content: option.info ? `<div class="google-map-info">${option.info}</div>` : undefined,
      maxWidth: 400
    });
    // Show the balloon immediately if initial content was provided.
    if (this.info.getContent()) this.info.open(this.map, this.marker);
    else this.info.close();

    // Re-open the balloon when the marker is clicked (if content exists).
    this.marker.addListener('click', () => {
      if (!this.info.getContent()) return;
      this.info.open(this.map, this.marker)
    });
  }

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
  public moveToPosition(latlng: google.maps.LatLng|google.maps.LatLngLiteral, zoomToCurrentPosition: boolean = true): GoogleMapCircleMarker {
    this.marker.setPosition(latlng);
    if (zoomToCurrentPosition) {
      this.map.panTo(latlng);
      // Play a bounce animation to draw attention to the new position.
      // Clear any running animation first to avoid stacking.
      if (this.marker.getAnimation() !== null) this.marker.setAnimation(null);
      this.marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(() => this.marker.setAnimation(null), 1400);
    }
    return this;
  }

  /**
   * Get the marker's current position as a plain `{ lat, lng }` object.
   *
   * @returns The latitude/longitude literal.
   */
  public getPosition(): google.maps.LatLngLiteral {
    const latlng = this.marker.getPosition() as google.maps.LatLng;
    return {
      lat: latlng.lat(),
      lng: latlng.lng()
    };
  }

  /**
   * Show or hide the marker on the map.
   *
   * @param visible - `true` to show, `false` to hide.
   * @returns This marker instance (for chaining).
   */
  public setVisible(visible: boolean): GoogleMapCircleMarker {
    this.marker.setVisible(visible);
    return this;
  }

  /**
   * Detach the marker from the map.
   *
   * Called internally by {@link GoogleMap.removeMarker}. After this call
   * the marker is no longer rendered and should not be reused.
   */
  public remove(): void {
    this.marker.setMap(null);
  }

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
  public setInfo(content: string): GoogleMapCircleMarker {
    this.info.setContent(`<div class="google-map-info">${content}</div>`);
    this.info.open(this.map, this.marker);
    return this;
  }

  /**
   * Close and clear the info-window balloon.
   *
   * @returns This marker instance (for chaining).
   */
  public clearInfo(): GoogleMapCircleMarker {
    this.info.setContent('');
    this.info.close();
    return this;
  }
}
