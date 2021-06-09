import React, { Component } from "react";
import Select from 'react-select';
import { Link } from 'react-router-dom';

import CarContract from "../contracts/Car.json";
import CarManagerContract from "../contracts/CarManager.json";

import getWeb3 from "../getWeb3";

import '../App.css';
import Sell from "./Sell.jsx"

class AddCarToBlockChainProto extends Component {
    state = {
        loaded: false, cost: 0, carName: "example_1",
        brand: '',
        model: '',
        car_num: '',
        description: '',
        price: '',
        model_option:[]
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
        {/* 위에서 정의한 state와 함수를 재정의 */}
        const { brand, car_num, description, price, model_option } = this.state;
        const { appChange, appChangeModel, appClick } = this;

        return (
            <div className="Sell">
                <div className="container col-xxl-10 px-5 py-5">
                    <div className="col-lg-4">
                        
                        <h3>차량판매 화면</h3>

                        {/* 차량 브랜드 선택창. */}
						<div className="div-style1">
                            <h6>차량 브랜드를 선택해주세요.</h6>
							<select className="form-control" id="brand" name="brand" value={brand} onChange={appChange}>
								<option value="0">차량의 브랜드를 선택해주세요</option>
								<option value="hyndai">현대</option>
								<option value="genesis">제네시스</option>
								<option value="kia">기아</option>
								<option value="gm_korea">한국GM</option>
								<option value="renault_samsumg">르노삼성</option>
								<option value="ssangyong">쌍용</option>
								<option value="benz">벤츠</option>
								<option value="bmw">BMW</option>
								<option value="audi">아우디</option>
								<option value="volkswagen">폭스바겐</option>
								<option value="lexus">렉서스</option>
								<option value="toyota">도요타</option>
								<option value="landrover">랜드로버</option>
								<option value="mini">미니</option>
								<option value="volvo">볼보</option>
								<option value="jaguar">재규어</option>
								<option value="jeep">지프</option>
								<option value="porsche">포르쉐</option>
							</select>
						</div>

                        {/* 차량 모델 선택창. */}
                        <div className="div-style1">
							<h6>차량 모델을 선택해주세요.</h6>
                            <Select className="form-control" id="model" name="model" onChange={appChangeModel} options={model_option}/>
						</div>

                        {/* 차량 번호 입력창. */}
						<div className="div-style1">
                            <h6>차량 번호를 입력해주세요.</h6>
							<input type="text" className="form-control" placeholder="차량 번호" name="car_num" id="car_num" value={car_num} onChange={appChange}/>
                        </div>


                        {/* 차량 설명 입력창. */}
						<div className="div-style1">
                            <h6>차량 설명을 입력해주세요.</h6>
                            <textarea type="text" className="textarea-style" placeholder="차량 설명" 
                             name="description" id="description" value={description} onChange={appChange}/>
                        </div>

						{/* 희망 가격 입력창. */}
						<div className="div-style1">
                            <h6>희망 가격을 입력해주세요.</h6>
							<input type="text" className="form-control" placeholder="희망 가격" name="price" id="price" value={price} onChange={appChange}/>
                        </div>
                        
                        <br/>

                        {/* 로그인 기능 선택 박스. */}
                        <div className="div-style1">
                            <span className="btn btn-primary form-control" onClick={appClick}>판매</span>&nbsp; 
                        </div>          
                    </div>
                </div>    
            </div>
        )
    }
}

export default AddCarToBlockChainProto;