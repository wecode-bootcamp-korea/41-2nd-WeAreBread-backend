const request = require("supertest");
const axios = require("axios");

const { createApp } = require("../app");
const { appDataSource } = require("../models/dbconfig");

describe("User API", () => {
  let app;

  const mockAxoisResponse = {
    data: {
      id: 123456789,
      connected_at: "",
      properties: { nickname: "" },
      kakao_account: {
        profile_nickname_needs_agreement: test,
        profile: { nickname: "" },
        has_email: test,
        email_needs_agreement: test,
        is_email_valid: test,
        is_email_verified: test,
        email: "",
      },
    },
  };

  beforeAll(async () => {
    app = createApp();
    await appDataSource.initialize();
    await appDataSource.query(
      `INSERT INTO social_types 
        (name) 
      VALUES 
        ("kakao")
      ;`
    );
  });

  afterEach(async () => {
    jest.resetAllMocks();
  });

  afterAll(async () => {
    await appDataSource.query(`SET foreign_key_checks = 0;`);
    await appDataSource.query(`TRUNCATE table social_types;`);
    await appDataSource.query(`TRUNCATE table users;`);
    await appDataSource.query(`SET foreign_key_checks = 1;`);

    await appDataSource.destroy();
  });

  describe("signUp", () => {
    test("FAILED: invalid token", async () => {
      const response = await request(app).post("/users/kakao-login").set({
        Authorization: "wrongToken",
      });

      expect(response.statusCode).toEqual(500);
      expect({ message: "Request failed with status code 401" });
    });

    test("SUCCESS: created user", async () => {
      axios.get = jest.fn().mockReturnValue(mockAxoisResponse);
      const response = await request(app).post("/users/kakao-login").set({
        Authorization: "Bearer ${kakaoToken}",
      });

      expect(response.statusCode).toEqual(201);
      expect(response.body).toHaveProperty("accessToken");
    });
  });

  describe("signIn", () => {
    test("FAILED: invalid token", async () => {
      const response = await request(app).post("/users/kakao-login").set({
        Authorization: "wrongToken",
      });

      expect(response.statusCode).toEqual(500);
      expect({ message: "Request failed with status code 401" });
    });

    test("SUCCESS: login user", async () => {
      axios.get = jest.fn().mockReturnValue(mockAxoisResponse);
      const response = await request(app).post("/users/kakao-login").set({
        Authorization: "Bearer ${kakaoToken}",
      });

      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty("accessToken");
    });
  });
});
