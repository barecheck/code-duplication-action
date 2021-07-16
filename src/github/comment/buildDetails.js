const buildDuplicatesTable = (clones, changedFiles) => {
  const duplicatesTable = clones.reduce(
    (acc, { duplicationA, duplicationB }) => {
      const buildLine = (duplication) => {
        const path = duplication.sourceId;
        const startLine = duplication.start.line;
        const endLine = duplication.end.line;

        return `${path}:${startLine}-${endLine}`;
      };

      // show report only with changed files
      if (changedFiles.includes(duplicationB.sourceId)) {
        const index = buildLine(duplicationB);
        const defaultDuplicatedBlock = {
          duplicates: []
        };
        const duplicatedBlock = acc[index] || defaultDuplicatedBlock;
        duplicatedBlock.duplicates.push(buildLine(duplicationA));
        acc[index] = duplicatedBlock;
      }

      return acc;
    },
    {}
  );

  return duplicatesTable;
};

const buildTableRow = (file, { duplicates }) =>
  `<tr><td>${file}</td><td>${duplicates.join("\n")}</td></tr>`;

const buildDetails = (clones, changedFiles) => {
  if (clones.length === 0) return "";

  const duplicatesTable = buildDuplicatesTable(clones, changedFiles);

  const summary = "<summary>New code duplications found</summary>";

  const tableHeader = "<tr><th>File</th><th>Clones</th></tr>";

  // eslint-disable-next-line no-console
  console.log("changedFiles", changedFiles);
  console.log("duplicatesTable", duplicatesTable);
  console.log("clones", clones);
  const tableBody = Object.keys(duplicatesTable)
    .map((key) => buildTableRow(key, duplicatesTable[key]))
    .join("");

  const table = `<table><tbody>${tableHeader}${tableBody}</tbody></table>`;

  return `<details>${summary}${table}</details>`;
};

module.exports = buildDetails;
