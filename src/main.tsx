// Safe fetch descriptor patch for browser environments where window.fetch has only a getter
if (typeof window !== 'undefined') {
  try {
    const proto = Object.getPrototypeOf(window) || window;
    const desc = Object.getOwnPropertyDescriptor(proto, 'fetch') || Object.getOwnPropertyDescriptor(window, 'fetch');
    if (desc && !desc.set) {
      let activeFetch = window.fetch.bind(window);
      Object.defineProperty(window, 'fetch', {
        get() {
          return activeFetch;
        },
        set(newFetch) {
          activeFetch = typeof newFetch === 'function' ? newFetch.bind(window) : newFetch;
        },
        configurable: true,
        enumerable: true,
      });
    }
  } catch {
    // Graceful fallback
  }
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
