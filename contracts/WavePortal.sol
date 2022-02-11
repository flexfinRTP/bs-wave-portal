// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    uint256 totalVotes;

    event NewWave(address indexed from, uint256 timestamp, string message);
    event NewVote(address indexed from, uint256 timestamp, string voteData);

    struct Wave {
        address waver; // The address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user waved.
    }

    struct Vote {
        address voter; // address of user who voted.
        string voteData; // who the vote was for? from option poll?
        uint256 timestamp;
    }

    Wave[] waves; //Holds all the waves ever sent
    Vote[] votes; //Holds all votes

    constructor() payable {
        console.log(
            "Hello from the blockchain. Follow me down the rabbit hole!"
        );
    }

    function wave(string memory _message) public {
        //string _message. the message our user sends us from the frontend!
        totalWaves += 1;
        console.log("%s has waved!", msg.sender);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        emit NewWave(msg.sender, block.timestamp, _message);

        uint256 prizeAmount = 0.0001 ether; //init prize amount
        require(
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has."
        );
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract.");
    }

    function vote(string memory _voteData) public {
        //string _voteData. the voteData our user sends us from the frontend!
        totalVotes += 1;
        console.log("%s has voted!", msg.sender);

        votes.push(Vote(msg.sender, _voteData, block.timestamp));

        emit NewVote(msg.sender, block.timestamp, _voteData);

        uint256 voteFee = 0.0025 ether; //init vote fee for voting in poll
        require(
            voteFee <= address(msg.sender).balance, //user to have more than the fee or contract fails?
            "Trying to withdraw more money than the user has."
        );
        (bool success, ) = (msg.sender).call{value: voteFee}("");
        require(success, "Failed to withdraw money from user.");
    }

    /*
     * getAllWaves will return the struct array waves[]
     * Able to retrieve the waves from our website!
     */
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    /*
     * getAllVotes will return the struct array votes[]
     * Able to retrieve the votes from our website!
     */
    function getAllVotes() public view returns (Vote[] memory) {
        return votes;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function getTotalVotes() public view returns (uint256) {
        console.log("We have %d total waves!", totalVotes);
        return totalVotes;
    }
}
