/**
 * Built-in map theme definitions.
 *
 * Each JSON file contains an array of `google.maps.MapTypeStyle` rules
 * sourced from the Google Maps Styling Wizard.
 *
 * The "standard" theme is intentionally omitted — it corresponds to
 * `styles: undefined` (Google's default appearance).
 */
import silver from '~/theme/silver.json';
import retro from '~/theme/retro.json';
import dark from '~/theme/dark.json';
import night from '~/theme/night.json';
import aubergine from '~/theme/aubergine.json';

export default {
  silver,
  retro,
  dark,
  night,
  aubergine
}
