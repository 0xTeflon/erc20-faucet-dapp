// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/FaucetToken.sol";

contract DeployFaucetToken is Script {
    function run() external {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerKey);
        FaucetToken token = new FaucetToken();
        vm.stopBroadcast();

        console.log("FaucetToken deployed at:", address(token));
    }
}