import React, { Component } from "react";
import logo from './../../assets/grubhub-1177056.png';
import {connect} from 'react-redux';
import {customerActions} from './../../js/actions/index';
import './style.css';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            search: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleSearch = (e) => {
        e.preventDefault();
        const payload = {
            search: this.state.search
        }
        this.props.getSearchResults(payload);
    }

  render() {
    return(
        <div className="container p-3 search_form">
        <img src={logo} className="rounded mx-auto d-block signinlogo" alt="Logo"></img>
        <br></br>
        <form onSubmit={e => this.handleSearch(e)}>
          <div className="form-group">
          <input
            className="form-control mr-sm-2"
            id = 'search'
            type="text"
            placeholder="Search"
            aria-label="Search"
            onChange={this.handleChange}
          />
          </div>
          <button type="submit" className="btn btn-outline-dark">
            Search
          </button>
        </form>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch, ownProps) => ({
    getSearchResults: payload => dispatch(customerActions.getSearchResults(payload, ownProps))
});
export default connect(null, mapDispatchToProps)(Search);
