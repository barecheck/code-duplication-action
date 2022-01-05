const core = require("@actions/core");
const { detectClones } = require("barecheck");

const { commentTitle } = require("./config");
const buildBody = require("./github/comment/buildBody");
const createOrUpdateComment = require("./github/createOrUpdateComment");

async function main() {
  const { statistic, clones } = await detectClones("./src", {});

  const body = buildBody(statistic, clones);

  await createOrUpdateComment(commentTitle, body);
}

try {
  main();
} catch (err) {
  core.info(err);
  core.setFailed(err.message);
}
