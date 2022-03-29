const core = require("@actions/core");

const valueOrFalse = (value) =>
  value === "" || value.toLowerCase() === "false" ? false : value;

const getGithubToken = () => valueOrFalse(core.getInput("github-token"));

const getBarecheckGithubAppToken = () =>
  valueOrFalse(core.getInput("barecheck-github-app-token"));

const getBarecheckApiKey = () =>
  valueOrFalse(core.getInput("barecheck-api-key"));

module.exports = {
  getGithubToken,
  getBarecheckGithubAppToken,
  getBarecheckApiKey
};
