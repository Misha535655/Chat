import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {actionFullLogin} from '../store/actions'
import { connect } from 'react-redux'
const CLoginForm = connect(null, {onLogin: actionFullLogin})(LoginForm)
function LoginForm({onLogin}) {
  const [Login, setLogin] = useState('');
  const [Password, setPassword] = useState('');
  return (
    <div className="login_form mt-4">
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label h4">
        Phone Number
        </label>
        <input
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={Login}
          onChange={ e => setLogin(e.target.value)}
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
          value={Password}  
          onChange={ e => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-3 d-flex justify-content-around">
        
          <Link to='/Menu' className="btn btn-primary" onClick={() => onLogin(Login, Password)}>Sign in</Link>
        
        <Link to='/Regestration' className="btn btn-light">Sign up</Link>
      </div>
    </div>
  )
}

export default CLoginForm