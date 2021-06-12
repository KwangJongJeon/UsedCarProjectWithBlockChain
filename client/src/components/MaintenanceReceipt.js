import React, { Component } from 'react';
import '../App.css';

import CarContract from "../contracts/Car.json";

import getWeb3 from "../getWeb3";

class MaintenanceReceipt extends Component {
    state = {
        loaded: false,
        mileage: '',
        VINStatus: '',
        tuningStatus: '',
        specialHistory: '',
        changeOfPurpose: '',
        color: ''
    }

    componentDidMount = async () => {
        try {
            // get network provider and web3 instance
            this.web3 = await getWeb3();
            // Use web3 to get the user's accounts
            this.accounts = await this.web3.eth.getAccounts();

            // Get the contract instance
            this.networkId = await this.web3.eth.net.getId();

            this.car = new this.web3.eth.Contract(
                CarContract.abi, this.props.blockChainAddress
            )

            this.setState({
                loaded: true
            })
            await console.log("this.car-----------------")
            let carObj = await this.car.methods.getCarInfo().call()
            
            await console.log("----------------------")
        }
        catch(error) {
            // Catch any errors for any of the above opertations
            alert(
                `Failed to load web3, accounts, or contract. check Console for details`
            );

            console.error();
        }
    }

    render() {
        
        return(<h1>Hello</h1>)
    }
}


export default MaintenanceReceipt;
