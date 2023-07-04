# If/else in Solidity

```
if (totalVotes > limit) {
    ...
} else if (totalVotes == limit) {
    ...
} else {

}
```

# Invalid Conditional Expressions

```
// Valid expression
if (true) {...}
if (i > 5 && a < b) {...}

// Invalid expression
if (1) {...}
if ("") {...}
uint[] arr;
if (arr) {...}
```

# Strings Comparison

```
string str1 = "abc";
string str2 = "bcd";
if (str1 == str2) {...} // Not supported
byted[32] hash = keccak256(str1); hash value
if (keccak256(str1) == keccak256(str2)) {...}
```

# While loops in Solidity

```
while (i < 5) {
    res += i;
    i++;
}

do {
    res += i;
    i++;
} while (i > 5);
```

# For loops

```
uint[] arr = ...;
uint sum = 0;
for (uint i = 0; i < arr.length; i++) {

}
```

# "break" and "continue"

```
// Adds 0, 1, 2
for (uint i = 0; i < 5; i++) {
    if (i == 3) break;
    arr.push(i);
}

// Adds 0, 1, 2, 4
for (uint i = 0; i < 5; i++) {
    if (i == 3) continue;
    arr.push(i);
}
```
