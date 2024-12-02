const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dialogflow = require("dialogflow");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const config = require("./config/dev");

const projectId = config.googleProjectID;
const sessionId = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;

// Dialogflow 설정
const sessionClient = new dialogflow.SessionsClient();

// API 엔드포인트 설정
app.post("/api/message", async (req, res) => {
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: req.body.message,
        languageCode: languageCode,
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    console.log("Detected intent");
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);

    res.json({ reply: result.fulfillmentText });
    // res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error connecting to Dialogflow");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
