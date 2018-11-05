/* 使用db来规范生成Model */
/* 但是在这个项目中,数据库本来也就不是特别规范。。 所以先不用这个了 */
const Sequelize = require('sequelize');
const config = require('../config/config').config;

let sequelize = new Sequelize(config.database, config.username, config.password, {
  host: 'localhost',
  dialect: 'mysql',
  freezeTableName: true,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

function defineModel(name, attributes) {
  let attrs = {};
  for (let key in attributes) {
    let value = attributes[key];
    attrs[key] = value;
  }

  /* attrs.USER_ID = {
    type: ID_TYPE,
    primaryKey: true
  }; */

  return sequelize.define(name, attrs, {
    tableName: name,
    timestamps: false
  });
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN', 'FLOAT'];

let exp = {
  defineModel: defineModel,
  // sync是在测试环境下,后端没有建立好表才使用它建表。但是我已经建立表了,所以不需要。
  sync: () => {
    // only allow create ddl in non-production environment:
    if (process.env.NODE_ENV !== 'production') {
      sequelize.sync({force: false});
    } else {
      throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
    }
  }
};

for (let type of TYPES) {
  exp[type] = Sequelize[type];
}

module.exports = exp;
