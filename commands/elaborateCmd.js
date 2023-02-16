const { program } = require("commander");
const yargs = require("yargs");
const getUserData = require("../helper/helperFunction");

require("dotenv").config();

const argv = yargs.argv;

program
  .command("elaborate")
  .description("elaborate what a specific command does")
  .action(elaborateCommand);

async function elaborateCommand() {
  const userRequest = argv._[0];
  const userQueryString = argv._.slice(1).join(" ");

  // Check if user input is not empty and user request is elaborate
  if (userRequest == "elaborate" && userQueryString.length > 0) {
    getUserData(userQueryString, "elaborate");
  } else {
    console.log("Error: No user query has been entered :(");
  }
}

module.exports = elaborateCommand;
