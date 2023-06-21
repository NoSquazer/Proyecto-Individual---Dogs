const axios = require("axios");
const { api_key } = process.env;
const controller = require("../../src/controllers/get/getDogs"); // Replace with the actual path to your controller
jest.mock("axios"); // Mocking the axios module

describe("Get Dogs Name", () => {
  test("should return an array of dog names", async () => {
    // Mocking the axios get method
    axios.get.mockResolvedValue({
      data: [
        { name: "Bulldog" },
        { name: "Labrador Retriever" },
        { name: "Poodle" },
      ],
    });

    const expectedDogNames = [
      { name: "Bulldog" },
      { name: "Labrador Retriever" },
      { name: "Poodle" },
    ];

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedDogNames);
  });

  test("should handle errors and return status 500", async () => {
    // Mocking the axios get method to throw an error
    axios.get.mockRejectedValue(new Error("API request failed"));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "API request failed" });
  });
});
