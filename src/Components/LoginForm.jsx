import React from 'react'
import {Link} from 'react-router-dom'

function LoginForm() {
  return (
    <form className="login_form mt-4">
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label h4">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label h4">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div className="mb-3 d-flex justify-content-around">
        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
        <Link to='/Regestration' className="btn btn-light">Sign up</Link>
      </div>
    </form>
  )
}

export default LoginForm