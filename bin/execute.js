#!/usr/bin/env node

import inquirer from "inquirer";
import { execSync } from "child_process";
import chalk from "chalk";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Get the current directory (since `import.meta` doesn't provide __dirname)
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
      default: "my-express-app",
    },
  ]);

  const projectPath = path.join(process.cwd(), projectName);

  // Clone template into the specified directory
  console.log(chalk.blue(`\nCreating project: ${chalk.bold(projectName)}...\n`));
  execSync(`git clone https://github.com/swapnesh839/swapnesh_io_node_ts_template.git ${projectName}`, { stdio: "inherit" });

  // Remove `.git` to prevent Git history cloning
  fs.rmSync(path.join(projectPath, ".git"), { recursive: true, force: true });

  console.log(chalk.green("\nSetup complete! 🎉"));
  console.log(`\nRun the following commands:\n`);
  console.log(chalk.cyan(`cd ${projectName} && yarn && yarn devt`));
}

createProject();
