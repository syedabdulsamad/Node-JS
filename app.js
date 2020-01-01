const path = require('path')
const os = require('os')
const fs = require('fs')

// var EventEmitter = require('events')

// var emitter =  new EventEmitter();

// emitter.on('logging', (date, message) => {
//     console.log(`About to log at: ${date} with:, ${message}`);
// })


//emitter.emit('newEvent', 1, 'Abdul', 'Samad')
// fs.readdir('./', (error, files) => {

//     if(error != null) {
//         console.log('Error in reading the file.')
//     } else {
//         console.log(files)
//     }
// })


// const totalMemoryMBs = os.totalmem / 1024.0
// console.log(`total memory in MBs totalMemoryMBs : ${totalMemoryMBs}`)

//const parsedPath = path.parse(__filename)
//console.log(parsedPath)


const Loger = require('./logger')
const logger = new Loger()

const http = require('http')
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write(JSON.stringify(['Hello World', 'Hello World 2']) )
        res.end();
    }
})
server.listen(3000);

// logger.on('logging',(date, message) => {
//     console.log(`About to log message: ${message} at : ${date}`)
// })
// logger.log('Abdul');