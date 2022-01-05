const { commentTitle } = require("../../config");

// eslint-disable-next-line no-unused-vars
const buildBody = (statistic, clones) => {
  const header = commentTitle;

  const totalPercentageOutput = `Total Lines: <b>${statistic.total.lines}</b>`;
  const totalDuplicationsOutput = `Duplications: <b>${statistic.total.duplicatedLines}</b>`;

  const description = `${totalPercentageOutput}\n\n${totalDuplicationsOutput}`;

  const body = `<h3>${header}</h3>${description}`;

  return body;
};

module.exports = buildBody;
