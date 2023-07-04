# Arrray in Solidity

- Sequence of elements
- All elements have the same type
- Get/set element by its position
- Built-in Solidity feature

2 type is dynamic and static size

# Dynamic Arrays

```
uint[] dynamic; // Empty array
uint[] dynamic2 = new uint[](2); // Array of size 2
```

## Operations with Dynamic Arrays

```
// Get an element
uint i = array[5];
// Set an element
array[5] = 10;
// Get length of an array
uint size = array.length;
// Add element at the end of the array
uint newSize = array.push(42);
```

# Statically-sized Arrays

```
uint[5] arr5; // Array of  length 5
// Can't add new elements
arr5.push(42); // INVALID
// Allowed operations
uint i = array[5];
array[5] = 10;
uint size = array.length;

```

# Other Array Types

```
// Multi-demensional arrays
uint [][] nested;
// Fixed sized bytes arrays
bytes1 oneByte;
bytes2 twoBytes;
bytes32 manyBytes;
```
