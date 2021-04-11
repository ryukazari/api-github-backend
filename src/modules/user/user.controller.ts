import express from 'express';
import User from './user.interface';
import fetch from 'node-fetch';
import Config from '../../config'; 

class UserController {
    public path = '/user';
    public router = express.Router();
 
    constructor() {
        this.intializeRoutes();
    }
    
    public intializeRoutes() {
        this.router.get(`${this.path}/:username`, this.getUser);
    }
    
    getUser = (request: express.Request, response: express.Response) => {
        const { username } = request.params;
        fetch(`${Config.GITHUB_API_URL}/users/${username}`)
            .then(res => res.json())
            .then(json => {
                let userReturned: User = {
                    id: json.id,
                    avatar_url: json.avatar_url,
                    created_at: json.created_at,
                    login: json.login,
                    repos_url: json.repos_url,
                    url: json.url
                }
                response.status(200).json({
                    status: 200,
                    data: userReturned
                })
            });
    }
}
 
export default UserController;