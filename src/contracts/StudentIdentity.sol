// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Importieren von OpenZeppelin Standards für Sicherheit
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title HSLU Student Identity (Soul-Bound Token)
 * @dev Implementiert einen nicht-übertragbaren NFT Badge für verifizierte Studenten.
 * Referenz: PDF Source [47]
 */
contract StudentIdentity is ERC721, Ownable {
    uint256 private _nextTokenId;

    // Der Constructor setzt den Namen des Tokens und den Admin (euch)
    constructor()
        ERC721("HSLU Verified Student", "HSLU-ID")
        Ownable(msg.sender)
    {}

    /**
     * @dev Gibt einem Studenten den Verifizierungs-Badge.
     * Nur der Owner (Admin) darf diese Funktion aufrufen (simuliert den Email-Service).
     */
    function issueBadge(address student) public onlyOwner {
        // Prüfen, ob der Student schon einen Token hat, um Spam zu vermeiden
        require(balanceOf(student) == 0, "Student already verified!");

        uint256 tokenId = _nextTokenId++;
        _safeMint(student, tokenId);
    }

    /**
     * @dev Überschreibt die Transfer-Funktion, um den Token "Soul-Bound" zu machen.
     * Tokens können nicht von Wallet A zu Wallet B gesendet werden.
     */
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override returns (address) {
        address from = _ownerOf(tokenId);

        // Erlaubt ist nur Minting (from == 0) oder Burning (to == 0).
        // Jeder normale Transfer wird hier blockiert.
        if (from != address(0) && to != address(0)) {
            revert(
                "Soulbound: Transfer is not allowed. Identity is permanent."
            );
        }

        return super._update(to, tokenId, auth);
    }
}
 