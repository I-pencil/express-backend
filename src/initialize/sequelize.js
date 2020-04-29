/*
 * 创建并初始化 Sequelize
 */
import Sequelize from 'sequelize';

let sequelize;

const defaultConfig = {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  operatorsAliases: false,
  define: {
    updatedAt: false,
    createdAt: 'createdDate',
  },
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export function initSequelize(config) {
  const { host, database, username, password, port } = config;
  sequelize = new Sequelize(
    database,
    username,
    password,
    Object.assign({}, defaultConfig, {
      host,
      port
    })
  );
  return sequelize;
}

export default sequelize;
