# Truffle Migration

Works similar to a database migration

- Define several migration steps
- Each step can deploy contract or interact with them

Truffle tracks the state of migration in a separate smart contract

# Truffle Migration Step

```
const Voter = artifacts.require("./Voter.sol");
module.exports = async function(deployer) {
    await deployer.deploy(Voter, ["one", "two"]);
    const voter = await Voter.deployed();
    await voter.vote(0);
}
```

# Truffle-contract API

```
// web3.js
contract.methods.vote(1)
    .send({
        from: senderAddress
    });

// truffle-contract
contract.vote(1, {from: senderAddress});
```

# Truffle Migration

```
# Deploy a contract to track the state of migration process
vim migration/1_initial_migration.js

# Deploy our smart contract
vim migration/2_deploy_voting.js

truffle migrate # Runs step 1 and 2
truffle migrate # DOes nothing

# Deploy new smart contract
vim migration/2_deploy_game.js
truffle migrate # Executes only 3_deploy_game.js
```
