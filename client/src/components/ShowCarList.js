import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CarCard from './CarCard';

class ShowCarList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: []
        };
    }

    componentDidMount() {
        axios
            .get(('http://localhost:8082/api/sellCarPosts'))
            .then(res => {
                this.setState({
                    cars: res.data
                })
            })
            .catch(err => {
                console.log('Error from ShowCarList');
                console.error(err);
            })
    };

    render() {
        const cars = this.state.cars;
        console.log("PrintCar: " + cars);
        let carList;

        if(!cars) {
            carList = "there is no car recorded!";
        }
        else {
            console.log("cars: ",cars)
            carList = cars.map((car, k) => 
                <CarCard car={car} key={k} />
            );
        }

        return (
            <div className="ShowCarList">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <br/>
                            <h2 className="display-4 text-center">Cars List</h2>
                        </div>

                        <div className="col-md-11">
                            <a href="/sell-car" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">
                                + 차량 판매
                            </a>
                        </div>

                        <br/>
                        <br/>
                        <br/>
                    </div>
                </div>

                <div className="list">
                    {carList}
                </div>
            </div>
        );
    }
}

export default ShowCarList;