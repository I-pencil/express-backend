import bodyParser from 'body-parser';
import { route, POST, before } from 'awilix-express';

@route('/goods')
export default class ShopAPI {
  constructor({ goodsService }) {
    this.goodsService = goodsService;
  }

  @route('/findPage')
  @POST()
  @before([bodyParser.json()])
  async findPage(req, res) {
    const { success, data, message } = await this.goodsService.findPage(
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
    const { success, data, message } = await this.goodsService.findItem(
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
    const { success, data, message } = await this.goodsService.addItem(req.body);
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
    const { success, message } = await this.goodsService.deleteItem(req.body);
    if (success) {
      return res.success(null);
    } else {
      res.fail(null, message);
    }
  }
}
