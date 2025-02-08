import express from "express";
import { createServer, Server } from "http";
import readline from "readline";

import { app } from "../server.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Prompts the user to manually enter a port number if automatic retries fail.
 */
const ManualPort = (): void => {
  rl.question("Enter a new port manually: ", (newPort: string) => {
    const parsedPort = Number(newPort);
    if (!isNaN(parsedPort) && parsedPort > 0) {
      startServer({ port: parsedPort, retryCount: 2, app });
    } else {
      console.error("❌ Invalid port. Server not started.");
      process.exit(1);
    }
  });
};

/**
 * Starts the server on the specified port.
 * If the port is in use, it offers retry options.
 */
const startServer = ({
  port,
  retryCount = 0,
  app,
}: {
  port: number;
  retryCount?: number;
  app: express.Express;
}): void => {
  const server: Server = createServer(app);

  server
    .listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}/`);
    })
    .on("error", (err: NodeJS.ErrnoException) => {
      if (err.code === "EADDRINUSE") {
        console.log(`⚠️ Port ${port} is already in use.`);

        if (retryCount === 0) {
          // First retry with port+1
          rl.question(
            `Do you want to try with port ${port + 1}? (y/n): `,
            (answer) => {
              if (answer.toLowerCase() === "y") {
                startServer({
                  port: port + 1,
                  retryCount: retryCount + 1,
                  app,
                });
              }
              if (answer.toLowerCase() === "n") {
                process.exit(1);
              }
            },
          );
        } else {
          ManualPort();
        }
      } else {
        console.error("❌ Server error:", err.message);
        console.log("⛔ Server failed to start. Exiting...");
        process.exit(1);
        rl.close();
      }
    });
};

export { startServer };
