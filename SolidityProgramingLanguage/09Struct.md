# Structs in Solidity

Collection of fields
Like a class without methods
Can be nested
No inheriance

```
struct User {
    string name;
    uint8 age;
}

User memory user = User("John", 35);
User memory user = User({
    name: "John",
    age: 35,
})

// Get value of a field
uint age = user.age;
// Set value of a field
user.age = 36;

contract Foo {
    User[] users;

    function modifyUser() {
        User memory user = users[0];
        user.age = 10; // Modifies copy
        User storage user = users[0];
        user.age = 10; // Modifies original
    }
}
```

# Default Values and Structs

```
struct Option {
    uint pos;
    bool exists; // Always assigned to true
}

mapping (string => Option) posOfOption;

posOfOption["option"]; // Option(0, true);
posOfOption["non-existing"]; // Option(0, false);
```
