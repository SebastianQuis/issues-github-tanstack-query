import { GithubIssue, State } from '../interfaces';
import { IssueItem } from './IssueItem';

interface Props {
  issues: GithubIssue[];
  setState: (state: State) => void;
  state: State;
}

export const IssueList = ({ issues, setState, state }: Props) => {
  return (
    <>
      {/* Botones de All, Open, Closed */}
      <div className="flex gap-4">
        <button className={`btn ${state === State.All && 'active'}`} onClick={() => setState(State.All)}>All</button>
        <button className={`btn ${state === State.Open && 'active'}`} onClick={() => setState(State.Open)}>Open</button>
        <button className={`btn ${state === State.Closed && 'active'}`} onClick={() => setState(State.Closed)}>Closed</button>
      </div>

      {/* Lista de issues */}
      <div className="mt-4">
        {issues.length === 0
          ? <p className='text-center text-gray-500 py-12'>No issues found</p>
          : issues.map(issue => (
            <IssueItem key={issue.id} issue={issue} />
          ))
        }
      </div>
    </>
  );
};
