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
    "Building a computer allows for customization, cost savings, and future-proofing. It can be a great learning experience, giving a deeper understanding of technology. Choose components based on use case, and assemble with online tutorials. Result is a powerful machine tailored to your needs.",
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
    "Building a car can be an exciting challenge for those passionate about automobiles. It offers complete customization and a deep understanding of how cars work. Building a car can also provide a sense of accomplishment and satisfaction, resulting in a unique and personalized machine. However, it requires significant time, resources, and expertise to build a safe and reliable vehicle.",
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
    "There are several reasons why someone may want to build a new office. It could be to accommodate a growing business, to upgrade to a more modern and efficient space, or to create a better work environment for employees. Building a new office also offers the opportunity to customize the space to fit the needs of the business, and to incorporate the latest technology and energy-efficient features. Overall, building a new office can lead to improved productivity, employee satisfaction, and the ability to better serve clients and customers.",
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
    "Building a new shop can be a great investment opportunity, providing the chance to create a space that perfectly meets your business needs. A new shop can attract more customers, provide more space for inventory, and allow for customization of layout and design. With careful planning and execution, a new shop can be a key factor in the success and growth of a business.",
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
    "Building a new farm can be a way to create a sustainable source of income, provide for oneself and family, and contribute to the local community. It allows for control over the type of crops or livestock raised, as well as the methods used to raise them. Additionally, building a new farm can be a way to reconnect with nature, promote environmental sustainability, and support local agriculture.",
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
    "Building a new gaming room can create a dedicated space for immersive gameplay, enhance the overall gaming experience, and provide an opportunity for customization. A gaming room can also increase the value of your home and offer a space for socializing with fellow gamers. By building a new gaming room, you can have a space tailored to your specific needs and preferences, allowing you to fully immerse yourself in your favorite games.",
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
    "Increase community involvement: Building a new temple can bring the community together and provide a place for people to come together to worship and connect with one another.Address overcrowding: If the current temple is overcrowded or unable to accommodate everyone who wants to attend, building a new temple can provide additional space and resources to meet the needs of the community.Improve facilities: If the current temple is in disrepair or lacks necessary facilities, building a new temple can provide updated and modernized amenities for worshipers.",
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
    "Building a new EV car can be an exciting opportunity to contribute to the development of sustainable transportation. It allows for customization of features and performance, and can potentially save money on fuel costs in the long run. Additionally, building an EV car can be a fun and challenging project for those interested in engineering and technology.",
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
    "Building a skyscraper can be a monumental achievement that contributes to the skyline of a city and provides space for businesses and residents. It requires a significant amount of planning, engineering, and construction expertise. Additionally, building a skyscraper can be a lucrative investment opportunity for those involved in the development and ownership of the building. However, it also requires careful consideration of safety, environmental impact, and community impact.",
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
    "Building a blockchain company can be an exciting opportunity to leverage the power of decentralized technology to solve real-world problems. It allows for innovation in industries such as finance, supply chain management, and more. Additionally, building a blockchain company can potentially lead to financial success as the value of blockchain technology continues to grow. However, it requires a strong understanding of blockchain technology, a solid business plan, and a dedicated team to execute on that plan.",
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
    "Save tigers",
    "Tigers are one of the most fascinating and majestic creatures on the planet. As the largest member of the cat family, they are known for their impressive strength, agility, and striking beauty. These magnificent creatures have captivated human imagination for centuries and have been featured in myths, legends, and art across many cultures.    Tigers are native to Asia, where they can be found in a variety of habitats ranging from dense forests to grasslands and mangrove swamps. They are solitary creatures, spending most of their time hunting for prey or patrolling their territory. Tigers are carnivorous and their diet consists mainly of deer, wild boar, and other large mammals. Sadly, tigers are also one of the most endangered species on Earth. Habitat loss, poaching, and human encroachment on their territory have all contributed to a decline in tiger populations over the years. In fact, some estimates suggest that there are only around 3,900 tigers left in the wild today. Conservation efforts are underway to protect tigers and their habitats, but much work remains to be done. Organizations like the World Wildlife Fund and the Wildlife Conservation Society are working to raise awareness about the plight of tigers and to develop strategies for protecting them and their habitats. In addition to their ecological importance, tigers also play an important role in human culture. They have been featured in art, literature, and popular culture for centuries and continue to inspire awe and admiration in people around the world. As we work to protect these magnificent creatures, we also honor and celebrate their place in our shared cultural heritage.",
    converter(100),
    deadline,
    "https://thumbs.dreamstime.com/b/tiger-portrait-horizontal-11392212.jpg"
  );
  result = await transaction.wait();
  await wait(1);
  console.log(
    `The number of campaigns is ${await crowdFunding.getNumberOfCampaigns()}`
  );

  //filling some orders
  transaction = await crowdFunding
    .connect(account[0])
    .donateToCampaign(0, { from: account[0].address, value: converter(0.002) });
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
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
