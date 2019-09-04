const http = require('http');
const underscore = require('underscore')



// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.write('Hello world----');
//         res.end();
//     } else if(req.url === '/api/courses') {
//         const json = JSON.stringify(['NOde JS', "Spring Boot", "Python"]);
//         res.write(json);
//         res.end();
//     }
//     underscore.ma
// })
// server.listen(3000);

var array = [1,2,3,'samad'];
console.log(underscore.contains(array,2, 1));



// server.on('connection', (socket) => {
//     console.log('Listening on socket : ' + socket.localPort );
// });
