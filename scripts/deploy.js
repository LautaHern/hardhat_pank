const { ethers } = require("hardhat");

const deploy = async () => {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with the account ", deployer.address);

  const mentor = await ethers.getContractFactory("mentor");
  const deployed = await mentor.deploy(10000);
};

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log("error: ", error);
    process.exit(1);
  });
