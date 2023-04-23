import { Model, DataTypes, Sequelize } from 'sequelize';
import { UserInstance } from './types';

class User extends Model<UserInstance> {
  public name?: string;
  public username?: string;
  public avatar?: string;
  public email!: string;
  public password?: string;

  public static associate() {
    // define association here
  }

  public toJSON(): UserInstance {
    const values = { ...this.get({ plain: true }) };

    return values as UserInstance;
  }
}

export default function (sequelize: Sequelize): typeof User {
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
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
}
