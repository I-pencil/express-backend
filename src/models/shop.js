/*
 * 创建店铺 model
 */
import Sequelize from 'sequelize';

export default function (sequelize, DataTypes) {
  class Shop extends Sequelize.Model {}
  Shop.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      modelName: 'shop',
      tableName: 't_shop',
    }
  );
  return Shop;
}
