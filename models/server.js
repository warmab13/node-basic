const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');
const { socketController } = require('../sockets/socket.controller');
class Server{

    constructor(){
        this.app    = express();
        this.port   = process.env.PORT;

        //Init SocketIO Implementation
        this.server = require('http').createServer( this.app );
        this.io     = require('socket.io')(this.server);

        this.paths = {
            auth:       '/api/auth',
            users:      '/api/users',
            categories: '/api/categories',
            products:   '/api/products',
            search:     '/api/search',
            uploads:    '/api/uploads'
        }

        //Connect to database 
        //this.dbConnect();

        //Middlewares
        this.middlewares();

        //Application Routes
        this.routes();

        //Sockets
        this.socketsEvents();
    }

    async dbConnect(){
        //await dbConnection();
    }


    middlewares(){

        //CORS
        this.app.use( cors() );

        //Parse and reading body
        this.app.use( express.json() );

        //Public Folder
        this.app.use( express.static('public') );
        
        //files uploads
        this.app.use( fileUpload({
            useTempFiles: true, 
            tempFileDir: '/tmp/',
            createParentPath: true
        }) )

    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.users , require('../routes/user'))
        this.app.use(this.paths.categories, require('../routes/category'))
        this.app.use(this.paths.products, require('../routes/product'))
        this.app.use(this.paths.search, require('../routes/search'))
        this.app.use(this.paths.uploads, require('../routes/uploads'))
    }

    socketsEvents(){
        this.io.on("connection", (socket) => socketController(socket, this.io) );
    }

    listen(){
        this.server.listen(this.port, ()=>{
            console.log("Servidor corriendo en puerto", this.port)
        })
    }

}


module.exports = Server