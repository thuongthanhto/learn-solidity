# Rejecting Invalid Transactions

User can try to execute invalid transactions

- Pass invalid arguments
  Need to reject these transactions
  revert()/ require()/ assert() functions

# Require

// Verify arguments
require(selectedOption < optionsCount);
// Optionally provide an error message
require(selectedOption < optionsCount, "Invalid option");
// Remaining gas is refunded

# Assert

// Verify internal state
assert(totalVotesNum == sumOfVotes);
// Uses up all remaining gas

# Revert

// Unconditionally revert a transaction
revert();

// Providing a condition for revert()

```
if (optionNum >= optionsCount) {
    revert();
}
```

# Defining a Custom Error

error DuplicateValue(unit pos, unit value);
error CustomError();

```
contract HashStorage {
    uint[] array;
    function store(uint val) public {
        revert DupplicateValue({
            pos: 0,
            value: val
        });
    }
}
```

# "throw" Keyword

// Deprecated keyword
throw;
