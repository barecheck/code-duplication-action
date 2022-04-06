const proxyquire = require("proxyquire");
const sinon = require("sinon");
const { assert } = require("chai");

const actionsCoreStub = require("../stubs/actionsCore.stub");

const defaultMocks = {
  ...actionsCoreStub,
  barecheckApi: {},
  getBarecheckApiKey: () => null,
  getBaseRefSha: () => null,
  getCurrentRefSha: () => null
};

const apiLibMock = (mocks) => {
  const {
    info,
    barecheckApi,
    getBarecheckApiKey,
    getBaseRefSha,
    getCurrentRefSha
  } = {
    ...defaultMocks,
    ...mocks
  };
  return proxyquire("../../src/lib/api", {
    "@actions/core": { info },
    "@barecheck/core": { barecheckApi },
    "../input": { getBarecheckApiKey },
    "./github": { getBaseRefSha, getCurrentRefSha }
  });
};

describe("lib/api", () => {
  describe("getBaseBranchClones()", () => {
    it("shoudl return false when there is no sha or ref", async () => {
      const project = { id: 1 };
      const accessToken = "access-token-str";
      const totalLinesPercentage = 91.05;
      const sha = "sha-1";
      const ref = "ref-1";
      const getBaseRefSha = sinon.stub().returns({ ref, sha });
      const authProject = sinon.stub().returns({ project, accessToken });
      const clonesMetrics = sinon.stub().returns([{ totalLinesPercentage }]);

      const barecheckApi = {
        authProject,
        clonesMetrics
      };

      const { cleanAuthProject, getBaseBranchClones } = apiLibMock({
        getBaseRefSha,
        barecheckApi
      });

      const res = await getBaseBranchClones();
      cleanAuthProject(); // clean projectAuth state

      assert.equal(res, totalLinesPercentage);
      assert.isTrue(authProject.calledOnce);
    });
  });

  describe("sendCurrentClones()", () => {
    it("shoudl return false when there is no sha or ref", async () => {
      const project = { id: 1 };
      const accessToken = "access-token-str";
      const totalLinesPercentage = 91.05;
      const totalBranchesPercentage = 92.05;
      const sha = "sha-1";
      const ref = "ref-1";
      const getCurrentRefSha = sinon.stub().returns({ ref, sha });
      const authProject = sinon.stub().returns({ project, accessToken });
      const createClonesMetric = sinon.stub().returns(null);

      const barecheckApi = {
        authProject,
        createClonesMetric
      };

      const { cleanAuthProject, sendCurrentClones } = apiLibMock({
        getCurrentRefSha,
        barecheckApi
      });

      await sendCurrentClones(totalLinesPercentage, totalBranchesPercentage);
      cleanAuthProject(); // clean projectAuth state

      assert.isTrue(createClonesMetric.calledOnce);
      assert.deepEqual(createClonesMetric.firstCall.args, [
        accessToken,
        {
          projectId: project.id,
          ref,
          sha,
          totalLinesPercentage,
          totalBranchesPercentage
        }
      ]);
    });
  });

  describe("authProject()", () => {
    it("shoudl return projectId and accessToken", async () => {
      const project = { id: 1 };
      const accessToken = "access-token-str";
      const apiKey = "test-api-key";
      const getBarecheckApiKey = sinon.stub().returns(apiKey);

      const barecheckApi = {
        authProject: sinon.stub().returns({ project, accessToken })
      };

      const { cleanAuthProject, authProject } = apiLibMock({
        getBarecheckApiKey,
        barecheckApi
      });

      const res = await authProject();
      cleanAuthProject(); // clean projectAuth state

      assert.isTrue(barecheckApi.authProject.calledOnce);
      assert.deepEqual(barecheckApi.authProject.firstCall.args, [{ apiKey }]);
      assert.deepEqual(res, { projectId: project.id, accessToken });
    });

    it("shoudl return projectId and accessToken from cache", async () => {
      const project = { id: 1 };
      const accessToken = "access-token-str";
      const apiKey = "test-api-key";
      const getBarecheckApiKey = sinon.stub().returns(apiKey);

      const barecheckApi = {
        authProject: sinon.stub().returns({ project, accessToken })
      };

      const { cleanAuthProject, authProject } = apiLibMock({
        getBarecheckApiKey,
        barecheckApi
      });

      await authProject();
      const res = await authProject();
      cleanAuthProject(); // clean projectAuth state

      assert.isTrue(barecheckApi.authProject.calledOnce);
      assert.deepEqual(barecheckApi.authProject.firstCall.args, [{ apiKey }]);
      assert.deepEqual(res, { projectId: project.id, accessToken });
    });
  });
});
