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
                <h3>{car.brand}</h3>
                <h2>
                    <Link to={`/show-car/${car._id}`}>
                        {car.model}
                    </Link>
                </h2>
                <h3>{car.brand}</h3>
                <h3>{car.description}</h3>
            </div>
        </div>
    )
};
  

export default CarCard;