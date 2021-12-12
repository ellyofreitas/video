import { chain } from '@shared/main/utils/chain';
import { Route } from '@shared/presentation/http';

const concatPaths = (prefix: string, resource: string) => {
  const cleanPrefix = chain(
    (p: string) => (p.startsWith('/') ? p : `/${p}`),
    (p: string) => (p.endsWith('/') ? p.substring(0, p.length - 1) : p)
  );

  const cleanResource = chain(
    (p: string) => (p.startsWith('/') ? p.substring(1, p.length) : p),
    (p: string) => (p.endsWith('/') ? p.substring(0, p.length - 1) : p)
  );

  return `${cleanPrefix(prefix)}/${cleanResource(resource)}`;
};

export const defineRoutes = (routes: Route[]): Route[] => routes;
export const applyPrefix = (prefix: string, routes: Route[]): Route[] =>
  routes.map((route) => ({
    ...route,
    resource: concatPaths(prefix, route.resource),
  }));
