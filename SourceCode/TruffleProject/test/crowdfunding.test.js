const Crowdfunding = artifacts.require('Crowdfunding');

contract('Crowdfunding', function (accounts) {
  let crowdfunding;
  const beneficiary = accounts[0];
  const ONE_ETH = web3.utils.toWei('1', 'ether');
  const ONGOING_STATE = '0';
  const FAILED_STATE = '1';
  const SUCCEEDED_STATE = '2';
  const PAID_OUT_STATE = '3';

  beforeEach(async function () {
    crowdfunding = await Crowdfunding.new('funding', 1, 10, beneficiary, {
      from: accounts[0],
      gas: 2000000,
    });
  });

  it('contract is initialized', async function () {
    const targetAmount = await crowdfunding.targetAmount();
    expect(targetAmount.toString()).to.equal(ONE_ETH.toString());

    const actualName = await crowdfunding.name();
    expect(actualName).to.equal('funding');

    const actualBeneficiary = await crowdfunding.beneficiary();
    expect(actualBeneficiary).to.equal(beneficiary);

    const state = await crowdfunding.state();
    expect(state.valueOf().toString()).to.equal(ONGOING_STATE);
  });

  it('accepts ETH contributions', async function () {
    await crowdfunding.sendTransaction({ value: ONE_ETH, from: accounts[1] });

    const contributed = await crowdfunding.amounts(accounts[1]);
    expect(contributed.toString()).to.equal(ONE_ETH.toString());

    const totalCollected = await crowdfunding.totalCollected();
    expect(totalCollected.toString()).to.equal(ONE_ETH.toString());
  });

  it('does not allow to contribute after deadline', async function () {
    try {
      await increaseTime(601);
      await mineBlock();
      await crowdfunding.sendTransaction({ value: ONE_ETH, from: accounts[1] });

      expect.fail('Should revert transaction');
    } catch (error) {
      expect(error.message).to.include('Deadline has passed');
    }
  });

  it('set state correctly when campaign fails', async function () {
    await increaseTime(601);
    await mineBlock();
    await crowdfunding.finishCrowdFunding();

    const fundingState = await crowdfunding.state.call();
    expect(fundingState.toString()).to.equal(FAILED_STATE);
  });

  it('sets state correctly when campaign succeeds', async function () {
    await crowdfunding.sendTransaction({ value: ONE_ETH, from: accounts[1] });
    await increaseTime(601);
    await mineBlock();
    await crowdfunding.finishCrowdFunding();

    const fundingState = await crowdfunding.state.call();
    expect(fundingState.toString()).to.equal(SUCCEEDED_STATE);
  });

  it('does not allow to finish crowdfing before deadline', async function () {
    try {
      await crowdfunding.finishCrowdFunding();

      expect.fail('Should revert transaction');
    } catch (error) {
      expect(error.message).to.include(
        'Deadline has not passed'
      );
    }
  });

  it('allows to collect money from the campaign', async function () {
    await crowdfunding.sendTransaction({ value: ONE_ETH, from: accounts[1] });

    await increaseTime(601);
    await mineBlock();

    await crowdfunding.finishCrowdFunding({ from: accounts[0] });

    const initAmount = await web3.eth.getBalance(beneficiary);
    await crowdfunding.collect({ from: accounts[1] });

    const newBalance = await web3.eth.getBalance(beneficiary);
    expect(newBalance - initAmount).toString().to.equal(ONE_ETH);

    const fundingState = await crowdfunding.state();
    expect(fundingState.toString().to.equal(PAID_OUT_STATE));
  });

  it('allows to withdraw money from the campaign', async function () {
    await crowdfunding.sendTransaction({ value: ONE_ETH - 100, from: accounts[1] });

    await increaseTime(601);
    await mineBlock();

    await crowdfunding.finishCrowdFunding();
    const fundingState = await crowdfunding.state();
    expect(fundingState.toString().to.equal(FAILED_STATE));

    await crowdfunding.withdraw({ from: accounts[1] });
    const amount = await crowdfunding.amounts(accounts[1]);
    expect(amount.toString().to.equal('0'));
  });

  async function increaseTime(increaseBySec) {
    return new Promise((resolve, reject) => {
      web3.currentProvider.send(
        {
          jsonrpc: '2.0',
          method: 'evm_increaseTime',
          params: [increaseBySec],
        },
        (err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve(result);
        }
      );
    });
  }

  function mineBlock() {
    return new Promise((resolve, reject) => {
      web3.currentProvider.send(
        {
          jsonrpc: '2.0',
          method: 'evm_mine',
        },
        (err, result) => {
          if (err) {
            return reject(err);
          }

          return resolve(result);
        }
      );
    });
  }
});
