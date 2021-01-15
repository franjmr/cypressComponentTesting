const VueLoaderPlugin = require("vue-loader/lib/plugin");
const webpack = require("@cypress/webpack-preprocessor");
const cypressNuxt = require("cypress-nuxt");

const filePreprocessor = () => {
  return cypressNuxt.plugin();
};

/** Standard Vue Componentes use VueLoaderPlugin
const webpackOptions = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ]
  },
  plugins: [new VueLoaderPlugin()]
};


const options = {
  webpackOptions,
  watchOptions: {},
};

module.exports = (on) => {
  const options = {
    webpackOptions,
    watchOptions: {},
  };
  on("file:preprocessor", webpack(options));
};
 */

 /** Vue Componentes that use Nuxt decorators**/
module.exports = async (on, config) => {
  on("file:preprocessor", await filePreprocessor());
  return config;
};