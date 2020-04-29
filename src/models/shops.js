/*
 * 创建店铺 model
 */
import Sequelize from 'sequelize';

export default function (sequelize, DataTypes) {
  class Shops extends Sequelize.Model {}
  Shops.init(
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
      thumb_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'shops',
      tableName: 't_shops',
    }
  );
  return Shops;
}
