import { useState } from "react";
import useTeams from "../../hooks/useTeams";

export default function Teams() {
  const { teams, createTeam } = useTeams();
  const [name, setName] = useState("");

  return (
    <div className="p-6 space-y-3">
      <input className="border p-2" value={name} onChange={(e)=>setName(e.target.value)} />
      <button onClick={()=>createTeam(name)} className="bg-blue-500 text-white px-3 py-2">Create</button>

      {teams.map(t => (
        <div key={t._id} className="border p-2">{t.name}</div>
      ))}
    </div>
  );
}
