import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks/useIssues';
import { Loading } from '../shared';
import { State } from '../interfaces';

export const ListView = () => {
  // ========== STATE ISSUE ==========
  const [state, setState] = useState<State>(State.All);

  // ========== STATE LABELS ==========
  const [labelsSelected, setLabelsSelected] = useState<string[]>([]);


  // ========== USE QUERY ISSUE ==========
  const { issuesQuery } = useIssues({ state, labels: labelsSelected });
  const { data: issues, isLoading } = issuesQuery;


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
            : <IssueList issues={issues} setState={setState} state={state} />
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
