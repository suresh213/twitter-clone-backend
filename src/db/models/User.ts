import { Model } from 'sequelize';
import { UserInstance } from '../types';

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserInstance> {
    public static associate() {
      // define association here
    }

    public toJSON(): UserInstance {
      const values = { ...this.get({ plain: true }) };

      return values as UserInstance;
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      avatar: { type: DataTypes.TEXT },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: true,
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
      },
      provider: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
