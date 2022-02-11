const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.01"), //fund contract with 0.1 ether
  });
  await waveContract.deployed();
  console.log("Contract address:", waveContract.address);

  let contractBalance = await hre.ethers.provider.getBalance( //Get Contract balance
    waveContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let waveTxn = await waveContract.wave("Guestbook, Signed! .0001 ether withdrawn!"); //Send Wave
  await waveTxn.wait();

  let voteTxn = await waveContract.vote("Vote Cast! .0025 ether withdrawn!"); //Send Vote
  await voteTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address); //Get Contract balance to see change.
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
  let allVotes = await waveContract.getAllVotes();
  console.log(allVotes);
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