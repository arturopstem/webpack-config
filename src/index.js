import './style.css';

const markup = `
<h1 class="text-3xl font-bold underline text-orange-500">
  Webpack + Tailwind + ESLint + Prettier
</h1>
`;

const h1 = new DOMParser()
  .parseFromString(markup, 'text/html')
  .querySelector('h1');

document.body.appendChild(h1);
