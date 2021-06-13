import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class NavBar extends Component {

  logout = () => {
    axios
      .post("http://localhost:8082/api/users/logout", headers)
      .then(returnData => {
        if (returnData.data.message) {
          $.removeCookie("login_id");
          alert("로그아웃 되었습니다.");
          window.location.href = "/";
        }
      });
  };

  LoginCheck = () => {
    alert('로그인 후 다시 시도해주세요.');
  }

  render() {
    return (
      <header className="p-3 bg-info text-white">
        <div className="container">

            {$.cookie("login_id") ? 
              <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                  <img alt="Webpage Logo" width="100" height="60" src={process.env.PUBLIC_URL + '/images/Logo.png'}/>
                </a>
                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                  <li><a href="/" className="nav-link px-2 text-white">Home</a></li>  
                  <li><a href="/buy-car" className="nav-link px-2 text-white">구매</a></li>
                  <li><a href="/sell-car" className="nav-link px-2 text-white">판매</a></li>
                  <li><a href="/maintenance-car" className="nav-link px-2 text-white">정비</a></li>
                  <li><a href="/delivery-car" className="nav-link px-2 text-white">차량배달</a></li>
                  <li><a href="/search-part" className="nav-link px-2 text-white">부품검색</a></li>
                </ul>
                  <button type="button" className="btn btn-warning aaa" onClick={this.logout}>로그아웃</button>
              </div>
              :
              <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                  <img alt="Webpage Logo" width="100" height="60" src={process.env.PUBLIC_URL + '/images/Logo.png'}/>
                </a>
                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                  <li><a href="/" className="nav-link px-2 text-white">Home</a></li>  
                  <li onClick={this.LoginCheck} className="nav-link px-2 text-white">구매</li>
                  <li onClick={this.LoginCheck} className="nav-link px-2 text-white">판매</li>
                  <li onClick={this.LoginCheck} className="nav-link px-2 text-white">정비</li>
                  <li onClick={this.LoginCheck} className="nav-link px-2 text-white">배달</li>
                  <li onClick={this.LoginCheck} className="nav-link px-2 text-white">부품검색</li>
                </ul>
                <Link to = "/login">
                  <button type="button" className="btn btn-warning aaa"> 로그인/회원가입 </button>
                </Link>
              </div>
            }
        </div>
      </header>
    )
  }
}

export default NavBar;

