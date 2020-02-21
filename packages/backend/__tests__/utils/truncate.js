import database from '../../src/database';

export default async function truncate() {
  /*
  await database.query('SET FOREIGN_KEY_CHECKS = 0', null, {
    raw: true,
  });
  */
  Promise.all(
    Object.keys(database.connection.models).map(key => {
      return database.connection.models[key].destroy({
        truncate: { cascade: true },
        force: true,
      });
    })
  ).then(Promise => {
    return Promise;
  });
}
