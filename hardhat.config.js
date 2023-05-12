require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const privateKeys = process.env.PRIVATE_KEYS || "";
const goerliApiKey = process.env.GOERLI_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  timeout: 500000,
  networks: {
    localhost: {},
    // goerli: {
    //   url: "https://rpc.ankr.com/eth_goerli",
    //   accounts: privateKeys.split(","),
    // },
  },
};
