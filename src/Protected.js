import React, { Component } from 'react';
import auth from './auth';
import api from './api';
import Navbar from './Navbar';

class Protected extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null
    };
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
            </div>
          </div>
        )}
      </div>
    </div>);
  }
}

export default Protected;
