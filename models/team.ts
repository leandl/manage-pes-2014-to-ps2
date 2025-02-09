import database from "@/infra/database";

type Team = {
  id: number;
  name: string;
};

type TeamCreateDTO = {
  name: string;
};

async function createTeam(team: TeamCreateDTO): Promise<Team> {
  const result = await database.query({
    text: "INSERT INTO team (name) VALUES ($1) RETURNING *",
    values: [team.name],
  });

  const newTeam = result.rows[0];

  return {
    id: newTeam.id,
    name: newTeam.name,
  };
}

const team = {
  create: createTeam,
};

export default team;
