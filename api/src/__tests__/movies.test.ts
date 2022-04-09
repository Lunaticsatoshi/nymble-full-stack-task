import app from "../index";
import request from "supertest";

// describe('list movies', () => {
//     test('List all movies', async () => {
//         expect(movies).toBe([]);
//     })
//     test('List movies that match search term', async () => {
//         expect(movies).toBe([]);
//     })
// })

describe("GET /movies", () => {
  it("return a list of movies", async () => {
    const res = await request(app).get("/movies");

    expect(res.statusCode).toEqual(201);
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toBeDefined();
  });
});
