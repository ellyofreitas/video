import admin from '@admin/presentation/routes';
import streaming from '@streaming/presentation/routes';
import { Route } from '../../presentation/http';

export default [admin, streaming].flat() as Route[];
