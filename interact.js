const hre = require("hardhat");

const USElection = require('./artifacts/contracts/USElection.sol/USElection.json')

// const run = async function() {
// 	console.log("Hello world")
// 	console.log(hre.ethers.version)
// }
// const run = async function() {
// 	const provider = new hre.ethers.providers.JsonRpcProvider("http://localhost:7545")
// 	const latestBlock = await provider.getBlock("latest")
// 	console.log(latestBlock.hash)

// 	const wallet = new hre.ethers.Wallet("c5f02c4267837ef6e3df675e0b3e63cebbdd4988046166b6851fe74e79f8485b", provider);
// 	const balance = await wallet.getBalance();
// 	console.log(hre.ethers.utils.formatEther(balance, 18))

// 	const contractAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
// 	const electionContract = new hre.ethers.Contract(contractAddress, USElection.abi, wallet)
// 	console.log(electionContract)

// 	const hasEnded = await electionContract.electionEnded()
// 	console.log("The election has ended:", hasEnded)

// 	const haveResultsForOhio = await electionContract.resultsSubmitted("Ohio")
// 	console.log("Have results for Ohio:", haveResultsForOhio)
	
//  }


// //Full script:
const run = async function() {
	const provider = new hre.ethers.providers.JsonRpcProvider("http://localhost:7545")
	
	const wallet = new hre.ethers.Wallet("c5f02c4267837ef6e3df675e0b3e63cebbdd4988046166b6851fe74e79f8485b", provider)
	const balance = await wallet.getBalance();

	const electionContract = new hre.ethers.Contract("0xB54d26FA80fC8D7e949b5A75BeCA9A08B199B20F", USElection.abi, wallet)
	
	const transactionOhio = await electionContract.submitStateResult(["Ohio", 250, 150, 24]);
	const transactionReceipt = await transactionOhio.wait();
	if (transactionReceipt.status != 1) {
		console.log("Transaction was not successful")
		return 
	}

	// const resultsSubmittedOhioNew = await electionContract.resultsSubmitted("Ohio")
	// console.log("Results submitted for Ohio", resultsSubmittedOhioNew);

	// const currentLeader = await electionContract.currentLeader();
	// console.log("Current leader", currentLeader);
}

run()
