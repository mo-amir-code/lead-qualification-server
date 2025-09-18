/**
 * server.ts
 * -----------------------------------------------------
 * Entry point for the Express backend.
 * - Uses Node.js cluster module to take advantage of multiple CPU cores
 * - Falls back to single-process mode in specific environments (e.g. Vercel)
 * - Starts the Express app on the configured port
 */

import cluster from "node:cluster";
import { availableParallelism } from "node:os";
import process from "node:process";
import { app } from "./app.js";
import { ENV_VARS } from "./config/constants.js";

// Number of available CPU cores (for clustering)
const numCPUs = availableParallelism();

/**
 * Main server bootstrap function
 * -----------------------------------------------------
 * - If running in primary process AND not in Vercel production,
 *   forks workers equal to number of CPU cores.
 * - Each worker runs its own Express server instance.
 * - If a worker dies, logs the event.
 * - Otherwise (worker process or serverless mode),
 *   starts a single Express server on the configured port.
 */
async function main() {
  if (cluster.isPrimary && ENV_VARS.ENV !== "VERCEL_PRODUCTION") {
    console.log(`Primary process ${process.pid} is running`);

    // Fork a worker for each CPU core
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    // Log worker exit events
    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
    });
  } else {
    // Start Express server (worker or serverless mode)
    app.listen(ENV_VARS.PORT, () => {
      console.log(
        `Server started on port ${ENV_VARS.PORT} (PID: ${process.pid})`
      );
    });
  }
}

// Call main() to bootstrap the app
main();