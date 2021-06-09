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

    // brand에 변경이 있을 경우 brand에 맞는 model을 state.model_option에 저장.
    model_Change = (brand) => {
        this.state.model_option = [];
        if (brand === 'hyundai') {
            this.state.model_option.push(
                { value: "그랜저", label: "그랜저" },
                { value: "쏘나타", label: "쏘나타" }, 
                { value: "스타렉스", label: "스타렉스" }, 
                { value: "포터", label: "포터" }, 
                { value: "아반떼", label: "아반떼" }, 
                { value: "싼타페", label: "싼타페" }, 
                { value: "제네시스", label: "제네시스" }, 
                { value: "투싼", label: "투싼" }, 
                { value: "에쿠스", label: "에쿠스" });
        }
        else if(brand === 'genesis') {
            this.state.model_option.push(
                { value: "G80", label: "G80" },
                { value: "EQ900", label: "EQ900" }, 
                { value: "G70", label: "G70" }, 
                { value: "G90", label: "G90" }, 
                { value: "GV80", label: "GV80" }, 
                { value: "GV70", label: "GV70" });
        }
        else if(brand === 'kia') {
            this.state.model_option.push(
                { value: "카니발", label: "카니발" },
                { value: "모닝", label: "모닝" }, 
                { value: "K3", label: "K3" }, 
                { value: "K5", label: "K5" }, 
                { value: "K7", label: "K7" }, 
                { value: "K9", label: "K9" }, 
                { value: "봉고", label: "봉고" }, 
                { value: "토렌토", label: "토렌토" }, 
                { value: "스포티지", label: "스포티지" });
        }   
        else if(brand === 'gm_korea') {
            this.state.model_option.push(
                { value: "쉐보레 스파크", label: "쉐보레 스파크" },
                { value: "쉐보레 말리부", label: "쉐보레 말리부" }, 
                { value: "쉐보레 크루즈", label: "쉐보레 크루즈" }, 
                { value: "마티즈", label: "마티즈" }, 
                { value: "마세티", label: "마세티" }, 
                { value: "다마스", label: "다마스" }, 
                { value: "제네시스", label: "제네시스" });
        }
        else if(brand === 'renault_samsumg') {
            this.state.model_option.push(
                { value: "SM3", label: "SM3" },
                { value: "SM5", label: "SM5" }, 
                { value: "SM6", label: "SM6" }, 
                { value: "SM7", label: "SM7" }, 
                { value: "QM3", label: "QM3" }, 
                { value: "QM5", label: "QM5" }, 
                { value: "QM6", label: "QM6" });
        }
        else if(brand === 'ssangyong') {
            this.state.model_option.push(
                { value: "코란도", label: "코란도" },
                { value: "티볼리", label: "티볼리" }, 
                { value: "렉스턴", label: "렉스턴" }, 
                { value: "체어맨", label: "체어맨" }, 
                { value: "액티언", label: "액티언" });
        }
        else if(brand === 'benz') {
            this.state.model_option.push(
                { value: "E-클래스", label: "E-클래스" },
                { value: "C-클래스", label: "C-클래스" }, 
                { value: "S-클래스", label: "S-클래스" }, 
                { value: "CLS-클래스", label: "CLS-클래스" }, 
                { value: "GLC-클래스", label: "GLC-클래스" }, 
                { value: "CLA-클래스", label: "CLA-클래스" }, 
                { value: "A-클래스", label: "A-클래스" });
        }
        else if(brand === 'bmw') {
            this.state.model_option.push(
                { value: "1시리즈", label: "1시리즈" },
                { value: "2시리즈", label: "2시리즈" }, 
                { value: "3시리즈", label: "3시리즈" }, 
                { value: "4시리즈", label: "4시리즈" }, 
                { value: "5시리즈", label: "5시리즈" }, 
                { value: "6시리즈", label: "6시리즈" }, 
                { value: "7시리즈", label: "7시리즈" }, 
                { value: "GT", label: "GT" });
        }
        else if(brand === 'audi') {
            this.state.model_option.push(
                { value: "A6", label: "A6" },
                { value: "A4", label: "A4" }, 
                { value: "A7", label: "A7" }, 
                { value: "A8", label: "A8" }, 
                { value: "Q5", label: "Q5" }, 
                { value: "A5", label: "A5" }, 
                { value: "A3", label: "A3" }, 
                { value: "Q7", label: "Q7" }, 
                { value: "Q3", label: "Q3" });
        }
        else if(brand === 'volkswagen') {
            this.state.model_option.push(
                { value: "골프", label: "골프" },
                { value: "티구안", label: "티구안" }, 
                { value: "파사트", label: "파사트" }, 
                { value: "CC", label: "CC" }, 
                { value: "제타", label: "제타" }, 
                { value: "비틀", label: "비틀" });
        }
        else if(brand === 'lexus') {
            this.state.model_option.push(
                { value: "ES", label: "ES" },
                { value: "LS", label: "LS" }, 
                { value: "RX", label: "RX" }, 
                { value: "IS", label: "IS" }, 
                { value: "NX", label: "NX" }, 
                { value: "GS", label: "GS" }, 
                { value: "CT", label: "CT" }, 
                { value: "UX", label: "UX" });
        }
        else if(brand === 'toyota') {
            this.state.model_option.push(
                { value: "캠리", label: "캠리" },
                { value: "프리우스", label: "프리우스" }, 
                { value: "시에나", label: "시에나" }, 
                { value: "RAV 4", label: "RAV 4" }, 
                { value: "86", label: "86" }, 
                { value: "아발론", label: "아발론" });
        }
        else if(brand === 'landrover') {
            this.state.model_option.push(
                { value: "레인지로버 이보크", label: "레인지로버 이보크" },
                { value: "디스커버리", label: "디스커버리" }, 
                { value: "디스커버리 스포츠", label: "디스커버리 스포츠" }, 
                { value: "레인지로버 스포츠", label: "레인지로버 스포츠" }, 
                { value: "레인지로버", label: "레인지로버" }, 
                { value: "레인지로버 벨라", label: "레인지로버 벨라" });
        }
        else if(brand === 'mini') {
            this.state.model_option.push(
                { value: "쿠퍼", label: "쿠퍼" },
                { value: "컨트리맨", label: "컨트리맨" }, 
                { value: "클럽맨", label: "클럽맨" }, 
                { value: "쿠퍼 컨버터블", label: "쿠퍼 컨버터블" }, 
                { value: "쿠페", label: "쿠페" }, 
                { value: "로드스터", label: "로드스터" }, 
                { value: "페이스맨", label: "페이스맨" }, 
                { value: "로버 미니", label: "로버 미니" });
        }
        else if(brand === 'volvo') {
            this.state.model_option.push(
                { value: "S60", label: "S60" },
                { value: "S90", label: "S90" }, 
                { value: "XC60", label: "XC60" }, 
                { value: "XC90", label: "XC90" }, 
                { value: "V40", label: "V40" }, 
                { value: "S80", label: "S80" }, 
                { value: "V60", label: "V60" }, 
                { value: "C30", label: "C30" }, 
                { value: "XC70", label: "XC70" }, 
                { value: "XC40", label: "XC40" });
        }
        else if(brand === 'jaguar') {
            this.state.model_option.push(
                { value: "XF", label: "XF" },
                { value: "XJ", label: "XJ" }, 
                { value: "XE", label: "XE" }, 
                { value: "F-PACE", label: "F-PACE" }, 
                { value: "F-TYPE", label: "F-TYPE" }, 
                { value: "X-TYPE", label: "X-TYPE" }, 
                { value: "E-PACE", label: "E-PACE" }, 
                { value: "S-TYPE", label: "S-TYPE" }, 
                { value: "I-PACE", label: "I-PACE" });
        }
        else if(brand === 'jeep') {
            this.state.model_option.push(
                { value: "체로키", label: "체로키" },
                { value: "랭글러", label: "랭글러" }, 
                { value: "레니게이드", label: "레니게이드" }, 
                { value: "캠패스", label: "캠패스" }, 
                { value: "커맨더", label: "커맨더" }, 
                { value: "글래디에이터", label: "글래디에이터" });
        }
        else if(brand === 'porsche') {
            this.state.model_option.push(
                { value: "카이엔", label: "카이엔" },
                { value: "파니메라", label: "파니메라" }, 
                { value: "911", label: "911" }, 
                { value: "마칸", label: "마칸" }, 
                { value: "박스터", label: "박스터" }, 
                { value: "카이맨", label: "카이맨" }, 
                { value: "타이칸", label: "타이칸" });
        }

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