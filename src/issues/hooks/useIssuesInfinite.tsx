import { useInfiniteQuery } from "@tanstack/react-query";
import { getIssues } from "../actions";
import { State } from "../interfaces";


interface Props {
    state: State;
    labels: string[];
}

export const useIssuesInfinite = ({ state, labels }: Props) => {


    const issuesInfiniteQuery = useInfiniteQuery({
        queryKey: ['issues', 'infinite', { state, labels }],
        queryFn: ({ pageParam, queryKey }) => {
            // console.log('pageParam', pageParam); // como va aumentando con el click
            // console.log('queryKey', queryKey);

            const [, , args] = queryKey;
            const { state, labels } = args as Props;

            return getIssues({ state, labels, page: pageParam });
        },
        staleTime: 1000 * 60 * 60, // 1 hour para que no se haga el fetch a la bd en una hora
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            // allPages es un arreglo con todas las paginas que se han ido cargando
            // lastPage es la ultima pagina que se ha cargado
            if (lastPage.length === 0) return;
            console.log('lastPage', lastPage);
            return allPages.length + 1;
        },
    });

    return {
        issuesInfiniteQuery,
    };
}



