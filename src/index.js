const core = require("@actions/core");

async function main() {
  core.info("Hello from Github action");
}

try {
  main();
} catch (err) {
  core.info(err);
  core.setFailed(err.message);
}
