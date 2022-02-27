const hre = require("hardhat");
const USElection = require('./artifacts/contracts/USElection.sol/USElection.json')

const run = async function() {
		const provider = new hre.ethers.providers.InfuraProvider("ropsten", "40c2813049e44ec79cb4d7e0d18de173")
		
		const wallet = new hre.ethers.Wallet("216b6e8e5512846deddebeec8bc7eb3a36a8d6cf502c6c9a4722bc2644228f89", provider)
		const balance = await wallet.getBalance();
	
		const electionContract = new hre.ethers.Contract("0x3E45Cf95dE18EAEeB3ff8dd9C1563c60226275B0", USElection.abi, wallet)
	
	const transactionOhio = await electionContract.submitStateResult(["Ohio", 250, 150, 24]);
	console.log("State Result Submission Transaction:", transactionOhio.hash);
	const transactionReceipt = await transactionOhio.wait();
	if (transactionReceipt.status != 1) {
		console.log("Transaction was not successful")
		return 
	}

	const resultsSubmittedOhioNew = await electionContract.resultsSubmitted("Ohio")
	console.log("Results submitted for Ohio", resultsSubmittedOhioNew);

	const currentLeader = await electionContract.currentLeader();
	console.log("Current leader", currentLeader);
}

run()