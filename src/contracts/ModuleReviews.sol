// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Interface, um mit dem Identity Contract zu sprechen
interface IStudentIdentity {
    function balanceOf(address owner) external view returns (uint256);
} 

/**
 * @title HSLU Module Reviews
 * @dev Speichert Module und Bewertungen. Erlaubt nur verifizierten Studenten Interaktionen.
 * Referenz: PDF Source [35, 37, 44]
 */
contract ModuleReviews {
    // --- Datenstrukturen ---

    struct Review {
        address reviewer;
        uint8 rating; // 1-5 Sterne
        uint8 workload; // 1-5 (Leicht bis Schwer)
        uint8 difficulty; // 1-5 (Leicht bis Schwer)
        string comment;
        uint256 timestamp;
    }

    struct Module {
        string id; // z.B. "I.BSCINF"
        bool exists;
    }

    // --- State Variables ---

    // Speichert den Link zum Ausweis-Contract
    IStudentIdentity private identityContract;

    // Liste aller Modul-IDs (für das Frontend zum Auflisten)
    string[] private moduleIds;

    // Mapping: Modul-ID => Modul Daten
    mapping(string => Module) private modules;

    // Mapping: Modul-ID => Liste aller Reviews
    mapping(string => Review[]) private moduleReviews;

    // Events (Damit das Frontend updates live mitbekommt)
    event ModuleAdded(string id);
    event ReviewAdded(string moduleId, address reviewer, uint8 rating);

    // --- Constructor ---

    // Hier müsst ihr beim Deployen die Adresse von StudentIdentity.sol eingeben!
    constructor(address _identityContractAddress) {
        identityContract = IStudentIdentity(_identityContractAddress);
    }

    // --- Modifiers (Sicherheit) ---

    // Prüft, ob der User den Soul-Bound Token besitzt
    modifier onlyVerifiedStudent() {
        require(
            identityContract.balanceOf(msg.sender) > 0,
            "Not verified: Please request HSLU Student Badge first."
        );
        _;
    }

    // --- Funktionen ---

    /**
     * @dev Fügt ein neues Modul hinzu.
     * Aktuell dürfen das alle verifizierten Studenten (Community Driven).
     */
    function addModule(
        string memory _id
    ) public onlyVerifiedStudent {
        require(!modules[_id].exists, "Module already exists");

        modules[_id] = Module(_id, true);
        moduleIds.push(_id);

        emit ModuleAdded(_id);
    }

    /**
     * @dev Fügt eine Bewertung zu einem Modul hinzu.
     * Prüft Input-Werte (1-5) und Verifizierung.
     */
    function addReview(
        string memory _moduleId,
        uint8 _rating,
        uint8 _workload,
        uint8 _difficulty,
        string memory _comment
    ) public onlyVerifiedStudent {
        require(modules[_moduleId].exists, "Module does not exist");
        require(_rating >= 1 && _rating <= 5, "Rating must be between 1 and 5");

        // Erstellen des Review Structs
        Review memory newReview = Review({
            reviewer: msg.sender,
            rating: _rating,
            workload: _workload,
            difficulty: _difficulty,
            comment: _comment,
            timestamp: block.timestamp
        });

        // Speichern im Array
        moduleReviews[_moduleId].push(newReview);

        emit ReviewAdded(_moduleId, msg.sender, _rating);
    }

    // --- Helper Funktionen für das Frontend ---

    // Gibt alle Modul-IDs zurück
    function getAllModuleIds() public view returns (string[] memory) {
        return moduleIds;
    }

    // Gibt alle Reviews für ein bestimmtes Modul zurück
    function getReviews(
        string memory _moduleId
    ) public view returns (Review[] memory) {
        return moduleReviews[_moduleId];
    }
}
