// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IStudentIdentity {
    function balanceOf(address owner) external view returns (uint256);
}

contract ModuleReviews {
    struct Review {
        address reviewer;
        uint8 rating; // 1-5 stars
        uint8 workload; // 1-5 stars
        uint8 difficulty; // 1-5 stars
        string comment;
        uint256 timestamp;
    }

    struct Module {
        string id;
        bool exists;
    }

    IStudentIdentity private identityContract;

    string[] private moduleIds;

    mapping(string => Module) private modules;

    mapping(string => Review[]) private moduleReviews;

    event ModuleAdded(string id);
    event ReviewAdded(string indexed moduleId, address indexed reviewer, uint8 rating);

    constructor(address _identityContractAddress) {
        identityContract = IStudentIdentity(_identityContractAddress);
    }

    modifier onlyVerifiedStudent() {
        require(
            identityContract.balanceOf(msg.sender) > 0,
            "Not verified: Please request HSLU Student Badge first."
        );
        _;
    }

    function addModule(string memory _id) public onlyVerifiedStudent {
        require(!modules[_id].exists, "Module already exists");

        modules[_id] = Module(_id, true);
        moduleIds.push(_id);

        emit ModuleAdded(_id);
    }

    function addReview(
        string memory _moduleId,
        uint8 _rating,
        uint8 _workload,
        uint8 _difficulty,
        string memory _comment
    ) public onlyVerifiedStudent {
        require(modules[_moduleId].exists, "Module does not exist");
        require(_rating >= 1 && _rating <= 5, "Rating must be between 1 and 5");

        Review memory newReview = Review({
            reviewer: msg.sender,
            rating: _rating,
            workload: _workload,
            difficulty: _difficulty,
            comment: _comment,
            timestamp: block.timestamp
        });

        moduleReviews[_moduleId].push(newReview);

        emit ReviewAdded(_moduleId, msg.sender, _rating);
    }

    function getAllModuleIds() public view returns (string[] memory) {
        return moduleIds;
    }

    function getReviews(
        string memory _moduleId
    ) public view returns (Review[] memory) {
        return moduleReviews[_moduleId];
    }
}
