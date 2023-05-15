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
    "https://i.ytimg.com/vi/tArC9-RHmU4/maxresdefault.jpg"
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
    "https://img.freepik.com/premium-photo/working-area-modern-office-with-carpet-floor-meeting-room-interior-3d-rendering_156429-177.jpg"
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
    "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2022-03/The%20New%20Shop.jpg"
  );
  result = await transaction.wait();
  await wait(1);
  console.log(
    `The number of campaigns is ${await crowdFunding.getNumberOfCampaigns()}`
  );
  transaction = await crowdFunding.createCampaign(
    account[0].address,
    "Build up a new Farm",
    "I want to build up a new Farm",
    converter(100),
    deadline,
    "https://blog.extension.uconn.edu/wp-content/uploads/sites/419/2019/02/agriculture-barn-clouds-235725.jpg"
  );
  result = await transaction.wait();
  await wait(1);
  console.log(
    `The number of campaigns is ${await crowdFunding.getNumberOfCampaigns()}`
  );
  transaction = await crowdFunding.createCampaign(
    account[1].address,
    "Build up a new Gaming room",
    "I want to build up a new Gaming room",
    converter(100),
    deadline,
    "https://cdn.shopify.com/s/files/1/0870/0656/articles/Inked0nk1apgq5tf41_LI_1024x1024.jpg?v=1596819937"
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
    "https://timesofindia.indiatimes.com/photo/msid-77363538/77363538.jpg?resizemode=4"
  );
  result = await transaction.wait();
  await wait(1);
  console.log(
    `The number of campaigns is ${await crowdFunding.getNumberOfCampaigns()}`
  );
  transaction = await crowdFunding.createCampaign(
    account[0].address,
    "Build up a new EV Car",
    "I want to build up a new EV car",
    converter(100),
    deadline,
    "https://www.cartoq.com/wp-content/uploads/2022/06/toyota-bz4x-featured.jpg"
  );
  result = await transaction.wait();
  await wait(1);
  console.log(
    `The number of campaigns is ${await crowdFunding.getNumberOfCampaigns()}`
  );
  transaction = await crowdFunding.createCampaign(
    account[0].address,
    "Build up a new sky scriper",
    "I want to build up a sky scriper",
    converter(100),
    deadline,
    "https://static.israel21c.org/www/uploads/2023/01/shutterstock_783317635-e1673245880444-1520x855.jpg"
  );
  result = await transaction.wait();
  await wait(1);
  console.log(
    `The number of campaigns is ${await crowdFunding.getNumberOfCampaigns()}`
  );
  transaction = await crowdFunding.createCampaign(
    account[1].address,
    "Build up a new Blockchain Company",
    "I want to build up a new Blockchain Company",
    converter(100),
    deadline,
    "https://blog.hubspot.com/hubfs/blockchain-companies.jpg"
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
    "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61uYG4ACLoS._SX425_.jpg"
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
        "https://thumbs.dreamstime.com/b/void-red-rubber-stamp-over-white-background-87999908.jpg"
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
    .donateToCampaign(0, { from: account[0].address, value: converter(2) });
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
