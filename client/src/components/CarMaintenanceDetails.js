import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

import CarContract from "../contracts/Car.json";
import CarManagerContract from "../contracts/CarManager.json";

import getWeb3 from "../getWeb3";

import MaintenanceItem from './MaintenanceItem'

class CarMaintenanceDetails extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        loaded: false,
        car: '',
        mileage: '',
        VINStatus: '',
        tuningStatus: '',
        specialHistory: '',
        changeOfPurpose: '',
        color: ''
    }

    // this.props.match.params.id ==> address
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

            // Set Web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods
            await this.loadCarFromBlockChain();
            
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

    loadCarFromBlockChain = async () => {
        try {
            let carObj = await this.carManager.methods.cars(this.props.match.params.id).call()
            await console.log("---------------------------")
            await console.log(this.car);
            await console.log("---------------------------")
        }
        catch(error) {
            alert(`Failed to load Cars from blockChain`);
            console.error(error);
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        if(!this.check_input()) {
            const { mileage, VINStatus, tuningStatus, changeOfPurpose, specialHistory, color } = this.state;
            let result = await this.car.methods.basicCarInfoCheck(mileage, VINStatus, tuningStatus, specialHistory, changeOfPurpose, color).send({from: this.accounts[0]});
            console.log(result);
            alert("basic check is completed!")
        }
    }

    check_input = () => {
        if (this.state.mileage === '') {
            alert("주행거리를 입력하세요");    
            return false;
        }
        // model이 선택되지 않았을 경우.
        if (this.state.VINStatus === '') {
            alert("차대번호 상태를 입력하세요");
            return false;
        }
        // description이 입력되지 않았을 경우.
        if (this.state.tuningStatus === '') {
            alert("튜닝 상태를 입력하세요");
            return false;
        }
        // price가 입력되지 않았을 경우.
        if (this.state.changeOfPurpose === '') {
            alert("용도 변경 여부를 입력하세요");
            return false;
        }

        if (this.state.color === '') {
            alert("색상을 입력하세요");
            return false;
        }
    }

    render() {
        return (
            <div className="MaintenanceDetail">
                <div className="container col-xxl-10 px-5 py-5">

                    <div className="col-lg-4">
                        <h2>차량 점검 화면</h2>
                        <br/>
                    </div>
                    <hr/>
                    <form>
                        <div className = "mb-3">
                            <label for="mileage" className="form-label">주행 거리</label>
                            <input type="text" className="form-control" name="mileage" id="mileage" placeholder="주행 거리" value={this.state.mileage} onChange={this.handleChange}/>
                        </div>

                        <div className = "mb-3">
                            <label for="VINStatus" className="form-label">차대번호 상태</label>
                            <input type="text" className="form-control" name="VINStatus" id="VINStatus" placeholder="차대번호 상태" value={this.state.VINStatus} onChange={this.handleChange}/>
                        </div>

                        <div className = "mb-3">
                            <label for="tuningStatus" className="form-label">튜닝 상태</label>
                            <input type="text" className="form-control" name="tuningStatus" id="tuningStatus" placeholder="튜닝 상태" value={this.state.tuningStatus} onChange={this.handleChange}/>
                        </div>

                        <div className = "mb-3">
                            <label for="specialHistory" className="form-label">특별 이력</label>
                            <input type="text" className="form-control" name="specialHistory" id="specialHistory" placeholder="특별 이력" value={this.state.specialHistory} onChange={this.handleChange}/>
                        </div>

                        <div className = "mb-3">
                            <label for="changeOfPurpose" className="form-label">용도 변경</label>
                            <input type="text" className="form-control" name="changeOfPurpose" id="changeOfPurpose" placeholder="용도 변경" value={this.state.changeOfPurpose} onChange={this.handleChange}/>
                        </div>

                        <div className = "mb-3">
                            <label for="mileage" className="form-label">색상</label>
                            <input type="text" className="form-control" name="color" id="color" placeholder="색상" value={this.state.color} onChange={this.handleChange}/>
                        </div>
                        <br/>

                        <div className="div-style1">
                            <span className="btn btn-primary" onClick={this.handleSubmit}>점검완료</span>
                        </div> 
                    </form>
                </div>
            </div>
        )
    }
}

export default CarMaintenanceDetails;