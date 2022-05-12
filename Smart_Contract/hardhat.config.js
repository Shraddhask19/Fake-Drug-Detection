require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/Wz3DjlbcHb_MhLLjbs48P9TvT6KtQn0a",
      accounts: [
        "6d0028099d919877ee56749db603ce748bcaf09927caf37cd39bc5093feaef2a",
      ],
    },
  },
};

// npx hardhat run scripts/deploy.js --network rinkeby
// 0x55857801b21B718B3e64edFac4eFC293a7dD9cfD;
