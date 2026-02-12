import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Welcome {user?.name}</h1>
      <div className="space-x-3">
        <Link to="/teams" className="bg-blue-500 text-white px-3 py-2">Teams</Link>
        <Link to="/tasks" className="bg-green-500 text-white px-3 py-2">Tasks</Link>
        <Link to="/create-task" className="bg-purple-500 text-white px-3 py-2">Create Task</Link>
        <button onClick={logout} className="bg-red-500 text-white px-3 py-2">Logout</button>
      </div>
    </div>
  );
}
