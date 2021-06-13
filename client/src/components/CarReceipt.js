import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom'

import CarManagerContract from "../contracts/CarManager.json";
import CarContract from "../contracts/Car.json";

import getWeb3 from "../getWeb3";
import axios from 'axios';

class CarReceipt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            carPrice: '',
            carSupplyStatus: ''
        }
    }

    componentDidMount = async () => {
        try {
            // get network provider and web3 instance
            this.web3 = await getWeb3();

            // Use web3 to get the user's accounts
            this.accounts = await this.web3.eth.getAccounts();

            // Get the Contract instance
            this.networkId = await this.web3.eth.net.getId();

            this.carManager = new this.web3.eth.Contract(
                CarManagerContract.abi,
                CarManagerContract.networks[this.networkId] && CarManagerContract.networks[this.networkId].address
            );

            this.car = new this.web3.eth.Contract(
                CarContract.abi, this.props.match.params.id
            )

            this.listenToPaymentEvent();
            this.setState({
                loaded: true
            })
            await console.log("-------------------")
            await this.car.methods.priceInWei().call().then((res, err) => {
                this.setState({
                    carPrice: res
                })
            });
            await console.log("-------------------")

        }
        catch(error) {
            alert(
                `Failed to load web3, accounts, or contract. check Console for details`
            );
            console.error();
        }
    };

    listenToPaymentEvent = async () => {
        console.log(this.car);
        this.carManager.events.SupplyChainStep().on("data", async (event) => {
            console.log("---------------------------");
            console.log(event);
            console.log(event.returnValues._step);
            console.log("car in event function: ");
            console.log(this.car);

            if(event.returnValues._step === "1") {
                axios
                    .put("http://localhost:8082/api/sellCarPosts/setSupplyStateToPaid/" + event.returnValues._carAddress)
                    .then(res => {
                        console.log("res--------------------------")
                        console.log(res);
                        console.log("-----------------------------")
                    })
                    .catch(err => {
                        console.log("Error on handleSubmit in CarReceipt ")
                    })
                alert("Car was paid, delivery now!");
            }
            else {
                alert("Error on Payment event!")
            }
            
            this.props.history.push('/');        
        })
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async () => {
        const {carPrice, carSupplyStatus} = this.state;
        this.web3.eth.sendTransaction({
            from: this.accounts[0],
            to: this.props.match.params.id,
            value: carPrice
        })
        
        console.log("CarPrice-----------------")
        console.log(carPrice)
        console.log("CarPrice-----------------")
    }


    render() {
        return(
                <div className="CarReceipt">
                    <h1>차량 구매 확인</h1>
                    <p className="lead">
                        차량 가격: {this.state.carPrice}
                    </p>
                    <br/>
                    <br/>
                    <div className="div-style1">
                        <span className="btn btn-primary form-control" onClick={this.handleSubmit}>차량 구매</span>&nbsp; 
                    </div> 
                </div>
            )
    }
}

export default CarReceipt;
