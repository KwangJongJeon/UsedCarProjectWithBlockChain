import React from 'react';
import '../App.css'

const DeliveryItem = (props) => {
    const car = props.car;
    const link = `/delivery-car/${car._car}`;
    const title = `ID: ${car._car} // Brand: ${car._brand} // Model: ${car._model}`
    return (
        <a href={link} className= "list-group-item list-group-item-action">{title}</a>
    )
}

export default DeliveryItem;