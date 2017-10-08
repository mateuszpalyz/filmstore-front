const fakeAuth = {
  isAuthenticated: () => !!this.userToken,
  userToken: null,
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
