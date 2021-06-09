// 회원가입 페이지.

import React, { Component } from 'react';

class SignUp extends Component {

    // 변수의 초기값을 state로 정의.
    state = {
        id: '',
        pass: '',
        pass_confirm: '',
        name: '',
        phone: '',
        email: ''
    }
    // 외부에서 입력값이 들어올 경우 state 값을 변경.
    appChange = (e) => {
        this.setState({
        [e.target.name]: e.target.value
        });
    }
    // 클릭 이벤트. ==> onClick
    appClick = () => {
        // 미입력 값 확인 함수 호출.
        this.check_input();


        // 여기에 DB랑 연계해서 중복된 ID 값 확인 여부 함수 추가 예정.
    }

    // 미입력 값 확인 함수.
    check_input = () => {
        // ID가 입력되지 않았을 경우.
        if (this.state.id === '') {
            alert("아이디를 입력하세요");
            return;
        }
        // Pass가 입력되지 않았을 경우.
        if (this.state.pass === '') {
            alert("비밀번호를 입력하세요");
            return;
        }
        // pass_confirm이 입력되지 않았을 경우.
        if (this.state.pass_confirm === '') {
            alert("비밀번호 확인을 입력하세요");
            return;
        }
        // name이 입력되지 않았을 경우.
        if (this.state.name === '') {
            alert("이름을 입력하세요");
            return;
        }
        // phone이 입력되지 않았을 경우.
        if (this.state.phone === '') {
            alert("전화번호를 입력하세요");
            return;
        }
        // email이 입력되지 않았을 경우.
        if (this.state.email === '') {
            alert("이메일을 입력하세요");
            return;
        }
    }

    // 초기화 함수. 뭔가 오류남. 수정 예정.
    reset_form = ()  => {
        this.state({id:'', pass:''});
        return;
    }

    render() {
        {/* 위에서 정의한 state와 함수를 재정의 */}
        const { id, pass, pass_confirm, name, phone, email } = this.state;
        const { appChange, appClick, reset_form } = this;

        return (
            <div className="Sign_In">
                <div className="container col-xxl-8 px-0 py-1">
                    <div className="col-lg-4">
                        
                        <h3>회원가입 화면</h3>

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
                        
                        {/* Password 재입력창. */}
                        <div className="div-style1">
                            <h6>Password를 다시 입력해주세요.</h6>
                            <input type="password" className="form-control" placeholder="비밀번호 확인" name="pass_confirm" id="pass_confirm" value={pass_confirm} onChange={appChange}/>
                        </div>
                        
                        {/* 이름 입력창. */}
                        <div className="div-style1">
                            <h6>이름을 입력해주세요.</h6>
                            <input type="text" className="form-control" placeholder="이름" name="name" id="name" value={name} onChange={appChange}/>
                        </div>
                        
                        {/* 전화번호 입력창. */}
                        <div className="div-style1">
                            <h6>전화번호를 입력해주세요.</h6>
                            <input type="tel" className="form-control" placeholder="전화번호" name="phone" id="phone" value={phone} onChange={appChange}/>
                        </div>	
                        
                        {/* E-Mail 입력창. */}
                        <div className="div-style1">
                            <h6>E-Mail을 입력해주세요.</h6>
                            <input type="email" className="form-control" placeholder="이메일" name="email" id="email" value={email} onChange={appChange}/>
                        </div>

                        {/* 회원가입 및 초기화 선택 박스. */}
                        <div className="div-style1">
                            <span className="btn btn-primary form-control" onClick={appClick}>회원가입</span>&nbsp;
                            <span className="btn btn-primary form-control" onClick={reset_form}>초기화</span>                    
                        </div>
                    </div>
                </div>
            </div>     
        )
    }
}

export default SignUp;