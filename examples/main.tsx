// import { history, HistoryRouter } from '@/index';
import { history, HistoryRouter } from '../dist-lib/react-router-toolset';
import App from './App';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root')!);

root.render(
  <HistoryRouter history={history}>
    <App />
  </HistoryRouter>,
);
