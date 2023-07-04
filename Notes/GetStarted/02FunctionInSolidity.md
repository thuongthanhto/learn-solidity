// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
uint val;

    function getValue() public returns (uint) {
        return 1;
    }

    function getValues(uint a) public returns (uint, uint) {
        return (a, a + 1);
    }

    function getValues1(uint a) public returns (uint b, uint c) {
        b = a;
        c = a + 1;
    }

    function calc() public {
        sum(1, 2);
    }

    function sum(uint a, uint b) public returns (uint) {
        return a + b;
    }

}
