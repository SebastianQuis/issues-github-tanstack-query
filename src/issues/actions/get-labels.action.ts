import { githubApi } from "../../api/github.api";
import { GithubLabel } from "../interfaces";

export const getLabels = async (): Promise<GithubLabel[]> => {
    // await sleep(2000); // 2 segundos
    const resp = await githubApi.get<GithubLabel[]>("/labels");
    console.log("Data recibida:", resp.data);
    return resp.data;
};

