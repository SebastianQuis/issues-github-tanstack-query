import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { Loading } from '../shared';
import { State } from '../interfaces';
import { useIssuesInfinite } from '../hooks/useIssuesInfinite';

export const ListViewInfinite = () => {
  // ========== STATE ISSUE ==========
  const [state, setState] = useState<State>(State.All);

  // ========== STATE LABELS ==========
  const [labelsSelected, setLabelsSelected] = useState<string[]>([]);


  // ========== USE QUERY ISSUE ==========
  const { issuesInfiniteQuery } = useIssuesInfinite({ state, labels: labelsSelected });

  // flat porque la data.pages viene como un arreglo de arreglos
  const issues = issuesInfiniteQuery.data?.pages.flat() || [];
  const isLoading = issuesInfiniteQuery.isLoading;

  const handleLabelSelect = (label: string) => {
    // quitar si ya existe, agregar si no existe
    if (labelsSelected.includes(label)) {
      setLabelsSelected(labelsSelected.filter(l => l !== label));
    } else {
      setLabelsSelected([...labelsSelected, label]);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        {
          (isLoading || !issues)
            ? <Loading />
            : (
              <div className='flex flex-col gap-5'>
                <IssueList issues={issues} setState={setState} state={state} />

                <button
                  onClick={() => issuesInfiniteQuery.fetchNextPage()}
                  disabled={issuesInfiniteQuery.isFetchingNextPage}
                  className='disabled:bg-gray-400 p-2 bg-blue-700 hover:bg-blue-600 text-white rounded disabled:opacity-50 transition-all'>
                  {
                    issuesInfiniteQuery.isFetchingNextPage
                      ? 'Loading...'
                      : issuesInfiniteQuery.hasNextPage
                        ? 'Load more'
                        : 'No more issues'
                  }
                </button>

              </div>
            )
        }
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker
          selectedLabels={labelsSelected}
          onLabelChange={handleLabelSelect}
        />
      </div>
    </div>
  );
};
