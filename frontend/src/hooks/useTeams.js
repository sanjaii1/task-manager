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

  return { teams, createTeam };
}
