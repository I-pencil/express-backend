import BaseDao from './base'

import {
  getListSql,
  getUpdateSql,
  getFindSql,
} from '../utils/sql';


export default class ShopsDao extends BaseDao {
  modelName = 'shops'

  // 分页查找店铺
  async findPage(params = {}) {
    const listParams = getListSql(params);
    const sql = {
      ...listParams
    };
    return await this.findAndCountAll(sql)
  }
  async addItem(item) {
    const findParams = getFindSql({ id: item.id })
    const model = await this.findOne(findParams)
    if (model[1]) {
      const data = model[1] || {}
      const { params, query } = getUpdateSql('id', { ...item, id: data.id })
      return await this.update(params, query)
    }
    return await this.insert(item)
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
