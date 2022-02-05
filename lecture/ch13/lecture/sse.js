const SSE = require('sse');

module.exports = (server) => {
    const sse = new SSE(server);
    sse.on('connection', (client) => {  // 서버센트이벤트 연결
        setInterval(() => {
            client.send(Date.now().toString()); // 문자열만 보낼수 있기 때문에 문자열로 바꿈
        }, 1000);
    });
};