import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useTasks from "../../hooks/useTasks";
import { validateRequired } from "../../utils/validation";

export default function CreateTask() {
  const { createTask } = useTasks();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "", description: "", dueDate: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let tempErrors = {};
    const titleError = validateRequired(form.title, "Title");
    if (titleError) tempErrors.title = titleError;
    
    const dateError = validateRequired(form.dueDate, "Due Date");
    if (dateError) tempErrors.dueDate = dateError;

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await createTask(form);
      navigate("/tasks");
    } catch (error) {
      console.error("Failed to create task", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans pb-12">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-30 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex flex-col animate-fadeIn">
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Create New Task
              </h1>
              <p className="text-sm text-gray-500 font-medium">Add a new task to your list</p>
            </div>
            
            <Link 
              to="/tasks" 
              className="group flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Back to Tasks
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 sm:p-10 backdrop-blur-xl animate-scaleIn">
          <form onSubmit={submit} className="space-y-8">
            
            <div className="space-y-6">
              {/* Title Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Task Title</label>
                <div className="relative">
                  <input 
                    className={`w-full px-5 py-3.5 rounded-xl border ${errors.title ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 bg-gray-50/30 focus:border-violet-500 focus:ring-violet-500/10 focus:bg-white'} focus:ring-4 transition-all duration-200 outline-none font-medium placeholder-gray-400`}
                    placeholder="e.g. Redesign User Dashboard" 
                    value={form.title}
                    onChange={(e)=>{
                      setForm({...form,title:e.target.value});
                      if(errors.title) setErrors({...errors, title: null});
                    }}
                  />
                  {errors.title && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    </div>
                  )}
                </div>
                {errors.title && <p className="text-red-500 text-xs font-semibold ml-1 animate-shake">{errors.title}</p>}
              </div>

              {/* Description Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Description <span className="text-gray-400 font-normal">(Optional)</span></label>
                <textarea 
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50/30 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 focus:bg-white transition-all duration-200 outline-none font-medium placeholder-gray-400 min-h-[120px] resize-y"
                  placeholder="Add details about this task..." 
                  value={form.description}
                  onChange={(e)=>setForm({...form,description:e.target.value})}
                />
              </div>

              {/* Due Date Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Due Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    className={`w-full px-5 py-3.5 rounded-xl border ${errors.dueDate ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 bg-gray-50/30 focus:border-violet-500 focus:ring-violet-500/10 focus:bg-white'} focus:ring-4 transition-all duration-200 outline-none font-medium text-gray-600`}
                    value={form.dueDate}
                    onChange={(e)=>{
                      setForm({...form,dueDate:e.target.value});
                      if(errors.dueDate) setErrors({...errors, dueDate: null});
                    }}
                  />
                  {errors.dueDate && <p className="text-red-500 text-xs font-semibold mt-1.5 ml-1 animate-shake">{errors.dueDate}</p>}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex items-center gap-4">
               <button 
                type="button" 
                onClick={() => navigate('/tasks')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-gray-600 font-bold bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`flex-1 w-full sm:w-auto py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Task...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    Create Task
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
