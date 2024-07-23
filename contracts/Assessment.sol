// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract SimpleContract {
    uint256 private counter;
    string private message;

    // Constructor to initialize the counter and message
    constructor() {
        counter = 0;
        message = ""; // Initialize message to an empty string
    }

    // Get the current counter value
    function getCounter() public view returns (uint256) {
        return counter;
    }

    // Increment the counter
    function incrementCounter() public {
        counter += 1;
    }

    // Decrement the counter
    function decrementCounter() public {
        require(counter > 0, "Counter is already at zero.");
        counter -= 1;
    }

    // Reset the counter to zero
    function resetCounter() public {
        counter = 0;
    }

    // Get the current message
    function getMessage() public view returns (string memory) {
        return message;
    }

    // Set a new message
    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
