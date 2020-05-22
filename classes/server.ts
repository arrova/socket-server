// Para instalar la ayuda de typescript para leer bien la ayuda de express podemos ejecutar
// npm install @types/express --save-dev
import express from 'express';
import { SERVER_PORT } from '../global/environment';
// Para instalar server io tenemos que ejecutar
// npm install socket.io
// Para añadir las propiedades y metodos para que typescript nos ayude tenemos que ejecutar 
// npm install @types/socket.io
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket';

export default class Server {
    private static _instance: Server;
    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server( this.app );
        this.io = socketIO( this.httpServer );
        this.escucharSockets();
    }

    public static get instance(){
        return this._instance || ( this._instance = new this() );
    }

    private escucharSockets(){
        // console.log('Escuchando conexiones -sockets');
        this.io.on('connection', cliente => {
            //Conectar cliente
            socket.conectarCliente( cliente );
            //Configurar usuario
            socket.congifurarUsuario( cliente, this.io );
            // console.log('Cliente conectado');
            // console.log(cliente.id);
            //Mensajes
            socket.mensaje( cliente, this.io );
            // Desconectar
            socket.desconectar( cliente );
        });
    }

    start( callback: any ){
        this.httpServer.listen( this.port, callback );
    }
}

