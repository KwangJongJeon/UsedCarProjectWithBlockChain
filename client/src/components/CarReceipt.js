import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import Cookies from 'universal-cookie';

import CarManagerContract from "../contracts/CarManager.json";
import CarContract from "../contracts/Car.json";

import getWeb3 from "../getWeb3";
import axios from 'axios';

const cookies = new Cookies();

class CarReceipt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            carPrice: '',
            carSupplyStatus: '',
            name: '',
            address: cookies.get('login_email'),
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
                loaded: true,
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

    // 외부에서 입력값이 들어올 경우 state 값을 변경(모델 제외)
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async () => {

        const {carPrice, carSupplyStatus} = this.state;
        this.web3.eth.sendTransaction({
            from: this.accounts[0],
            to: this.props.match.params.id,
            value: carPrice
        })
    }


    render() {
        console.log("*************************")
        console.log(this.state.address);
        console.log(this.state.name);
        console.log(this.state.email);
        console.log("*************************")
        return(
                <div className="CarReceipt">
                    <div className="container">
                        <main>
                        <div className="py-5 text-center">
                            <h2>체크아웃</h2>
                            <hr className="my-4"/>
                                <div className="row g-5">
                                    <div className="col-md-5 col-lg-4 order-md-last">
                                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                                            <span className="text-primary">Content</span>
                                            <span className="badge bg-primary rounded-pill">1</span>
                                        </h4>
                                        <ul className="list-group mb-3">
                                            <li className="list-group-item d-flex justify-content-between lh-sm">
                                                <div>
                                                    <h6 className="my-9">가격</h6>
                                                    <small className="text-muted"></small>
                                                </div>
                                                <span className="text-muted">{this.state.carPrice}(Wei)</span>
                                            </li>
                                            
                                            <li className="list-group-item d-flex justify-content-between">
                                                <span>Total(Wei)</span>
                                                <strong>{this.state.carPrice}</strong>
                                            </li>
                                        </ul>

                                        <form className="card p-2">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Promo code"/>
                                                <button type="submit" className="btn btn-secondary">코드 적용</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-7 col-lg-8">

                                        <form className="needs-validation" noValidate>
                                            

                                            
                                            
                                            <hr className="my-4"/>
                                            <button className="w-100 btn btn-primary btn-lg" type="submit" onClick={this.handleSubmit}>차량 구매</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>



                
                    

            )
    }
}

export default CarReceipt;
