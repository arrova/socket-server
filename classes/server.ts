// Para instalar la ayuda de typescript para leer bien la ayuda de express podemos ejecutar
// npm install @types/express --save-dev
import express from 'express';
import { SERVER_PORT } from '../global/environment';

export default class Server {
    public app: express.Application;
    public port: number;

    constructor( ){
        this.app = express();
        this.port = SERVER_PORT;
    }

    start( callback: any ){
        this.app.listen( this.port, callback );
    }
}

