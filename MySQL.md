## 시퀄라이즈 ORM

sql 작업을 쉽게 할 수 있도록 도와주는 라이브러리

- ORM: Object Relational Mapping: 객체와 데이터를 매핑(1대1 짝지음)
- MySQL 외에도 다른 RDB(Maria, Postgre, SQLite, MSSQL)와도 호환됨
- 자바스크립트 문법으로 데이터베이스 조작 가능

시퀄라이즈 명령어 사용하기 위해 sequelize-cli 설치

- mysql2는 MySQL DB가 아닌 드라이버(Node.js와 MySQL을 이어주는 역할)
- sequelize-cli는 sequelize 명령어 사용할 수 있게 해주는 패키지

```java
npm i express morgan nunjucks sequelize sequelize-cli mysql2
npm i -D nodemon
```

npx sequelize init 으로 시퀄라이즈 구조 생성

```java
npx sequelize init
```

- config/config.json, models폴더, migrations 폴더, seeders 폴더 생김
- require(../config/config) 설정 로딩
- models/index.js 수정
    - new Sequelize로 DB와 연결 가능
- app.js 작성
    - sequelize.sync 로 연결

## 관계 정의하기

1:N 관계

- 시퀄라이즈에서는 hasMany로 표현
- 반대의 입장에서는 belongsTo
- belongsTo가 있는 테이블에 컬럼이 생김

1:1 관계

- hasOne
- belongsTo

N:M 관계

- belongsToMany
- belongsToMany

## 시퀄라이즈 쿼리

### INSERT 문

```java
// sql문
INSERT INTO nodejs.users (name, age, married, comment) VALUES ('zero', 24, 0, '자기소개');

// 시뭘라이즈 쿼리 (자바스크립트)
const { User } = require('../models');
User.create({
	name: 'zero',
	age: 24,
	married: false,
	comment: '자기소개'
});
```

### SELECT 문

```java
// sql문
SELECT * FROM nodejs.users;

// 시뭘라이즈 쿼리 (자바스크립트)
User.findAll({});
```

```java
// sql문
SELECT name, married FROM nodejs.users;

// 시뭘라이즈 쿼리 (자바스크립트)
User.findAll({
	attributes: ['name', 'married'],
});
```

- 특수한 기능들인 경우 Sequelize.Op의 연산자 사용 (gt, or 등)

```java
// sql문
SELECT name, age FROM nodejs.users WHERE married = 1 AND age > 30;

// 시뭘라이즈 쿼리 (자바스크립트)
const { Op } = require('sequelize');
const { User } = require('../models');
User.findAll({
	attributes: ['name', 'age'],
	where: {
		married: 1,
		age: { [Op.gt]: 30 },
	},
});
```

```java
// sql문
SELECT if, name FROM users WHERE married = 0 OR age > 30;

// 시뭘라이즈 쿼리 (자바스크립트)
const { Op } = require('sequelize');
const { User } = require('../models');
User.findAll({
	attributes: ['id', 'name'],
	where: {
		[Op.or]: [{ married: 0}, { age: [Op.gt]: 30 } }],
	},
});
```

- order by

```java
// sql문
SELECT id, name FROM users ORDER BY age DESC;

// 시뭘라이즈 쿼리 (자바스크립트)
User.findAll({
	attributes: ['id', 'name'],
	order: [['age', 'DESC']],
]);
```

```java
// sql문
SELECT id, name FROM users ORDER BY age DESC LIMIT 1;

// 시뭘라이즈 쿼리 (자바스크립트)
User.findAll({
	attributes: ['id', 'name'],
	order: [['age', 'DESC']],
	limit: 1,
]);
```

```java
// sql문
SELECT id, name FROM users ORDER BY age DESC LIMIT 1 OFFSET 1;

// 시뭘라이즈 쿼리 (자바스크립트)
User.findAll({
	attributes: ['id', 'name'],
	order: [['age', 'DESC']],
	limit: 1,
	offset: 1,
]);
```

### UPDATE 문

```java
// sql문
UPDATE nodejs.users SET comment = '바꿀 내용' WHERE id = 2;

// 시뭘라이즈 쿼리 (자바스크립트)
User.update({
	comment: '바꿀 내용',
}, {
	where: { id: 2 },
});
```

### DELETE 문

```java
// sql문
DELETE FROM nodejs.users WHERE id = 2;

// 시뭘라이즈 쿼리 (자바스크립트)
User.destroy({
	where: { id: 2 },
});
```

## 관계 쿼리

- 결과값이 자바스크립트 객체

```java
const user = await User.findOne({});
console.log(user.nick);  // 사용자 닉네임
```

- include로 JOIN 과 비슷한 기능 수항 가능 (관계있는 것 엮을 수 있음)

```java
const user = await User.findOne({
	include: [{
		model: Comment,
	}]
});
console.log(user.Comments);  // 사용자 댓글
```

- 다대다 모델은 다음과 같이 접근 가능

```java
db.sequelize.models.PostHashtag
```

- get + 모델명으로 관계 있는 데이터 로딩  가능

```java
const user = await User.findOne({});
const comments = await user.getComments();
console.log(comments);  // 사용자 댓글
```

- as로 모델명 변경 가능

```java
// 관계를 설정할 때 as로 등록
db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id', as: 'Ansers'});

// 쿼리할 때는
const user = await User.findOne({});
const comments = await user.getAnswers();
console.log(comments);  // 사용자 댓글
```

- include나 관계 쿼리 메서드에도 where나 attributes

```java
const user = await User.findOne({
	include: [{
		model: Comment,
		where: {
			id: 1,
		},
		attributes: ['id'],
	}]
});
// 또는
const comments = await user.getComments({
	where: {
		id: 1,
	},
	attributes: ['id'],
});
```

- 생성 쿼리

```java
const user = await User.findOne({});
const comment = await Comment.create();
await user.addComment(comment);
// 또는
await user.addComment(comment.id);
```

- 여러 개를 추가할 때는 배열로 추가 가능

```java
const user = await User.findOne({});
const comment1 = await Comment.create();
const comment2 = await Comment.create();
await user.addComment([comment1, comment2]);
```

- 수정은 set + 모델명, 삭제는 remove + 모델명

## raw 쿼리

- 직접 SQL을 쓸 수 있음

```java
const [result, metadata] = await sequelize.query('SELECT * FROM comments');
console.log(result);
```