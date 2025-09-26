import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../actions";
import { State } from "../interfaces";


interface Props {
    state: State;
    labels: string[];
}

export const useIssues = ({ state, labels }: Props) => {
    const issuesQuery = useQuery({
        // un objeto en queryKey para enviar diferentes params 
        // para paginacion, filters, orders, etc
        queryKey: ['issues', { state, labels }],
        queryFn: () => getIssues({ state, labels }),
        staleTime: 1000 * 60 * 60, // 1 hour para que no se haga el fetch a la bd en una hora
    });

    return {
        issuesQuery,
    };
}



