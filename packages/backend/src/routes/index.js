import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import test from './developer.routes';

const routes = Router();

routes.get('/', (req, res) => res.json({ message: 'Server up and running!' }));
routes.use(test); // Just for testing. Delete later;

/**
 * Routes automatically imported from files within ./routes
 * To create a new route, just add a new file like the template
 */

async function importRoutes() {
  const currentPath = path.resolve(__dirname);
  const files = await fs.promises.readdir(currentPath);
  files.map(file => {
    //   if (path.extname(file).toLowerCase() === '.js' && file !== 'index.js') {
    if (
      path.extname(file).toLocaleLowerCase() === '.js' &&
      file !== 'index.js'
    ) {
      routes.use('/v1', require(`./${file}`));
    }
  });
  console.log('[saturnlaw] routes imported an ready for requests');
}

importRoutes().catch(console.error);

export default routes;
