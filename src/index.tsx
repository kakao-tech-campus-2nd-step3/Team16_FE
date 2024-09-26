import '@/styles';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@/App';

async function deferRender() {
  const environment = process.env.REACT_APP_ENV;
  if (environment === 'development') {
    const { worker } = await import('./mocks/browser');
    await worker.start();
  }

  return;
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

deferRender().then(() =>
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  ),
);
