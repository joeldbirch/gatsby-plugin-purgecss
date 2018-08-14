/**
 * @typedef {import('webpack').Configuration} WebpackConfig
 * @typedef {import('webpack').RuleSetRule} RuleSetRule
 * @typedef {import('webpack').RuleSetLoader} RuleSetLoader
 */

import { findLoader, insertLoader } from './utils';
import path from './paths';
import Logger from './shared';

const loadersRegex = /stylus-loader|sass-loader|less-loader/;

export function onCreateWebpackConfig(
  { actions, stage, getConfig },
  { plugins, ...userOptions }
) {

  userOptions = {
    content: [path.src],
    rejected: true,
    printRejected: false,
    whitelist: ['html', 'body'],
    ...userOptions
  };

  if (userOptions.rejected && stage === 'build-html') {
    console.log(
      '\x1b[33m%s\x1b[0m',
      `gatsby-plugin-purgecss removed ${Logger.removedQuantity} selectors`
    );
  }

  if (stage !== 'build-javascript') {
    return;
  }

  const { setWebpackConfig } = actions;

  /**
   * @type {WebpackConfig}
   */
  const config = getConfig();
  const existingRules = config.module.rules;

  /**
   * @type {RuleSetLoader}
   */
  const purgecssloader = {
    loader: path.loader,
    options: userOptions
  };

  existingRules.forEach(rule => {
    if (Array.isArray(rule.oneOf)) {
      rule.oneOf.forEach(rule => {
        if (Array.isArray(rule.use)) {
          const index = findLoader(rule.use, loadersRegex);
          insertLoader(rule.use, index, purgecssloader);
        }
      });
    }
  });

  actions.replaceWebpackConfig(config);

  /**
   * @type {RuleSetRule}
   */
  const purgecssRule = {
    test: /.css$/,
    use: [purgecssloader]
  };

  setWebpackConfig({
    module: {
      rules: [purgecssRule]
    }
  });
}
