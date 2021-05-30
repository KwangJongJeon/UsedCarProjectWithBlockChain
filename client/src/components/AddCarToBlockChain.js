import React, { Component } from "react";
import { Link } from 'react-router-dom';

import CarContract from "../contracts/Car.json";
import CarManagerContract from "../contracts/CarManager.json";

import getWeb3 from "../getWeb3";

import '../App.css';

class AddCarToBlockChain extends Component {
    state = {loaded: false, cost: 0, itemName: "example_1"};
    
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
            this.setState({ loaded: true });
        }
        catch(error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details`
            );

            console.error(error);
        }  
    };

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

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = async() => {
        const {cost, carName} = this.state;
        let result = await this.carManager.methods.createCar(carName, cost).send({from: this.accounts[0]});
        console.log(result);
        alert("Send " + cost + "Wei to " + result.events.SupplyChainStep.returnValues._carAddress);
    }

    render() {
        if (!this.state.loaded) {
            return <div>Loading Web3, accoutns, and contract...</div>;
        }
        return (
            <div className="App">
                <h1>Car Supply</h1>
                <h2>Car</h2>
                <h2>Add Cars</h2>
                Const in Wei: <input type="text" name="cost" value={this.state.cost} onChange={this.handleInputChange} />
                Car Identifier: <input type="text" name="carName" value={this.state.carName} onChange={this.handleInputChange} />
                <button type="button" onClick={this.handleSubmit}>Create new Car</button>
            </div>
        )
    }
}

export default AddCarToBlockChain;