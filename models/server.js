const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            categories: '/api/categories'
        }

        //Connect to database 
        this.dbConnect();

        //Middlewares
        this.middlewares();

        //Application Routes
        this.routes();
    }

    async dbConnect(){
        await dbConnection();
    }

    middlewares(){

        //CORS
        this.app.use( cors() );

        //Parse and reading body
        this.app.use( express.json() );

        //Public Folder
        this.app.use( express.static('public') );
        

    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.users , require('../routes/user'))
        this.app.use(this.paths.categories, require('../routes/category'))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Servidor corriendo en puerto", this.port)
        })
    }

}


module.exports = Server