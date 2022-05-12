const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  const DrugDetectionContractFactory = await hre.ethers.getContractFactory(
    "DrugDetection"
  );
  const DrugDetectionContract =
    await DrugDetectionContractFactory.deploy();
  await DrugDetectionContract.deployed();

  console.log("Drug Detection address: ", DrugDetectionContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
