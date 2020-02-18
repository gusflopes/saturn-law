import Sequelize from 'sequelize';

import User from '../app/models/User';
import Lawfirm from '../app/models/Lawfirm';
import Client from '../app/models/Client';

import databaseConfig from '../config/database';

const models = [User, Lawfirm, Client];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
