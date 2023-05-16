//SPDX-License-Identifier:Unlicensed
pragma solidity >0.5.0 <=0.9.0;

import "hardhat/console.sol";

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }
    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => uint256) public numberOfDonators;
    uint256 public numberOfCampaigns = 0;

    event CrowdFunding__CreateCampaign(
        uint256 id,
        address owner,
        string title,
        string description,
        uint256 target,
        uint256 deadline,
        uint256 amountCollected,
        string image,
        address[] donators,
        uint256[] donations
    );
    event CrowdFunding__DonateToCampaing(
        uint256 id,
        address owner,
        string title,
        string description,
        uint256 target,
        uint256 deadline,
        uint256 amountCollected,
        string image,
        address[] donators,
        uint256[] donations
    );
    event CrowdFunding__Completed(uint256 id, uint256 deadline, uint256 target);

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns++];
        require(
            campaign.deadline < block.timestamp,
            "The deadline should be a date in the future"
        );
        require(
            _deadline > block.timestamp,
            "The deadline should be greater then the current time"
        );
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        emit CrowdFunding__CreateCampaign(
            numberOfCampaigns - 1,
            _owner,
            _title,
            _description,
            _target,
            _deadline,
            0,
            _image,
            campaign.donators,
            campaign.donations
        );

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;
        Campaign storage campaign = campaigns[_id];
        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);
        numberOfDonators[_id] += 1;
        (bool sent, ) = payable(campaign.owner).call{value: amount}("");
        if (sent) {
            campaign.amountCollected += amount;
        }
        emit CrowdFunding__DonateToCampaing(
            _id,
            campaign.owner,
            campaign.title,
            campaign.description,
            campaign.target,
            campaign.deadline,
            campaign.amountCollected,
            campaign.image,
            campaign.donators,
            campaign.donations
        );
        if (
            campaign.deadline <= block.timestamp ||
            campaign.target <= campaign.amountCollected
        ) {
            emit CrowdFunding__Completed(
                _id,
                campaign.deadline,
                campaign.target
            );
        }
    }

    function getDonators(uint256 _id) public view returns (address[] memory) {
        return (campaigns[_id].donators);
    }

    function getDonations(uint256 _id) public view returns (uint256[] memory) {
        return (campaigns[_id].donations);
    }

    function getAmountCollected(uint256 _id) public view returns (uint256) {
        return (campaigns[_id].amountCollected);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
        for (uint i = 0; i < numberOfCampaigns; i++) {
            allCampaigns[i] = campaigns[i];
        }
        return allCampaigns;
    }

    function getNumberOfDonators(uint256 _id) public view returns (uint256) {
        return numberOfDonators[_id];
    }

    function getNumberOfCampaigns() public view returns (uint256) {
        return numberOfCampaigns;
    }
}
