import Sequelize, { Model, DataTypes } from 'sequelize';

class Lawfirm extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
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
    this.belongsTo(models.Lawfirm, { as: 'lawfirm', foreignKey: 'lawfirm_id' });
    this.belongsTo(models.User, { as: 'lawyer', foreignKey: 'lawyer_id' });
  }

  // methods
}

export default Lawfirm;
