import Sequelize, { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
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
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Lawfirm, {
      as: 'user',
      through: 'lawfirm_users',
      foreignKey: 'user_id',
    });
  }

  // Methods
  isValidPassword(newPassword) {
    try {
      return bcrypt.compare(newPassword, this.password_hash);
    } catch (err) {
      throw new Error(err);
    }
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
