//SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.6.0;

import "./Ownable.sol";
import "./Car.sol";

/*
    2021-05-25 CarManager
    Description: Manage Car List made by Users
    function:
    1. Create Car : Create Car Contract
    2. Trigger Payment : If buyer pay proper value to car Contract, Change state to Paid 
    3. Trigger Delivery : After delivery is completed, Change Car's state to delivery
*/


contract CarManager is Ownable{
    
    enum SupplyChainState {Created, Paid, Delivered}
    
    struct S_Car {
        Car _car;
        string _brand;
        string _model;
        string _carNum; 
        uint _carPrice;
        CarManager.SupplyChainState _state;
    }
    
    mapping(uint => S_Car) public cars;
    uint carIndex;
    
    function createCar(string memory _brand, string memory _model, string memory _carNum, uint _carPrice) public {
        Car car = new Car(this, _carPrice, carIndex);
        cars[carIndex]._car = car;
        cars[carIndex]._brand = _brand;
        cars[carIndex]._model = _model;
        cars[carIndex]._carNum = _carNum;
        cars[carIndex]._carPrice = _carPrice;
        cars[carIndex]._state = SupplyChainState.Created;
        
        emit SupplyChainStep(carIndex, uint(cars[carIndex]._state), address(car));
        carIndex++;
    }
    
    event SupplyChainStep(uint _carIndex, uint _step, address _carAddress);
    
    function triggerPayment(uint _carIndex) public payable {
        require(cars[_carIndex]._carPrice == msg.value, "Only full payments accepted");
        require(cars[_carIndex]._state == SupplyChainState.Created, "Item is further in the chain");
        cars[_carIndex]._state = SupplyChainState.Paid;
        
        emit SupplyChainStep(_carIndex, uint(cars[_carIndex]._state), address(cars[_carIndex]._car));
    }
    
    function triggerDelivery(uint _carIndex) public onlyOwner {
        require(cars[_carIndex]._state == SupplyChainState.Paid, "Item is further in the chain");
        cars[_carIndex]._state = SupplyChainState.Delivered;
        
        emit SupplyChainStep(_carIndex, uint(cars[carIndex]._state), address(cars[_carIndex]._car));
    }
    
}