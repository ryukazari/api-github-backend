import App from './app';
import Config from './config';
import User from './modules/user/user.controller';
import Project from './modules/project/project.controller';
import Commit from './modules/commit/commit.controller';
import Branch from './modules/branch/branch.controller';

const port = Config.PORT;

const app = new App(
    [
        new User(),
        new Project(),
        new Commit(),
        new Branch()
    ],
    port
);
app.listen();

