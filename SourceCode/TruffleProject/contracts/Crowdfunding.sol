// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Crowdfunding {
    enum State {
        Ongoing,
        Failed,
        Succeeded,
        PaidOut
    }

    string public name;
    uint public targetAmount;
    uint public fundingDeadline;
    address payable public beneficiary;
    State public state;
    mapping(address => uint) public amounts;
    bool public collected;

    modifier inState(State expectedState) {
        require(state == expectedState, "Invalid crowding state");
        _;
    }

    constructor(
        string memory contractName,
        uint targetAmountEth,
        uint durationInMin,
        address payable beneficiaryAddress
    ) {
        name = contractName;
        targetAmount = targetAmountEth * 1 ether;
        fundingDeadline = currentTime() + durationInMin * 1 minutes;
        beneficiary = beneficiaryAddress;
        state = State.Ongoing;
    }

    receive() external payable inState(State.Ongoing) {
        require(beforeDeadline(), "Deadline has passed");
        amounts[msg.sender] += msg.value;

        if (totalCollected() >= targetAmount) {
            collected = true;
        }
    }

    function finishCrowdFunding() public inState(State.Ongoing) {
        require(afterDeadline(), "Deadline has not passed");

        if (!collected) {
            state = State.Failed;
        } else {
            state = State.Succeeded;
        }
    }

    function collect() inState(State.Succeeded) public {
        if (beneficiary.send(totalCollected())) {
            state = State.PaidOut;
        } else {
            state = State.Failed;
        }
    }

    function widthdraw() public inState(State.Failed) {
        require(amounts[msg.sender] > 0, "No funds for account");
        uint contributed = amounts[msg.sender];
        amounts[msg.sender] = 0;

        if (!payable(msg.sender).send(contributed)) {
            amounts[msg.sender] = contributed;
        }
    }

    function beforeDeadline() public view returns (bool) {
        return currentTime() < fundingDeadline;
    }

    function afterDeadline() public view returns (bool) {
        return !beforeDeadline();
    }

    function totalCollected() public view returns (uint) {
        return address(this).balance;
    }

    function currentTime() private view returns (uint) {
        return block.timestamp;
    }
}
