import request from "supertest";
import app from "../../src/app";

describe("GET /api/transactions", () => {
  it("should return an array of transactions for the user", async () => {
    const response = await request(app).get("/api/transactions");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    if (response.body.length > 0) {
      expect(response.body[0]).toHaveProperty("transactionId");
      expect(response.body[0]).toHaveProperty("timestamp");
    }
  });
});
