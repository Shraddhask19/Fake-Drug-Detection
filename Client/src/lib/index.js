import abi from "../utils/DrugDetection.json";
const contractAddress = "0x93eC71acFa21F5dCa5Cfa6d6F35CCBc6Cec08238";
const contractABI = abi.abi;
export { contractABI, contractAddress };
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
};
export { options };
