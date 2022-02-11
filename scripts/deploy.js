const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.01"), //fund contract with .001 eth
  });

  await waveContract.deployed(); //setup for log when deployed. vv
  console.log("WavePortal address: ", waveContract.address);
  console.log("Add this to contractAdress in App.jsx")
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();