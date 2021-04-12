import express from 'express';
import { Author, Commit, File } from './commit.interface';
import fetch from 'node-fetch';
import Config from '../../config'; 
 
class CommitController {
    public path = '/commit';
    public router = express.Router();
 
    constructor() {
        this.intializeRoutes();
    }
    
    public intializeRoutes() {
        this.router.get(`${this.path}/`, this.getAllCommits);
        this.router.get(`${this.path}/:sha`, this.getCommit);
    }
    
    getAllCommits = (request: express.Request, response: express.Response) => {
        const { username, project, branch } = request.body;
        let branchRoute = branch=="" ? '' : `?sha=${branch}`;
        fetch(`https://api.github.com/repos/${username}/${project}/commits${branchRoute}`)
            .then(res => res.json())
            .then(json => {
                if(Reflect.has(json, 'message')){
                    response.status(500).json({
                        status: 500,
                        data: json
                    })
                }
                let commitReturned: Commit[] = [];
                json.forEach((element: any) => {
                    let authorTemp: Author = {
                        date: element.commit.author.date,
                        email: element.commit.author.email,
                        name: element.commit.author.name,
                    }
                    let commitTemp: Commit = {
                        author: authorTemp,
                        message: element.commit.message,
                        sha: element.sha,
                        url: element.url,
                    }
                    commitReturned.push(commitTemp);
                });
                response.status(200).json({
                    status: 200,
                    data: commitReturned
                })
            });
    }
    getCommit = (request: express.Request, response: express.Response) => {
        const { sha } = request.params;
        const { username, reponame } = request.body;
        fetch(`https://api.github.com/repos/${username}/${reponame}/commits/${sha}`)
        .then(res => res.json())
        .then(json => {
            if(Reflect.has(json, 'message')){
                response.status(500).json({
                    status: 500,
                    data: json
                })
            }
            let filesTemp: File[] = [];
            json.files.forEach((element: any) => {
                let fileTemp: File = {
                    sha: element.sha,
                    aditions: element.aditions,
                    changes: element.changes,
                    deletion: element.deletion,
                    filename: element.filename,
                    status: element.status
                }
                filesTemp.push(fileTemp);
            });
            let authorTemp: Author = {
                date: json.commit.author.date,
                email: json.commit.author.email,
                name: json.commit.author.name,
            }
            let commitReturned: Commit = {
                author: authorTemp,
                message: json.commit.message,
                sha: json.sha,
                url: json.url,
                files: filesTemp
            };
            response.status(200).json({
                status: 200,
                data: commitReturned
            })
        });
    }
}
 
export default CommitController;