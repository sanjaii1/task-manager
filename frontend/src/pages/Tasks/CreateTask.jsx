import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTasks from "../../hooks/useTasks";
import { validateRequired } from "../../utils/validation";

export default function CreateTask() {
  const { createTask } = useTasks();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "", description: "", dueDate: ""
  });
  const [errors, setErrors] = useState({});

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
    await createTask(form);
    navigate("/tasks");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Task</h2>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input 
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${errors.title ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
            placeholder="Task Title" 
            value={form.title}
            onChange={(e)=>{
              setForm({...form,title:e.target.value});
              if(errors.title) setErrors({...errors, title: null});
            }}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" 
            placeholder="Task Description" 
            rows="4"
            value={form.description}
            onChange={(e)=>setForm({...form,description:e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <input 
            type="date" 
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${errors.dueDate ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
            value={form.dueDate}
            onChange={(e)=>{
              setForm({...form,dueDate:e.target.value});
              if(errors.dueDate) setErrors({...errors, dueDate: null});
            }}
          />
          {errors.dueDate && <p className="text-red-500 text-xs mt-1">{errors.dueDate}</p>}
        </div>

        <button className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg">
          Create Task
        </button>
      </form>
    </div>
  );
}
