import './style/map.css';
import themes from '~/theme';
import { Cookie } from 'js-shared';
import GoogleMapCircleMarker from '~/GoogleMapCircleMarker';
import GoogleMapCircleMarkerOption from '~/interface/GoogleMapCircleMarkerOption';
import GoogleMapOption from '~/interface/GoogleMapOption';

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
class GoogleMap extends HTMLElement {

  /** The underlying Google Maps instance. Exposed for advanced use cases. */
  public map: google.maps.Map;

  /** The `<select>` element used for the theme picker control. */
  private theme!: HTMLSelectElement;

  /**
   * Create a new `<google-map>` element.
   *
   * Reads HTML attributes to configure the map, initialises the
   * `google.maps.Map` instance, optionally attaches the theme picker,
   * and wires up the `click.map` custom event.
   */
  constructor() {
    super();

    // ── Build the map options from element attributes ──────────────
    const option: GoogleMapOption = {
      zoom: 13,
      center: { lat: 0, lng: 0 },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: undefined,
      // disableDefaultUI: true,
      zoomControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      clickableIcons: false
    };
    if (this.getAttribute('zoom')) option.zoom = parseInt(this.getAttribute('zoom') as string, 10);
    if (this.getAttribute('center')) {
      const [ lat, lng ] = (this.getAttribute('center') ? this.getAttribute('center') : '0,0')!.split(',');
      option.center = { lat: parseFloat(lat), lng: parseFloat(lng) };
    }
    if (this.getAttribute('type')) option.mapTypeId = this.getAttribute('type') as google.maps.MapTypeId;
    // @ts-ignore
    if (this.getAttribute('theme') && this.getAttribute('theme') in themes) option.styles = themes[this.getAttribute('theme')] as google.maps.MapTypeStyle[];
    if (this.getAttribute('zoom-control') !== null) option.zoomControl = true;
    if (this.getAttribute('streetview-control') !== null) option.streetViewControl = true;
    if (this.getAttribute('fullscreen-control') !== null) option.fullscreenControl = true;

    // ── Initialise the map ────────────────────────────────────────
    this.map = new google.maps.Map(this, option);

    // ── Theme picker control ──────────────────────────────────────
    // If the `theme-control` attribute is present, render a <select> dropdown
    // and restore the user's last selection from a cookie.
    if (this.getAttribute('theme-control') !== null) {
      this.addThemeControl();
      if (Cookie.get('theme') && (Cookie.get('theme') === 'standard' || Cookie.get('theme') in themes)) {
        // @ts-ignore
        const styles = Cookie.get('theme') !== 'standard' ? themes[Cookie.get('theme')] as google.maps.MapTypeStyle[] : undefined;
        this.map.setOptions({ styles });
        const option = this.theme.querySelector(`option[value="${Cookie.get('theme')}"`) as HTMLOptionElement;
        option.setAttribute('selected', 'selected');
      }
    }

    // ── Forward native map clicks as a custom DOM event ───────────
    this.map.addListener('click', event => this.invoke('click.map', { lat: event.latLng.lat(), lng: event.latLng.lng() }));
  }

  /**
   * Lifecycle callback — invoked each time the element is inserted into the DOM.
   *
   * Ensures the element has `display: block` so the map renders correctly,
   * since custom elements default to `display: inline`.
   */
  protected connectedCallback(): void {
    this.classList.add('google-map');
    if (getComputedStyle(this).display === 'inline') this.style.display = 'block';
  }

  /**
   * Register the `<google-map>` custom element in the browser's Custom
   * Elements registry. Safe to call multiple times — subsequent calls are
   * no-ops.
   *
   * @returns The `GoogleMap` class itself (for chaining).
   */
  public static define(): any {
    if (window.customElements.get('google-map')) return this;
    window.customElements.define('google-map', this);
    return this;
  }

  /**
   * Convenience factory: defines the custom element (if not already defined)
   * and returns a new instance.
   *
   * @returns A new `<google-map>` element instance.
   */
  public static createElement(): any {
    this.define();
    return new (window.customElements.get('google-map'))()
  }

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
  public async addMarker(option? : GoogleMapCircleMarkerOption): Promise<GoogleMapCircleMarker> {
    const circlemarker = new GoogleMapCircleMarker(this.map);
    await circlemarker.attach(option);
    return circlemarker;
  }

  /**
   * Remove a marker from the map and release its resources.
   *
   * @param marker - The marker instance returned by {@link addMarker}.
   * @returns This `GoogleMap` instance (for chaining).
   */
  public removeMarker(marker : GoogleMapCircleMarker): GoogleMap {
    marker.remove();
    // @ts-ignore
    marker = null;
    return this;
  }

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
  public zoomToFitAllPositions(positions: google.maps.LatLng[]|google.maps.LatLngLiteral[]|google.maps.Marker[]|GoogleMapCircleMarker[]): GoogleMap {
    const bounds = new google.maps.LatLngBounds();
    for (let position of positions) {
      // Normalise each item into a LatLng and extend the bounding box.
      if (position instanceof google.maps.LatLng) bounds.extend(position);
      else if (position instanceof google.maps.Marker) bounds.extend(position.getPosition() as google.maps.LatLng);
      else if (position instanceof GoogleMapCircleMarker) bounds.extend((position as GoogleMapCircleMarker).getPosition());
      else bounds.extend(position as google.maps.LatLngLiteral);
    }
    this.map.fitBounds(bounds);
    return this;
  }

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
  public moveToPosition(latlng: google.maps.LatLng|google.maps.LatLngLiteral, zoomToCurrentPosition: boolean = true): GoogleMap {
    if (zoomToCurrentPosition) this.map.panTo(latlng);
    else this.map.setCenter(latlng);
    return this;
  }

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
   public on(type: string, listener: (event?: Event) => void, option: { once: boolean } = { once: false }): GoogleMap {
    this.addEventListener(type, listener, option);
    return this;
  }

  /**
   * Unsubscribe from a custom DOM event.
   *
   * @param type     - Event name.
   * @param listener - The same callback reference passed to {@link on}.
   * @returns This `GoogleMap` instance (for chaining).
   */
   public off(type: string, listener: (event?: Event) => void): GoogleMap {
    this.removeEventListener(type, listener);
    return this;
  }

  /**
   * Dispatch a custom DOM event with an optional detail payload.
   *
   * @param type   - Event name to dispatch.
   * @param detail - Arbitrary data attached to `event.detail`.
   */
  private invoke(type: string, detail: {} = {}): void {
    const event = new CustomEvent(type, { detail });
    this.dispatchEvent(event);
  }

  /**
   * Build and attach the theme picker `<select>` control to the map.
   *
   * The dropdown is placed at `TOP_LEFT` and persists the user's choice
   * in a cookie so it survives page reloads.
   */
  private addThemeControl(): void {
    // Create the <select> element and populate it with theme options.
    this.theme = document.createElement('select') as HTMLSelectElement;
    this.theme.classList.add('google-map-theme-control');
    for (let value of [ 'standard', ...Object.keys(themes) ]) {
      const option = document.createElement('option');
      option.textContent = `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
      option.value = value;
      this.theme.appendChild(option);
    }

    // When the user picks a theme, apply the style and persist the choice.
    this.theme.addEventListener('change', (event: Event) => {
      const value = (<HTMLSelectElement>event.target).value;
      // @ts-ignore
      this.map.setOptions({ styles: value !== 'standard' ? themes[value] as google.maps.MapTypeStyle[] : undefined });
      Cookie.set('theme', value);
    });

    // Place the control on the map UI.
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.theme);
  }
}

GoogleMap.define();
export default GoogleMap;
