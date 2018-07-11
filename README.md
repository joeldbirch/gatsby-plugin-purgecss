# Gatsby Plugin Purgecss (beta)
For Gatsby 2 only

[![Build Status](https://travis-ci.org/anantoghosh/gatsby-plugin-purgecss.svg?branch=master)](https://travis-ci.org/anantoghosh/gatsby-plugin-purgecss)
[![npm version](https://badge.fury.io/js/gatsby-plugin-purgecss.svg)](https://badge.fury.io/js/gatsby-plugin-purgecss) [![Greenkeeper badge](https://badges.greenkeeper.io/anantoghosh/gatsby-plugin-purgecss.svg)](https://greenkeeper.io/)

[![dependencies](https://david-dm.org/anantoghosh/gatsby-plugin-purgecss.svg)](https://david-dm.org/anantoghosh/gatsby-plugin-purgecss/)
[![dev dependencies](https://david-dm.org/anantoghosh/gatsby-plugin-purgecss/dev-status.svg)](https://david-dm.org/anantoghosh/gatsby-plugin-purgecss?type=dev)
[![peer dependencies](https://david-dm.org/anantoghosh/gatsby-plugin-purgecss/peer-status.svg)](https://david-dm.org/anantoghosh/gatsby-plugin-purgecss?type=peer)
## What is this plugin about?

This plugin allows Gatsby to remove unused css from css/sass/less/stylus files and modules using [purgecss](https://github.com/FullHuman/purgecss).

## Supported files

* .css , .module.css
* .scss, .sass, .module.scss, .module.sass (via [gatsby-plugin-sass](https://next.gatsbyjs.org/packages/gatsby-plugin-sass/))
* .less, .module.less (via [gatsby-plugin-less](https://next.gatsbyjs.org/packages/gatsby-plugin-less/))
* styl, .module.styl (via [gatsby-plugin-stylus](https://next.gatsbyjs.org/packages/gatsby-plugin-sass/))

## Installation

```
npm i --save-dev gatsby-plugin-purgecss
```

### Usage

>**Add the plugin AFTER other css plugins**

```js
// gatsy-config.js
module.exports = {
  plugins: [
    `gatsby-plugin-stylus`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-less`,
    // Add after these plugins if used
    `gatsby-plugin-purgecss`
  ]
};

```

## Important Notes

### Running
This plugin only runs when building the project (gatsby build).  
To make sure the plugin is working, set `rejected: true` option to print out the removed selectors.

### Selector matching
This plugin loads css files (or transformed output from css plugins) and searches for matching selectors in js, jsx, ts, tsx files in `src/`. It does not know which css file belongs to which source file. Therefore, for eg., if there is a class `.module` in some css file, it will not be removed if it used in *any* script file under `src/`.

### Whitelist ['html', 'body']
Since html and body tags do not appear in `src/` files, it is whitelisted by default to not be removed.  
If there is a need to modify the whitelist, it is recommended to keep these tags and append the required selectors using the option 
`whitelist: ['html', 'body', '.my-selector']`

## Options
This plugins supports most purgecss options as is (except `css`).  
>[Read about purgecss options in detail](https://www.purgecss.com/configuration)

```js
{
  resolve: `gatsby-plugin-purgecss`,
  options: {
    /** 
     * Print the list of removed selectors.
     * default: false
     **/ 
    rejected?: boolean,


    /**
     * Stops from removing these selectors.
     * default: ['html', 'body']
     * If you want to whitelist more selectors, make sure to include 'html', 'body' in the array.
     **/
    whitelist?: Array<string>,


    /**
     * These options are available but not used by default.
     * Read more https://www.purgecss.com/configuration
     **/
    extractors?: Array<ExtractorsObj>,
    whitelistPatterns?: Array<RegExp>,
    whitelistPatternsChildren?: Array<RegExp>,
    keyframes?: boolean,
    fontFace?: boolean,


    /**
     * Files to search for selectors.
     **/
     // default: [path.join(process.cwd(), 'src/**/!(*.d).{ts,js,jsx,tsx}')]
    content: Array<string | RawContent>, 
  }
}
```

## Versioning

Gatsy-plugin-purgecss use [SemVer](http://semver.org/) for versioning.  
It will try to match official gatsby plugin's major version when released.

## Acknowledgment

This project was made possible due to the incredible work done on the following projects:
* [purgecss](https://github.com/FullHuman/purgecss)
* [purgecss-loader](https://github.com/americanexpress/purgecss-loader)
* [gatsby](https://github.com/gatsbyjs/gatsby/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.