import './index.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'whatwg-fetch';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { AppConfiguration } from 'components/App/AppConfiguration';
import { App } from 'components/App/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppConfiguration />
  </StrictMode>
);
