import { useEffect, useState } from "react";
import API from "../services/api";

export default function useTeams() {
  const [teams, setTeams] = useState([]);

  const fetchTeams = async () => {
    const res = await API.get("/teams");
    setTeams(res.data);
  };

  const createTeam = async (name) => {
    await API.post("/teams", { name, members: [] });
    fetchTeams();
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const addMember = async (teamId, email) => {
    await API.post(`/teams/${teamId}/members`, { email });
    fetchTeams();
  };

  const removeMember = async (teamId, memberId) => {
    await API.delete(`/teams/${teamId}/members`, { data: { memberId } });
    fetchTeams();
  };

  const deleteTeam = async (teamId) => {
    await API.delete(`/teams/${teamId}`);
    fetchTeams();
  };

  return { teams, createTeam, addMember, removeMember, deleteTeam };
}
