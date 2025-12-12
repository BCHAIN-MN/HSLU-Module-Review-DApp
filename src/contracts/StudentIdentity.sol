// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract StudentIdentity is ERC721, Ownable {
    uint256 private _nextTokenId;

    constructor()
        ERC721("HSLU Verified Student", "HSLU-ID")
        Ownable(msg.sender)
    {}

    function issueBadge(address student) public onlyOwner {
        require(balanceOf(student) == 0, "Student already verified!");

        uint256 tokenId = _nextTokenId++;
        _safeMint(student, tokenId);
    }

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override returns (address) {
        address from = _ownerOf(tokenId);

        if (from != address(0) && to != address(0)) {
            revert(
                "Soulbound: Transfer is not allowed. Identity is permanent."
            );
        }

        return super._update(to, tokenId, auth);
    }
}
