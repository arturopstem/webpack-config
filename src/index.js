import './style.scss';

const markup = `
<h1>Webpack + Sass + Babel + ESLint + Prettier</h1>
`;

const h1 = new DOMParser()
  .parseFromString(markup, 'text/html')
  .querySelector('h1');

document.body.appendChild(h1);
