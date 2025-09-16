import { githubApi } from "../../api/github.api";
import { GithubIssue } from "../interfaces";

export const getIssue = async (issueNumber: number): Promise<GithubIssue> => {
    // await sleep(2000); // 2 segundos
    const resp = await githubApi.get<GithubIssue>(`/issues/${issueNumber}`);
    return resp.data;
};





