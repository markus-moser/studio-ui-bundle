const Encore = require('@symfony/webpack-encore');
const path = require('path');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
  // directory where compiled assets will be stored
  .setOutputPath(path.resolve(__dirname, 'public', 'build'))
  // public path used by the web server to access the output path
  .setPublicPath('/bundles/pimcorestudioui/build')
  
  /*
    * ENTRY CONFIG
    *
    * Each entry will result in one JavaScript file (e.g. app.js)
    * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
    */
  .addEntry('main', path.resolve(__dirname, 'assets', 'js', 'main.ts'))

  // enables the Symfony UX Stimulus bridge (used in assets/bootstrap.js)
  // .enableStimulusBridge('./assets/controllers.json')

  // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
  .splitEntryChunks()

  // will require an extra script tag for runtime.js
  // but, you probably want this, unless you're building a single-page app
  .disableSingleRuntimeChunk()

  /*
    * FEATURE CONFIG
    *
    * Enable & configure other features below. For a full
    * list of features, see:
    * https://symfony.com/doc/current/frontend.html#adding-more-features
    */
  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()
  .enableSourceMaps(!Encore.isProduction())
  // enables hashed filenames (e.g. app.abc123.css)
  .enableVersioning(Encore.isProduction())

  // .configureBabel((config) => {
  //   config.plugins.push('@babel/plugin-transform-class-properties');
  // })

  // enables @babel/preset-env polyfills
  // .configureBabelPresetEnv((config) => {
  //     config.useBuiltIns = 'usage';
  //     config.corejs = 3;
  // })

  // enables Sass/SCSS support
  //.enableSassLoader()

  // uncomment if you use TypeScript
  .enableTypeScriptLoader()

  // uncomment if you use React
  .enableReactPreset()

  // uncomment to get integrity="..." attributes on your script & link tags
  // requires WebpackEncoreBundle 1.4 or higher
  //.enableIntegrityHashes(Encore.isProduction())

  // uncomment if you're having problems with a jQuery plugin
  //.autoProvidejQuery()

  .configureDevServerOptions(options => {
    options.host = '0.0.0.0';
    options.hot =  true;
    options.port = 3030;
    options.allowedHosts = 'all';
  })

  .enableEslintPlugin({
    extensions: ['js', 'jsx', 'ts', 'tsx'],
    fix: true
  })

  .addAliases({
    '@Pimcore': path.resolve(__dirname, 'assets', 'js')
  })
;

if (!Encore.isDevServer()) {
  // only needed for CDN's or sub-directory deploy
  Encore
    .setManifestKeyPrefix('bundles/pimcorestudioui/build')

    .addPlugin(new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }))
  ;
}

if (Encore.isDevServer()) {
  Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .addPlugin(new ReactRefreshPlugin())
  ;
}

let config = Encore.getWebpackConfig();

config = {
  ...config,
  
  output: {
    ...config.output,
    library: 'Pimcore',
  }
}

module.exports = config;
