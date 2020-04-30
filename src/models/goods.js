/*
 * 创建商品 model
 */
import Sequelize from 'sequelize';

export default function (sequelize, DataTypes) {
  class Goods extends Sequelize.Model {}
  Goods.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      shopId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'shop_id',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      thumbUrl: {
        type: DataTypes.STRING,
        field: 'thumb_url',
      },
      createdDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'created_date',
      },
    },
    {
      sequelize,
      modelName: 'goods',
      tableName: 't_goods',
    }
  );
  return Goods;
}
