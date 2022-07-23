import React from 'react'
import avatar from '../image/avatar.jpg'
function Chats() {
  return (
    <div className="card mb-3">
  <div className="row g-0">
    <div className="col-md-4">
      <img src={avatar} className="img-fluid rounded-circle m-2" alt="..."/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>
  )
}

export default Chats