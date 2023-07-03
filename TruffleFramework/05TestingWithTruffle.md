# Testing with Truffle

Allows to test smart contracts without deploying them

Can run them many times without spending real Ether

Write tests in Solidity or Javascript

- Have their pros and cons

# Javascript Test

```
const Voter = artifacts.require("./Voter.sol")
contract("Voter", function(account){
    it ("contract test", async function() {
        const voter = await Voter.new(["one", "two"])
        await voter.getVotes()

    })
})
```

# Test Assertions

Need to verify a contract state

Allows to verify state

Has serveral assertion styles

We will use "expect" style

# Test Asserts

```
const num = 1 + 1;
expect(num).to.equal(2); // Nothing happens
expect(num).to.equal(42);  // Fails a test
```

# Compart Numbers

```
const num = await contract.getNum();

// Won't work
expect(num).to.equal(1);
// Number returned by Solidity is an instance of BigNumber
expect(num).to.deep.equal(
    Contract.web3.toBigNumber(1);
);
expect(num.toString()).to.equal("1");
expect(num.toNumber()).to.equal(1);
```

# Tests Initialization

Most tests will have the same pattern

- Create a contract
- Interact with it
- Verify its state

Need to avoid dupplicated contract creation

Can do this with the "beforeEach" method

```
contract("Voter", function(accounts) {
    let voter
    beforeEach(async function() {
        voter = await Voter.new(["one", "two"])
    })

    it("contract test", async function(accounts) {
        await voter.getVotes()
    })
})
```
