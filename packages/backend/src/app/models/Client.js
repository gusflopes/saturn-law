import Sequelize, { Model, DataTypes } from 'sequelize';

class Lawfirm extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  // static associate
  static associate(models) {
    this.belongsTo(models.Lawfirm, { as: 'lawfirm', foreignKey: 'id' });
    this.belongsTo(models.User, { as: 'lawyer', foreignKey: 'id' });
  }

  // methods
}

export default Lawfirm;
