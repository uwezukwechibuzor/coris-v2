const fetch = require("node-fetch");

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (response.status !== 200 || !response) {
      throw new Error("Error querying Chain API");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  fetchData,
};
