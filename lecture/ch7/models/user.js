const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            // 시퀄라이즈는 id(primary key)를 자동으로 넣어주기 때문에 생략가능하다.
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,       // NOT NULL
                unique: true,
            },
            age: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            married: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,   // DATETIME, MYSQL DATE -> Sequelize DateOnly
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,  // true면 자동으로 생성할때 created_at이 현재시간이 되고, update_at 이 수정한시간으로 변함
            underscored: false, // 카멜케이스 or 스네이크케이스 사용 여부. 시퀄라이즈가 자동으로 생성해주는 컬럼의 경우
            paranoid: false,    // true면 deletedAt 까지 만들어줌. 제거날짜
            modelName: 'User',  // 모델이름
            tableName: 'users', // 테이블명. 기본적으로 시퀄라이즈는 모델이름을 소문자로 만들고 복수형으로 만들어 정한다.
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.User.hasMany(db.Comment, {foreignKey: 'commenter', sourceKey: 'id'});    // hasMany : 1대n 관계
    }
};