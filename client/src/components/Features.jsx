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
                                    <h2>안전성</h2>
                                    <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                                </div>
                            </div>


                            <div className="col d-flex align-items-start">
                                <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                                    <svg className="bi" width="1em" height="1em"><Icon.PersonFill/></svg>
                                </div>
                                <div>
                                    <h2>전문성</h2>
                                    <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                                </div>
                            </div>

                            <div className="col d-flex align-items-start">
                                <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                                    <svg className="bi" width="1em" height="1em"><Icon.ShieldLockFill/></svg>
                                </div>
                                <div>
                                    <h2>보안성</h2>
                                    <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
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