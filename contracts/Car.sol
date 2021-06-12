//SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.6.0;

import "./CarManager.sol";
/*
    2021-05-25 Car
    Description: Manage Car List made by Users
    
    attributes:
    1. uint priceInWei  :  it means car's price deployed by user. The unit of price is Wei
    2. uint pricePaid   :  'paid' price. if full payment was not offered, buy offer is rejected.
    3. uint carIndex    :   The value of the index occupied in the carManager Contract
    4. S_CarInfo carInfo:   car's basic info(ex. mileage, VINStatus)
    
    5. mapping(uint => S_ComponentMaintenanceReceipt) S_ComponentMaintenanceReceipts: car's component maintenance Receipt list
    6. mapping(uint => S_InfoMaintenanceReceipt) S_InfoMaintenanceReceipts          : car's info maintenace Receipt list
    
    
    function:
    1. constructor : Receive three variable, Car's name and Price and parent Contract(Carmanager Contract)
    2. basicCarInfoCheck : initialize car's basic info (ex. car's mileage, VINStatus ...). it must be called to give proper information to the buyer. it's result will be save in attribute 'carInfo'
    3. addCarComponentMaintanceReceipt : add fixing Car's defective component receipt to attribute componentMaintenanceIndex
    
    TODO(2021-05-25):
    we must add each of maintenanceRecipt(Info, Component). 
    There's no other way but to do the whole thing right now.
*/


contract Car {
    struct S_CarInfo {
        uint mileage;
        string VINStatus;
        string tuningStatus;
        string specialHistory;
        string changeOfPurpose;
        string color;
    }
    
    uint public priceInWei;
    uint public pricePaid;
    uint public carIndex;
    S_CarInfo public carInfo;
    CarManager parentContract;
    
    
    struct S_ComponentMaintenanceReceipt {
        string componentName;
        string status;
    }
    
    mapping(uint => S_ComponentMaintenanceReceipt) S_ComponentMaintenanceReceipts;
    uint componentMaintenanceIndex;
    
    struct S_InfoMaintenanceReceipt {
        S_CarInfo infoName;
        string status;
    }
    
    mapping(uint => S_InfoMaintenanceReceipt) S_InfoMaintenanceReceipts;
    uint infoMaintenanceIndex;
    
    constructor(CarManager _parentContract, uint _priceInWei, uint _index) public{
        priceInWei = _priceInWei;
        carIndex = _index;
        parentContract = _parentContract;
    }
    
    function basicCarInfoCheck(uint _mileage, string memory _VINStatus, string memory _tuningStatus, string memory _specialHistory, string memory _chageOfPurpose, string memory _color) public {
        carInfo.mileage = _mileage;
        carInfo.VINStatus = _VINStatus;
        carInfo.tuningStatus = _tuningStatus;
        carInfo.specialHistory = _specialHistory;
        carInfo.changeOfPurpose = _chageOfPurpose;
        carInfo.color = _color;
    }
    
    function addCarComponentMaintenanceReceipt(string memory componentName, string memory status) public{
    }

    function getCarInfo() public view returns(uint, string memory, string memory, string memory, string memory, string memory) {
        return (
            carInfo.mileage,
            carInfo.VINStatus,
            carInfo.tuningStatus,
            carInfo.specialHistory,
            carInfo.changeOfPurpose,
            carInfo.color
        );
    }
    

    receive() external payable {
        require(pricePaid == 0, "Item is paid already");
        require(priceInWei == msg.value, "Only full payments allowed");
        pricePaid += msg.value;
        
        (bool success, ) = address(parentContract).call.value(msg.value)(abi.encodeWithSignature("triggerPayment(uint256)", carIndex));
        require(success, "The transaction wasn't successful, canceling");
    }
    
    fallback() external {
        
    }
}