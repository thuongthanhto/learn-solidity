# Constructors in Solidity

- Allow to initialize fields of a contract
- Similar to object-oriented languages
- Can have only one

```
contract Foo {
    string value;

    // Can only have one constructor
    constructor(string memory _value) {

    }
}
```

# Immutable Variables

```
contract Foo {
    string constant MAX_VAL = 10; // Cannot change anywhere

    string immutable maxVal;

    constructor(uint _value) {
        // Can change only in a constructor
        maxValue = _value;
    }
}
```
