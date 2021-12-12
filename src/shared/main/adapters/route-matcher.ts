import { Route } from '@shared/presentation/http';
import { chain } from '@shared/main/utils/chain';

export class NotRouteMatched extends Error {
  name = 'NotRouteMatched';
}

const removeEndSlash = (path: string) =>
  path.endsWith('/') ? path.substring(0, path.length - 1) : path;

const replaceParams = (path: string) =>
  path.replace(/{(.*?)}/gi, (_, param) => `(?<${param}>[^/]+?)`);

const mountPattern = (path: string) => `^${path}(?:/)?$`;

const resolvePattern = chain(removeEndSlash, replaceParams, mountPattern);

const matchMethod = (eventMethod: string, routeMethod: string) =>
  String(eventMethod).toUpperCase() === String(routeMethod).toUpperCase();

const matchResource = (eventPath: string, routeResource: string) => {
  const resourcePattern = new RegExp(resolvePattern(routeResource), 'gi');
  const result = resourcePattern.exec(eventPath);
  if (!result) return undefined;
  return { params: { ...(result?.groups ?? {}) } };
};

export function match(method: string, path: string, routes: Route[]) {
  for (const route of routes) {
    if (!matchMethod(method, route.method)) continue;
    const matchedResource = matchResource(path, route.resource);
    if (matchedResource)
      return {
        ...matchedResource,
        ...route,
      };
  }

  throw new NotRouteMatched();
}
