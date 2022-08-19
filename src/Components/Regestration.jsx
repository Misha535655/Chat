import React, {useState} from 'react'
import { connect } from 'react-redux';
import { actionFullReg } from '../store/actions';
const CRegestration = connect(null, {onReg: actionFullReg})(Regestration)
function Regestration({onReg}) {
  const [Login, setLogin] = useState('');
  const [Password, setPassword] = useState('');
  const [NickName, setNickName] = useState('');
  return (
    <div className="m-4 d-flex flex-column align-items-center p-3">
  <div className="col-md-4 p-3">
    <label htmlFor="validationDefaultUsername" className="form-label h6">Username</label>
    <div className="input-group">
      <span className="input-group-text" id="inputGroupPrepend2">@</span>
      <input
         type="text" 
         className="form-control" 
         id="validationDefaultUsername"  
         aria-describedby="inputGroupPrepend2"
          value={NickName}
          onChange={ e => setNickName(e.target.value)} required/>
    </div>
  </div>
  <div className="col-md-4 p-3">
    <label htmlFor="validationDefault06" className="form-label h6" >Phone Number</label>
    <input 
          className="form-control" 
          id="validationDefault06" 
          value={Login}
          onChange={ e => setLogin(e.target.value)} required/>
  </div>
  <div className="col-md-4 p-3">
    <label htmlFor="validationDefault06" className="form-label h6">Password</label>
    <input type="password" 
            className="form-control" 
            id="validationDefault06" 
            value={Password}
          onChange={ e => setPassword(e.target.value)}
          required/>
          
  </div>
  <div className="col-md-4 p-3">
    <button className="btn btn-primary" onClick={(e) => {
      if(Login, Password, NickName){
        onReg(Login, Password, NickName)
      }
    }} >Submit form</button>
  </div>
</div>
  )
}

export default CRegestration