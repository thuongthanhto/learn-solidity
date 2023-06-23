# Track Who Has Voted

A single account can vote multiple times
Need to store who has already voted
Can use a distionary (hash map, hash table)

- Key-value pairs
- Get a value by key

Mapping of "address" to "bool"

# Mapping

```
// Mapping
mapping ([key-type] => [value-type]) mapName;
mapping (address => bool) hasVoted;
```

# Operations with Mapping

```
mapping (string => uint) scoreFor;
// Store value
scoreFor["Adam"] = 1;
// Get value
uint userScore = scoreFor["Adam"];

```

# Non-existing Values

```
mapping (string => uint) scoreFor;
uint userScore = scoreFor["non-existing-user"]; // 0
mapping (string => bool) hasVoted;
uint userVoted = hasVoted["unknown-user"]; // false

```

# Default Values

```
contract Foo {
    bool flag; // false
    uint num; // 0
    uint[] arr; // empty array
    string str; // ""
}

```

# "msg" Variable

```
function method() {
    msg.value; // Number of wei send
    msg.sender; // Address of a sender of a transaction
    msg.data; // Complete transaction data
    msg.sig; // Function identifier
}
```

// Available in a constructor and regular methods
