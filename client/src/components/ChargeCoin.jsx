// 코인 충전 페이지.

import React, { Component } from 'react';

class ChargeCoin extends Component {
    
    // coin의 수량을 state값 으로 정의.
    state = {
        coin: '',
    }
    // coin의 수량을 input 창에 입력한 개수로 변경. ==> onChange
    appChange = (e) => {
        this.setState({
        [e.target.name]: e.target.value
        });
    }
    // 클릭 이벤트. ==> onClick
    appClick = () => {
        alert(this.state.id);

        // 여기에 입력 코인 개수만큼 실제 코인 충전 기능 추가 예정.
    }

    render() {

        {/* 위에서 정의한 state와 함수를 재정의 */}
        const { coin } = this.state;
        const { appChange, appClick } = this;

        return (
            <div className="Coin">
                <div className="container col-xxl-10 px-5 py-5">
                    <div className="col-lg-4">
                    
                        <h3>코인 충전 화면</h3>

                        <div className="div-style1">
                            <h6>충전하실 코인의 수량을 입력해주세요.</h6>
                            <input type="text" className="form-control" name="coin" placeholder="충전 코인 수량" value={coin} onChange={appChange} />
                        </div>

                        <div className="div-style1">
                            <button className="btn btn-primary form-control" onClick={appClick}>코인 충전</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChargeCoin;