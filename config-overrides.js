const path = require('path');
var VirtualModulesPlugin = require('webpack-virtual-modules');
// var VirtualModulesPlugin = require('virtual-module-webpack-plugin');
var serialize = require('serialize-javascript');
var ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const customLoader = {
  test: /\.js$/,
  use: [{
    loader: path.resolve("./loader.js"),
    options: {
      name: "[name].[ext]",
      outputPath: (url, resourcePath, context) => {
        console.log('url', url);
        console.log('context', context);
        console.log('resourcePath', resourcePath);

        return "test";
      },
    },
  },],
};

const runtimeJsonContents = `
module.exports = {
  greeting: 'Hello!',
};
`;

var virtualModules = new VirtualModulesPlugin({
  'node_modules/someLib.js': 'module.exports = { foo: "foo" };',
  'node_modules/module-bar.js': 'module.exports = { bar: "bar" };'
});


class ReproPlugin {
  apply(compiler) {
    const virtualModules = new VirtualModulesPlugin();
    virtualModules.apply(compiler);

    compiler.hooks.compilation.tap(this.constructor.name, (compilation, { normalModuleFactory }) => {
      normalModuleFactory.hooks.beforeResolve.tap(this.constructor.name, (result) => {
        if (/\.virtual\.tsx$/i.test(result.request)) {
          virtualModules.writeModule(
            path.resolve(result.context, result.request),
            runtimeJsonContents);
        }
        // uncomment if webpack < 5
        // return result;
      });
    });
  }
}


// const Module = require('./src/app/modules/User/Users.module.js');

// const UsersModule = serialize(Module);

var PrintChunksPlugin = function () { };
PrintChunksPlugin.prototype.apply = function (compiler) {
  compiler.plugin('compilation', function (compilation, params) {
    compilation.plugin('after-optimize-chunk-assets', function (chunks) {
      console.log(chunks.map(function (c) {
        return {
          id: c.id,
          name: c.name,
          includes: c
        };
      }));
    });
  });
};

function SwaggerPlugin() { }
SwaggerPlugin.prototype.apply = async function (compiler) {

  // #1
  // Create a package.json module, path, and file
  const pkgJsonModule = './package.json';
  const pkgJsonPath = require.resolve(pkgJsonModule);
  const pkgJson = require(pkgJsonModule);

  // #2 
  // Sample data for the future virtual JSON file
  const info = {
    title: pkgJson.name,
    version: pkgJson.version,
    description: pkgJson.description
  };

  // #3
  // Using the 'package.json' path to create the path to 
  // the virtual module `swagger.json`.
  // Webpack will "see" the module `swagger.json`
  // by a path similar to this:
  // '/home/johndoe/webpack-virtual-modules/examples/node_modules/swagger.json'
  const swaggerJsonPath = path.join(
    path.dirname(pkgJsonPath),
    'node_modules',
    'swagger.json');

  // #4 
  // Create a new virtual module with the initial content
  const virtualModules = new VirtualModulesPlugin({
    [swaggerJsonPath]: JSON.stringify(info)
  });

  // #5 
  // Set up webpack hooks to listen to `SwaggerPlugin` event
  virtualModules.apply(compiler);

  compiler.hooks.compilation.tap('SwaggerPlugin', function (compilation) {
    console.log('compilation', compilation);


    try {
      // Using swagger-jsdoc to generate a new virtual JSON file
      const swaggerJson = { updated: true };
      // Writing a new virtual module will happen each time the project is changed
      virtualModules.writeModule(swaggerJsonPath, JSON.stringify(swaggerJson));
    } catch (e) {
      compilation.errors.push(e);
    }
  })
}

