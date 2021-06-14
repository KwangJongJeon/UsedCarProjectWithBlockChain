import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PartCard from './PartCard';

class SearchPart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      parts: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/parts')
      .then(res => {
        this.setState({
          parts: res.data
        })
      })
      .catch(err =>{
        console.log('Error from Show Part List');
      })
  };


  render() {
    const parts = this.state.parts;
    console.log("Print Part: " + parts);
    let partList;

    if(!parts) {
      partList = "there is no part recored!";
    } else {
      partList = parts.map((part, k) =>
        <PartCard part={ part } key={k} />
      );
    }

    return (
      <div className="ShowPartList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Parts List</h2>
            </div>

            <div className="col-md-11">
              <Link to="/create-part" className="btn btn-outline-warning float-right">
                + Add New Part
              </Link>
              <br />
              <br />
              <hr />
            </div>

          </div>

          <div className="list">
                { partList }
          </div>
        </div>
      </div>
    );
  }
}

export default SearchPart;