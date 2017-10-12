import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import auth from './auth';
import api from './api';
import Navbar from './Navbar';

class Protected extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null
    };

    this.onStarClick = this.onStarClick.bind(this);
    this.fetchFilms = this.fetchFilms.bind(this);
  }

  componentDidMount() {
    this.fetchFilms();
  }

  fetchFilms() {
    api.getFilms().then((results) => {
      this.setState({
        results: results.data
      });
    });
  }

  onStarClick(nextValue, prevValue, name) {
    if (prevValue == null) {
      api.postRates(name, nextValue);
    }
    else if (prevValue != nextValue) {
      api.putRates(name, nextValue);
    }
  }

  render() {
    const results = this.state.results || [];
    return (<div>
      <Navbar />
      <div className="table">
        { results.map(item =>
          <div key={item.id}>
            <div className="table-row">
              <span>
                {item.title}
              </span>
              <span>
                {item.released_at}
              </span>
              <span>
                {item.director_name}
              </span>
              <div>
                <StarRatingComponent
                    name={String(item.id)}
                    starCount={5}
                    value={item.rate}
                    onStarClick={this.onStarClick}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>);
  }
}

export default Protected;
