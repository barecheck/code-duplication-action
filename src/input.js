const core = require("@actions/core");

const valueOrFalse = (value) =>
  value === "" || value.toLowerCase() === "false" ? false : value;

const getBarecheckGithubAppToken = () =>
  valueOrFalse(core.getInput("barecheck-github-app-token"));

const getBarecheckApiKey = () =>
  valueOrFalse(core.getInput("barecheck-api-key"));

module.exports = {
  getBarecheckGithubAppToken,
  getBarecheckApiKey
};
