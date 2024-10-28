// import { Router } from '@/index';
import { Router } from '../dist-lib/react-router-toolset';
import { routesConfig } from './routesConfig';

export const router = new Router(routesConfig);

// export * from '@/index';
export * from '../dist-lib/react-router-toolset';