function VirtualModuler() { }
VirtualModuler.prototype.apply = function (compiler) {
  const libPath = 'node_modules/someLib.js';
  const modulize = (c) => {
    return `module.exports = ${JSON.stringify(c)}`
  };

  const info = {
    title: 'pkgJson.name',
    version: 'pkgJson.version',
    description: 'pkgJson.description'
  };

  const virtualModules = new VirtualModulesPlugin({
    [libPath]: modulize(info)
  });

  virtualModules.apply(compiler);
  console.log('virtualModules', { virtualModules, compiler });
  var chunks = [];
  compiler.hooks.done.tap('MyPlugin', (a, b) => {
    console.log('shouldEmit', { a, b });

    const chnks = a.chunks.map(function (c) {
      return {
        id: c.id,
        name: c.name,
      };
    });
    virtualModules.writeModule(libPath, modulize({ data: chnks }))
    // return true to emit the output, otherwise false
    return true;
  });


  // compiler.hooks.reviveChunks.tap('somestaff', (a, b) => {
  //   console.log('SwaggerPlugin [after]', { a, b }, Object.values(a).length);
  //   if (Object.values(a).length > 1) {
  //     console.log('SwaggerPlugin [write]', { a, b }, Object.values(a).length);
  //     const chnks = chunks.map(function (c) {
  //       return {
  //         id: c.id,
  //         name: c.name,
  //         includes: c
  //       };
  //     });
  //     virtualModules.writeModule(libPath, modulize(chnks))
  //   }
  // })

  // compiler.hooks.compilation.tap('SwaggerPlugin', function (compilation) {
  //   // console.log('SwaggerPlugin', compilation.getStats());


  //   return;

  //   try {
  //     // Using swagger-jsdoc to generate a new virtual JSON file
  //     const newContent = { updated: true };
  //     // Writing a new virtual module will happen each time the project is changed
  //     virtualModules.writeModule(libPath, modulize(compilation.chunks));
  //   } catch (e) {
  //     compilation.errors.push(e);
  //   }
  // })
}
const {
  resolve
} = require('path');

function resolveTsconfigPathsToAlias({
  tsconfigPath = './tsconfig.base.json',
  webpackConfigBasePath = __dirname,
} = {}) {
  const {
    paths
  } = require(tsconfigPath).compilerOptions;


  const aliases = {};

  Object.keys(paths).forEach((item) => {
    const key = item.replace('/*', '');
    const value = resolve(webpackConfigBasePath, paths[item][0].replace('/*', '').replace('*', ''));

    aliases[key] = value;
  });

  return aliases;
}


const aliasesOptions = resolveTsconfigPathsToAlias();
// console.log('aliases', aliasesOptions);
const { alias } = require('react-app-rewire-alias')

module.exports = function override(config, env) {
  config.output = {
    ...config.output, // copy all settings
    filename: "static/js/[name].js",
    chunkFilename: "static/js/[name].chunk.js"
  };
  config.optimization = {
    ...config.optimization,
    moduleIds: 'hashed',
    splitChunks: {
      ...config.optimization.splitChunks,
      chunks: function (chunk) {
        // exclude `my-excluded-chunk`
        // console.log('hiiiiiiiiiiiit', chunk);
        return chunk.name !== 'my-excluded-chunk';
      },
      minChunks: 1,
      maxAsyncRequests: 30,
      enforceSizeThreshold: 50000,
      // chunks: 'all',
      // maxInitialRequests: Infinity,
      minSize: 5000000,
      cacheGroups: {
        // ...config.output.optimization.splitChunks.chnks,

        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          chunks: "all",
          name: "react",
          enforce: true,
          minChunks: Infinity
        },
        bootstrap: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          name: "bootstrap",
          enforce: true,
          minChunks: Infinity
        },
      },
    },
  }
  config.module = {
    ...config.module,
    rules: [
      ...config.module.rules,
      // customLoader
    ]
  };
  // config.resolve.alias = { ...config.resolve.alias, ...aliasesOptions };
  alias(aliasesOptions)(config);

  config.plugins = [
    ...config.plugins,
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, 'src/sw.js'),
    }),
    // new VirtualModuler(),
    // new PrintChunksPlugin(),
    // new SwaggerPlugin()
  ]

  return config;
};