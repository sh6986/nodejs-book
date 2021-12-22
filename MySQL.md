### 시퀄라이즈 ORM

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