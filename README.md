# Webpack Bower Sass Sources

A helper for including [Sass](http://sass-lang.com) modules installed via [Bower](http://bower.io)
when evaluating `@import` in Sass files compiled by [webpack](https://webpack.github.io).

## Installation

Install via [npm](https://www.npmjs.com):

```sh
$ npm install webpack-bower-sass-sources --save-dev
```

## Usage

Add `sassSources` to the Sass Loader's webpack config:

```js
var sassSources = require('webpack-bower-sass-sources');

module.exports = {
  module: {
    loaders: [{
      test:    /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }]
  },

  sassLoader: {
    includePaths: sassSources
  }
};
```

Install a Bower component:

```bash
bower install codelation-sass-mixins --save
```

Use the installed Bower component as expected:

```scss
@import "codelation";

.columns {
  @include has-columns(3, 12px);
}
```
