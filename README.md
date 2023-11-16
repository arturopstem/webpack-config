# Webpack Config: Basic

## Prerequisites

VSCode extensions:

- Prettier

## Getting started

To begin, create a **.gitignore** file:

```console
touch .gitignore
```

Add node_modules and dist to .gitignore to not upload all the packages to the remote repo:

```txt
node_modules
dist

```

## Initialize NPM

```console
npm init -y
```

### Prettier config

Create **.prettierrc.json** file

```console
touch .prettierrc.json
```

with the following rules

```json
{
  "singleQuote": true,
  "overrides": [
    {
      "files": ["*.css", "*.scss", "*.sass", "*.less"],
      "options": {
        "singleQuote": false
      }
    }
  ]
}
```

### Set VSCode format on save

Open Command Pallete with `Ctrl + Shift + P`, look for and select `Preferences: Open Workspace Settings (JSON)` and add the following content:

```json
{
  "editor.formatOnSave": true
}
```

## Install Webpack

```console
npm i -D webpack webpack-cli
```

Install webpack plugins

```console
npm i -D html-webpack-plugin mini-css-extract-plugin css-minimizer-webpack-plugin css-loader webpack-dev-server gh-pages
```

## Webpack config file

Create **webpack.config.js** file

```console
touch webpack.config.js
```

Give **webpack.config.js** the following content

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const config = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

  output: {
    clean: true,
  },

  devServer: { watchFiles: './src/**/*' },
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
  }
  if (argv.mode === 'production') {
    config.optimization = {
      minimizer: [new CssMinimizerPlugin(), '...'],
    };
  }
  return config;
};
```

## Add npm scripts

In file **package.json**, update scripts to contain the following:

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --mode=production",
    "dev": "webpack --mode=development",
    "start": "webpack serve --open --mode=development",
    "ghdeploy": "npm run build && gh-pages -d dist"
  },
```

## Creation of example source files

```console
mkdir src
```

```console
touch src/{index.{html,js},style.css}
```

In **index.html** file add the a template like the following

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Webpack Basic</title>
  </head>
  <body></body>
</html>
```

In **style.css** add and some css

```css
:root {
  color-scheme: dark;
}
```

In **index.js** add the following content

```js
import './style.css';

const markup = `
<h1>Webpack Basic</h1>
`;

const h1 = new DOMParser()
  .parseFromString(markup, 'text/html')
  .querySelector('h1');

document.body.appendChild(h1);
```

## Enjoy

Now just `npm start` to open a dev server.

And `npm run build` or `npm run dev` depending which mode you select.

Finally `npm run ghdeploy` to upload dist to GH pages.

This example is using some of the default paths for entry and output.
