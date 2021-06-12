import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import CarContract from "../contracts/Car.json";

import getWeb3 from "../getWeb3";

class MaintenanceReceipt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            mileage: '',
            VINStatus: '',
            tuningStatus: '',
            specialHistory: '',
            changeOfPurpose: '',
            color: ''
        }
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
                CarContract.abi, this.props.match.params.id
            )

            this.setState({
                loaded: true
            })
            await console.log("this.car-----------------")
            await console.log(this.props.match.params.id)
            this.car.methods.getCarInfo().call().then((res, err) => {
                /*
                    return value by index from getCarInfo() ==>
                        0 : mileage
                        1 : VINStatus
                        2 : tuningStatus;
                        3 : specialHistory
                        4 : changeOfPurpose
                        5 : color
                */
                console.log(res);

                this.setState({
                    mileage: res[0],
                    VINStatus: res[1],
                    tuningStatus: res[2],
                    specialHistory: res[3],
                    changeOfPurpose: res[4],
                    color: res[5],
                })
            })
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

    goBack = () => {
        this.props.history.goBack(); 
    }

    render() {
        let receiptItem = <div>
            <table className="table table-hover table-dark">
                    {/* 
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                    */}
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>주행거리</td>
                            <td>{ this.state.mileage }</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>차대번호 상태</td>
                            <td>{ this.state.VINStatus }</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>튜닝 여부</td>
                            <td>{ this.state.tuningStatus }</td>
                        </tr>
                        <tr>
                            <th scope="row">4</th>
                            <td>특별이력(침수등)</td>
                            <td>{ this.state.specialHistory }</td>
                        </tr>
                        <tr>
                            <th scope="row">5</th>
                            <td>색깔</td>
                            <td>{ this.state.color }</td>
                        </tr>
                    </tbody>
                </table>
        </div>
        return(
            <div className="ShowCarDetails">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 m-auto">
                            <br/><br/>
                            <Link onClick={this.goBack} className="btn btn-outline-warning float-left">
                                돌아가기
                            </Link>
                        </div>
                        <br />
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">정비 내역</h1>
                            <hr/><br/><br/>
                        </div>
                    </div>
                    <div>
                        { receiptItem }
                    </div>
                    {
                        /* <br />
                        <button type="button" class="btn btn-outline-info btn-lg btn-block">Edit Book</button>
                        <button type="button" class="btn btn-outline-danger btn-lg btn-block">Delete Book</button> 
                    */}

                </div>
            </div>
        )
    }
}


export default MaintenanceReceipt;
