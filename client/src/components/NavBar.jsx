import React, { Component } from 'react'
import { Link } from 'react-router-dom';


class NavBar extends Component {
  render() {
    return (
      <header className="p-3 bg-info text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <img alt="Webpage Logo" width="100" height="60" src={process.env.PUBLIC_URL + '/images/Logo.png'}/>
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><a href="/" className="nav-link px-2 text-white">Home</a></li>  
            <li><a href="/buy-car" className="nav-link px-2 text-white">Buy</a></li>
            <li><a href="/sell-car" className="nav-link px-2 text-white">Sell</a></li>
            <li><a href="/add-coin" className="nav-link px-2 text-white">Coin</a></li>
            <li><a href="/search-part" className="nav-link px-2 text-white">Part</a></li>
          </ul>

          <form>
            <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search"/>
          </form>

          <div className ="text-end">
            <Link to = "/login">
              <button type="button" className="btn btn-outline-light me-2">Login</button>
            </Link>
            <Link to = "/sign-up">
              <button type="button" className="btn btn-warning">Sign Up</button>
            </Link>
          </div>
          
          </div>
        </div>
      </header>
    )
  }
}

export default NavBar;

