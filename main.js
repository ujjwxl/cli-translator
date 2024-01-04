import { translate } from "@vitalets/google-translate-api";
import { languages } from "./languages.js";
import inquirer from "inquirer";
import chalk from "chalk";

async function getUserChoice() {
  console.log(' ')
  const userChoice = await inquirer.prompt([
    {
      type: "input",
      name: "choice",
      message: "Enter your choice:",
    },
  ]);
  return userChoice;
}

async function getUserInput() {
  const userInput = await inquirer.prompt([
    {
      type: "input",
      name: "fromLanguage",
      message: "From which language ('auto' to detect language):",
    },
    {
      type: "input",
      name: "toLanguage",
      message: "To which language:",
    },
    {
      type: "input",
      name: "textContent",
      message: "Enter the text to translate:",
    },
  ]);
  return userInput;
}

console.log(chalk.blue.bgCyan.bold("Welcome to CLI-Translator!"));
console.log(' ')

console.log(chalk.green.bold("Start by translating text to any language"));
console.log(chalk.green.bold("View all availible commands by pressing -h"));
console.log(chalk.green.bold("Developed by @ujjwxl"));

async function displayManual(option) {
  if (option === "-l") {
    console.log(' ')
    console.log(chalk.blue.bgCyan.bold("List of Available Languages:"));
    languages.forEach((language) => {
      console.log(
        chalk.white(`${language.name}:` + ' ' + chalk.cyanBright.bold(`${language.code}`))
      );
    });
  } else if (option === "-t") {
    console.log(' ')
    const { fromLanguage, toLanguage, textContent } = await getUserInput();
    const { text } = await translate(textContent, {
      from: fromLanguage,
      to: toLanguage,
    });
    console.log(' ')
    console.log(chalk.blue.bgCyan.bold("Translated text"));
    console.log(text);
  } else if (option.toLowerCase() === 'exit') {
    console.log(chalk.yellow.bold("Exiting the program"));
    process.exit(0);
  } else if (option === "-h") {
    console.log(' ')
    console.log(chalk.blue.bgCyan.bold("List of Available Commands"));
    console.log(chalk.green.bold("-l: View all available languages"));
    console.log(chalk.green.bold("-t: Translate a text"));
    console.log(chalk.green.bold("exit: Exit the tool"));
    console.log(chalk.green.bold("-h: View all available commands (this message)"));
  } else {
    console.log(
      chalk.red(
        "Invalid option. Please use -l to view available languages, -t to translate text, or -h to view available commands."
      )
    );
  }
  const { choice } = await getUserChoice();
  displayManual(choice);
}

const { choice } = await getUserChoice();
displayManual(choice);
