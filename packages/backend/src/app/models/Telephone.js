import Sequelize, { Model, DataTypes } from 'sequelize';

class Telephone extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        ddd: {
          type: Sequelize.STRING,
          validate: {
            len: 2,
          },
        },
        number: { type: Sequelize.STRING, allowNull: false },
        type: {
          type: Sequelize.ENUM('whatsapp', 'self', 'contact'),
          defaultValue: 'self',
          allowNull: false,
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  // static associate
  static associate(models) {
    this.belongsToMany(models.Client, {
      as: 'telephones',
      through: 'ClientTelephones',
      foreignKey: 'client_id',
    });
    // this.hasMany(models.Telephone, {as: 'telephones', foreignKey: 'client_id'});
    // this.hasMany(models.Address, {as: 'addresses', foreignKey: 'client_id'});
  }

  // methods
}

export default Telephone;
