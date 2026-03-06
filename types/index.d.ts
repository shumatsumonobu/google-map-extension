/**
 * google-map-extension — public API surface.
 *
 * Re-exports the core custom element, the utility class, and the
 * package version string.
 *
 * @packageDocumentation
 */
import { version } from '~/package';
import GoogleMap from '~/GoogleMap';
import GoogleMapUtils from '~/GoogleMapUtils';
export { version, GoogleMap, GoogleMapUtils };
