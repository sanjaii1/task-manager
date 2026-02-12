
export default function TaskItem({ task, updateStatus }) {
  const getStatusColor = (status) => {
    switch(status) {
      case 'done': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'in-progress': return 'bg-violet-100 text-violet-700 border-violet-200';
      default: return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-violet-100 transition-all duration-200">
      <div className="flex-1 min-w-0 mr-4">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-gray-800 truncate group-hover:text-violet-600 transition-colors">{task.title}</h3>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>Added Recently</span>
        </div>
      </div>
      
      <div className="mt-3 sm:mt-0 flex items-center gap-3">
        <select 
          value={task.status} 
          onChange={(e) => updateStatus(task._id, e.target.value)}
          className={`text-xs font-semibold px-3 py-1.5 rounded-full border-0 cursor-pointer outline-none ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-violet-200 transition-all ${getStatusColor(task.status)}`}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
}
