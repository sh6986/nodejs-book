const SocketIO = require('socket.io');

module.exports = (server, app) => {
    const io = SocketIO(server, {path: '/socket.io'});  // express랑 socket.io 연결
        // 연결하면 socket.io가 express에 <script src="/socket.io/socket.io.js"></script> 라고 작성한 해당 파일을 넣어줌
    
    // 네임스페이스 설정
    app.set('io', io);  // req.app.get('io'); 라우터에서 io 객체 사용가능
    const room = io.of('/room');
    const chat = io.of('/chat');

    room.on('connection', (socket) => { // 웹소켓 연결 시
        console.log('room 네임스페이스에 접속');
        socket.on('disconnect', () => { // 연결 종료 시
            console.log('room 네임스페이스 접속 해제');
        });
    });

    chat.on('connection', (socket) => {
        console.log('chat 네임스페이스에 접속');
        const req = socket.request;
        const {headers: {referer}} = req;
        const roomId = referer
            .split('/')[referer.split('/').length - 1]
            .replace(/\?.+/, '');
        socket.join(roomId);

        socket.on('disconnect', () => {
            console.log('chat 네임스페이스 접속 해제');
            socket.leave(roomId);
        });
    });
};


