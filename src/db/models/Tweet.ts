import { Model } from 'sequelize';
import { TweetInstance } from '../types';

module.exports = (sequelize: any, DataTypes: any) => {
  class Tweet extends Model<TweetInstance> {
    public authorId!: string;
    public content?: string;

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
