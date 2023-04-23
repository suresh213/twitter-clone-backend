import fs from 'fs';
import path from 'path';
import { DataTypes, Sequelize } from 'sequelize';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`../config/config`)[env];

const db: any = {};

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]!, config);
} else {
  sequelize = new Sequelize(
    config.database!,
    config.username!,
    config.password!,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts'
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

// Associations will be defined here

db.User.hasMany(db.Tweet, {
  foreignKey: {
    allowNull: false,
    name: 'authorId',
    as: 'author',
  },
});

db.Tweet.belongsTo(db.User, {
  foreignKey: {
    allowNull: false,
    name: 'authorId',
    as: 'author',
  },
});

export { db, sequelize };
