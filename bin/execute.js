#!/usr/bin/env node

import inquirer from "inquirer";
import ora from "ora";
import degit from "degit";
import chalk from "chalk";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs-extra";

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createProject() {
  console.log(chalk.green("Welcome to Express.js Setup CLI 🚀"));
  const spinner = ora({
    text: chalk.blue("Downloading template..."),
    spinner: "dots", // Keeps it animated
    color: "cyan",
  });

  try {
    const { projectName } = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "Enter your project name:",
        default: "my-node-ts-app",
      },
    ]);

    const projectPath = path.join(process.cwd(), projectName);

    console.log(chalk.blue(`\nCreating project: ${chalk.bold(projectName)}...\n`));

    const repo = "https://github.com/swapnesh839/swapnesh_io_node_ts_template.git/template"; // Adjust the path if necessary

    try {
      spinner.start();
      const emitter = degit(repo, { cache: false, force: true });
      await emitter.clone(projectPath);
      spinner.succeed(chalk.green("Template downloaded successfully! 🚀"));
    } catch (error) {
      spinner.fail(chalk.red("Failed to download template! ❌"));
      console.error(chalk.red(error));
      process.exit(1);
    }
    const packageJsonPath = path.join(projectPath, "package.json");

    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
      packageJson.name = projectName;
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    }

    console.log(chalk.green("\nSetup complete! 🎉"));
    console.log(`\nRun the following commands:\n`);
    console.log(chalk.cyan(`cd ${projectName} && yarn && yarn dev`));
  } catch (error) {
    if (error.isTtyError) {
      console.error(chalk.red("Error: Prompt couldn't be rendered in this environment."));
    } else {
      console.log(chalk.yellow("\nProcess canceled by user. Exiting... 👋"));
    }
    process.exit(0);
  }


}

createProject();
