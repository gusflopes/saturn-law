import Sequelize, { Model, DataTypes } from 'sequelize';
import * as Yup from 'yup';
import User from './User';

class Profile extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        social_media: {
          type: Sequelize.ENUM('google', 'facebook'),
          allowNull: false,
        },
        social_id: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: true,
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
    this.belongsTo(models.User, { as: 'users', foreignKey: 'user_id' });
  }

  // methods
  static async findUserProfile(email, social) {
    try {
      const user = await User.findOne({
        where: { email },
        attributes: ['id', 'name', 'email'],
        include: [
          {
            model: Profile,
            as: 'profiles',
            where: { social_media: social },
            attributes: ['id', 'social_media', 'social_id', 'email', 'name'],
          },
        ],
      });
      return { found: true, user };
    } catch (err) {
      return { found: false, err };
    }
  }
}

export default Profile;
