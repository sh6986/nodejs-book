const WebSocket = require('ws');    // node에서 사용하는 웹소켓

module.exports = (server) => {
    const wss = new WebSocket.Server({server}); // express 서버랑 웹소켓 서버랑 연결

    wss.on('connection', (ws, req) => { // 웹소켓 연결시(프론트에서 new WebSocket("ws://localhost:8005")할떄 실행됨)
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;  // ip 파악
        // req.headers['x-forwarded-for'] : 프록시서버를 사용하는 경우 ip 가 변조될 수 있으므로 그걸 캐치하기 위해
        console.log('새로운 클라이언트 접속', ip);

        ws.on('message', (message) => { // 클라이언트로부터 메시지(클라이언트에서 webSocket.send()할때)
            console.log(message);
        });

        ws.on('error', (error) => {  // 에러 시
            console.error(error);
        });

        ws.on('close', () => {  // 연결 종료 시
            console.log('클라이언트 접속 해제', ip);
            clearInterval(ws.interval);
        });

        ws.interval = setInterval(() => { // 3초마다 클라이언트로 메시지 전송
            if (ws.readyState === ws.OPEN) {    // 웹소켓이 클라이언트랑 서버랑 연결되어있을때
                ws.send('서버에서 클라이언트로 메시지를 보냅니다.');
            }
        }, 3000);
    });
};