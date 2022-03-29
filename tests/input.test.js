const proxyquire = require("proxyquire");
const sinon = require("sinon");
const { assert } = require("chai");

const actionsCoreStub = require("./stubs/actionsCore.stub");

const defaultMocks = {
  ...actionsCoreStub
};

const inputMock = (mocks) => {
  const { getInput } = { ...defaultMocks, ...mocks };

  return proxyquire("../src/input", {
    "@actions/core": { getInput }
  });
};

describe("input", () => {
  describe("getBarecheckGithubAppToken", () => {
    it("should returnvalue from getInput core function", () => {
      const expectedRes = "token:124";
      const getInput = sinon
        .stub()
        .withArgs("barecheck-github-app-token")
        .returns(expectedRes);

      const { getBarecheckGithubAppToken } = inputMock({ getInput });

      const res = getBarecheckGithubAppToken();

      assert.equal(res, expectedRes);
    });
  });

  describe("getBarecheckApiKey", () => {
    [
      { input: "value1", expected: "value1" },
      { input: "", expected: false },
      { input: "false", expected: false },
      { input: "False", expected: false }
    ].forEach(({ input, expected }) =>
      it(`should return ${expected} when  'barecheck-api-key=${input}'`, () => {
        const expectedRes = "path-lcov-file";
        const getInput = sinon
          .stub()
          .withArgs("barecheck-api-key")
          .returns(expectedRes);

        const { getBarecheckApiKey } = inputMock({ getInput });

        const res = getBarecheckApiKey();

        assert.equal(res, expectedRes);
      })
    );
  });

  describe("getGithubToken", () => {
    [
      { input: "value1", expected: "value1" },
      { input: "", expected: false },
      { input: "false", expected: false },
      { input: "False", expected: false }
    ].forEach(({ input, expected }) =>
      it(`should return ${expected} when  'barecheck-api-key=${input}'`, () => {
        const expectedRes = "path-lcov-file";
        const getInput = sinon
          .stub()
          .withArgs("github-token")
          .returns(expectedRes);

        const { getGithubToken } = inputMock({ getInput });

        const res = getGithubToken();

        assert.equal(res, expectedRes);
      })
    );
  });
});
