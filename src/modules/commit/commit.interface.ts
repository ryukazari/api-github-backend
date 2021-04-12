export interface Author{
    name: string,
    email: string,
    date: string,
}
export interface File{
    sha: string,
    filename: string,
    status: string,
    aditions: number,
    deletion: number,
    changes: number
}
export interface Commit {
    sha: string;
    author: Author;
    message: string;
    url: string;
    files?: File[];
}
//https://api.github.com/repos/ryukazari/SoyJorgeSAC/commits?sha=gh-pages
// export default Commit;