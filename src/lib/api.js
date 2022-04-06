const core = require("@actions/core");
const { barecheckApi } = require("@barecheck/core");

const { getBaseRefSha, getCurrentRefSha } = require("./github");
const { getBarecheckApiKey } = require("../input");

let projectAuthState = false;

const authProject = async () => {
  if (!projectAuthState) {
    const apiKey = getBarecheckApiKey();

    const authProjectRes = await barecheckApi.authProject({
      apiKey
    });

    projectAuthState = {
      projectId: authProjectRes.project.id,
      accessToken: authProjectRes.accessToken
    };
  }

  return projectAuthState;
};

const cleanAuthProject = () => {
  projectAuthState = false;
};

const getBaseBranchClones = async () => {
  const { ref, sha } = getBaseRefSha();

  core.info(`Getting metrics from Barecheck. ref=${ref}, sha=${sha}`);

  const { projectId, accessToken } = await authProject();

  const clonesMetrics = await barecheckApi.clonesMetrics(accessToken, {
    projectId,
    ref,
    sha,
    take: 1
  });

  return clonesMetrics[0] ? clonesMetrics[0].totalLinesPercentage : false;
};

const sendCurrentClones = async (
  totalLinesPercentage,
  totalBranchesPercentage
) => {
  const { ref, sha } = getCurrentRefSha();

  const metricsMessage = `totalLinesPercentage=${totalLinesPercentage}, totalBranchesPercentage=${totalBranchesPercentage}`;
  core.info(
    `Sending metrics to Barecheck. ref=${ref}, sha=${sha}, ${metricsMessage}`
  );

  const { projectId, accessToken } = await authProject();

  await barecheckApi.createClonesMetric(accessToken, {
    projectId,
    ref,
    sha,
    totalLinesPercentage,
    totalBranchesPercentage
  });
};

module.exports = {
  getBaseBranchClones,
  sendCurrentClones,
  authProject,
  cleanAuthProject
};
