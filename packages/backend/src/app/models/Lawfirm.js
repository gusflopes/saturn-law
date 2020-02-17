import Sequelize, { Model, DataTypes } from 'sequelize';
import SequelizeSlugify from 'sequelize-slugify';

class Lawfirm extends Model {
  static init(sequelize) {
    super.init(
      {
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
      as: 'lawfirm',
      through: 'lawfirm_users',
      foreignKey: 'lawfirm_id',
    });
  }

  // methods
}

export default Lawfirm;
