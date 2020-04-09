import React, { Component } from 'react'

class Landing extends Component {
  render() {
    return (
     
<div className="Landing">
<div className="main-content">
  <div className="header">
    <img src="instagram_logo.png" />
  </div>
  <input type="text" placeholder="Username"/>
  <input type="password" placeholder="Password" />
  <input type="button" value="Log in" className="btn" />
  <div className="fogot-pass">
    <a className="pass-link" href="#">Forgot password?</a>
  </div>
</div>
<div className="sub-content">
  <div className="signup">
    Don't have an account? <a className="signup-link" href="#">Sign up</a>
  </div>
</div>
</div>
     
    )
  }
}

export default Landing



