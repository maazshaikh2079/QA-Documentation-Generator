require('dotenv').config();

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const { run } = require("./tc");
const { run1 } = require("./tp");
const { run2 } = require("./dr");

app.post("/generate-test-cases", async (req, res) => {
  try {
    const { userInput } = req.body;
    console.log("User input received:", userInput);

    const response = await run(userInput);
    res.send(response);
  } catch (error) {
    console.error("Error generating test cases:", error);
    res.status(500).send("Something went wrong.");
  }
});

app.post("/generate-test-plan", async (req, res) => {
  try {
    const { userInput } = req.body;
    console.log("User input received:", userInput);

    const response = await run1(userInput);
    res.send(response);
  } catch (error) {
    console.error("Error generating test plan:", error);
    res.status(500).send("Something went wrong.");
  }
});

app.post("/generate-defect-report", async (req, res) => {
  try {
    const { userInput } = req.body;
    console.log("User input received:", userInput);

    const response = await run2(userInput);
    res.send(response);
  } catch (error) {
    console.error("Error generating defect report:", error);
    res.status(500).send("Something went wrong.");
  }
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
