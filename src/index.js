import './style.css';

const markup = `
<h1>Webpack Basic</h1>
`;

const h1 = new DOMParser()
  .parseFromString(markup, 'text/html')
  .querySelector('h1');

document.body.appendChild(h1);
