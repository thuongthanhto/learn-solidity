# Overflow Protection

Ensures numberic values fit variables' ranges

- Numberic variables have limited ranges

Why is this important?

- Can break some contracts
- E.g, storing contribution amounts in an auction

Solidity has built-in protection for this

- Only from 0.8.0

# Integer Overflow

```
// Can only store values from 0 to 255
uint8 v = 255;
v = v + 1; // ?
// Earlier Solidity versions: v == 0
// Currently: raises an error

```

# Unchecked Math

```
function sum(uint8 a, uint8 b) public returns(uint8) {

}
```

# SafeMath Library

Library implementing overflow protection
Embedded in the language
