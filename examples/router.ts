// import { Router } from '@/index';
import { Router } from '../dist-lib/react-router-toolset';
import { routesConfig } from './routesConfig';

const basename = import.meta.env.VITE_BASENAME;

export const router = new Router(routesConfig, {
  basename,
});

// export * from '@/index';
export * from '../dist-lib/react-router-toolset';