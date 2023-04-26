import { Model } from 'sequelize';
import { TweetInstance } from '../types';

module.exports = (sequelize: any, DataTypes: any) => {
  class Tweet extends Model<TweetInstance> {
    public static associate() {
      // define association here
    }

    public toJSON(): TweetInstance {
      const values = { ...this.get({ plain: true }) };

      return values as TweetInstance;
    }
  }

  Tweet.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Tweet',
    }
  );

  return Tweet;
};
