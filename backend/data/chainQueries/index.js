const fetch = require("node-fetch");

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Error querying Chain API");
  }
  const data = await response.json();
  return data;
};

module.exports = fetchData;
