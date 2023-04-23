import { Model, DataTypes, Sequelize } from 'sequelize';
import { TweetInstance } from './types';

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

export default function (sequelize: Sequelize): typeof Tweet {
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
}
