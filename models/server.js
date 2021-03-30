const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths ={
            users: '/api/users',
            login: '/api/login',
        }
        this.middlewares();
        this.routes();
        this.DBconnection();
    }

    middlewares(){
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.static( path.join(__dirname,'../public') ) );
    }

    routes(){
        this.app.use( this.paths.users, require('../routes/users') );
        this.app.use( this.paths.login, require('../routes/login') );
    }

    async DBconnection(){
        await dbConnection();
    }

    listen(){
        this.app.listen( this.port ,()=>{
            console.log('running in port: ', this.port);
        });
    }
}

module.exports = Server;