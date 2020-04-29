import db from '../models';
import { promiseCatch } from '../utils';

export default class BaseDao {
  constructor(modules) {
    // this.transaction = request.transaction
    this.sequelize = db.sequelize;
  }
  // 插入数据
  insert(params) {
    const Model = this.getModel();
    const config = this.getConfig();
    return promiseCatch(
      Model.sync().then(async () => {
        return await Model.create(params, config);
      })
    );
  }
  batchInsert(params) {
    const Model = this.getConfig();
    const config = this.getConfig();
    return promiseCatch(Model.bulkCreate(params, config));
  }
  // 删除数据
  delete(params) {
    const Model = this.getModel();
    const config = this.getConfig();
    return promiseCatch(
      Model.sync().then(async () => {
        return await Model.destroy({
          ...config,
          ...params,
        });
      })
    );
  }
  // 查找某个元素
  findOne(params) {
    const Model = this.getModel();
    return promiseCatch(Model.findOne(params).then(models => {
      return models || null
    }))
  }
  // 查找所有数据
  findAll(params) {
    const Model = this.getModel();
    return promiseCatch(Model.findAll(params))
  }
  // 在数据库中搜索多个元素, 返回数据和总计数
  findAndCountAll(params) {
    const Model = this.getModel();
    return promiseCatch(Model.findAndCountAll(params));
  }

  // 更新数据
  update(params, query) {
    const Model = this.getModel();
    const config = this.getConfig();
    return promiseCatch(
      Model.sync().then(async () => {
        return await Model.update(params, {
          ...config,
          ...query,
        });
      })
    );
  }

  getModel() {
    return db[this.modelName];
  }
  getConfig() {
    const config = {};
    if (this.transaction) {
      config.transaction = this.transaction;
    }
    return config;
  }
  commit() {
    if (this.transaction) {
      return promiseCatch(this.transaction.commit());
    }
    return promiseCatch(Promise.resolve());
  }
  rollback() {
    if (this.transaction) {
      return promiseCatch(this.transaction.rollback());
    }
    return promiseCatch(Promise.resolve());
  }
}
