# Testing with Solidity

Implement tests using Solidity language

Advantages

- No need to use async/await
- Transactions / call are easire to read

Disadvantages

- Only allows using a single account
- Cannot use Javascript libraries

```
import "../contracts/Voter.sol";
import "trufflle/Assert.sol";

contract TestVoter { // Should start with "Test"
    function test() public { // Shold start with "test"
        Voter voter = new Voter();
        uint[] memory votes = voter.getVotes();

        Assert.equal(votes, expected, "Unexpectd votes");
    }
}
```
