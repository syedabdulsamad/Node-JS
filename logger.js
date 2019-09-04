const path = require('path');
const os = require('os');

const EventEmitter = require('events');


class Logger extends EventEmitter {
    logText(text){
        this.emit('logEvent',text);
    }
}


module.exports = Logger;