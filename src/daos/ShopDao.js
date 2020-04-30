import BaseDao from './base'

import {
  getListSql,
  getUpdateSql,
  getFindSql,
} from '../utils/sql';


export default class ShopDao extends BaseDao {
  modelName = 'shop'

  // 分页查找店铺
  async findPage(params = {}) {
    const listParams = getListSql(params);
    const sql = {
      ...listParams
    };
    return await this.findAndCountAll(sql)
  }
  async addItem(item) {
    return await this.insert(item)
  }
  async updateItem(item) {
    const { params, query } = getUpdateSql('id', { ...item, id: item.id });
    return await this.update(params, query);
  }
  async deleteItem(item) {
    const query = getFindSql(item)
    return await this.delete(query)
  }
  async findItem(params) {
    const query = getFindSql(params);
    return await this.findOne(query);
  }
}
