import './main.css';

function component() {
  const element = document.createElement('h1');

  element.innerHTML = 'Webpack Tailwind + ESLint + Prettier';
  const twClasses = ['text-3xl', 'font-bold', 'underline', 'text-orange-500'];
  element.classList.add(...twClasses);

  console.log(
    'Message to be deleted or disable with eslint comment or eslint config rule'
  );
  return element;
}

document.body.appendChild(component());
