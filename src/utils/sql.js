import Sequelize from 'sequelize';

// 查询部分字段
export function getAttributeSql(params = []) {
  return {
    attributes: params,
  };
}
// 分页查询 sql
export function getListSql(params = {}) {
  const {
    page = 1,
    size = 10,
    order = 'DESC',
    sort = 'WEIGHT',
    query = {},
    ...rest
  } = params;
  const offset = (page - 1) * size;
  const sortBy = sort.toLocaleLowerCase();
  return {
    ...rest,
    limit: parseInt(size) || 10, // 限制 10 条,
    offset: parseInt(offset), // 跳过前面 offset 个元素
    order: [[sortBy, order]],
    where: {
      ...query,
    },
  };
}
// 获得查找 sql
export function getFindSql(item) {
  return {
    where: {
      ...item,
    },
  };
}

// 获得更新 sql
export function getUpdateSql(id, item = {}) {
  const { ...rest } = item;
  const params = { ...rest };
  const query = {
    where: {
      [id]: item[id],
    },
  };
  return { params, query };
}

// 模糊搜索
export function getFuzzySql(ids = [], item = {}) {
  const findObj = ids.reduce((obj, id) => {
    if (!item[id]) return obj;
    return {
      ...obj,
      [id]: {
        [Sequelize.Op.like]: '%' + item[id] + '%',
      },
    };
  }, {});
  return {
    where: {
      ...findObj,
    },
  };
}
// 过滤为空的字段
export function getNotNullSql(id) {
  let filterObj = {};
  if (Array.isArray(id)) {
    filterObj = id.reduce((obj, item) => {
      return {
        ...obj,
        [item]: {
          [Sequelize.Op.not]: null,
        },
      };
    }, {});
  }
  if (typeof id === 'string') {
    filterObj = {
      [id]: {
        [Sequelize.Op.not]: null,
      },
    };
  }
  return {
    where: {
      ...filterObj,
    },
  };
}
