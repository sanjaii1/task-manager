import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useTasks from "../../hooks/useTasks";
import TeamList from "./components/TeamList";
import TaskItem from "./components/TaskItem";


export default function Dashboard() {
  const { user } = useAuth();
  const { tasks, updateStatus } = useTasks();

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans">
    
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
           
            <div className="flex flex-col animate-fadeIn">
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Welcome, {user?.name}
              </h1>
              <p className="text-sm text-gray-500 font-medium">Here's what's happening today</p>
            </div>

            <div className="flex items-center gap-4">
              <Link 
                to="/create-task" 
                className="hidden sm:flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-xl font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                <span>Create Task</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className={`grid grid-cols-1 ${user?.role === 'admin' ? 'lg:grid-cols-2' : ''} gap-8`}>
          
          <div className="h-full">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="p-1.5 bg-violet-100 text-violet-600 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  </span>
                  My Tasks
                </h2>
                <div className="flex gap-2">
                   <Link to="/tasks" className="text-sm font-medium text-gray-400 hover:text-violet-600 transition-colors">View All</Link>
                </div>
              </div>
              
              <div className="p-6 flex-1">
                {tasks.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-xl">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                    </div>
                    <p className="text-gray-500 font-medium">No tasks yet</p>
                    <Link to="/create-task" className="text-violet-600 text-sm font-semibold hover:underline mt-2 inline-block">Create your first task</Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {tasks.map(task => (
                      <TaskItem key={task._id} task={task} updateStatus={updateStatus} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {user?.role === 'admin' && (
            <div className="h-full">
              <TeamList />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
