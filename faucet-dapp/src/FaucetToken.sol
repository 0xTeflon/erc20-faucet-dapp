// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FaucetToken is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY      = 10_000_000 * 10 ** 18;
    uint256 public constant FAUCET_AMOUNT   = 100 * 10 ** 18;
    uint256 public constant COOLDOWN_PERIOD = 24 hours;

    mapping(address => uint256) private lastRequestTime;

    event TokensRequested(address indexed user, uint256 amount);

    constructor() ERC20("FaucetToken", "FCT") Ownable(msg.sender) {}

    function mint(address to, uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be greater than zero");
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
    }

    function requestToken() external {
        require(
            totalSupply() + FAUCET_AMOUNT <= MAX_SUPPLY,
            "Faucet depleted"
        );
        require(
            block.timestamp >= lastRequestTime[msg.sender] + COOLDOWN_PERIOD,
            "Cooldown active: wait 24 hours"
        );

        lastRequestTime[msg.sender] = block.timestamp;
        _mint(msg.sender, FAUCET_AMOUNT);

        emit TokensRequested(msg.sender, FAUCET_AMOUNT);
    }

    function getLastRequestTime(address user) external view returns (uint256) {
        return lastRequestTime[user];
    }

    function getCooldownRemaining(address user) external view returns (uint256) {
        uint256 nextAllowed = lastRequestTime[user] + COOLDOWN_PERIOD;
        if (block.timestamp >= nextAllowed) return 0;
        return nextAllowed - block.timestamp;
    }
}