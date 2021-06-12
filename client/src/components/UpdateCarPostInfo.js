import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

class UpdateCarPostInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            brand: '',
            model: '',
            carNum: '',
            carPrice: '',
            title: '',
            description: '',
        }
    }

    componentDidMount = () =>{
        axios
            .get('http://localhost:8082/api/sellCarPosts/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    brand: res.data.brand,
                    model: res.data.model,
                    title: res.data.title,
                    carNum: res.data.carNum,
                    carPrice: res.data.carPrice,
                    description: res.data.description
                })
            })
            .catch(err => {
                console.log("Error from UpdateCarInfo");
            })
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const data = {
            brand: this.state.brand,
            model: this.state.model,
            carNum: this.state.carNum,
            carPrice: this.state.carPrice,
            title: this.state.title,
            description: this.state.description
        };

        axios
            .put('http://localhost:8082/api/sellCarPosts/' + this.props.match.params.id, data)
            .then(res => {
                this.props.history.push('/show-car/' + this.props.match.params.id);
            })
            .catch(err => {
                console.log("Error in UpdatedCarInfo!");
            })
    }

    render() {
        return (
            <div className="UpdateCarPostInfo">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <br/>
                            <a href="/buy-car" className="btn btn-outline-warning float-left">
                                차량 판매 리스트 보기
                            </a>
                        </div>
                        <div className="col-md-8 m-auto">
                            <h1 className="col-md-8 m-auto">게시글 수정</h1>
                            <p className="lead text-center">
                                차량 정보
                            </p>
                        </div>
                    </div>

                    <div className="col-md-8 m-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className='form-group'>
                                <label htmlFor="title">제목</label>
                                <input
                                    type='text'
                                    placeholder='게시글 제목'
                                    name='title'
                                    className='form-control'
                                    value={this.state.title}
                                    onChange={this.onChange}
                                />
                            </div>
                            <br />
                            <div className='form-group'>
                                <label htmlFor="isbn">내용</label>
                                <input
                                    type='text'
                                    placeholder='내용'
                                    name='description'
                                    className='form-control'
                                    value={this.state.description}
                                    onChange={this.onChange}
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor="carPrice">가격</label>
                                <input
                                    type='text'
                                    placeholder='가격'
                                    name='carPrice'
                                    className='form-control'
                                    value={this.state.carPrice}
                                    onChange={this.onChange}
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor="brand">브랜드</label>
                                <input
                                    type='text'
                                    placeholder='차량번호'
                                    name='brand'
                                    className='form-control'
                                    value={this.state.brand}
                                    onChange={this.onChange}
                                    readOnly
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor="model">모델</label>
                                <input
                                    type='text'
                                    placeholder='모델'
                                    name='model'
                                    className='form-control'
                                    value={this.state.model}
                                    onChange={this.onChange}
                                    readOnly
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="carNum">차량번호</label>
                                <input
                                    type='text'
                                    placeholder='carNum'
                                    name='carNum'
                                    className='form-control'
                                    value={this.state.carNum}
                                    onChange={this.onChange}
                                />
                            </div>

                            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Book</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateCarPostInfo;