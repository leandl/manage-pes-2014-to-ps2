import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runMigrations();
});

describe("POST /api/v1/team", () => {
  describe("Anonymous user", () => {
    test("Creating a valid team", async () => {
      const TEST_DATA = {
        id: 1,
        name: "My Team",
      };

      const response = await fetch("http://localhost:3000/api/v1/team", {
        method: "POST",
        body: JSON.stringify({ name: TEST_DATA.name }),
      });

      expect(response.status).toBe(201);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        id: TEST_DATA.id,
        name: TEST_DATA.name,
      });
    });
  });
});
