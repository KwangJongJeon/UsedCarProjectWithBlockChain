import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

import CarContract from "../contracts/Car.json";
import CarManagerContract from "../contracts/CarManager.json"

import getWeb3 from "../getWeb3";
import DeliveryItem from './DeliveryItem';

class DeliveryCarList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            cars: []
        };
    }

    componentDidMount = async() => {
        try {
            // Get network provider and web3 instance
            this.web3 = await getWeb3();

            // Use web3 to get the user's accounts
            this.accounts = await this.web3.eth.getAccounts();

            // Get the contract instance.
            this.networkId = await this.web3.eth.net.getId();

            this.carManager = new this.web3.eth.Contract(
                CarManagerContract.abi,
                CarManagerContract.networks[this.networkId] && CarManagerContract.networks[this.networkId].address
            );

            await this.loadCarsFromBlockChain();

            this.setState({
                loaded: true
            });
        }
        catch(error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details`
            );
            console.error(error);
        }
    }


    loadCarsFromBlockChain = async () => {
        try {
            await this.carManager.methods.carIndex().call().then(async (res, err) => {
                this.state.maxCarIndex = res;
                // console.log("err: " + err);
                // console.log("res: " + res);
            })
            // await console.log("index: "+ this.state.maxCarIndex); 

            await this.getCars();
            // console.log("load cars" + this.carManager.methods.getCarIndex().call());

            // let currentCarNum = this.carManager.carIndex.getCarIndex().call()
        }
        catch(error) {
            alert(`Failed to load Cars from blockChain`);
            console.error(error);
        }
    }


    getCars = async () => {
        for(let i = 0; i < this.state.maxCarIndex; i++) {
            let carObj = await this.carManager.methods.cars(i).call();
            this.state.cars.push(carObj);

        }
        await console.log("----------------------------------") 
        await console.log(this.state.cars);
        await console.log("----------------------------------")
    }

    render() {
        const cars = this.state.cars;
        let carList;

        console.log("cars:-----------------------")
        console.log(cars);
        console.log("****************************")

        if(!cars) {
            carList = "등록되어 있는 차량이 없습니다.";
        }
        else {
            carList = cars.map((car) => {
                if(car._state === "1") {
                    return <DeliveryItem car={car} key={car._car}/> 
                }
                else {
                    return;
                }
            })
        }
        return(
            <div className="ShowDeliveryCarList">
                <h5>차량 배달 리스트</h5>
                <div className="list-group">
                    {carList}
                </div>
            </div>
        )
    }
}

export default DeliveryCarList;