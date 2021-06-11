import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

import CarContract from "../contracts/Car.json";
import CarManagerContract from "../contracts/CarManager.json";

import getWeb3 from "../getWeb3";

import CarCard from './CarCard';

class ShowBlockChainList extends Component {
    state = {
        loaded: false,
        cost: 0,
        carName: "example_1",
        brand: '',
        model: '',
        car_num: '',
        price: '',
        maxCarIndex: 0,
        cars: []
    };

    constructor(props) {
        super(props);
        this.state = {
            cars: []
        };
    }

    componentDidMount = async () => {
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

            this.car = new this.web3.eth.Contract(
                CarContract.abi,
                CarContract.networks[this.networkId] && CarContract.networks[this.networkId].address,
            );

            // Set Web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods
            this.listenToPaymentEvent();
            await this.loadCarsFromBlockChain();
            
            this.setState({ 
                loaded: true, 

            });
        }
        catch(error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details`
            );

            console.error(error);
        }  
    };

    loadCarsFromBlockChain = async () => {
        try {
            let cars = [];
            let index;
            await this.carManager.methods.carIndex().call().then(async (res, err) => {
                this.state.maxCarIndex = res;
                console.log("err: " + err);
                console.log("res: " + res);
            })
            await console.log("index: "+ this.state.maxCarIndex); 

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
        await(console.log(this.state.cars));
        await(console.log(this.state.cars[0]._brand));
    }

    listenToPaymentEvent = () => {
        let self = this;
        this.carManager.events.SupplyChainStep().on("data", async function(event) {
            console.log(event);
            let carObj = await self.carManager.methods.cars(event.returnValues._carIndex).call();
            console.log("methods");
            console.log(self.carManager.methods);
            console.log("carObj");
            console.log(carObj);
            alert("Car " + carObj._identifier + " was paid, delivery now!")
        });
      }

    render() {
        const cars = this.state.cars;
        console.log("carState: " + cars);
        console.log("PrintCars: " + cars);
        let carList;
        let list = [1,2,3,4,5] 

        if(!cars) {
            carList = "등록되어 있는 차량이 없습니다.";
        }
        else {
            carList = cars.map((car) => 
                <CarCard car={car} key={car._car}/>
            )
            console.log("carList: " + carList);
            
        }

        return (
            <div className="ShowCarList">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <br/>
                            <h2 className="display-4 text-center">Cars List</h2>
                        </div>

                        <div className="col-md-11">
                                <a href="/sell-car" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">
                                    + 차량 판매
                                </a>
                            <br/>
                            <br/>
                            <hr/>
                        </div>

                        <div className="list">
                            {carList}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShowBlockChainList