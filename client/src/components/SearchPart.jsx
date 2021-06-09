// 부품 검색 페이지.

import React, { Component } from 'react';

class SearchPart extends Component {
    
    // 변수의 초기값을 state로 정의.
    state = {
        part_Name: '',
    }
    // 외부에서 입력값이 들어올 경우 state 값을 변경.
    appChange = (e) => {
        this.setState({
        [e.target.name]: e.target.value
        });
    }
    // 클릭 이벤트.
    appClick = () => {
        // part_Name이 입력되지 않았을 경우.
        if (this.state.part_Name === '') {
            alert("부품명을 입력하세요.");    
            return;
        }
    }

    render() {

        {/* 위에서 정의한 state와 함수를 재정의 */}
        const { part } = this.state;
        const { appChange, appClick } = this;

        return (
            <div className="Part">
                <div className="container col-xxl-10 px-5 py-5">
                    <div className="col-lg-4">
                    
                        <h3>부품 검색 화면</h3>

                        <div className="div-style1">
                            <h6>검색하실 부품의 이름을 입력해주세요.</h6>
                            <input type="text" className="form-control" name="part" placeholder="검색할 부품명" value={part} onChange={appChange} />
                        </div>

                        <div className="div-style1">
                            <button className="btn btn-primary form-control" onClick={appClick}>부품 검색</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchPart;