import React, { Component } from 'react'
import * as Icon from 'react-bootstrap-icons';

class Features extends Component {
    render() {
        return (
            <div className="features">
                <div className="container px-4 py-5" id="hanging-icons">
                    <h2 className="pb-2 border-bottom">Features</h2>
                        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">

                            <div className="col d-flex align-items-start">
                                <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                                    <svg className="bi" width="1em" height="1em"><Icon.Coin/></svg>
                                </div>
                                <div>
                                    <h2>신뢰성</h2>
                                    <p>유기적으로 연결된 체인 형태의 블록으로 정보가 저장되어 데이터의 변조가 어려운 신뢰할 수 있는 정보를 제공합니다.</p>
                                </div>
                            </div>


                            <div className="col d-flex align-items-start">
                                <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                                    <svg className="bi" width="1em" height="1em"><Icon.PersonFill/></svg>
                                </div>
                                <div>
                                    <h2>안정성</h2>
                                    <p>중앙 서버 없이 P2P 분산 서버에서 구동되는 시스템으로, 시스템의 공격지점이 분산되어있고, 데이터도 분산되어있으므로 시스템이 안정적으로 구동됩니다.</p>
                                </div>
                            </div>

                            <div className="col d-flex align-items-start">
                                <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                                    <svg className="bi" width="1em" height="1em"><Icon.ShieldLockFill/></svg>
                                </div>
                                <div>
                                    <h2>보안성</h2>
                                    <p>데이터를 변조할 수 없는 보안성을 가지고 있으며, 시스템이 분산 서버의 특징을 가지기에 높은 수준의 시스템 보안성을 제공합니다.</p>
                                    <a href="#" className="btn btn-primary">
                                        Primary button
                                    </a>
                                </div>
                            </div>
                        </div>
                </div>s
            </div>
        )
    }
}

export default Features;