const core = require("@actions/core");
const { duplicates } = require("@barecheck/scanner");

async function main() {
  core.info("Hello from Github action");

  const metrics = duplicates.getMetrics("./src", "644b0a1");

  // eslint-disable-next-line no-console
  console.log(metrics);
}

try {
  main();
} catch (err) {
  core.info(err);
  core.setFailed(err.message);
}
