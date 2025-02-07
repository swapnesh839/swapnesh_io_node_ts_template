#!/usr/bin/env node

import inquirer from "inquirer";
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

  // Ask for project name
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

  // Clone only the `template` folder from GitHub using degit
  const repo = "https://github.com/swapnesh839/swapnesh_io_node_ts_template.git/template"; // Adjust the path if necessary
  const emitter = degit(repo, { cache: false, force: true });

  await emitter.clone(projectPath);

  console.log(chalk.green("\nSetup complete! 🎉"));
  console.log(`\nRun the following commands:\n`);
  console.log(chalk.cyan(`cd ${projectName} && yarn && yarn dev`));
}

createProject();
