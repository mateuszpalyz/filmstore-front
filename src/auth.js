import axios from 'axios';

const auth = {
  userToken: null,
  isAuthenticated() {
    return !!this.userToken;
  },
  authenticate({ email, password, callback }) {
    axios.post('http://localhost:3001/api/login', {
      email,
      password
    })
    .then((response) => {
      this.userToken = response.data.token;
      callback(this.userToken);
    })
    .catch((e) => { console.log(e); });
  },
  signout(callback) {
    this.userToken = null
    callback();
  }
}

export default auth;
