const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const SimpleContract = await hre.ethers.getContractFactory("SimpleContract");

  // Deploy the contract
  const simpleContract = await SimpleContract.deploy();
  await simpleContract.deployed();

  // Log the contract address
  console.log(`Contract deployed to: ${simpleContract.address}`);
}

// Handle errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
