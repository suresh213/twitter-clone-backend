import { Sequelize } from 'sequelize';

interface Models {
  [key: string]: any;
}

interface ModelsInterface {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  [key: string]: any;
}

interface SequelizeConfigInterface {
  [key: string]: any;
}

interface UserInstance {
  id?: number;
  name?: string;
  username?: string;
  avatar?: string;
  email: string;
  password: string;
  token?: string;
}

interface TweetInstance {
  id?: number;
  authorId: number;
  content?: string;
}

declare const models: ModelsInterface & Models;

export {
  models,
  ModelsInterface,
  SequelizeConfigInterface,
  UserInstance,
  TweetInstance,
};
