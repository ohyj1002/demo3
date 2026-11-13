import { createRoot } from 'react-dom/client';

import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';

import './index.css';

const recoveryParams = new URLSearchParams(window.location.search);
const recoveryRoute = recoveryParams.get('p');
if (recoveryRoute) {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  const routePath = recoveryRoute.startsWith('/')
    ? recoveryRoute
    : `/${recoveryRoute}`;
  const originalQuery = recoveryParams.get('q');
  const restoredUrl = `${basePath}${routePath}${originalQuery ? `?${originalQuery}` : ''}${window.location.hash}`;
  window.history.replaceState(null, '', restoredUrl);
}

createRoot(document.getElementById('root')!, {
  // Keeps caught errors off reportError(), which would raise the dev overlay.
  onCaughtError: (error, errorInfo) => {
    console.error(error, errorInfo.componentStack);
  },
}).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
