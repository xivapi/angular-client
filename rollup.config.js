import resolve from 'rollup-plugin-node-resolve';

// Add here external dependencies that actually you use.
const globals = {
    '@angular/core': 'ng.core',
};

export default {
    entry: './dist/modules/xivapi-client.es5.js',
    dest: './dist/bundles/xivapi-client.umd.js',
    format: 'umd',
    exports: 'named',
    moduleName: 'xivapi.angularClient',
    plugins: [resolve()],
    external: Object.keys(globals),
    globals: globals,
    onwarn: () => { return }
}
