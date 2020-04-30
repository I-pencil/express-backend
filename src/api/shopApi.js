import bodyParser from 'body-parser'
import { route, POST, before } from 'awilix-express'

@route('/shop')
export default class ShopAPI {
  constructor({ shopService }) {
    this.shopService = shopService;
  }

  @route('/findPage')
  @POST()
  @before([bodyParser.json()])
  async findPage(req, res) {
    const { success, data, message } = await this.shopService.findPage(
      req.body
    );
    if (success) {
      return res.success(data);
    } else {
      res.fail(null, message);
    }
  }

  @route('/findItem')
  @POST()
  @before([bodyParser.json()])
  async findItemById(req, res) {
    const { success, data, message } = await this.shopService.findItem(
      req.body
    );
    if (success) {
      return res.success(data);
    } else {
      res.fail(null, message);
    }
  }

  @route('/save')
  @POST()
  @before([bodyParser.json()])
  async add(req, res) {
    const { success, data, message } = await this.shopService.addItem(req.body);
    if (success) {
      return res.success(data.id);
    } else {
      res.fail(null, message);
    }
  }

  @route('/delete')
  @POST()
  @before([bodyParser.json()])
  async delete(req, res) {
    const { success, message } = await this.shopService.deleteItem(req.body);
    if (success) {
      return res.success(null);
    } else {
      res.fail(null, message);
    }
  }
}
