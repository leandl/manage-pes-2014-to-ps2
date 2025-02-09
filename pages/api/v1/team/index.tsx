import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import controller from "@/infra/controller";
import team from "@/models/team";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function postHandler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const requestBody = JSON.parse(request.body);
  const newTeam = await team.create(requestBody);

  return response.status(201).json({
    id: newTeam.id,
    name: newTeam.name
  });
}
