import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

import CarContract from '../contracts/Car.json';
import CarManagerContract from '../contracts/CarManager.json';

import getWeb3 from '../getWeb3';

class DeliveryCarDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            brand: '',
            model: '',
            carNum: '',
            carPrice: '',
            carIndex: '',
            address: '',
            isOwner: '',
        }
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
                CarContract.abi, this.props.match.params.id
            )

            this.listenToDeliveryEvent();

            this.loadCarFromBlockChain();
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
    }

    loadCarFromBlockChain = () => {
        console.log(this.car.methods)
        let carObjMethods = this.car.methods;
        carObjMethods.carIndex().call().then((res, err) => {
            this.setState({
                carIndex: res
            }) 
            this.carManager.methods.cars(this.state.carIndex).call().then((res, err) =>{
                console.log(res);
                this.setState({
                    brand: res._brand,
                    model: res._model,
                    carNum: res._carNum,
                    carPrice: res._carPrice,
                    address: res._car
                })
            })
        })
        
    }

    listenToDeliveryEvent = async () => {
        this.carManager.events.SupplyChainStep().on("data", async (event) => {
            await console.log("**************event****************")
            await console.log(event);
            await console.log(event.returnValues._step);
            await console.log("***********************************")
            

            axios
                .put("http://localhost:8082/api/sellCarPosts/setSupplyStateDelivered/" + event.returnValues._carAddress )
                .then(res => {
                    console.log("res--------------------------")
                    console.log(res);
                    console.log("-----------------------------")
                })
                .catch(err => {
                    console.log("Error on DeliveryEvent in DeliveryCarDetails")
                })
            alert("Car was Delivered!")
            this.props.history.push('/');

        });
      }

    handleSubmit = async () => {
        console.log("----------------------------")
        console.log(this.carManager.methods)
        console.log(this.state.carIndex);
        console.log("----------------------------")
        this.carManager.methods.isOwner().call().then((res, err) => {
            console.log(res);
            console.log(this.state.carIndex);
            this.setState({
                isOwner: res
            })
        })
        

        await this.handleDelivery();
        
    }

    handleDelivery = async() => {
        if(this.state.isOwner) {
            console.log("**----------------------------")

            this.carManager.methods.triggerDelivery(this.state.carIndex).send({
                from: this.accounts[0]
            }).on('receipt', function() {

            })
                
        }
        else {
            await alert ("물건을 판매한 사람만 배송완료를 시킬 수 있습니다.");
        }
    }



    render() {
        console.log(this.props.match.params.id)
        return ( 
            <div className="DeliveryCarDetails">
                <h3 className="text-center">차량 배송 정보</h3>
                <div className="list-group">
                    <ul>
                        <li className="list-group-item list-group-item-action text-center">브랜드 명: {this.state.brand}</li>
                        <li className="list-group-item list-group-item-action text-center">모델 명: {this.state.model}</li>
                        <li className="list-group-item list-group-item-action text-center">차량번호: {this.state.carNum}</li>
                        <li className="list-group-item list-group-item-action text-center">차량 가격: {this.state.carPrice}</li>
                        <li className="list-group-item list-group-item-action text-center">차량 블록체인 주소: {this.state.address}</li>
                    </ul>
                </div>
                <div className="d-flex justify-content-center">
                    <span className="btn btn-primary " onClick={this.handleSubmit}>배송 완료</span>
                </div>
            </div>
        )
    }
}

export default DeliveryCarDetails