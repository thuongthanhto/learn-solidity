# Crowdfunding Application

Collect funds for a specific cause

- Similar to Kickstarter

Basic crowdfunding

- A campaign has a deadline
- Should collect a predetermined amount
- If successful, money is transferred to a beneficiary
- Redund money if a campaign fails

# Time and Smart Contracts

How to get the current time in a smart contract

Tricky!

- All contracts should be deterministic
- Every network participant has a different time

Get timestamp from a block

# Get Current Time

```
contract Foo {
    uint deadline = ...; // Time in seconds
    function checkTime() {
        uint currentTime = block.timestamp;
        require(currentTime < deadline);
    }
}
```

# Other Block Information

```
function method() {
    block.timestamp; // Block timestamp
    block.gaslimit; // Gas limit
    block.number; // Block number
    block.coinbase; // Validator's address
}
```

# Block Timstamp

Controlled by a block creator

Protocol imposes certain limits

- Using previous block time to generate a block

Should not treat it as absolutely precise

Can be manipulated to a certain degree

# Time Units

```
uint oneSecond = 1 seconds;
uint oneHour = 60 minutes;
uint oneWeek = 7 days;

function convertToSeconds(uint mins) return (uint) {
    uint inSeconds = mins minutes; // NOT allowed
    uint inSeconds = mins & 1 munute; // Use instead
}

```

# Ethereum Units

```
uint v1 = 10 wei;
uint v2 = 20 finney;
uint v3 = 30 ether;

function convertToWei(uint sumInEth) return(uint) {
    return sumInEth * 1 eth;
}

```

# Enum

Allows to create a data type with a fixed set of values

Useful in many cases:

- Day of a week

- States of a contract

More readable and safe than using intergers

# Defining Enums

```
enum AuctionState {
    NotStarted,
    Ongoing,
    Finished
}

AuctionState currentState = ActionState.NotStarted;
require(currentState != AuctionState.Finished);
```

# Payments with Smart Contracts

Ethereum has native currency

Allows monetery operations

Will cover how to send and receive currency with Ethereum

Implement payments for our contract

# Sending Payments

```
address payable addr = ...;
address payable addr = payable(anotherAddr);
// Reverts execution if fails
addr.transfer(1000);
// Returns "false" if fails
addr.send(1000);
// Should check return value!
```

send() method is unsafe and should be avoided!

# Contracts and Payments

By default, every account has zero balance

Users send Ether to a contract

Contracts can send Ether to users or other contracts

Contracts can reject a payment

# Payments with Smart Contract

Sent funds are accepted by default

Users can send funds without calling a method

Not any method can accept funds

- Should add a "payable" modifier

A contract can inspect how much ether is sent

- Using globally available "msg" object

# Accepting a Payment

```
function buyGadgets(uint gadgetsNum) payable {
    // Check send amount
    require(msg.value > 1000);
    // Payment is accepted
}
```

# Receive Function

```
// Called when ether is sent without calling a method
receive() external payable {
    // Implement extra logic when a payment received
    require(msg.value < 1000);
}
// IF not definded, a contract accepts all payments
```

# Getting a Balance

```
address addr = ...;
// Get account balance in wei
uint accountBalance = addr.balance;
// Contract's balance in wei
address(this).balance
```

# Fallback Function

Before Solidity 0.6.0 has two purposes

- To receive payments
- Called when a user was calling a undefined function

Now has only one role

- Only for handling unmatched function calls

```
// Called when an undefined function is called
fallback() external payable {
    ...
}

fallback(bytes calldata input)
    external payable returns (bytes memory output) {

    }
```

# "call" method

send()/transfer() have a gas limit

- 2,300 gas
- Just enough to receive a payment and update a state
- Contracts can run out of gas

call() can be used as a workaground

- Can be used to call arbitrary contract method
- No limit on how much gas it can use

```
address toAddr = ...;
// Just transfer Ether
(bool sent, bytes memory data) = toAddr.call{value: 1 ether}("");

// Call method "foo(uint)"
(bool sent, bytes memory data) = toAddr.call{value: 1 ether}(
    abi.encodeWithSignarure("foo(uint)", 10)
)
```

# ReenTrancy Attack

Why not to use call() al the time/

ReenTrancy Attack

- Will look into how it works
- Why is it dangerous
- And how to defend against it

User can contribute to a smart contract

- Keeps track of contributions

Users can withdraw Ether

```
function withdraw() public {
    uint balance = getBalance(msg.sender);
    require(balance > 0);
    transferWithCall(msg.sender, balance);
    setBalance(msg.sender, 0);
}
```

# Defending Against Reentrancy Attack

```
function withdraw() public {
    // Pre-conditions
    uint balance = getBalance(msg.sender);
    require(balance > 0);

    // Change state
    setBalance(msg.sender, 0);

    // Interactions
    transferWithCall(msg.sender, balance);
}
```

# Reentrancy Attack - Recap

send()/transfer()

- Set a limit to gas amount
- Can't cause a reentrancy attack

call()

- Allows to use up to all available gas
- Can cause a reentrancy attack

# Function Modifiers

Many functions start with parameters/state checking

- Is a contract in a valid state?
- Are these arguments valid?

Can cause a lot of code duplication

Function modifiers allow extracting this code

## Checkes Duplication

```
contract Foo {
    address owner;

    modifier ownerOnly {
        require(msg.sender == owner);
        _;
    }

    function removeContract() ownerOnly {
    }

    function updateContract() ownerOnly {
    }
}
```

## Modifiers with Parameters

```
contract Shop {
    address owner; address moderator;
    modifier onlyBy(address addr) {
        require(msg.sender == addr);
        _;
    }

    function removeItem(uint itemId) onlyBy(moderator) {...}

}
```

## Multiple Modifiers

```
modifier isOwner {
    require(msg.sender == owner);
    _:
}

modifier gameStarted {
    require(state == States.Started);
    _;
}

function stopGame() isOwner gameStarted {...}
```

## Convert Callback Into a Promise

```
new Promise((resolve, reject) => {
    send({...},
        (error, result) => {
            if (error) {
                reject(err)
                return
            }

            resolve(result);
        })
})
```
