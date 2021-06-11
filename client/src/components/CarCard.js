import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

const CarCard = (props) => {
    const car = props.car;
    console.log("cars in carCard: " + car)

    return (
        <div className="car-Container">
            <img src= "https://commapress.co.uk/books/the-book-of-cairo/cairo-provisional-v3/image%2Fspan3" alt=""/>
            <div className="desc">
                <h3>{car._brand}</h3>
                <h2>
                    <Link to={`/show-car/${car._index}`}>
                        {car._model}
                    </Link>
                </h2>
                <h3>{car._brand}</h3>
                <h3>{car._carPrice}</h3>
            </div>
        </div>
    )
};

export default CarCard;