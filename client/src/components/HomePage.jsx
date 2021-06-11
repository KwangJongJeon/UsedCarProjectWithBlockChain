import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Features from './Features';

class HomePage extends Component {
    render() {
        return (
            <div className="HomePage">
                <div className="container col-xxl-8 px-4 py-5">
                    <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                        <div className="col-10 col-sm-8 col-lg-6">
                            <img className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" src={process.env.PUBLIC_URL + '/images/home_benz_image.jpg'}/>
                        </div>
                        <div className="col-lg-6">
                            <h1 className="display-5 fw-bold lh-1 mb-3">신뢰성 있는</h1>
                            <h1 className="display-5 fw-bold lh-1 mb-3">중고차 거래 시스템</h1>
                            <p className="lead">블록체인을 사용하여</p>
                            <p className="lead">신뢰할 수 있고 안전하고 편리한 </p>
                            <p className="lead">중고차 거래 시스템.</p>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                <a href="/buy-car" className="btn btn-primary btn-lg px-4 me-md-2" role="button" > 차량 구매</a>
                                <a href="/sell-car" className="btn btn-lg btn-outline-secondary btn-lg px-4" role="button"> 차량 판매 </a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Features/>
            </div>
        )
    
        
    }
}

export default HomePage;