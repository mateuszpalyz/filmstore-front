import React, { Component } from 'react';
import api from './api';
import Navbar from './Navbar';
import StarRatingComponent from './StarRatingComponent';
import SearchFilms from './SearchFilms';

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
    api.getNewestFilms().then((results) => {
      this.setState({
        results: results.data
      });
    });
  }

  onStarClick(nextValue, prevValue, name) {
    if (prevValue == null) {
      api.postRates(name, nextValue);
    }
    else if (prevValue !== nextValue) {
      api.putRates(name, nextValue);
    } else {
      api.deleteRates(name);
    }
  }

  render() {
    const results = this.state.results || [];
    return (<div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div><h2>Newest Films</h2></div>
            { results.map(item =>
              <div key={item.id}>
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">{item.title}</h3>
                  </div>
                  <div className="panel-body" style={{ backgroundImage: `url("${item.image_url}")` }}>
                  </div>
                  <div className="panel-footer">
                    <p>Director: <strong>{item.director_name}</strong></p>
                    <p>Released at: <strong>{item.released_at}</strong></p>
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
              </div>
            )}
          </div>
          <div className="col-md-6">
            <div><h2>Search for films</h2></div>
            <SearchFilms />
          </div>
        </div>
      </div>
    </div>);
  }
}

export default Protected;
