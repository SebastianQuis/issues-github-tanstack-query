import { FiCheckCircle, FiInfo, FiMessageSquare } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { GithubIssue } from '../interfaces';
import { useQueryClient } from '@tanstack/react-query';
import { getComments, getIssue } from '../actions';


interface Props {
  issue: GithubIssue
}

export const IssueItem = ({ issue }: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // dias de diferentes de hoy con el created_at
  const differenceInDays = Math.floor((Date.now() - new Date(issue.created_at).getTime()) / 86400000);

  const prefetchData = () => {
    // prefetch de la data que necesita /issues/issue/:issueNumber 
    queryClient.prefetchQuery({
      queryKey: ['issues', issue.number],
      queryFn: () => getIssue(issue.number),
      staleTime: 1000 * 60, // 1 minuto
    });

    // prefetch de la data que necesita /comments/:issueNumber 
    queryClient.prefetchQuery({
      queryKey: ['issues', issue.number, 'comments'],
      queryFn: () => getComments(Number(issue.number)),
      staleTime: 1000 * 60, // 1 minuto
    });
  }


  return (
    <div
      onMouseEnter={prefetchData}
      className="animate-fadeIn flex items-center px-2 py-3 mb-5 border rounded-md bg-slate-900 hover:bg-slate-800">

      {
        issue.state === 'open'
          ? <FiInfo size={30} color="red" className="min-w-10" />
          : <FiCheckCircle size={30} color="green" />
      }

      <div className="flex flex-col px-2 w-[80%]">
        <a
          onClick={() => navigate(`/issues/issue/${issue.number}`)}
          className="hover:underline cursor-pointer "
        >
          {issue.title}
        </a>
        <span className="text-gray-500">
          # {issue.number} opened {differenceInDays} days ago by
          <span className="font-bold"> {issue.user.login}</span>
        </span>
      </div>

      <img
        src={issue.user.avatar_url}
        alt="User Avatar"
        className="w-4 h-4 rounded-full mr-4"
      />
      <div className="flex flex-row text-xs gap-2 items-center">
        <span className=" text-gray-400">{issue.comments}</span>
        <FiMessageSquare size={20} className="min-w-5" color="gray" />
      </div>
    </div>
  );
};
