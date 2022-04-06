const core = require("@actions/core");
const { detectClones } = require("@barecheck/clones");
const { getClonesReportBody, githubApi } = require("@barecheck/core");

const { getPullRequestContext, getOctokit } = require("./lib/github");
const { sendCurrentClones } = require("./lib/api");

const { commentTitle } = require("./config");

async function main() {
  try {
    // TODO: get path from action.yml
    const { statistic } = await detectClones(["./src"], {});

    const pullRequestContext = getPullRequestContext();
    const body = getClonesReportBody(commentTitle, statistic);

    const octokit = await getOctokit();
    const { repo, owner, pullNumber } = pullRequestContext;
    await githubApi.createOrUpdateComment(octokit, {
      owner,
      repo,
      issueNumber: pullNumber,
      searchBody: commentTitle,
      body
    });

    await sendCurrentClones(
      statistic.total.percentage,
      statistic.total.percentageTokens
    );
  } catch (err) {
    core.info(err);
    core.setFailed(err.message);
  }
}

main();
