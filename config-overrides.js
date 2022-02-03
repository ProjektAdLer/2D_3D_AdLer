// This file is used together with react-scripts-rewire to overwrite the webpack config of your CRA App to add capability for:
// Typescript Decorators
// TODO: have entry Point of App in src/React/Index.tsx

const { override, addBabelPlugin } = require("customize-cra");
const babelTsTransformPlugin = require("babel-plugin-transform-typescript-metadata");

module.exports = override(addBabelPlugin(babelTsTransformPlugin));
