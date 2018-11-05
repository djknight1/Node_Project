const db = require('./db');
let UserModel = {
  USER_ID: {

    /* 主键必须要这个！ */
    type: db.STRING(50),
    primaryKey: true,
    get () {
      return this.getDataValue('USER_ID')
    }
  },
  USER_NAME: db.STRING(50),
  USER_ALL_POINTS: db.STRING(50),
  USER_EXERCISE: db.STRING(50),
  USER_PWD: db.STRING(50),
  USER_COLLEGE: db.STRING(50),
  USER_CLASS: db.STRING(50),
  FAIL_NUM: db.INTEGER,
  GPA: db.FLOAT,
  CET4: db.FLOAT,
  CET6: db.FLOAT,
  ROLE: db.STRING(30),
};

let User = db.defineModel('user_table', UserModel, {
    timestamps: false,
    freezeTableName: true,
    get: {
      id: function () {
        return this.getDataValue('USER_ID')
      }
    },
    set: {
      fullName: function () {
      }
    }
  },
);

exports.createNewCategory = (obj) => {
  return User.create(obj)
}


exports.selectUserById = (id) => {
  return User.findByPk(id)
}

// module.exports = User;
