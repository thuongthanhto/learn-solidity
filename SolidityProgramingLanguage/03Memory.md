# Memory in Smart Contracts

- Memory: Temporary variables, For duration of a call. Cheap to use (3 gas)
- Storage: Contract state, Persistent between calls, Expensive to use
- Calldata: Function parameters, Immutable, Cheapest to use

```
contract Foo {
    uint[] arr;

    function method() {
        uint[] memory mArr = arr;
        mArr[0] = 0; // Modifies a copy

        uint[] storage sArr = arr;
        sArr[0] = 0; // Modifies a original
    }
}
```

# Reference Types in Parameters

```
function method(uint[] memory memoryArr) {...}
function method(uint[] calldata calldataArr) {...}
```
