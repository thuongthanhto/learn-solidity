// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Voter {
    struct OptionPos {
        uint pos;
        bool exists;
    }

    uint[] public votes;
    string[] public options;
    mapping(address => bool) hasVoted;
    mapping(string => OptionPos) posOfOption;

    constructor(string[] memory _options) {
        options = _options;
        votes = new uint[](_options.length);

        for (uint i = 0; i < _options.length; i++) {
            OptionPos memory option = OptionPos(i, true);
            posOfOption[_options[i]] = option;
        }
    }

    function vote(uint option) public {
        require(option < options.length, "Invalid option");
        require(!hasVoted[msg.sender], "Already voted");

        recordVote(option);
    }

    function vote(string memory option) public {
        require(!hasVoted[msg.sender], "Already voted");

        OptionPos memory optionPos = posOfOption[option];
        require(optionPos.exists, "Invalid Option");

        recordVote(optionPos.pos);
    }

    function stringEqual(
        string memory a,
        string memory b
    ) private pure returns (bool) {
        return keccak256(bytes(a)) == keccak256(bytes(b));
    }

    function recordVote(uint option) private {
        hasVoted[msg.sender] = true;
        votes[option] = votes[option] + 1;
    }

    function getOptions() public view returns (string[] memory) {
        return options;
    }

    function getVotes() public view returns (uint[] memory) {
        return votes;
    }
}
