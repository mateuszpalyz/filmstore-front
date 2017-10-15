import React, { Component } from 'react';
import StarRatingComponent from './StarRatingComponent';
import api from './api';
import './App.css';

class SearchFilms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: '',
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchFilms = this.setSearchFilms.bind(this);
    this.fetchSearchFilms = this.fetchSearchFilms.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchSearchFilms('');
  }

  setSearchFilms(result) {
    this.setState({ result });
  }

  fetchSearchFilms(searchTerm) {
    api.getFilms(searchTerm)
        .then(result => this.setSearchFilms(result.data))
        .catch(e => e);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event) {
    event.preventDefault();
    const { searchTerm } = this.state;
    this.fetchSearchFilms(searchTerm);
  }

  render() {
    const { searchTerm, result } = this.state;
    const page = (result && result.page) || 0;
    const list = result || [];
    return (
      <div>
        <div>
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        <Table
          list={list}
        />
      </div>
    );
  }
}

const Search = ({ value, onChange, onSubmit, children }) =>
  <form onSubmit={onSubmit}>
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={onChange}
      />
      <span className="input-group-btn">
        <button type="submit" className="btn btn-default">
          {children}
        </button>
      </span>
    </div>
  </form>

const Table = ({ list }) => {
  const onStarClick = (nextValue, prevValue, name) => {
    let correctName = name.split('-').slice(-1)[0]

    if (prevValue == null) {
      api.postRates(correctName, nextValue);
    }
    else if (prevValue !== nextValue) {
      api.putRates(correctName, nextValue);
    } else {
      api.deleteRates(correctName);
    }
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Title</th>
          <th>Director</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        { list.map(item =>
          <tr key={item.id}>
            <td>{item.title}</td>
            <td>{item.director_name}</td>
            <td>
              <StarRatingComponent
                name={`in-search-${String(item.id)}`}
                starCount={5}
                value={item.rate}
                onStarClick={onStarClick}
              />
            </td>
          </tr>
        )}
      </tbody>
    </table>)
}

export default SearchFilms;
