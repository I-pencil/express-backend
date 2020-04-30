import BaseService from './BaseService';

export default class ShopService extends BaseService {
  constructor({ shopDao }) {
    super();
    this.shopDao = shopDao
  }
  // 分页查找
  async findPage(params) {
    const [err, list] = await this.shopDao.findPage(params);
    if (err) {
      return this.fail('获取列表失败', err);
    }
    return this.success('获取列表成功', list || []);
  }
  // 添加或者修改
  async addItem(params) {
    const [err, data] = await this.shopDao.addItem(params);
    if (err) {
      console.log('err', err)
      return this.fail('失败', err);
    }
    return this.success('成功', data)
  }

  // 删除
  async deleteItem(params) {
    const [err] = await this.shopDao.deleteItem(params);
    if (err) {
      return this.fail('删除失败', err);
    }
    return this.success('删除成功', null);
  }

  // 详情
  async findItem(params) {
    const [err, data] = await this.shopDao.findItem(params);
    if (err) {
      return this.fail('查询失败', err);
    }
    return this.success('查询成功', data || {});
  }

}
