import { githubApi } from "../../api/github.api";
import { GithubIssue } from "../interfaces";

export const getIssues = async (): Promise<GithubIssue[]> => {
    // await sleep(2000); // 2 segundos
    const resp = await githubApi.get<GithubIssue[]>("/issues");

    // console.log(resp.data);

    return resp.data;
};





