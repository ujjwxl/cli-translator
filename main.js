import { translate } from "@vitalets/google-translate-api";
import { languages } from "./languages.js";
import inquirer from "inquirer";
import chalk from "chalk";

async function getUserChoice() {
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
      message: "From which language:",
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

console.log(chalk.blue.bgBlueBright.bold("Welcome to CLI-Translator!"));

console.log(chalk.magenta.bold("Press -l to view all availible languages"));
console.log(chalk.magenta.bold("Press -t to translate a text"));
console.log(chalk.magenta.bold("Press exit to exit the tool"));

async function displayManual(option) {
  if (option === "-l") {
    console.log(chalk.magenta.bold("List of Available Languages:"));
    languages.forEach((language) => {
      console.log(
        chalk.blue(`${language.name}:` + chalk.green(`${language.code}`))
      );
    });
  } else if (option === "-t") {
    const { fromLanguage, toLanguage, textContent } = await getUserInput();
    const { text } = await translate(textContent, {
      from: fromLanguage,
      to: toLanguage,
    });
    console.log(chalk.blue.bgBlue.bold("Translated text"));
    console.log(text);
  } else if (option.toLowerCase() === 'exit') {
    console.log(chalk.magenta.bold("Exiting the program"));
    process.exit(0);
  } else {
    console.log(
      chalk.red(
        "Invalid option. Please use -l to view available languages or -t to translate text."
      )
    );
  }
  const { choice } = await getUserChoice();
  displayManual(choice);
}

const { choice } = await getUserChoice();
displayManual(choice);

// const { fromLanguage, toLanguage, textContent } = await getUserInput();
// const { text } = await translate(textContent, { from: fromLanguage, to: toLanguage });
// console.log(chalk.blue.bgBlue.bold('Translated text'));
// console.log(text)
