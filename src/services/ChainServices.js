import axios from "axios";

const getSplTransfers = async (accountAddress, limit = 10, offSet = 0) => {
  try {
    const res = await axios.get(
      `https://public-api.solscan.io/account/splTransfers?account=${accountAddress}&limit=${limit}&offset=${offSet}`
    );
    return res;
  } catch (err) {
    console.error(err);
  }
};

const getSolTransfers = async (accountAddress, limit = 10, offSet = 0) => {
  try {
    const res = await axios.get(
      `https://public-api.solscan.io/account/solTransfers?account=${accountAddress}&limit=${limit}&offset=${offSet}`
    );
    return res;
  } catch (err) {
    console.error(err);
  }
};

const ChainService = {
  getSplTransfers,
  getSolTransfers,
};

export default ChainService;
