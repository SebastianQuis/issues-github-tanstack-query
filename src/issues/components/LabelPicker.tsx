import { useLabels } from '../hooks/useLabels';
import { Loading } from '../shared';

export const LabelPicker = () => {
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
            className="animate-fadeIn px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer"
            style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
          >
            {label.name}
          </span>
        ))
      }
    </div>
  );
};
