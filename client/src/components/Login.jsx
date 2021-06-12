import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            provider: '',
        }
    }

    // 회원가입 영역.
    join = () => {
        // 회원가입에 필요한 E-Mail, 이름, 비밀번호를 선언.
        const joinEmail = this.joinEmail.value;
        const joinName = this.joinName.value;
        const joinPw = this.joinPw.value;

        // 회원가입에 필요한 E-Mail과 비밀번호의 규격 설정.
        const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        const regExp2 = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

        // E-Mail을 입력하지 않은 경우.
        if (joinEmail === "" || joinEmail === undefined) {
            alert("이메일 주소를 입력해주세요.");
            this.joinEmail.focus();
            return;
        } 
        // E-Mail의 형식에 맞지 않을 경우.
        else if (joinEmail.match(regExp) === null || joinEmail.match(regExp) === undefined) {
            alert("이메일 형식에 맞게 입력해주세요.");
            this.joinEmail.value = "";
            this.joinEmail.focus();
            return;
        } 
        // 이름을 입력하지 않은 경우.
        else if (joinName === "" || joinName === undefined) {
            alert("이름을 입력해주세요.");
            this.joinName.focus();
            return;
        } 
        // 비밀번호를 입력하지 않은 경우.
            else if (joinPw === "" || joinPw === undefined) {
            alert("비밀번호를 입력해주세요.");
            this.joinPw.focus();
            return;
        } 
        // 비밀번호의 형식에 맞지 않는 경우.
        else if (joinPw.match(regExp2) === null || joinPw.match(regExp2) === undefined) {
            alert("비밀번호를 숫자와 문자, 특수문자 포함 8~16자리로 입력해주세요.");
            this.joinPw.value = "";
            this.joinPw.focus();
            return;
        }

        const send_param = {
            headers,
            email: this.joinEmail.value,
            name: this.joinName.value,
            password: this.joinPw.value
        };
        axios
        .post("http://localhost:8082/api/users/join", send_param)
        //정상 수행
        .then(returnData => {
            if (returnData.data.message) {
                alert(returnData.data.message);
                //이메일 중복 체크
                if (returnData.data.dupYn === "1") {
                    this.joinEmail.value = "";
                    this.joinEmail.focus();
                } 
                else {
                    this.joinEmail.value = "";
                    this.joinName.value = "";
                    this.joinPw.value = "";
                }
            } 
            else {
                alert("회원가입 실패");
            }
        })
        //에러 발생 시.
        .catch(err => {
            console.log(err);
        });
    };

    // 로그인 영역.
    login = () => {
        // 로그인에 필요한 E-Mail과 비밀번호를 선언.
        const loginEmail = this.loginEmail.value;
        const loginPw = this.loginPw.value;

        // E-Mail이 입력되지 않은 경우.
        if (loginEmail === "" || loginEmail === undefined) {
            alert("이메일 주소를 입력해주세요.");
            this.loginEmail.focus();
            return;
        } 
        // 비밀번호가 입력되지 않은 경우.
        else if (loginPw === "" || loginPw === undefined) {
            alert("비밀번호를 입력해주세요.");
            this.loginPw.focus();
            return;
        }

        const send_param = {
            headers,
            email: this.loginEmail.value,
            password: this.loginPw.value
        };
        axios
        .post("http://localhost:8082/api/users/login", send_param)
        //정상 수행
        .then(returnData => {
            if (returnData.data.message) {
                $.cookie("login_id", returnData.data._id, { expires: 1 });
                $.cookie("login_email", returnData.data.email, { expires: 1 });
                alert(returnData.data.message);

                window.location.href = "/";
            } 
            else {
                alert(returnData.data.message);
            }
        })
        //에러 발생 시.
        .catch(err => {
            console.log(err);
        });
    };

    render() {

        const buttonStyle = {
            marginTop: 10
        };

    return (
        <div className="Sign_In">
            <div className="container col-xxl-8 px-0 py-1">
                <div className="col-lg-4">

                    {/* 로그인 Form. */}
                    <Form.Group controlId="loginForm" className="div-style2">
                        {/* E-Mail 입력창. */}
                        <h8>E-Mail</h8>
                        <Form.Control type="email" maxLength="100" ref={ref => (this.loginEmail = ref)} placeholder="E-Mail" />
                        
                        {/* Password 입력창. */}
                        <h8>Password</h8>
                        <Form.Control type="password" maxLength="20" ref={ref => (this.loginPw = ref)} placeholder="Password" />

                        {/* 로그인 버튼. */}
                        <Button style={buttonStyle} onClick={this.login} variant="primary" type="button" block> 로그인 </Button>
                    </Form.Group>

                    {/* 회원가입 Form. */}
                    <Form.Group controlId="joinForm">
                        {/* E-Mail 입력창. */}
                        <h8>E-Mail</h8>
                        <Form.Control type="email" maxLength="100" ref={ref => (this.joinEmail = ref)} placeholder="E-Mail" />
                        
                        {/* Name 입력창. */}
                        <h8>Name</h8>
                        <Form.Control type="text" maxLength="20" ref={ref => (this.joinName = ref)} placeholder="Name" />

                        {/* Password 입력창. */}
                        <h8>Password</h8>
                        <Form.Control type="password" maxLength="64" ref={ref => (this.joinPw = ref)} placeholder="Password" />

                        {/* 회원가입 버튼. */}
                        <Button style={buttonStyle} onClick={this.join} variant="primary" type="button" block > 회원가입 </Button>
                    </Form.Group>
                </div>
            </div>
        </div>
    );
  }
}

export default Login;
