# Function Modifiers

```
function accessibleFromAnywhere() public {...}
function accessibleFromAnywhere() {...}
function onlyFromOutside() external {...}
function accessibleInternaly() internal {...}
function accessibleInternaly() private {...}
```

# Field Modifiers

```
uint public value; // Can be read from outside
uint internal value; // Can be accessed only from inside
uint private value; // Can be accessed only from inside
uint valud; // Variables are private by default
```
