# Multiple Networks

One project can use multiple networks

- Main network
- Test network (e.g., Georli)
- Test Ethereum environment

Need to specify parameters (host, port, etc.)

This is what "truffle-config.js" file is for!

# Truffle Configuration

```
// truffle.js or truffle-config.js
module.exports = {
    networks: {
        goerli: {
            host: "localhost",
            port: 9545,
            network_id: 1, // "*" to match any network
            from: "0x123...45"
        }
    }
}
```

# Migrations with Multiple Networks

```
truffle migrate # Deploy to the "development" network
truffle migrate --network goerli
```

# Network Specific Migration

```
const Voter = artifacts.require("./Voter.sol");
module.exports = async function(deployer, network) {
    if (network == "test") {
        // Network specific code
    }
}
```

# Redeploy Contracts

```
# Go through all deployment steps from scratch
truffle migrate --reset
truffle migrate --reset --network test_network
```
