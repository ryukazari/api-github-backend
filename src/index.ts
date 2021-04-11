import App from './app';
import Config from './config';
import User from './modules/user/user.controller';

const port = Config.PORT;

const app = new App(
    [
        new User(),
    ],
    port
);
app.listen();

