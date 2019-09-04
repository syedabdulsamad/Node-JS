const http = require('http');



const server = http.createServer( );
server.listen(3000);


server.on('serverCalled', (socket) => {
    console.log('Listening on socket : ' + socket);
});