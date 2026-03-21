// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/FaucetToken.sol";

contract FaucetTokenTest is Test {
    FaucetToken token;

    address owner = address(1);
    address alice = address(2);
    address bob   = address(3);

    function setUp() public {
        vm.warp(1_000_000);

        vm.prank(owner);
        token = new FaucetToken();
    }

    // ─── mint() tests ────────────────────────────────────────────────

    function test_OwnerCanMint() public {
        vm.prank(owner);
        token.mint(alice, 500 * 10 ** 18);
        assertEq(token.balanceOf(alice), 500 * 10 ** 18);
    }

    function test_NonOwnerCannotMint() public {
        vm.prank(alice);
        vm.expectRevert();
        token.mint(alice, 100 * 10 ** 18);
    }

    function test_MintCannotExceedMaxSupply() public {
        uint256 overCap = token.MAX_SUPPLY() + 1;
        vm.prank(owner);
        vm.expectRevert("Exceeds max supply");
        token.mint(alice, overCap);
    }

    function test_MintZeroAmountReverts() public {
        vm.prank(owner);
        vm.expectRevert("Amount must be greater than zero");
        token.mint(alice, 0);
    }

    function test_MultipleMintsCappedAtMaxSupply() public {
        vm.startPrank(owner);
        token.mint(alice, token.MAX_SUPPLY());
        vm.expectRevert("Exceeds max supply");
        token.mint(bob, 1);
        vm.stopPrank();
    }

    // ─── requestToken() tests ─────────────────────────────────────────

    function test_UserCanRequestTokens() public {
        vm.prank(alice);
        token.requestToken();
        assertEq(token.balanceOf(alice), token.FAUCET_AMOUNT());
    }

    function test_CooldownPreventsDoubleRequest() public {
        vm.startPrank(alice);
        token.requestToken();
        vm.expectRevert("Cooldown active: wait 24 hours");
        token.requestToken();
        vm.stopPrank();
    }

    function test_UserCanRequestAgainAfter24Hours() public {
        vm.prank(alice);
        token.requestToken();

        vm.warp(block.timestamp + 24 hours);

        vm.prank(alice);
        token.requestToken();

        assertEq(token.balanceOf(alice), token.FAUCET_AMOUNT() * 2);
    }

    function test_DifferentUsersCanRequestIndependently() public {
        vm.prank(alice);
        token.requestToken();
        vm.prank(bob);
        token.requestToken();

        assertEq(token.balanceOf(alice), token.FAUCET_AMOUNT());
        assertEq(token.balanceOf(bob),   token.FAUCET_AMOUNT());
    }

   function test_FaucetDepletedWhenMaxSupplyReached() public {
    vm.startPrank(owner);
    token.mint(owner, token.MAX_SUPPLY());
    vm.stopPrank();

    vm.prank(bob);
    vm.expectRevert("Faucet depleted");
    token.requestToken();
}

    // ─── view helpers ─────────────────────────────────────────────────

    function test_GetLastRequestTime() public {
        vm.prank(alice);
        token.requestToken();
        assertEq(token.getLastRequestTime(alice), block.timestamp);
    }

    function test_CooldownRemainingAfterRequest() public {
        vm.prank(alice);
        token.requestToken();

        uint256 remaining = token.getCooldownRemaining(alice);
        assertApproxEqAbs(remaining, 24 hours, 2);
    }

    function test_CooldownRemainingIsZeroBeforeRequest() public view {
        assertEq(token.getCooldownRemaining(alice), 0);
    }

    // ─── fuzz test ────────────────────────────────────────────────────

    function testFuzz_MintNeverExceedsMaxSupply(uint256 amount) public {
        amount = bound(amount, 1, token.MAX_SUPPLY());
        vm.prank(owner);
        token.mint(alice, amount);
        assertLe(token.totalSupply(), token.MAX_SUPPLY());
    }
}