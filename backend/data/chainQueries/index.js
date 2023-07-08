const fetch = require("node-fetch");
const endPoints = require("../endpoints.jsx");

const getAllValidators = async (api) => {
  try {
    const response = await fetch(api + endPoints.allChainValidators);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getActiveValidators = async (api) => {
  try {
    const response = await fetch(api + endPoints.activeChainValidators);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainInflation = async (api) => {
  try {
    const response = await fetch(api + endPoints.chainInflation);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainCommunityPool = async (api) => {
  try {
    const response = await fetch(api + endPoints.chainCommunityPool);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainPool = async (api) => {
  try {
    const response = await fetch(api + endPoints.chainPool);
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainBlockHeightDetails = async (api, height) => {
  try {
    const response = await fetch(
      api + endPoints.chainBlockHeightDetails(height)
    );
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainBlockHeightTxs = async (api, height) => {
  try {
    const response = await fetch(api + endPoints.chainBlockHeightTxs(height));
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainTxsByHash = async (api, hash) => {
  try {
    const response = await fetch(api + endPoints.chainTxsByHash(hash));
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getChainValidatorsDetails = async (api, address) => {
  try {
    const response = await fetch(
      api + endPoints.chainValidatorsDetails(address)
    );
    if (response.status !== 200 || !response) {
      throw "Error Querying Chain API";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllValidators,
  getActiveValidators,
  getChainInflation,
  getChainCommunityPool,
  getChainPool,
  getChainBlockHeightDetails,
  getChainBlockHeightTxs,
  getChainTxsByHash,
  getChainValidatorsDetails,
};
