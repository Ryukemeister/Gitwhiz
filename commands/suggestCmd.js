const { program } = require("commander");
const yargs = require("yargs");
const getUserData = require("../helper/helperFunction");

require("dotenv").config();

const argv = yargs.argv;

program
  .command("suggest")
  .description("suggest commands based on the user input")
  .action(suggestCommands);

async function suggestCommands() {
  const userRequest = argv._[0];
  const userQueryString = argv._.slice(1).join(" ");

  // Check if user input is not empty and user requests is suggest
  if (userRequest == "suggest" && userQueryString.length > 0) {
    getUserData(userQueryString, "suggest");
  } else {
    console.log("Error: No user query has been entered :(");
  }
}

module.exports = suggestCommands;
