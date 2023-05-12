const { ethers } = require("hardhat");
const { expect } = require("chai");
const converter = (n) => {
  return ethers.utils.parseEther(n.toString());
};
describe("CrowdCampaign", () => {
  let transactionResponse,
    transactionReceipt,
    crowdFunding,
    user1,
    user2,
    user3;
  const deadline = 1883859999;
  beforeEach(async () => {
    const CrowdFunding = await ethers.getContractFactory("CrowdFunding");
    const accounts = await ethers.getSigners();
    user1 = accounts[0];
    user2 = accounts[1];
    user3 = accounts[2];
    crowdFunding = await CrowdFunding.connect(user1).deploy();
  });
  describe("Deployment", () => {
    it("The contract have a address", async () => {
      expect(await crowdFunding.address).to.not.equal(0);
    });
    it("The numberOfCampaign is zero", async () => {
      expect(await crowdFunding.getNumberOfCampaigns()).to.equal(0);
    });
  });
  describe("Create Campaign", () => {
    beforeEach(async () => {
      transactionResponse = await crowdFunding
        .connect(user1)
        .createCampaign(
          user1.address,
          "Build up a new computer",
          "I want to build up a new computer",
          converter(100),
          deadline,
          "image"
        );
      transactionReceipt = await transactionResponse.wait();
    });
    it("The number of campigns increased", async () => {
      expect(await crowdFunding.getNumberOfCampaigns()).to.equal(1);
    });
    it("The campaign is stored", async () => {
      const allCampaigns = await crowdFunding.getCampaigns();
      expect(allCampaigns[0].owner).to.equal(user1.address);
      expect(allCampaigns[0].title).to.equal("Build up a new computer");
      expect(allCampaigns[0].description).to.equal(
        "I want to build up a new computer"
      );
      expect(allCampaigns[0].target).to.equal(converter(100));
      expect(allCampaigns[0].deadline).to.equal(deadline);
      expect(allCampaigns[0].amountCollected).to.equal(0);
      expect(allCampaigns[0].image).to.equal("image");
    });
    it("Emits a CrowdFunding__CreateCampaign event", async () => {
      const event = await transactionReceipt.events[0];
      expect(event.event).to.equal("CrowdFunding__CreateCampaign");
      const args = event.args;
      expect(args.id).to.equal(0);
      expect(args.owner).to.equal(user1.address);
      expect(args.title).to.equal("Build up a new computer");
      expect(args.description).to.equal("I want to build up a new computer");
      expect(args.target).to.equal(converter(100));
      expect(args.deadline).to.equal(deadline);
      expect(args.amountCollected).to.equal(0);
      expect(args.image).to.equal("image");
    });
  });
  describe("Donate Campaign", () => {
    beforeEach(async () => {
      transactionResponse = await crowdFunding
        .connect(user1)
        .createCampaign(
          user1.address,
          "Build up a new computer",
          "I want to build up a new computer",
          converter(100),
          deadline,
          "image"
        );
      transactionReceipt = await transactionResponse.wait();
      transactionResponse = await crowdFunding
        .connect(user1)
        .createCampaign(
          user1.address,
          "Build up a new computer",
          "I want to build up a new computer",
          converter(100),
          deadline,
          "image"
        );
      transactionReceipt = await transactionResponse.wait();
      transactionResponse = await crowdFunding
        .connect(user1)
        .createCampaign(
          user1.address,
          "Build up a new computer",
          "I want to build up a new computer",
          converter(100),
          deadline,
          "image"
        );
      transactionReceipt = await transactionResponse.wait();
      transactionResponse = await crowdFunding
        .connect(user2)
        .donateToCampaign(1, { value: converter(10) });
      transactionReceipt = await transactionResponse.wait();
    });
    it("The amount collected is increased for the id", async () => {
      const allCampaigns = await crowdFunding.getCampaigns();
      expect(allCampaigns[1].amountCollected).to.equal(converter(10));
    });
    it("It emits a CrowdFunding__DonateToCampaing event", async () => {
      const event = await transactionReceipt.events[0];
      expect(event.event).to.equal("CrowdFunding__DonateToCampaing");
      const args = event.args;
      expect(args.id).to.equal(1);
      expect(args.owner).to.equal(user1.address);
      expect(args.title).to.equal("Build up a new computer");
      expect(args.description).to.equal("I want to build up a new computer");
      expect(args.target).to.equal(converter(100));
      expect(args.deadline).to.equal(deadline);
      expect(args.amountCollected).to.equal(converter(10));
      expect(args.image).to.equal("image");
      expect(args.donators[0]).to.equal(user2.address);
      expect(args.donations[0]).to.equal(converter(10));
    });
  });
});
