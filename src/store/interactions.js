import { ethers } from "ethers";
import CROWDFUNDING_ABI from "../abis/CrowdFuding.json";
export const loadProvider = (dispatch) => {
  const connection = new ethers.providers.Web3Provider(window.ethereum);
  dispatch({ type: "PROVIDER_LOADED", connection });
  return connection;
};
export const loadNetwork = async (provider, dispatch) => {
  const { chainId } = await provider.getNetwork();
  dispatch({ type: "NETWORK_LOADED", chainId });
  return chainId;
};
export const loadAccount = async (provider, dispatch) => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const account = ethers.utils.getAddress(accounts[0]);
  dispatch({ type: "ACCOUNT_LOADED", account });
  let balance = await provider.getBalance(account);
  balance = ethers.utils.formatEther(balance);
  dispatch({ type: "ETHER_BALANCE_LOADED", balance });
};
export const loadAccountBalance = async (provider, dispatch) => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const account = ethers.utils.getAddress(accounts[0]);
  let balance = await provider.getBalance(account);
  balance = ethers.utils.formatEther(balance);
  dispatch({ type: "ETHER_BALANCE_LOADED", balance });
};

export const loadCrowdFunding = async (provider, address, dispatch) => {
  const crowdFunding = new ethers.Contract(address, CROWDFUNDING_ABI, provider);
  dispatch({ type: "CROWDFUNDING_LOADED", crowdFunding });
  return crowdFunding;
};
export const submitForm = async (
  owner,
  title,
  description,
  target,
  deadline,
  imageURL,
  provider,
  crowdFunding,
  dispatch
) => {
  let transaction;
  dispatch({ type: "NEW_FORM_LOADING" });
  try {
    const signer = await provider.getSigner();
    let formattedDeadline = Math.round(new Date(deadline).getTime() / 1000);

    let formattedTarget = ethers.utils.parseEther(target);
    transaction = await crowdFunding
      .connect(signer)
      .createCampaign(
        owner,
        title,
        description,
        formattedTarget,
        formattedDeadline,
        imageURL
      );
    console.log("Running till here");
    await transaction.wait();
  } catch (error) {
    dispatch({ type: "NEW_FORM_FAIL" });
  }
};

export const donateCampaign = async (
  id,
  amount,
  crowdFunding,
  account,
  dispatch,
  provider
) => {
  let transaction;
  dispatch({ type: "FUND_REQUEST_INITIALIZED" });
  try {
    const signer = await provider.getSigner();
    transaction = await crowdFunding.connect(signer).donateToCampaign(id, {
      from: account,
      value: ethers.utils.parseEther(amount.toString()),
    });
    await transaction.wait();
  } catch (error) {
    dispatch({ type: "FUND_REQUEST_FAIL" });
  }
};

export const subscribeToEvents = async (crowdFunding, dispatch) => {
  crowdFunding.on(
    "CrowdFunding__CreateCampaign",
    (
      id,
      owner,
      title,
      description,
      target,
      deadline,
      amountCollected,
      image,
      donators,
      donations,
      event
    ) => {
      const crowdFundingOrder = event.args;
      dispatch({ type: "NEW_FORM_SUCCESS", crowdFundingOrder, event });
    }
  );
  crowdFunding.on(
    "CrowdFunding__DonateToCampaing",
    (
      id,
      owner,
      title,
      description,
      target,
      deadline,
      amountCollected,
      image,
      donators,
      donations,
      event
    ) => {
      const donateFundOrder = event.args;
      dispatch({ type: "FUND_REQUEST_SUCCESS", donateFundOrder, event });
    }
  );
  crowdFunding.on("CrowdFunding__Completed", (id, deadline, target, event) => {
    const removeOrder = event.args;
    dispatch({ type: "REMOVE_CAMPAIGN_SUCCESS", removeOrder, event });
  });
};

export const loadAllData = async (provider, crowdFunding, dispatch) => {
  const block = await provider.getBlockNumber();
  const crowdFundingStream = await crowdFunding.queryFilter(
    "CrowdFunding__CreateCampaign",
    0,
    block
  );
  const crowdFundings = crowdFundingStream.map((event) => event.args);
  dispatch({ type: "ALL_CROWDFUNDING_LOADED", crowdFundings });
  const crowdDonationStream = await crowdFunding.queryFilter(
    "CrowdFunding__DonateToCampaing",
    0,
    block
  );
  const crowdDonation = crowdDonationStream.map((event) => event.args);
  dispatch({ type: "ALL_DONATION_LOADED", crowdDonation });
  const removeCampaignStream = await crowdFunding.queryFilter(
    "CrowdFunding__Completed",
    0,
    block
  );
  const removeCampaign = removeCampaignStream.map((event) => event.args);
  dispatch({ type: "REMOVE_CAMPAIGN", removeCampaign });
};
export const getTotalBackers = async (id, crowdFunding, dispatch) => {
  let backers = await crowdFunding.getNumberOfDonators(id);
  const precision = 100000;
  backers = Math.round(backers * precision) / precision;
  dispatch({ type: "TOTAL_BACKERS_LOADED", backers });
};

export const getAmountCollected = async (id, crowdFunding, dispatch) => {
  let amount = await crowdFunding.getAmountCollected(id);
  amount = ethers.utils.formatEther(amount);
  dispatch({ type: "TOTAL_AMOUNT_COLLECTED_LOADED", amount });
};
