import { useQuery } from "@tanstack/react-query";
import { getComments, getIssue } from "../actions";

export const useIssue = (issueNumber: number) => {
    const issueQuery = useQuery({
        queryKey: ['issues', issueNumber],
        queryFn: () => getIssue(issueNumber),
        staleTime: 1000 * 60 * 60, // 1 hour para que no se haga el fetch a la bd en una hora
        // retry: false,
    });


    // uno despues del otro, despues de issuQuery
    const commentsQuery = useQuery({
        queryKey: ['issues', issueQuery.data?.number, 'comments'],
        queryFn: () => getComments(Number(issueQuery.data?.number)),
        staleTime: 1000 * 60 * 60, // 1 hour para que no se haga el fetch a la bd en una hora
        enabled: issueQuery.data !== undefined, // solo se ejecuta si issueQuery tiene data
    });



    // ambos a la vez se realiza el fetch useQuery
    // const commentsQuery = useQuery({
    //     queryKey: ['issues', issueNumber, 'comments'],
    //     queryFn: () => getComments(issueNumber),
    //     staleTime: 1000 * 60 * 60, // 1 hour para que no se haga el fetch a la bd en una hora
    //     retry: false,
    // });

    return {
        issueQuery,
        commentsQuery
    };
}



