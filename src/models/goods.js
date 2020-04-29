/*
 * 创建商品 model
 */
import Sequelize from 'sequelize';

export default function (sequelize, DataTypes) {
  class Goods extends Sequelize.Model {}
  Goods.init(
    {
      id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.TEXT,
      },
      weight: {
        type: DataTypes.INTEGER(11),
      },
      isEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_enabled',
      },
      isHot: {
        // 热点问题
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_hot',
      },
      isTitleLink: {
        // 是否是根据标题检索文章
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_title_link',
      },
      type: {
        type: DataTypes.STRING,
      },
      articleTypeId: {
        type: DataTypes.STRING,
        field: 'article_type_id',
      },
      articleType: {
        type: DataTypes.STRING,
        field: 'article_type',
      },
      imagePC: {
        type: DataTypes.STRING,
        field: 'image_pc',
      },
      imageApp: {
        type: DataTypes.STRING,
        field: 'image_app',
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
