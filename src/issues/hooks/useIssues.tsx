import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../actions";

export const useIssues = () => {
    const issuesQuery = useQuery({
        queryKey: ['issues'],
        queryFn: getIssues,
        staleTime: 1000 * 60 * 60, // 1 hour para que no se haga el fetch a la bd en una hora
    });

    return {
        issuesQuery,
    };
}



