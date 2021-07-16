const core = require("@actions/core");
const { duplicates } = require("@barecheck/scanner");

const { commentTitle } = require("./config");
const buildBody = require("./github/comment/buildBody");
const createOrUpdateComment = require("./github/createOrUpdateComment");

async function main() {
  const {
    linesDiff,
    tokensDiff,
    totalPercentage,
    totalTokens,
    clones,
    changedFiles
  } = await duplicates.getMetrics("src", "origin/master");

  const body = buildBody({
    linesDiff,
    tokensDiff,
    totalPercentage,
    totalTokens,
    clones,
    changedFiles
  });

  await createOrUpdateComment(commentTitle, body);
}

try {
  main();
} catch (err) {
  core.info(err);
  core.setFailed(err.message);
}
