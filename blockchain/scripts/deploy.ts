import { ethers } from "hardhat";

async function main() {
  console.log("Deploying REUSE Label contract...");

  const reuseLabelFactory = await ethers.getContractFactory("ReuseLabel");
  const reuseLabel = await reuseLabelFactory.deploy();

  await reuseLabel.waitForDeployment();

  console.log("ReuseLabel deployed to:", await reuseLabel.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 