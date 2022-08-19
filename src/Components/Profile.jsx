import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {useDropzone} from 'react-dropzone'
import { actionProfileUpsert, actionAuthLogout } from '../store/actions';
import store from '../store/store';
import Avatar from './Avatar';

function Profile({UserInfo:{login, nick, _id, avatar}, visible}) {
    const [Login, setLogin] = useState(login);
    const [Nick, setNick] = useState(nick);
	const [img, setImg] = useState(null);
	const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            setImg(acceptedFiles[0])
        },
    })
  return (
    <div className="modal-dialog ModalWindowProfile">
	<div className="modal-content m-3 ">
	  <div className="modal-header headModal">
		<h5 className="modal-title" id="exampleModalLabel">My Profile</h5>
		<button type="button" className="btn-close" onClick={() => {visible()}}></button>
	  </div>
	
	  <div className="modal-body d-flex flex-column p-3 justify-content-around">
                                <div   {...getRootProps()}>
								<Avatar avatar = {avatar?.url || ''}
                                        localUrl={img && URL.createObjectURL(img)}
                                />

                                <input
                                    {...getInputProps()}
                                    type="file"
                                    name="media"
                                    id="mediaUser"
                                />
								</div>
			<input type="text" className='input-modal' value={Login} onChange={(e) => {setLogin(e.target.value)}}/>
			<input className='input-modal' type="" value={Nick} onChange={(e) => {setNick(e.target.value)}}/>
	  </div>
	  <div className="modal-footer d-flex align-items-start justify-content-between p-3">
	  <button className='btn btn-info w-50 m-auto' onClick={() => {
        store.dispatch(actionProfileUpsert(_id, Login, Nick, img))
        visible()
        }}>Accept</button>
        <Link to='/' className='btn btn-info w-50 m-auto ' onClick={() => {
        store.dispatch(actionAuthLogout())
        visible()
        }}>
        Sign out</Link>
	  </div>
	</div>
	</div>
  )
}
const CProfile = connect(state => ({UserInfo : state.promise.Chats?.payload[0]}))(Profile)
export default CProfile