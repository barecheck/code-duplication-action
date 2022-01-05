const core = require("@actions/core");
const { detectClones } = require("barecheck");

// const { commentTitle } = require("./config");
// const buildBody = require("./github/comment/buildBody");
// const createOrUpdateComment = require("./github/createOrUpdateComment");

async function main() {
  try {
    const { statistic, clones } = await detectClones(["./src"], {});
    // eslint-disable-next-line no-console
    console.log(statistic, clones);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }

  // await createOrUpdateComment(commentTitle, body);
}

try {
  main();
} catch (err) {
  core.info(err);
  core.setFailed(err.message);
}
