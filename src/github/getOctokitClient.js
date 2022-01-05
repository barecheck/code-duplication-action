const github = require("@actions/github");

const {
  api: {
    endpoints: { createGithubAccessToken }
  }
} = require("barecheck");
const { getBarecheckGithubAppToken } = require("../input");

let githubAccessToken = null;

const createNewAccessToken = async (githubAppToken) => {
  const { token } = await createGithubAccessToken({ githubAppToken });

  return token;
};

const getOctokitClient = async () => {
  const githubAppToken = getBarecheckGithubAppToken();
  if (!githubAppToken)
    throw new Error("barecheck-github-app-token property is required");

  if (githubAccessToken === null)
    githubAccessToken = await createNewAccessToken(githubAppToken);

  const octokit = github.getOctokit(githubAccessToken);

  return octokit;
};

module.exports = getOctokitClient;
