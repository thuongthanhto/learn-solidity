# Create a Web3 Instance

```
const Web3 = require("web3");
const web3 = new Web3();

web3.setProvider(
    new web3.providers.HttpProvider(
        "http://localhost:8545"
    )
)
```

# Accessing Contract Instance

```
const abi = fs.readFileSync("abi.json");
const contractAddress = "0x...";
const contract = new web3.eth.Contracct(
    abi,
    contractAddress;
)

contract.methods.vote(0)
    .send({from: senderAddress})
    .then(function(receipt) {
        // "receipt" contains information about transaction
    })

// contract.methods['vote(uint256)'](0)
```

# Send a Transaction with "await"

```
const contract = new web3.eth.Contract(...);
const reciept = await contract.methods.vote(0);
    .send({from: senderAddress});
```

# Deploying Contract

```
const voter = new web3.eth.Contract(abi);
const contractInstance = await voter
    .deploy({data: bytecode})
    .send({
        from: "0x..."
    })

const address = contractInstance.options.address;
```

# Call a Method

```
contract.method.getVotes()
    .call()
    .then(function(result) {
        // "result" return value from the call
    })
```
