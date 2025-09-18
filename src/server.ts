import process from "node:process";
import { app } from "./app.js";
import { ENV_VARS } from "./config/constants.js";

async function main() {
  app.listen(ENV_VARS.PORT, () => {
    console.log(
      `Server started on port ${ENV_VARS.PORT} (PID: ${process.pid})`
    );
  });
}

// Call main() to bootstrap the app
main();
