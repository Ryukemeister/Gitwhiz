#!/usr/bin/env node

const { program } = require("commander");

program.helpOption(false);
program.addHelpCommand(false);

const suggest = require("./commands/suggestCmd");
const elaborate = require("./commands/elaborateCmd");

program.parse();
