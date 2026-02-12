import { Link } from "react-router-dom";
import useTeams from "../../../hooks/useTeams";

export default function TeamList() {
  const { teams } = useTeams();
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <span className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </span>
          Active Teams
        </h2>
        <span className="text-xs font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full">{teams.length} Teams</span>
      </div>
      <div className="p-6 overflow-y-auto flex-1">
        {teams.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No teams found.</p>
            <Link to="/teams" className="text-indigo-600 text-sm font-medium hover:underline mt-2 inline-block">Manage Teams</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {teams.map((team) => (
              <div key={team._id} className="group flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                    {team.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">{team.name}</h3>
                    <p className="text-xs text-gray-500">{team.members?.length || 0} members</p>
                  </div>
                </div>
                <Link to="/teams" className="text-gray-400 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
