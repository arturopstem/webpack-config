# Webpack Config: Tailwind

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

### Set VSCode lint and format on save plus ignore unknown css

Open Command Pallete with `Ctrl + Shift + P`, look for and select `Preferences: Open Workspace Settings (JSON)` and add the following content:

```json
{
  "css.lint.unknownAtRules": "ignore",
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

## Install tailwind

```console
npm i -D tailwindcss postcss autoprefixer postcss-loader
```

Initialize tailwind and create postcssconfig file

```console
npx tailwind init -p
```

In file **tailwind.config.js** content should be updated to

```js
  content: ['./src/**/*.{html,js}'],
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
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          'postcss-loader',
        ],
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
    <title>Webpack + Tailwind</title>
  </head>
  <body>
    <h1 class="text-3xl font-bold underline text-orange-500">
      Webpack + Tailwind
    </h1>
    <button
      class="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-gray-900 rounded-lg hover:bg-gray-800 focus:shadow-outline focus:outline-none"
    >
      Click Me
    </button>
  </body>
</html>
```

In **style.css** add the Tailwind directives and some css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: light dark;
}
```

In **index.js** add the following content

```js
import './style.css';

const markup = `
<div
id="toast-simple"
class="flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
role="alert"
>
  <svg
    class="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 18 20"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"
    />
  </svg>
  <div class="ps-4 text-sm font-normal">Message sent successfully.</div>
</div>
`;

function showToast() {
  const toast = new DOMParser()
    .parseFromString(markup, 'text/html')
    .querySelector('#toast-simple');

  document.body.appendChild(toast);
}

const button = document.querySelector('button');
button.addEventListener('click', () => showToast());
```

## Enjoy

Now just `npm start` to open a dev server.

And `npm run build` or `npm run dev` depending which mode you select.

Finally `npm run ghdeploy` to upload dist to GH pages.

This example is using some of the default paths for entry and output.
