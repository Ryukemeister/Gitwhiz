const { Configuration, OpenAIApi } = require("openai");
const colors = require("colors");

require("dotenv").config();

async function getUserAnswers(queryString, command) {
  // OpenAI configs
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  // API call to OpenAI
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    // Passing prompt based on user input command
    // If user command is suggest then prompt starts with "Q: What is the ${userString}"
    // assuming the user wants gitsy to suggest him a suitable command based on his description and needs
    // Otherwise the prompt starts with "Q: What does the command ${userString} "
    // assuming the user wants gitsy to elaborate a specific command does
    prompt:
      command == "suggest"
        ? `Q: What is the ${queryString}?\nA:`
        : `Q: What does the command ${queryString} do?\nA:`,
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ["\n"],
  });

  // If the command is given by the user is suggest then display answer in bold green colour
  // Otherwise display answer in magenta colour
  const displayAnswer =
    command == "suggest"
      ? colors.bold.green(response.data.choices[0].text.trimStart().trimEnd())
      : colors.magenta(response.data.choices[0].text.trimStart().trimEnd());

  console.log(displayAnswer);
}

module.exports = getUserAnswers;
