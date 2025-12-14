const StudentIdentity = artifacts.require("StudentIdentity");
const ModuleReviews = artifacts.require("ModuleReviews");

module.exports = async function (deployer) {
  // 2. StudentIdentity deployen
  await deployer.deploy(StudentIdentity);

  // 3. Die deployte Instanz holen, um an die Adresse zu kommen
  const identityInstance = await StudentIdentity.deployed();

  // 4. ModuleReviews deployen und die Adresse von StudentIdentity übergeben
  // WICHTIG: Dein ModuleReviews-Constructor in Solidity muss (address _identityContract) akzeptieren!
  await deployer.deploy(ModuleReviews, identityInstance.address);
};