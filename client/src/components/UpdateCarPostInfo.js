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
        this.setState({ [e.target.num]: e.target.value });
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
            .put('http://localhost:8082/api/books/' + this.props.match.params.id, data)
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
                                <label htmlFor="title">Title</label>
                                <input
                                    type='text'
                                    placeholder='Title of the book'
                                    name='title'
                                    className='form-control'
                                    value={this.state.title}
                                    onChange={this.onChange}
                                />
                            </div>
                            <br />
                            <div className='form-group'>
                                <label htmlFor="isbn">ISBN</label>
                                <input
                                    type='text'
                                    placeholder='ISBN'
                                    name='isbn'
                                    className='form-control'
                                    value={this.state.isbn}
                                    onChange={this.onChange}
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor="author">Author</label>
                                <input
                                    type='text'
                                    placeholder='Author'
                                    name='author'
                                    className='form-control'
                                    value={this.state.author}
                                    onChange={this.onChange}
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor="description">Description</label>
                                <input
                                    type='text'
                                    placeholder='Describe this book'
                                    name='description'
                                    className='form-control'
                                    value={this.state.description}
                                    onChange={this.onChange}
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor="published_date">Published Date</label>
                                <input
                                    type='date'
                                    placeholder='published_date'
                                    name='published_date'
                                    className='form-control'
                                    value={this.state.published_date}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="publisher">Publisher</label>
                                <input
                                    type='text'
                                    placeholder='Publisher of this Book'
                                    name='publisher'
                                    className='form-control'
                                    value={this.state.publisher}
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