import User from '../user/user.interface';

interface Project {
    id: number;
    name: string;
    owner: User;
    url: string;
    description: string;
}
//https://api.github.com/users/ryukazari/repos
export default Project;