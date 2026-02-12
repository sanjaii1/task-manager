import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTasks from "../../hooks/useTasks";
import TaskItem from "../Dashboard/components/TaskItem";

export default function Tasks() {
  const navigate = useNavigate();
  const { tasks, updateStatus } = useTasks();
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    return task.status === filter;
  });


  const counts = {
    all: tasks.length,
    pending: tasks.filter(t => t.status === "pending").length,
    "in-progress": tasks.filter(t => t.status === "in-progress").length,
    done: tasks.filter(t => t.status === "done").length
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans">

      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-30 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-6 gap-4">
            <div className="flex flex-col animate-fadeIn">
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                My Tasks
              </h1>
              <p className="text-sm text-gray-500 font-medium">Manage your daily activities and track progress</p>
            </div>
            
            <button 
              onClick={() => navigate('/create-task')}
              className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl shadow-md transition-all duration-200 flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              <span>Create Task</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-0 -mb-px">
            {[
              { id: 'all', label: 'All Tasks' },
              { id: 'pending', label: 'Pending' },
              { id: 'in-progress', label: 'In Progress' },
              { id: 'done', label: 'Completed' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`whitespace-nowrap px-4 py-3 border-b-2 text-sm font-medium transition-all duration-200 ${
                  filter === tab.id 
                    ? 'border-violet-600 text-violet-700 bg-violet-50/50' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  filter === tab.id ? 'bg-violet-100 text-violet-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  {counts[tab.id]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm animate-fadeIn">
            <div className="w-16 h-16 bg-violet-50 rounded-full flex items-center justify-center mx-auto mb-4 text-violet-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">No tasks {filter !== 'all' ? `in ${filter}` : ''}</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              {filter === 'all' 
                ? "You haven't created any tasks yet. Create one to get started." 
                : `No tasks found with status "${filter}". Check back later or create a new one.`}
            </p>
          </div>
        ) : (
          <div className="space-y-3 animate-fadeIn">
            {filteredTasks.map(task => (
              <TaskItem 
                key={task._id} 
                task={task} 
                updateStatus={updateStatus} 
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
