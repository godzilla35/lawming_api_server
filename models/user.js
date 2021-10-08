const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      email: {
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true,
      },
      nick: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      phoneNum: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      officeName: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      officeNum: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Post,);
    db.User.belongsToMany(db.Post, {through: 'Apply', as :'Applied', foreignKey: 'ApplyUserId'});
  }
};
