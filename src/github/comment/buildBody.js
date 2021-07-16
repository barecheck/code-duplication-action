const { commentTitle } = require("../../config");

const buildTrendValue = (value) => {
  if (parseInt(value, 10) === 0) return value;

  return `${value > 0 ? "+" : ""}${value}`;
};

const buildBody = ({ linesDiff, tokensDiff, totalPercentage, totalTokens }) => {
  const trendLinesOutput = buildTrendValue(linesDiff);
  const trendBranchesOutput = buildTrendValue(tokensDiff);

  const header = commentTitle;

  const totalPercentageOutput = `Total: <b>${totalPercentage}%</b>`;
  const totalTokensOutput = `Total Branches: <b>${totalTokens}%</b>`;

  const deescriptionLines = `Percentage of duplicated lines diff: ${trendLinesOutput}`;
  const deescriptionBranches = `Percentage of duplicated branches diff: ${trendBranchesOutput}`;
  const description = `${totalPercentageOutput}\n${totalTokensOutput}\n\n${deescriptionLines}\n${deescriptionBranches}`;

  const body = `<h3>${header}</h3>${description}`;

  return body;
};

module.exports = buildBody;
