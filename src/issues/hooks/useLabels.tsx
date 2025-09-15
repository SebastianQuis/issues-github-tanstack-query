import { useQuery } from "@tanstack/react-query";
import { getLabels } from "../actions";
import { GithubLabel } from "../interfaces";


export const useLabels = () => {
    const labelsQuery = useQuery({
        queryKey: ['labels'],
        queryFn: getLabels,
        staleTime: 1000 * 60 * 60, // 1 hour para que no se haga el fetch a la bd en una hora

        // usando staletime
        placeholderData: [
            {
                "id": 8625278332,
                "node_id": "LA_kwDOAJy2Ks8AAAACAhtNfA",
                "url": "https://api.github.com/repos/facebook/react/labels/Compiler:%20Ref%20Validation",
                "name": "Compiler: Ref Validation",
                "color": "5319e7",
                "default": false,
                "description": ""
            } satisfies GithubLabel,
            {
                "id": 760751171,
                "node_id": "MDU6TGFiZWw3NjA3NTExNzE=",
                "url": "https://api.github.com/repos/facebook/react/labels/Difficulty:%20challenging",
                "name": "Difficulty: challenging",
                "color": "f2687c",
                "default": false,
            } satisfies GithubLabel,
        ],

        // sin usar staletime
        // initialData: [
        //     {
        //         "id": 8625278332,
        //         "node_id": "LA_kwDOAJy2Ks8AAAACAhtNfA",
        //         "url": "https://api.github.com/repos/facebook/react/labels/Compiler:%20Ref%20Validation",
        //         "name": "Compiler: Ref Validation",
        //         "color": "5319e7",
        //         "default": false,
        //         "description": ""
        //     } satisfies GithubLabel,
        //     {
        //         "id": 760751171,
        //         "node_id": "MDU6TGFiZWw3NjA3NTExNzE=",
        //         "url": "https://api.github.com/repos/facebook/react/labels/Difficulty:%20challenging",
        //         "name": "Difficulty: challenging",
        //         "color": "f2687c",
        //         "default": false,
        //     } satisfies GithubLabel,
        // ]
    });

    return {
        labelsQuery,
    };
}



