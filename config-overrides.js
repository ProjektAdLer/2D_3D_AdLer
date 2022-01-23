const { override, addBabelPlugin } = require('customize-cra');
const pluginProposalDecorators = require('@babel/plugin-proposal-decorators');
const test = require('babel-plugin-transform-typescript-metadata');

module.exports = override(addBabelPlugin([pluginProposalDecorators, { legacy: true }]), addBabelPlugin(test));
