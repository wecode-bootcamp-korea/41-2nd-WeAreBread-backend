const { appDataSource } = require("./dbconfig");

const getBreadLists = async () => {
  const getBreadLists = await appDataSource.query(
    `SELECT
      id,
      name
    FROM breads
    `
  );
  return getBreadLists;
};

module.exports = {
  getBreadLists,
};