import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import users from './users.routes';
import lawfirms from './lawfirms.routes';
import lawfirmMembers from './lawfirmMembers.routes';
import clients from './clients.routes';
import test from './developer.routes';
import app from '../app';

const routes = Router();

routes.get('/', (req, res) => res.json({ message: 'Server up and running!' }));
routes.use('/users', require('./users.routes'));

// routes.use('/users', users => {return require('./users.routes')});
routes.use('/lawfirms', lawfirms);
routes.use('/lawfirms/members', lawfirmMembers);
routes.use('/clients', clients);
routes.use(test);

async function printFunc() {
  const currentPath = path.resolve(__dirname);
  const files = await fs.promises.readdir(currentPath);
  console.log('files', files);
  files.map(file => {
    //   if (path.extname(file).toLowerCase() === '.js' && file !== 'index.js') {
    if (
      path.extname(file).toLocaleLowerCase() === '.js' &&
      file !== 'index.js'
    ) {
      console.log(file);
      routes.use('/v1', require(`./${file}`));
    }
  });
}

printFunc().catch(console.error);
// routes.use('/map', require(`./${filesList[4]}`));

export default routes;
