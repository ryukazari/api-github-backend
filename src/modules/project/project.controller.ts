import express from 'express';
import Project from './project.interface';
import User from '../user/user.interface';
import fetch from 'node-fetch';
import Config from '../../config'; 
 
class ProjectController {
    public path = '/project';
    public router = express.Router();
 
    constructor() {
        this.intializeRoutes();
    }
    
    public intializeRoutes() {
        this.router.get(`${this.path}/`, this.getProject);
        this.router.get(`${this.path}/:username`, this.getAllProjects);
    }
    
    getAllProjects = (request: express.Request, response: express.Response) => {
        const { username } = request.params;
        fetch(`${Config.GITHUB_API_URL}/users/${username}/repos`)
            .then(res => res.json())
            .then(json => {
                if(Reflect.has(json, 'message')){
                    response.status(500).json({
                        status: 500,
                        data: json
                    })
                }
                let projectsToReturn: Project[] = [];
                json.forEach((element: any) => {
                    let userProject: User = {
                        id: element.owner.id,
                        avatar_url: element.owner.avatar_url,
                        created_at: element.owner.created_at,
                        login: element.owner.login,
                        repos_url: element.owner.repos_url,
                        url:  element.owner.url,
                    }
                    let projectTemp: Project = {
                        id: element.id,
                        name: element.name,
                        owner: userProject,
                        url: element.url,
                        description: element.description,
                    }
                    projectsToReturn.push(projectTemp);
                });
                response.status(200).json({
                    status: 200,
                    data: projectsToReturn
                })
            });
    }
    getProject = (request: express.Request, response: express.Response) => {
        const { username, reponame } = request.body;
        fetch(`${Config.GITHUB_API_URL}/repos/${username}/${reponame}`)
            .then(res => res.json())
            .then(json => {
                if(Reflect.has(json, 'message')){
                    response.status(500).json({
                        status: 500,
                        data: json
                    })
                }
                let userProject: User = {
                    id: json.owner.id,
                    avatar_url: json.owner.avatar_url,
                    created_at: json.owner.created_at,
                    login: json.owner.login,
                    repos_url: json.owner.repos_url,
                    url:  json.owner.url,
                }
                let projectTemp: Project = {
                    id: json.id,
                    name: json.name,
                    owner: userProject,
                    url: json.url,
                    description: json.description,
                }
                response.status(200).json({
                    status: 200,
                    data: projectTemp
                })
            });
    }
}
 
export default ProjectController;