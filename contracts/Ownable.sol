// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";


contract Ownable {
    address public owner;

    modifier onlyOwner() {
        console.log("onlyOwner msg.sender:  %s ", msg.sender);
        console.log("onlyOwner owner:  %s ", owner);

        require(owner == msg.sender, "Not invoked by the owner");
        _;
    }

    constructor() {
        console.log("constructor msg.sender:  %s ", msg.sender);
        owner = msg.sender;
    }
}