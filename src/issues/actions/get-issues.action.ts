import { githubApi } from "../../api/github.api";
import { GithubIssue, State } from "../interfaces";

interface Props {
    state: State;
    labels: string[];
}


export const getIssues = async ({ state, labels }: Props): Promise<GithubIssue[]> => {
    // await sleep(2000); // 2 segundos

    const params = new URLSearchParams();

    // solo mandar al params si el state es diferente a All
    if (state !== State.All) {
        params.append("state", state);
    }

    if (labels.length > 0) {
        // unimos los labels con comas
        const labelsString = labels.join(",");
        params.append("labels", labelsString);
    }


    const resp = await githubApi.get<GithubIssue[]>("/issues", {
        params
    });

    return resp.data;
};





