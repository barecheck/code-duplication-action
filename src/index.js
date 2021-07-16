const core = require("@actions/core");
const { duplicates } = require("@barecheck/scanner");

async function main() {
  core.info("Hello from Github action");

  const metrics = await duplicates.getMetrics("./src", "origin/master");

  // eslint-disable-next-line no-console
  console.log(metrics);
}

try {
  main();
} catch (err) {
  core.info(err);
  core.setFailed(err.message);
}
