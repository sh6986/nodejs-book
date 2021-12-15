### 노드로 http 서버 만들기

http 요청에 응답하는 노드 서버

- createServer 로 요청 이벤트에 대기

```java
const http = require('http');

http.createServer((req, res) => {
});
```

### 8080 포트에 연결하기

res 메서드로 응답 보냄

- write 로 응답 내용을 적고 end로 응답 마무리(내용을 적어도 됨)

listen(포트) 메서드로 특정 포트에 연결

```java
const http = require('http');

http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
	res.write('<h1>Hello Node!</h1>');
	res.end('<p>Hello Server!</p>);
})
	.listen(8080, () => {
	console.log('8080번 포트에서 서버 대기 중입니다.');
});
```

### localhost와 포트

포트는 서버 내에서 프로세스를 구분하는 번호

- 기본적으로 http 서버는 80번 포트 사용(생략가능. htpp는 443)
- 다른 포트로 데이터베이스나 다른 서버 동시에 연결 가능

### 이벤트 리스너 붙이기

listening과 error 이벤트를 붙일 수 있음

```java
const http = require('http');

const server = http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
	res.write('<h1>Hello Node!</h1>');
	res.end('<p>Hello Server!</p>);
})
	.listen(8080, () => {
	console.log('8080번 포트에서 서버 대기 중입니다.');
});

serveer.on('listening', () => {
	console.log('8080번 포트에서 서버 대기 중입니다.');
});
server.on('error', (error) => {
	console.error(error);
});
```

### 한 번에 여러 개의 서버 실행하기

createServer를 여러 번 호출하면 됨

- 단, 두 서버의 포트를 다르게 지정해야 함
- 같게 지정하면 EADDRINUSE 에러 발생

## html 읽어서 전송하기

write와 end에 문자열을 넣는 것은 비효율적

- fs 모듈로 html을 읽어서 전송하자
- write가 버퍼도 전송 가능