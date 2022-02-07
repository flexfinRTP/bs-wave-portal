// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    // address public waver = msg.sender;
    address[] public waveList;

    constructor() {
        console.log("Hello from the blockchain. Follow me down the rabbit hole!");
    }

    function wave() public {
        totalWaves += 1;
        waveList.push(msg.sender);
        console.log("%s has said hello!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("%d people have signed the guestbook!", totalWaves);
        return totalWaves;
    }
}