// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

// bool flag; // true/false
// int signedNum; // Signed 256 bit interger
// uint unsignedNum; // Unsigned 256 bit interger
// int8, int16, int32, int64, int128, int256; // 8 to 256 bit signed interger
// string message; // String of characters
// address userAddress; // Ethereum address

contract Greeter {
uint private val;

    uint constant MAX_VALUE = 100;

    function getValue() public view returns (uint) {
        return val;
    }

}

contract HelloWorld {
uint public value;
bool public flag;

    function setVals(uint _value, bool _flag) public {
        value = _value;
        flag = _flag;
    }

}
