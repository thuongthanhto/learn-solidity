let Utils = artifacts.require('./Utils.sol');
let Crowdfunding = artifacts.require('./Crowdfunding.sol');

module.exports = function (deployer) {
  deployer.deploy(Utils);
  deployer.link(Utils, Crowdfunding);
};
