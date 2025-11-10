import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../actions";
import { State } from "../interfaces";
import { useState } from "react";


interface Props {
    state: State;
    labels: string[];
}

export const useIssues = ({ state, labels }: Props) => {

    const [page, setPage] = useState<number>(1);


    const issuesQuery = useQuery({
        // un objeto en queryKey para enviar diferentes params 
        // para paginacion, filters, orders, etc
        queryKey: ['issues', { state, labels, page }],
        queryFn: () => getIssues({ state, labels, page }),
        staleTime: 1000 * 60 * 60, // 1 hour para que no se haga el fetch a la bd en una hora
    });


    const nextPage = () => {
        if (issuesQuery.data?.length === 0) {
            return;
        }

        setPage(page + 1);
    };

    const prevPage = () => {
        if (page === 1) {
            return;
        }

        setPage(page - 1);
    };

    return {
        issuesQuery,
        page,
        setPage,
        nextPage,
        prevPage,
    };
}



