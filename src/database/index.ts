import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_DATABASE } from '@config';
import UserModel from '@models/users.model';
import { logger } from '@utils/logger';
import ProductModel from '@/models/products.model';
import CategoryModel from '@/models/categories.model';
import ManufactureModel from '@/models/manufactures.model';

const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, undefined, {
  dialect: 'mysql',
  host: DB_HOST,
  port: parseInt(DB_PORT),
  timezone: '+09:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize.authenticate();

export const DB = {
  Users: UserModel(sequelize),
  Products: ProductModel(sequelize),
  Categories: CategoryModel(sequelize),
  Manufactures: ManufactureModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};
