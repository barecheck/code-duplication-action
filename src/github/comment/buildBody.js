const { commentTitle } = require("../../config");
const buildDetails = require("./buildDetails");

const buildTrendValue = (value) => {
  if (parseInt(value, 10) === 0) return value;

  return `${value > 0 ? "+" : ""}${value} ${value > 0 ? "✅" : "❌"}`;
};

const buildDiff = (linesDiff, tokensDiff) => {
  const trendLinesOutput = buildTrendValue(linesDiff);
  const trendBranchesOutput = buildTrendValue(tokensDiff);

  if (linesDiff !== 0 || tokensDiff !== 0) {
    const deescriptionLines = `Percentage of duplicated lines diff: ${trendLinesOutput}`;
    const deescriptionBranches = `Percentage of duplicated branches diff: ${trendBranchesOutput}`;
    return `\n\n\n${deescriptionLines}\n${deescriptionBranches}`;
  }

  return "";
};

const buildBody = ({
  linesDiff,
  tokensDiff,
  totalPercentage,
  totalTokens,
  clones,
  changedFiles
}) => {
  const header = commentTitle;

  const totalPercentageOutput = `Total: <b>${totalPercentage}%</b>`;
  const totalTokensOutput = `Total Branches: <b>${totalTokens}%</b>`;

  const duplicationsDiff = buildDiff(linesDiff, tokensDiff);
  const description = `${totalPercentageOutput}\n\n${totalTokensOutput}${duplicationsDiff}`;
  const details = buildDetails(clones, changedFiles);

  const body = `<h3>${header}</h3>${description}${details}`;

  return body;
};

module.exports = buildBody;
