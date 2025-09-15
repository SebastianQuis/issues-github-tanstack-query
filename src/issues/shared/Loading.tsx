import { FiRefreshCcw } from 'react-icons/fi'

export const Loading = () => {
    return (
        <div className='justify-center items-center h-full w-full flex'>
            <div className="animate-spin">
                <FiRefreshCcw size={20} />
            </div>
        </div>
    )
}
