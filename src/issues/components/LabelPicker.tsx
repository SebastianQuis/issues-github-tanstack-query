import { useLabels } from '../hooks/useLabels';
import { Loading } from '../shared';

interface Props {
  selectedLabels: string[];

  onLabelChange: (label: string) => void;
}


export const LabelPicker = ({ selectedLabels, onLabelChange }: Props) => {
  // custom hook para use query y labels
  const { labelsQuery } = useLabels();


  if (labelsQuery.isLoading || !labelsQuery.data) {
    return <Loading />;
  }

  const { data: labels } = labelsQuery;

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {
        labels.map(label => (
          <span
            key={label.id}
            onClick={() => onLabelChange(label.name)}
            className={
              `animate-fadeIn px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer 
              ${selectedLabels.includes(label.name) && 'label-selected'}`
            }
            // style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
          >
            {label.name}
          </span>
        ))
      }
    </div>
  );
};
