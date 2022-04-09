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

describe("GET /genres", () => {
  it("return a list of genres", async () => {
    const res = await request(app).get("/genres");

    expect(res.statusCode).toEqual(201);
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toBeDefined();
  });
});

describe("GET /movies/1", () => {
  it("return movie details of specific movie", async () => {
    const res = await request(app).get("/movies/1");

    expect(res.statusCode).toEqual(201);
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toBeDefined();
  });
});

describe("GET /genres/12", () => {
  it("return genre details of specific genre", async () => {
    const res = await request(app).get("/genres/12");

    expect(res.statusCode).toEqual(201);
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toBeDefined();
  });
});

describe("GET /movies/sort/popularity", () => {
  it("return a list of movies sorted by popularity", async () => {
    const res = await request(app).get("/movies/sort/popularity");

    expect(res.statusCode).toEqual(201);
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toBeDefined();
  });
});

describe("GET /movies/filter/Action", () => {
  it("return a list of movies filtered by genre", async () => {
    const res = await request(app).get("/movies/filter/Action");

    expect(res.statusCode).toEqual(201);
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toBeDefined();
  });
});
