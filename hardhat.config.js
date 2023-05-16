require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const goerliApiKey = process.env.GOERLI_API_KEY;
const privateKeys = process.env.PRIVATE_KEYS || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  timeout: 500000,
  networks: {
    localhost: {},
    goerli: {
      url: goerliApiKey,
      accounts: privateKeys.split(","),
    },
  },
};
