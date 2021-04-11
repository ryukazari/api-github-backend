interface Branch {
    name: string;
    commit: CommitData;
    protected: boolean;
}
interface CommitData{
    sha: string,
    url: string
}
//https://api.github.com/repos/ryukazari/SoyJorgeSAC/branches
export default Branch;