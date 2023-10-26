# Webpack Config: Sass + Babel + ESLint + Prettier

## Prerequisites

VSCode extensions:

- ESLint
- Prettier

## Getting started

To begin, create a **.gitignore** file:

```console
touch .gitignore
```

Add node_modules to .gitignore to not upload all the packages to the remote repo:

```txt
node_modules
```

## Initialize NPM

```console
npm init -y
```

## ESLint and Prettier

```console
npm i -D eslint prettier eslint-config-prettier
```

Initialize ESLint config

```console
npm init @eslint/config
```

```console
? How would you like to use ESLint? …
  To check syntax only
  To check syntax and find problems
▸ To check syntax, find problems, and enforce code style

? What type of modules does your project use? …
▸ JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these

? Which framework does your project use? …
  React
  Vue.js
▸ None of these

? Does your project use TypeScript? ‣ No / Yes

? Where does your code run? …  (Press <space> to select, <a> to toggle all, <i> to invert selection)
✔ Browser
  Node

▸ Use a popular style guide
  Answer questions about your style

? Which style guide do you want to follow? …
▸ Airbnb: https://github.com/airbnb/javascript
  Standard: https://github.com/standard/standard
  Google: https://github.com/google/eslint-config-google
  XO: https://github.com/xojs/eslint-config-xo

? What format do you want your config file to be in? …
  JavaScript
  YAML
▸ JSON

Checking peerDependencies of eslint-config-airbnb-base@latest
The config that you've selected requires the following dependencies:

eslint-config-airbnb-base@latest eslint@^7.32.0 || ^8.2.0 eslint-plugin-import@^2.25.2
? Would you like to install them now?   No / ‣ Yes

? Which package manager do you want to use? …
▸ npm
  yarn
  pnpm
```

### ESLint and Prettier config

In file **.eslintrc.json**

Add prettier to extends:

```json
    "extends": [
        "airbnb-base",
        "prettier"
    ],
```

As well as some rules

```json
    "rules": {
        "no-console": "off"
    }
```

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

### Set VSCode lint and format on save

Open Command Pallete with `Ctrl + Shift + P`, look for and select `Preferences: Open Workspace Settings (JSON)` and add the following content:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript"],
  "editor.formatOnSave": true
}
```

## Install Webpack

```console
npm i -D webpack webpack-cli
```

Install webpack plugins

```console
npm i -D html-webpack-plugin eslint-webpack-plugin mini-css-extract-plugin css-minimizer-webpack-plugin css-loader webpack-dev-server
```

## Install Sass

```console
npm i -D sass sass-loader
```

## Install Babel

```console
npm i -D babel-loader @babel/core @babel/preset-env
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
const ESLintPlugin = require('eslint-webpack-plugin');

const config = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin(),
    new ESLintPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
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
    "ghdeploy": "git subtree push --prefix dist origin gh-pages"
  },
```

## Creation of example source files

```console
mkdir src
```

```console
touch src/{index.{html,js},style.scss}
```

In **index.html** file add the a template like the following

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sass + Babel + ESLint + Prettier</title>
  </head>
  <body></body>
</html>
```

In **style.scss** add some css

```scss
$theme: dark;

:root {
  color-scheme: $theme;
}
```

In **index.js** add the following content

```js
import './style.scss';

const markup = `
<h1>Webpack + Sass + Babel + ESLint + Prettier</h1>
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
