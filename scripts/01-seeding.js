const { ethers } = require("hardhat");
const config = require("../src/config.json");

const converter = (n) => {
  return ethers.utils.parseEther(n.toString());
};

const wait = (seconds) => {
  const millisecond = seconds * 1000;
  return new Promise((resolve) => setTimeout(resolve, millisecond));
};

async function main() {
  const account = await ethers.getSigners();
  const { chainId } = await ethers.provider.getNetwork();
  console.log("Using a chainId", chainId);
  const deadline = 1883859999;
  const crowdFunding = await ethers.getContractAt(
    "CrowdFunding",
    config[chainId].crowdFunding.address
  );
  console.log("Crowd Funding is fetched in address ", crowdFunding.address);
  let transaction, result;
  transaction = await crowdFunding.createCampaign(
    account[0].address,
    "Build up a new computer",
    "I want to build up a new computer",
    converter(100),
    deadline,
    "https://imgeng.jagran.com/images/2023/feb/Gaming%20Computer1675937914017.jpg"
  );
  console.log(
    `The number of campaigns is ${await crowdFunding.getNumberOfCampaigns()}`
  );
  result = await transaction.wait();
  await wait(1);
  transaction = await crowdFunding.createCampaign(
    account[0].address,
    "Build up a new Car",
    "I want to build up a new computer",
    converter(100),
    deadline,
    "https://imgeng.jagran.com/images/2023/feb/Gaming%20Computer1675937914017.jpg"
  );
  result = await transaction.wait();
  await wait(1);
  console.log(
    `The number of campaigns is ${await crowdFunding.getNumberOfCampaigns()}`
  );
  transaction = await crowdFunding.createCampaign(
    account[0].address,
    "Build up a new Office",
    "I want to build up a new Office",
    converter(100),
    deadline,
    "https://imgeng.jagran.com/images/2023/feb/Gaming%20Computer1675937914017.jpg"
  );
  result = await transaction.wait();
  await wait(1);
  console.log(
    `The number of campaigns is ${await crowdFunding.getNumberOfCampaigns()}`
  );
  transaction = await crowdFunding.createCampaign(
    account[0].address,
    "Build up a new Shop",
    "I want to build up a new Shop",
    converter(100),
    deadline,
    "https://imgeng.jagran.com/images/2023/feb/Gaming%20Computer1675937914017.jpg"
  );
  result = await transaction.wait();
  await wait(1);
  console.log(
    `The number of campaigns is ${await crowdFunding.getNumberOfCampaigns()}`
  );
  transaction = await crowdFunding.createCampaign(
    account[0].address,
    "Build up a new Fan",
    "I want to build up a new Fan",
    converter(100),
    deadline,
    "https://imgeng.jagran.com/images/2023/feb/Gaming%20Computer1675937914017.jpg"
  );
  result = await transaction.wait();
  await wait(1);
  console.log(
    `The number of campaigns is ${await crowdFunding.getNumberOfCampaigns()}`
  );
  transaction = await crowdFunding.createCampaign(
    account[1].address,
    "Build up a new Table",
    "I want to build up a new Table",
    converter(100),
    deadline,
    "https://imgeng.jagran.com/images/2023/feb/Gaming%20Computer1675937914017.jpg"
  );
  result = await transaction.wait();
  await wait(1);
  console.log(
    `The number of campaigns is ${await crowdFunding.getNumberOfCampaigns()}`
  );
  transaction = await crowdFunding.createCampaign(
    account[1].address,
    "Build up a new Temple",
    "I want to build up a new Temple",
    converter(100),
    deadline,
    "https://imgeng.jagran.com/images/2023/feb/Gaming%20Computer1675937914017.jpg"
  );
  result = await transaction.wait();
  await wait(1);
  console.log(
    `The number of campaigns is ${await crowdFunding.getNumberOfCampaigns()}`
  );
  transaction = await crowdFunding.createCampaign(
    account[0].address,
    "Build up a new Bed",
    "I want to build up a new Bed",
    converter(100),
    deadline,
    "https://imgeng.jagran.com/images/2023/feb/Gaming%20Computer1675937914017.jpg"
  );
  result = await transaction.wait();
  await wait(1);
  console.log(
    `The number of campaigns is ${await crowdFunding.getNumberOfCampaigns()}`
  );
  transaction = await crowdFunding.createCampaign(
    account[0].address,
    "Build up a new Sandal",
    "I want to build up a new Sandal",
    converter(100),
    deadline,
    "https://imgeng.jagran.com/images/2023/feb/Gaming%20Computer1675937914017.jpg"
  );
  result = await transaction.wait();
  await wait(1);
  console.log(
    `The number of campaigns is ${await crowdFunding.getNumberOfCampaigns()}`
  );
  transaction = await crowdFunding.createCampaign(
    account[1].address,
    "Build up a new Company",
    "I want to build up a new Company",
    converter(100),
    deadline,
    "https://imgeng.jagran.com/images/2023/feb/Gaming%20Computer1675937914017.jpg"
  );
  result = await transaction.wait();
  await wait(1);
  console.log(
    `The number of campaigns is ${await crowdFunding.getNumberOfCampaigns()}`
  );
  transaction = await crowdFunding.createCampaign(
    account[1].address,
    "Build up a new Alarm",
    "I want to build up a new Alarm",
    converter(100),
    deadline,
    "https://imgeng.jagran.com/images/2023/feb/Gaming%20Computer1675937914017.jpg"
  );
  result = await transaction.wait();
  await wait(1);
  console.log(
    `The number of campaigns is ${await crowdFunding.getNumberOfCampaigns()}`
  );

  for (let i = 1; i <= 10; i++) {
    transaction = await crowdFunding
      .connect(account[1])
      .createCampaign(
        account[1].address,
        `Build item ${i}`,
        `This funding is needed to build item ${i}`,
        converter(i),
        deadline,
        "https://imgeng.jagran.com/images/2023/feb/Gaming%20Computer1675937914017.jpg"
      );
    result = await transaction.wait();
    await wait(1);
    console.log(
      `The number of campaigns is ${await crowdFunding.getNumberOfCampaigns()}`
    );
  }

  //filling some orders
  transaction = await crowdFunding
    .connect(account[0])
    .donateToCampaign(0, { value: converter(0.00001) });
  result = await transaction.wait();
  await wait(1);
  console.log(`Donation done id 0`);
  transaction = await crowdFunding
    .connect(account[0])
    .donateToCampaign(1, { value: converter(0.00001) });
  result = await transaction.wait();
  await wait(1);
  console.log(`Donation done id 1`);
  transaction = await crowdFunding
    .connect(account[0])
    .donateToCampaign(3, { value: converter(0.00001) });
  result = await transaction.wait();
  await wait(1);
  console.log(`Donation done id 3`);
  transaction = await crowdFunding
    .connect(account[0])
    .donateToCampaign(12, { value: converter(0.00001) });
  result = await transaction.wait();
  await wait(1);
  console.log(`Donation done id 12`);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
