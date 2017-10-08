const fakeAuth = {
  userToken: null,
  isAuthenticated() {
    return !!this.userToken;
  },
  authenticate(cb) {
    this.userToken = 'fjdsfjshdgfjshfj'
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.userToken = null
    setTimeout(cb, 100)
  }
}

export default fakeAuth;
