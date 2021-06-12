import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

import MaintenanceReceipt from './MaintenanceReceipt';

class ShowCarDetails extends Component {

    state = {
        car: ''
    }

    componentDidMount = async() => {

        // get request to server
        axios
            .get('http://localhost:8082/api/sellCarPosts/' + this.props.match.params.id)
            .then(res => {
                console.log("res-------------------")
                console.log(res);
                this.setState({
                    car: res.data
                })
            })
            .catch(err => {
                console.log("Error from ShowCarDetails");
            })
    };

    onDeleteClick(id) {
        axios  
            .delete('http://localhost:8082/api/sellCarPosts/' + id)
            .then(res => {
                this.props.history.push("/");
            })
            .catch(err => {
                console.log("Error from ShowCarDetails_deleteClick")
            })
    };

    render() {
        const car = this.state.car;
        console.log("contract car: ");
        const imgSrc = "http://localhost:8082/images/" + car.carImg
        let carItem = <div>
        <table className="table table-hover table-dark">
                {/* 
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                */}
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>브랜드</td>
                        <td>{ car.brand }</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>모델</td>
                        <td>{ car.model }</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>차량번호</td>
                        <td>{ car.carNum }</td>
                    </tr>
                    <tr>
                        <th scope="row">4</th>
                        <td>차량가격</td>
                        <td>{ car.carPrice }</td>
                    </tr>
                    <tr>
                        <th scope="row">5</th>
                        <td>제목</td>
                        <td>{ car.title }</td>
                    </tr>
                    <tr>
                        <th scope="row">6</th>
                        <td>설명</td>
                        <td>{ car.description }</td>
                    </tr>
                </tbody>
            </table>
        </div>

        return (
            <div className="ShowCarDetails">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 m-auto">
                            <br/><br/>
                            <Link to="/buy-car" className="btn btn-outline-warning float-left">
                                Show Car List
                            </Link>
                        </div>
                        <br />
                        <div className="col-md-8 m-auto">
                            <img className="rounded mx-auto d-block" width="400" height="400" src={imgSrc} alt=""/>
                            <br/><br/>
                            <h1 className="display-4 text-center">{ car.title }</h1>
                            <p className="lead text-center">
                                { car.description  }
                            </p>
                            <hr /><br />
                        </div>
                    </div>
                    <div>
                        { carItem }
                    </div>


                    <div className="row">
                        <div className="col-md-6">
                            <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClick.bind(this,car._id)}>게시글 삭제</button><br />
                        </div>

                        <div className="col-md-6">
                            <Link to={`/edit-car/${car._id}`} className="btn btn-outline-info btn-lg btn-block">
                                게시글 수정
                            </Link> 
                            <br />
                        </div>

                        <div className="col-md-6">
                            <a className="btn btn-outline-secondary btn-lg btn-block" href={`/show-car/maintenance-receipt/${car.blockChainAddress}`}>정비 내역 보기</a>
                        </div>
                    </div>
                    {
                        /* <br />
                        <button type="button" class="btn btn-outline-info btn-lg btn-block">Edit Book</button>
                        <button type="button" class="btn btn-outline-danger btn-lg btn-block">Delete Book</button> 
                    */}

                </div>
            </div>
        )
    }
}

export default ShowCarDetails;