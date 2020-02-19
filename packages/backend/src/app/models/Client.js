import Sequelize, { Model, DataTypes } from 'sequelize';

class Client extends Model {
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
        email: Sequelize.STRING,
        cpfCnpj: Sequelize.STRING,
        birthDate: Sequelize.DATEONLY,
        // Lawsuit Properties
        identidade: Sequelize.STRING,
        nit: Sequelize.STRING,
        maritalStatus: Sequelize.STRING,
        occupation: Sequelize.STRING,
        nationality: Sequelize.STRING,
        // Taxpayer Properties
        contribuinte: {
          type: Sequelize.ENUM('Isento', 'Contribuinte', 'Não Contribuinte'),
        },
        inscMunicipal: Sequelize.STRING,
        inscEstadual: Sequelize.STRING,
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
    this.hasMany(models.Telephone, {
      as: 'telephones',
      foreignKey: 'client_id',
    });
    this.hasMany(models.Address, { as: 'addresses', foreignKey: 'client_id' });
  }

  // methods
}

export default Client;
