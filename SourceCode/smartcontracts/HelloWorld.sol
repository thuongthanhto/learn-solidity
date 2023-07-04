// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    uint public value;

    function setValue(uint newValue) public {
        value = newValue;
    }
}