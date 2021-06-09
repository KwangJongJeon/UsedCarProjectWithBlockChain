import React, { Component } from 'react';
import styled from 'styled-components'
import logo from '../images/nav-image.JPG';

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})`
    border: 1px black solid;
`

class Logo extends Component {
    render() {
        return (

                <a className="navbar-item" href = "/">
                    <img src={logo}/>
                </a>


        )
    }
}

export default Logo