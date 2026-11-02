import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { ROUTER_BASENAME } from './utils/assetUrl';
// Self-hosted fonts: served from this website instead of Google, which loads faster.
import '@fontsource-variable/dm-sans/opsz.css';
import '@fontsource-variable/fraunces/opsz.css';
import '@fontsource-variable/fraunces/opsz-italic.css';
import '@fontsource/satisfy/latin-400.css';
import 'lenis/dist/lenis.css';
import './styles/globals.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* basename lets page addresses work when the site lives in a sub-folder (GitHub Pages) */}
    <BrowserRouter basename={ROUTER_BASENAME}>
      <ToastProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
);
