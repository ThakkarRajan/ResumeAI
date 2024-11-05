// server.js
const express = require("express");
const cors = require("cors");
const pdfParse = require("pdf-parse");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/parse-resume", async (req, res) => {
  const { url } = req.body;

  try {
    const response = await fetch(url);
    const buffer = await response.buffer();

    const data = await pdfParse(buffer);
    res.json({ parsedText: data.text });
  } catch (error) {
    console.error("Error parsing PDF:", error);
    res.status(500).json({ error: "Failed to parse resume." });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
