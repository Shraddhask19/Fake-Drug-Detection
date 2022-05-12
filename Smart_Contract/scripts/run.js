const hre = require("hardhat");

async function main() {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const DrugContractFactory = await hre.ethers.getContractFactory(
    "DrugDetection"
  );
  const DrugContract = await DrugContractFactory.deploy();

  await DrugContract.deployed();

  console.log("Contract deployed to:", DrugContract.address);
  // console.log("Owner is:", owner.address);
  // console.log("Another User is:", randomPerson.address);

  const manCreation = await DrugContract.createManufacturer(
    "Sonam",
    "https://tekraj.com",
    randomPerson.address
  );
  await manCreation.wait();
  console.log(await DrugContract.getManufacture(randomPerson.address));
  const DrugCreation = await DrugContract.createDrug(
    "Shoe",
    "Nike",
    9000,
    randomPerson.address
  );
  await DrugCreation.wait();
  console.log(await DrugContract.getDrug(0));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
