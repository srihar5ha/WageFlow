async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
   const PayV1 = await ethers.getContractFactory("PayV1");
    const payv1 = await PayV1.deploy();
    const address=await payv1.getAddress();
  
    console.log("deployed contract address", address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
  });