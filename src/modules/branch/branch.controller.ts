import express from 'express';
import Branch from './branch.interface';
import fetch from 'node-fetch';
import Config from '../../config'; 
 
class BranchController {
    public path = '/branch';
    public router = express.Router();
 
    constructor() {
        this.intializeRoutes();
    }
    
    public intializeRoutes() {
        this.router.post(`${this.path}/`, this.getAllBranches);
    }
    
    getAllBranches = (request: express.Request, response: express.Response) => {
        const { username, reponame } = request.body;
        fetch(`${Config.GITHUB_API_URL}/repos/${username}/${reponame}/branches`)
            .then(res => res.json())
            .then(json => {
                if(Reflect.has(json, 'message')){
                    return response.status(500).json({
                        status: 500,
                        data: json
                    })
                }
                let branchesToReturn: Branch[] = json;
                return response.status(200).json({
                    status: 200,
                    data: branchesToReturn
                })
            });
    }
}
 
export default BranchController;