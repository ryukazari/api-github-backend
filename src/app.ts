import express, { response } from 'express';
class App {
    public app: express.Application;
    public port: string;
    
    constructor(controllers: any[], port: string) {
        this.app = express();
        this.port = port;
    
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }
    
    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}))
    }
    
    private initializeControllers(controllers: any[]) {
        this.app.use(function(request: express.Request, response: express.Response, next: express.NextFunction) {
            console.log(`${request.method} ${request.path}`);
            next();
        });
        if(controllers.length <= 0) { this.app.use('/', function(request: express.Request, response: express.Response){
            response.json({
                "message": "init"
            })
        }) }
        else{
            controllers.forEach((controller: any) => {
                this.app.use('/api', controller.router);
            });
        }
    }
    
    
    public listen() {
        this.app.listen(this.port, () => {
        console.log(`Servidor corriendo en el puerto: ${this.port}`);
        });
    }
}
 
export default App;