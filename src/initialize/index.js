import { initSequelize } from './sequelize';
import { initModel } from '../models';
import { asValue } from 'awilix';
import container from '../container';

import config from '../config/config'

export default async function initialize() {
  const env = process.env.NODE_ENV || 'development'
  const sequelize = initSequelize(config[env]); // 初始化 sequelize
  initModel(sequelize); // 初始化 Model
  container.register({
    sequelize: asValue(sequelize),
  });
}
