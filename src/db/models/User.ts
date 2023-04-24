import { Model } from 'sequelize';
import { UserInstance } from '../types';

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserInstance> {
    public name?: string;
    public username?: string;
    public avatar?: string;
    public email!: string;
    public password?: string;
    public token?: string;

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
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
        primaryKey: true,
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
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      token: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
