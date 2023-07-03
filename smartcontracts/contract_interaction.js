let fs = require('fs');
let Web3 = require('web3');

require('dotenv').config();

// Read the contract's ABI
let abiStr = fs.readFileSync('Voter_sol_Voter.abi', 'utf8');
let abi = JSON.parse(abiStr);

// Create Web3 instance
let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(process.env.INFURA_URL));

// Add private key
let account = web3.eth.accounts.privateKeyToAccount(
  process.env.ACCOUNT_PRIVATE_KEY
);
web3.eth.accounts.wallet.add(account);

const voter = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);

// Send transaction
sendTransaction()
  .then(() => {
    console.log('Done!');
  })
  .catch((err) => {
    console.log(`Failed to send a transaction: ${err}`);
  });

async function sendTransaction() {
  console.log('Estimating gas cost...');
  const gasEstimate = await web3.eth.estimateGas({
    from: account.address,
    to: process.env.CONTRACT_ADDRESS,
    data: voter.methods['vote(uint256)'](0).encodeABI(),
  });
  console.log(`Gas estimate: ${gasEstimate}`);

  console.log('Voting');
  await voter.methods['vote(uint256)'](0).send({
    from: account.address,
    gas: gasEstimate,
  });

  console.log('Getting the vote count');
  const voteCount = await voter.methods.getVotes().call({
    from: account.address,
  });

  console.log(`Votes: ${voteCount}`);
}
