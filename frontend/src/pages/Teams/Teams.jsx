import { useState } from "react";
import useTeams from "../../hooks/useTeams";
import useUsers from "../../hooks/useUsers";
import { Link } from "react-router-dom";

export default function Teams() {
  const { teams, createTeam, addMember, removeMember, deleteTeam } = useTeams();
  const { users, loading: usersLoading } = useUsers();
  const [name, setName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [expandedTeamId, setExpandedTeamId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsCreating(true);
    await createTeam(name);
    setName("");
    setIsCreating(false);
  };

  const handleAddMember = async (teamId) => {
    if (!selectedUserId) return;
    const selectedUser = users.find(u => u._id === selectedUserId);
    if (!selectedUser) return;
    await addMember(teamId, selectedUser.email);
    setSelectedUserId("");
  };

  const handleRemoveMember = async (teamId, memberId) => {
    if (window.confirm('Are you sure you want to remove this member from the team?')) {
      await removeMember(teamId, memberId);
    }
  };

  const handleDeleteTeam = async (teamId) => {
    if (window.confirm('Are you sure you want to delete this team? This action cannot be undone.')) {
      await deleteTeam(teamId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex flex-col animate-fadeIn">
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                Team Management
              </h1>
              <p className="text-sm text-gray-500 font-medium">Create and manage your organization's teams</p>
            </div>
            
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
              <input 
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-gray-400 text-sm w-64"
                placeholder="New Team Name" 
                value={name} 
                onChange={(e)=>setName(e.target.value)} 
              />
              <button 
                type="submit" 
                disabled={!name.trim() || isCreating}
                className={`px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-md transition-all duration-200 flex items-center gap-2 ${(!name.trim() || isCreating) ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-0.5'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                {isCreating ? 'Creating...' : 'Create'}
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Teams Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">All Teams</h2>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">{teams.length} Teams</span>
          </div>
          
          {teams.length === 0 ? (
             <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
               </div>
               <h3 className="text-lg font-medium text-gray-700">No teams yet</h3>
               <p className="text-gray-500 mt-1">Create your first team above to get started.</p>
             </div>
          ) : (
            <div className="space-y-4">
              {teams.map(t => (
                <div key={t._id}>
                  <div className="group bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-200 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
                        {t.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{t.name}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                          {t.members?.length || 0} Members
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex -space-x-2 overflow-hidden">
                        {/* Placeholder for member avatars */}
                        {t.members?.length > 0 ? (
                          t.members.slice(0, 3).map((member, i) => (
                             <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-indigo-100 flex items-center justify-center text-xs text-indigo-600 font-bold uppercase" title={member.name || member.email}>
                                {(member.name || member.email || '?').charAt(0)}
                             </div>
                          ))
                        ) : (
                          <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center text-xs text-gray-400">0</div>
                        )}
                      </div>
                      
                      <button 
                        onClick={() => handleDeleteTeam(t._id)}
                        className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                        title="Delete team"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                      
                      <button 
                        onClick={() => setExpandedTeamId(expandedTeamId === t._id ? null : t._id)}
                        className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 border ${expandedTeamId === t._id ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'text-blue-600 bg-blue-50 border-transparent hover:bg-blue-100'}`}
                      >
                        {expandedTeamId === t._id ? 'Close' : 'View'}
                      </button>
                    </div>
                  </div>
                  
                  {/* Expanded Section */}
                  {expandedTeamId === t._id && (
                    <div className="mt-4 pl-4 border-l-2 border-blue-100 animate-fadeIn space-y-4">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Team Members</h4>
                        
                        {t.members && t.members.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                            {t.members.map((member, idx) => (
                              <div key={idx} className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-lg border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs uppercase flex-shrink-0">
                                    {(member.name || member.email || '?').charAt(0)}
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{member.name || 'Member'}</p>
                                    <p className="text-xs text-gray-500 truncate">{member.email}</p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleRemoveMember(t._id, member._id)}
                                  className="text-gray-400 hover:text-red-500 p-1.5 rounded-full hover:bg-red-50 transition-colors flex-shrink-0"
                                  title="Remove member"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-400 italic mb-4">No members in this team yet.</p>
                        )}

                        <div className="flex gap-2 max-w-md">
                          <select 
                            className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            value={selectedUserId}
                            onChange={(e) => setSelectedUserId(e.target.value)}
                            disabled={usersLoading}
                          >
                            <option value="">Select a user to add...</option>
                            {users
                              .filter(user => !t.members?.some(m => m.email === user.email))
                              .map(user => (
                                <option key={user._id} value={user._id}>
                                  {user.name} ({user.email})
                                </option>
                              ))
                            }
                          </select>
                          <button 
                            onClick={() => handleAddMember(t._id)}
                            disabled={!selectedUserId || usersLoading}
                            className="px-3 py-2 bg-gray-900 hover:bg-black text-white text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
