const { Socket } = require("socket.io");
const { verifyJWT } = require("../helpers");
const { ChatMessages } = require("../models");

const chatMessages = new ChatMessages();

const socketController = async( socket = new Socket, io )=>{
    
    //console.log('Client connected', socket.id)
    const token = socket.handshake.headers['x-token'];
    const user = await verifyJWT(token);
    if( !user ){
        return socket.disconnect();
    }

    //Add user connected
    chatMessages.userConnected(user)
    io.emit('active-users',         chatMessages.usersArr);
    socket.emit('recieve-messages', chatMessages.lastTen);

    //Como el socket id cambia cada que el usuario se conecta hay que conectarlo a una sala especial
    socket.join( user.id ) // va a tener tres salas el usuario, la global, por el socket.id y por el user.id

    //clean when someone is disconnected
    socket.on('disconnect', ()=>{
        chatMessages.userDisconnect( user.id );
        io.emit('active-users', chatMessages.usersArr);
    })

    socket.on('send-message', ({ uid, message })=>{
        if(uid){
            //si existe el uid es un mensaje privado, en caso contrario es para todo el mundo
            socket.to(uid).emit('private-message', { from: user.name, message });
        }else{
            //console.log("data", uid + ' ' + message)
            chatMessages.sendMessage( user.id,  user.name, message);
            io.emit('recieve-messages', chatMessages.lastTen); 
        }
    })

}

module.exports = {
    socketController
}