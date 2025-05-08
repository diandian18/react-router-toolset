import { history, HistoryRouter } from '@@/router';
import App from './App';
import { createRoot } from 'react-dom/client';

const basename = import.meta.env.VITE_BASENAME;

const root = createRoot(document.getElementById('root')!);

root.render(
  <HistoryRouter
    history={history}
    basename={basename}
  >
    <App />
  </HistoryRouter>,
);
