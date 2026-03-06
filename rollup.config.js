/**
 * Rollup build configuration for google-map-extension.
 *
 * Produces three output bundles from a single TypeScript entry point:
 *   - ESM   (for modern bundlers like Webpack / Vite)
 *   - CJS   (for Node.js / CommonJS consumers)
 *   - UMD   (for direct <script> inclusion in browsers)
 */
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json';

export default {
  // external: Object.keys(pkg['dependencies'] || []),

  // Entry point — everything is pulled in from here.
  input: './src/index.ts',

  plugins: [
    // Process .css imports and inject them as <style> tags at runtime.
    postcss(),

    // Compile TypeScript and emit declaration files to the directory
    // specified in tsconfig.json (useTsconfigDeclarationDir: true).
    typescript({
      tsconfigDefaults: { compilerOptions: {} },
      tsconfig: 'tsconfig.json',
      tsconfigOverride: { compilerOptions: {} },
      useTsconfigDeclarationDir: true
    }),

    // Minify the output for production use.
    terser(),

    // Allow importing .json files (theme definitions, package.json, etc.).
    json(),

    // Convert CommonJS dependencies (e.g. js-shared) to ES modules.
    commonjs(),

    // Resolve bare module specifiers from node_modules.
    resolve({
      mainFields: ['module', 'main']
    })
  ],

  output: [
    // ES module build — tree-shakeable, consumed by modern bundlers.
    {
      format: 'esm',
      file: pkg.module
    },
    // CommonJS build — for Node.js or legacy bundler environments.
    {
      format: 'cjs',
      file: pkg.main
    },
    // UMD build — works in browsers via <script>, AMD loaders, and Node.
    // The global variable name is derived from the package name by
    // converting kebab-case to camelCase (e.g. "google-map-extension"
    // becomes "googleMapExtension").
    {
      format: 'umd',
      file: pkg.browser,
      name: pkg.name
        .replace(/^.*\/|\.js$/g, '')
        .replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''))
    }
  ],

  watch: {
    exclude: 'node_modules/**',
    include: 'src/**'
  }
}
