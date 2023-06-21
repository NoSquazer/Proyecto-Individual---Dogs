const axios = require("axios");
const { Dog, Temperament } = require("../../src/db");
const controller = require("../../src/controllers/get/getDogsById"); // Replace with the actual path to your controller

jest.mock("axios"); // Mocking the axios module
jest.mock("../../src/db", () => ({
  Dog: {
    findOne: jest.fn(),
  },
  Temperament: {
    findAll: jest.fn(),
  },
}));

describe("Your Controller", () => {
  test("should return dog data from API if available", async () => {
    const mockReq = {
      params: { id: "23" },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockAPIResponse = {
      id: 23,
      name: "Australian Shepherd",
      origin: "unknown",
      height: "46 - 58",
      weight: "16 - 29",
      life_span: "12 - 16 years",
      image: "https://cdn2.thedogapi.com/images/B1-llgq4m.jpg",
      temperament:
        "Good-natured, Affectionate, Intelligent, Active, Protective",
    };

    axios.get.mockResolvedValue({ data: mockAPIResponse });

    await controller(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      id: 23,
      name: "Australian Shepherd",
      origin: "unknown",
      height: "46 - 58",
      weight: "16 - 29",
      life_span: "12 - 16 years",
      image: "https://cdn2.thedogapi.com/images/B1-llgq4m.jpg",
      temperament:
        "Good-natured, Affectionate, Intelligent, Active, Protective",
    });
  });

  test("should return dog data from the database if available", async () => {
    const mockReq = {
      params: { id: "1" },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockDBResponse = {
      id: "1",
      name: "Bulldog",
      origin: "England",
      height: "40 - 50",
      weight: "20 - 25",
      life_span: "8 - 10 years",
      image: "https://example.com/image.jpg",
      Temperaments: [{ name: "Friendly" }, { name: "Courageous" }],
    };

    Dog.findOne.mockResolvedValue(mockDBResponse);
    Temperament.findAll.mockResolvedValue([
      { name: "Friendly" },
      { name: "Courageous" },
    ]);

    await controller(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      id: "1",
      name: "Bulldog",
      origin: "England",
      height: "40 - 50",
      weight: "20 - 25",
      life_span: "8 - 10 years",
      image: "https://example.com/image.jpg",
      temperament: ["Friendly", "Courageous"],
    });
  });

  test("should handle missing dog data", async () => {
    const mockReq = {
      params: { id: "" },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: "Missing data!" });
  });

  test("should handle dog not found", async () => {
    const mockReq = {
      params: { id: "1" },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Dog.findOne.mockResolvedValue(null);

    await controller(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: "Not found!" });
  });

  test("should handle errors and return status 500", async () => {
    const mockReq = {
      params: { id: "1" },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const errorMessage = "Database connection failed";
    Dog.findOne.mockRejectedValue(new Error(errorMessage));

    await controller(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
