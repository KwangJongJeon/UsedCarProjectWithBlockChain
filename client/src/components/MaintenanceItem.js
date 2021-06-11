import React from 'react';
import { Link } from 'react-router-dom'
import '../App.css'

const MaintenanceItem = (props) => {
    const car = props.car;
    const link = `/maintenance-car/${car._car}`;
    const title = `ID: ${car._car} // Brand: ${car._brand} // Model: ${car._model}`
    return (
        <a href={link} class="list-group-item list-group-item-action ">{title}</a>
    )
};

export default MaintenanceItem;