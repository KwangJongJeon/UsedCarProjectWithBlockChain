import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css';

const PartCard = (props) => {
    const part = props.part;

    return (
        <div className="part-container">
            <div className="desc">
                <h2>
                    <Link to={`/show-part/${part._id}`}>
                        { part.name }
                    </Link>
                </h2>
                <h3>{part.type}</h3>
                <p>{part.description}</p>
            </div>
        </div>
    )
};

export default PartCard;