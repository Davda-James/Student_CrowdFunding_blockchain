// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract EducationCrowdFunding{
    struct Campaign{
        address student;
        uint goal;
        uint fundsAlreadyWithdrawn;
        uint fundsRaised;   
        bool completed;
    }
    address payable public owner;
    mapping(uint=>Campaign) public campaigns;
    uint public campaignCount;
    uint[] public activeCampaigns;
    uint public penaltyRate;
    constructor(uint _penaltyRate){
         owner = payable(msg.sender);
        require(_penaltyRate <= 100, "Penalty  rate must be between 0 and 100");
        penaltyRate = _penaltyRate; // dynamically increase the penalty rate
    }
    event CampaignCreated(uint campaignId, address student, uint goal);
    event FundContributed(uint campaignId, address donor, uint amountDonated);
    event FundsWithdrawn(uint campaignId,address student, uint amount);
    event penaltyDistributed(uint _penaltyAmount);
    event RemainderTransferred(uint remainderAmount, address recipient);
    function getGoal(uint _campaignId) external view campaignExists(_campaignId) returns (uint){
        return campaigns[_campaignId].goal;
    }
    function getfundsAlreadyWithdrawn(uint _campaignId) external view campaignExists(_campaignId) returns(uint){
        return campaigns[_campaignId].fundsAlreadyWithdrawn;
    }
    function getFundsRaised(uint _campaignId) external view campaignExists(_campaignId) returns (uint) {
        return campaigns[_campaignId].fundsRaised;
    }
    function isCompleted(uint _campaignId) external view campaignExists(_campaignId) returns (bool) {
        return campaigns[_campaignId].completed;
    }
    modifier onlyStudent(uint _campaignId){
        require(msg.sender == campaigns[_campaignId].student); // only the students can raise the funds
        _;
    }
    modifier campaignExists(uint _campaignId){
        require(_campaignId>0 && _campaignId<=campaignCount , "Campaign does not exist"); // camapign should be valid
        _;
    }
    modifier onlyOwner(){
        require(msg.sender == owner,"Only the owner of contract can change the Penalty Rate");
        _;
    }
    function createCampaign(uint _goal) public {
        require(_goal>0,"Goal must be greater than 0");
        campaignCount++;
        campaigns[campaignCount]= Campaign(msg.sender, _goal, 0 ,0, false);
        activeCampaigns.push(campaignCount); //added to active campaigns
        emit CampaignCreated(campaignCount, msg.sender, _goal);
    }
    function contributeToCampaign(uint _campaignId) public payable campaignExists(_campaignId){
        // validations 
        require(!campaigns[_campaignId].completed,"Campaign is completed");
        require(msg.value > 0 ,"Contribution must be greater than 0");
        //incrementing the fundsRaised to given campaign
        campaigns[_campaignId].fundsRaised += msg.value;
        // emit the event that funds has contributed to _campaignId
        emit FundContributed(_campaignId, msg.sender, msg.value);
        // checking if the funds reequired by campaign is fulfilled after this fund donation
        if(campaigns[_campaignId].fundsRaised >= campaigns[_campaignId].goal){
            campaigns[_campaignId].completed=true;
            removefromActiveCampaign(_campaignId);
        }
    }
    function fundsWithdraw(uint _campaignId) public payable onlyStudent(_campaignId) campaignExists(_campaignId){
        Campaign storage campaign  = campaigns[_campaignId];
        uint amountToWithdraw;
        if(campaign.completed){
            amountToWithdraw = campaign.fundsRaised - campaign.fundsAlreadyWithdrawn;
            campaign.fundsAlreadyWithdrawn = campaign.fundsRaised;
        } else{
            uint penaltyAmount =  (campaign.fundsRaised*penaltyRate)/100;
            amountToWithdraw = campaign.fundsRaised - penaltyAmount;
            distributePenalty(penaltyAmount,_campaignId);
            emit penaltyDistributed(penaltyAmount);
            campaign.fundsAlreadyWithdrawn = campaign.fundsRaised;
        }
        payable(campaign.student).transfer(amountToWithdraw);
        emit FundsWithdrawn(_campaignId, msg.sender, amountToWithdraw);
    }
    function ModifyPenaltyRate(uint newPenaltyRate) external onlyOwner{
        require(newPenaltyRate >= 10 && newPenaltyRate <= 100, "Penalty rate must be between 0 and 100");
        penaltyRate = newPenaltyRate;
    }
    function distributePenalty(uint _penaltyAmount,uint _campaignId) internal {
        uint activeCampaignslength = activeCampaigns.length;
        if(activeCampaignslength>0){
            uint penaltyPerCampaign = _penaltyAmount / activeCampaignslength;
            uint remainderAmount = _penaltyAmount % activeCampaignslength;
            for (uint i = 0; i < activeCampaignslength; i++) {
                if(activeCampaigns[i]!=_campaignId){
                    campaigns[activeCampaigns[i]].fundsRaised+=penaltyPerCampaign;
                }
            }
            payable(owner).transfer(remainderAmount);
            emit RemainderTransferred(remainderAmount, owner);
        }
    }
    function removefromActiveCampaign(uint _campaignId) internal {   
            uint activeCampaignslength = activeCampaigns.length;
            for (uint i = 0; i < activeCampaignslength; i++) {
                // check index of campaign id to be removed
                if(activeCampaigns[i] == _campaignId){
                    // swap the last and camapign id index and pop the last one
                    activeCampaigns[i] = activeCampaigns[activeCampaignslength-1];
                    activeCampaigns.pop();
                    break;
                }
            }
    }
}
