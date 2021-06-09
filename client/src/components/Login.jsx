// 로그인 페이지.

import React, { Component } from 'react';

class Login extends Component {

    // 변수의 초기값을 state로 정의.
    state = {
        id: '',
        pass: ''
    }
    // 외부에서 입력값이 들어올 경우 state 값을 변경.
    appChange = (e) => {
        this.setState({
        [e.target.name]: e.target.value
        });
    }
    // 클릭 이벤트.
    appClick = () => {
        // ID가 입력되지 않았을 경우.
        if (this.state.id === '') {
            alert("아이디를 입력하세요");    
            return;
        }
        // Password가 입력되지 않았을 경우.
        if (this.state.pass === '') {
            alert("비밀번호를 입력하세요");    
            return;
        }

        // 여기에 DB랑 연계해서 ID랑 비밀번호 값 일치 여부 확인 함수 추가 예정.
    }

    render() {
        {/* 위에서 정의한 state와 함수를 재정의 */}
        const { id, pass } = this.state;
        const { appChange, appClick } = this;

        return (
            <div className="Login">
                <div className="container col-xxl-10 px-5 py-5">
                    <div className="col-lg-4">
                        
                        <h3>로그인 화면</h3>

                        {/* ID 입력창. */}
                        <div className="div-style1">
                            <h6>ID를 입력해주세요.</h6>
                            <input type="text" className="form-control" placeholder="아이디" name="id" id="id" value={id} onChange={appChange}/>
                        </div>

                        {/* Password 입력창. */}
                        <div className="div-style1">
                            <h6>Password를 입력해주세요.</h6>
                            <input type="password" className="form-control" placeholder="비밀번호" name="pass" id="pass" value={pass} onChange={appChange}/>
                        </div>

                        {/* 로그인 기능 선택 박스. */}
                        <div className="div-style1">
                            <span className="btn btn-primary form-control" onClick={appClick}>회원가입</span>&nbsp;
                        </div>    
                    </div>
                </div>    
            </div>
        )
    }
}

export default Login;