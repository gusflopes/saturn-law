import Sequelize, { Model, DataTypes } from 'sequelize';

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        postalCode: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.STRING,
        street2: Sequelize.STRING,
        district: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        country: { type: Sequelize.STRING, defaultValue: 'BRA' },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  // static associate
  static associate(models) {
    this.belongsTo(models.Client, { as: 'client', foreignKey: 'client_id' });

    // this.hasMany(models.Telephone, {as: 'telephones', foreignKey: 'client_id'});
    // this.hasMany(models.Address, {as: 'addresses', foreignKey: 'client_id'});
  }

  // methods
}

export default Address;
