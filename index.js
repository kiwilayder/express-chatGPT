require("dotenv").config();
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(express.json());

const config = new Configuration({
   apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

const myPort = process.env.PORT || 5000;

app.post("/ask", async (req, res) => {
   const prompt = req.body.prompt;

   try {
      const response = await openai.createCompletion({
         model: "text-davinci-003",
         max_tokens: 1000,
         prompt,
      });

      const completion = response.data.choices[0].text;

      return res.status(200).json({
         success: true,
         message: completion,
         s: response.data.choices,
      });
   } catch (e) {
      console.log(e.message);
   }
});

app.listen(myPort, () => console.log(myPort));
