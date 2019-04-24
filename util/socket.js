let io ;

initIO = (server) => {
    io = require('socket.io')(server);
    console.log('intializing socket io...')
    return io;
}

getIO = ()=> {
    if (!io){
        throw new Error('socket.io not intialized')
    }
    return io;
}

module.exports ={
    init : initIO,
    get : getIO
}