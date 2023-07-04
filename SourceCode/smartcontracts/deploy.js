const fs = require('fs');
const Web3 = require('web3');

require('dotenv').config();

// Read the contract data
const bytecode = fs.readFileSync('Voter_sol_Voter.bin', 'utf8');
const abiStr = fs.readFileSync('Voter_sol_Voter.abi', 'utf8');

const abi = JSON.parse(abiStr);

// Create Web3
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(process.env.INFURA_URL));

// Add private key
const account = web3.eth.accounts.privateKeyToAccount(
  process.env.ACCOUNT_PRIVATE_KEY
);
web3.eth.accounts.wallet.add(account);

const voterContract = new web3.eth.Contract(abi);

// Deploy the contract
voterContract
  .deploy({ data: '0x' + bytecode, arguments: [['option1', 'option2']] })
  .send({
    from: account.address,
    gas: 1500000,
  })
  .on('transactionHash', (hash) => {
    console.log(`Transaction hash: ${hash}`);
  })
  .on('confirmation', (confirmationNumber, receipt) => {
    console.log(`Confirmation number: ${confirmationNumber}`);
    console.log(`Block number: ${receipt.blockNumber}`);
    console.log(`Block hash: ${receipt.blockHash}`);
  })
  .then((newContractInstance) => {
    console.log(`contract address: ${newContractInstance.options.address}`);
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });
