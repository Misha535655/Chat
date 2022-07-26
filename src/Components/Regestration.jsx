import React, {useState} from 'react'
import { connect } from 'react-redux';
const CRegestration = connect(null, {onLogin: actionFullLogin})(Regestration)
function Regestration() {
  const [Login, setLogin] = useState('');
  const [Password, setPassword] = useState('');
  return (
    <div className="row g-3 m-4">
  <div className="col-md-4">
    <label htmlFor="validationDefault01" className="form-label h6">First name</label>
    <input type="text" className="form-control" id="validationDefault01" required/>
  </div>
  <div className="col-md-4">
    <label htmlFor="validationDefault02" className="form-label h6">Last name</label>
    <input type="text" className="form-control" id="validationDefault02" required/>
  </div>
  <div className="col-md-4">
    <label htmlFor="validationDefaultUsername" className="form-label h6">Username</label>
    <div className="input-group">
      <span className="input-group-text" id="inputGroupPrepend2">@</span>
      <input type="text" className="form-control" id="validationDefaultUsername"  aria-describedby="inputGroupPrepend2" required/>
    </div>
  </div>
  <div className="col-md-6">
    <label htmlFor="validationDefault03" className="form-label h6">City</label>
    <input type="text" className="form-control" id="validationDefault03" required/>
  </div>
  <div className="col-md-3">
    <label htmlFor="validationDefault06" className="form-label h6">State</label>
    <select className="form-select" id="validationDefault06" required>
      <option>Male</option>
      <option>Female</option>
    </select>
  </div>
  <div className="col-md-3">
    <label htmlFor="validationDefault06" className="form-label h6" >Phone Number</label>
    <input type="number" 
          className="form-control" 
          id="validationDefault06" 
          value={Login}
          onChange={ e => setLogin(e.target.value)} required/>
  </div>
  <div className="col-md-3">
    <label htmlFor="validationDefault06" className="form-label h6">Password</label>
    <input type="number" 
            className="form-control" 
            id="validationDefault06" 
            value={Password}
          onChange={ e => setPassword(e.target.value)}/>
  </div>
  <div className="col-12">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id="invalidCheck2" required/>
      <label className="form-check-label" htmlFor="invalidCheck2">
        Agree to terms and conditions
      </label>
    </div>
  </div>
  <div className="col-12">
    <button className="btn btn-primary" >Submit form</button>
  </div>
</div>
  )
}

export default CRegestration