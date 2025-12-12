const StudentIdentity = artifacts.require("StudentIdentity");
const ModuleReviews = artifacts.require("ModuleReviews");

module.exports = function(deployer) {
  // StudentIdentity is already deployed in migration 2
  // Get the deployed StudentIdentity instance and use its address for ModuleReviews
  deployer.then(function() {
    return StudentIdentity.deployed();
  }).then(function(identityInstance) {
    return deployer.deploy(ModuleReviews, identityInstance.address);
  });
};

