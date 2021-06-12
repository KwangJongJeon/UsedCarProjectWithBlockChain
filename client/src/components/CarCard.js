import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

const CarCard = (props) => {
    const car = props.car;
    console.log("cars in carCard: " + car)
    const imgSrc = "http://localhost:8082/images/" + car.carImg;
    return (
        <div className="car-Container">
            <img width="400" height="400" src= {imgSrc}  alt=""/>
            <div className="desc">
                <p>{car.brand} - {car.model}</p>
                <p>작성일: {car.updated_date}</p>
                <Link to={`/show-car/${car._id}`}>
                    <h2>{car.title}</h2>
                </Link>
                <p>{car.description}</p>
            </div>
        </div>
    )
};
  

export default CarCard;