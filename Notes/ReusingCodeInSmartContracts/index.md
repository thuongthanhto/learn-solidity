# Reusing Code in Smart Contracts

## Contracts Inheritance

Allows to reuse existing contract code

Like inheritance in many OO languages

- Mostly similar to Python

Creates another contract

- Reuse code
- Can add new methods
- Can replace methods

### Simple Inheritance

```Solidity
contract Restricted { // Parent contract
    function allowed(address addr) returns(bool) {
        return true;
    }

    function changeState() {
        require(allowed(msg.sender));
    }
}

contract AllowsOwner is Restricted {
    address owner;
    function allowed(address addr) returns(bool) {
        return addr == owner;
    }
}
```

### Constructors and Inheritance

```Solidity
contract Action {
    uint rounsNum;
    constructor(uint _roundsNum) {
        roundsNum = _roundsNum;
    }
}

contract MaxPriceAuction is Auction {
    uint maxPrice;
    constructor(uint _maxPrice) Auction(5) {

    }
}
```

### Abstract Contracts

Allows to define contracts that cannot be deployed

- Only inherited!

Partially defines functionality

- Template for other contracts
- Child contracts define the rest

```Solidity
// Cannot be deployed
constract ShopItem {
    uint price;
    // Method not defined
    functin pay() public payable 
}

// Can be deployed
contract SimpleItem is ShopItem {
    function pay() public payable {
        require(msg.value == price);
        setOwnership(msg.sender);
    }
}
```

### Access Modifiers and Inheritance

internal:

- Cannot be accessed from outside
- Can be  accessed from a child class

private: Cannot be accessed from outside


## Polymorphism

Interaction with a smart contracts that use inheritance

Easier to explain using an example

```Solidity
contract ShopItem {
    function startSale(uint price);
}

contract AuctionShopItem is ShopItem {
    uint deadline;
    uint price;
    function startSale(uint price) {
        deadline = now + 1 month;
    }
}

contract Shop {
    ShopItem[] items;
    
    function startAuction(uint price) {
        AuctionShopItem item = new ActionShopItem();
        item.push(item);
        ShopItem shopItem = item[0];
        // Calls method of AuctionShopItem
        shopItem.startSale(price);
    }
}
```

Pass reference to a child contract where a parent contract is expected

Calls method of a referenced contract

- Despite the reference type


### Why Is This Useful?

Same code an interact with different contracts

Can use abstract contracts

- No methods implementation
- Just methods definitions
- Called "interfaces"

## Third-party Code

Were developing all code ourselves

Can use one of the Solidity libraries

- Save time

### OpenZeppelin

Develops a set of security products for smart contracts

OpenZeppelin licrary of classes: Forcused on developing secure smart contracts

Will use the Ownable class: Tracks ownership of a contract

### Ownable Contract

```Solidity
contract Ownable {
    // Get current owner
    function owner() public view returns(address)
    // Reverts msg.sender is not an owner
    function _checkOwner() internal view virtual
    // Transfer ownership to a new address
    // Only owner can call it
    function trnasferOwnership(address newOwner) public
}
```

### Adding Third-Party Solidity Code

```bash
# Create NPM package
npm init -y
# Install Solidity library
npm install @openzepplin/contracts
```