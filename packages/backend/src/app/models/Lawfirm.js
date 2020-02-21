import Sequelize, { Model, DataTypes } from 'sequelize';
import SequelizeSlugify from 'sequelize-slugify';

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
        slug: {
          type: DataTypes.STRING,
          unique: true,
        },
        active: { type: Sequelize.BOOLEAN, defaultValue: true },
      },
      {
        sequelize,
      }
    );

    SequelizeSlugify.slugifyModel(Lawfirm, {
      source: ['name'],
    });

    return this;
  }

  // static associate
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'owner_id', as: 'owner' });
    this.belongsToMany(models.User, {
      as: 'users',
      through: 'LawfirmUsers',
      foreignKey: 'lawfirm_id',
    });
    this.hasMany(models.Client, { foreignKey: 'lawfirm_id', as: 'lawfirm' });
  }

  // methods
}

export default Lawfirm;
