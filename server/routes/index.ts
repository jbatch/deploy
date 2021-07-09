import { Application } from 'express';
import dirRoutes from './dir-routes';
import appRoutes from './app-routes';

function configure(app: Application) {
  app.use('/api/dir', dirRoutes);
  app.use('/api/apps', appRoutes);
}

export default {
  configure,
};
