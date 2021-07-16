const github = require("@actions/github");

const { getBarecheckGithubAppToken } = require("../input");
const { createGithubAccessToken } = require("../services/barecheckApi");

let githubAccessToken = null;

const createNewAccessToken = async (barecheckGithubAppToken) => {
  const { token } = await createGithubAccessToken(barecheckGithubAppToken);

  return token;
};

const getOctokitClient = async () => {
  const barecheckGithubAppToken = getBarecheckGithubAppToken();
  if (!barecheckGithubAppToken)
    throw new Error("barecheck-github-app-token property is required");

  if (!githubAccessToken)
    githubAccessToken = await createNewAccessToken(barecheckGithubAppToken);

  const octokit = github.getOctokit(githubAccessToken);

  return octokit;
};

module.exports = getOctokitClient;
