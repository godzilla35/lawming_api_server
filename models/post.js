const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      court: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      time: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      progressType: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      myPartyType: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      myName: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      otherPartyType: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      opponentName: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      caseNum: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      caseDetail: {
        type: Sequelize.STRING(256),
        allowNull: true,
      },
      caseArgument: {
        type: Sequelize.STRING(256),
        allowNull: true,
      },
      cost: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Post',
      tableName: 'posts',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.User, {through: 'Apply', as :'Applier', foreignKey: 'ApplyPostId'});
  }
};
