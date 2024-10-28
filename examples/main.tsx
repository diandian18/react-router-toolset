import { history, HistoryRouter } from '@@/router';
import App from './App';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root')!);

root.render(
  <HistoryRouter history={history}>
    <App />
  </HistoryRouter>,
);
