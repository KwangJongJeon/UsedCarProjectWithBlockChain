var CarManager = artifacts.require("./CarManager.sol");

module.exports = function(deployer) {
  deployer.deploy(CarManager);
};
