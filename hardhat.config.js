require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const { DEPLOYER_SIGNER_PRIVATE_KEY, INFURA_PROJECT_ID } = process.env;

module.exports = {
  solidity: "0.8.4",
  networks: {
    mumbai: {
      url: `https://rpc-mumbai.maticvigil.com`,
      accounts: [DEPLOYER_SIGNER_PRIVATE_KEY],
    },
  },
};
