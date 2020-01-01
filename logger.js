 const EventEmitter = require('events')
 class Loger extends EventEmitter {
     log(message) {
         this.emit('logging', Date(), message)
         console.log(message)
     }
 }

module.exports = Loger;