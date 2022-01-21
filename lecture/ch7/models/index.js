const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;

// db 연결 객체를 모델에 전달 (모델과 mysql을 연결)
User.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);

module.exports = db;