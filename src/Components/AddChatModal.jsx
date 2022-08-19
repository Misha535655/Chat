import React, {useState, useEffect} from 'react'
import { actionSearcUsers,actionChatAdd } from "../store/actions";
import {useDropzone} from 'react-dropzone'
import { connect } from 'react-redux';
import Avatar from './Avatar';
import store from '../store/store';

const AddChatModal = ({close, userFind, Users, onConfirm}) => {
	const [search, setSearch] = useState('');
    const [Name, setName] = useState('');
    const [User, setUser] = useState([]);
	const [UserID, setUserID] = useState([]);
	const [img, setImg] = useState(null);
	const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            setImg(acceptedFiles[0])
        },
    })

	return(<div className="modal-dialog ModalWindow">
	<div className="modal-content m-3">
	  <div className="modal-header headModal">
		<h5 className="modal-title" id="exampleModalLabel">Create Chat</h5>
		<button type="button" className="btn-close" onClick={() => close()}></button>
	  </div>
	
	  <div className="modal-body d-flex justify-content-between p-4">
		<div className="avatar">
		<div   {...getRootProps()}>
								<Avatar avatar={''}
                                        localUrl={img && URL.createObjectURL(img)}
                                />

                                <input
                                    {...getInputProps()}
                                    type="file"
                                    name="media"
                                    id="mediaUser"
                                />
								</div>
		</div>
		<div className="name d-flex">
			<label>Name:</label>
			<input className='input-modal' value={Name} type="" onChange={(e) => setName(e.target.value)}/>
		</div>
	  </div>
	  <div className="modal-footer d-flex align-items-start justify-content-between p-3">
		<h2 className='w-100 text-center'>Adding users</h2>
		<div className="in-chat w-50 p-3">
			<h5 className='text-center'>Now in Chat</h5>
			<ul className='user_list p-0'>
				{User !== [] ? User.map((item) => <li className='d-flex w-100 justify-content-between p-3'>
				<img src={item.avatar !== null ? item.avatar?.url : "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"} className="rounded-circle user_img_msg"/>
					<p>{item.nick}</p>
					<button className='btn btn-info' onClick={() => {
						debugger
							setUser(User.filter((p) => p !== item)) 
							setUserID(UserID.filter((p) => p == !item._id)) 
					}}>-</button>
				</li>) : ''}
			</ul>
		</div>
		<div className="add-users w-50 d-flex flex-column p-3">
			<input type="text" className='input-modal' value={search} onChange={(e) => {
                setSearch(e.target.value);
                store.dispatch(actionSearcUsers(search))
			}}/>
			<ul className='user_list p-0' id='Scroll'>
                {Users && Users.map((item) => <li className='d-flex justify-content-between w-100 p-3'>
				<img src={item.avatar !== null ? item.avatar.url : "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"} className="rounded-circle user_img_msg"/>
					<p>{item.nick}</p>
					<button className='btn btn-info' onClick={(e) => {
                         if(!User.find(itemId => item._id === itemId._id)){
							setUser([...User, item])
							setUserID([...UserID, {_id : item._id}])
						 } 
                    }}>+</button>
				</li>)}
			</ul>
		</div>
	  </div>
	  <button className='btn btn-info w-50 m-auto' onClick={() => {close(); onConfirm(Name, UserID)}}>Accept</button>
	</div>
	</div>)
}
const CAddChatModal = connect(state=>({Users: state.promise.UsersFind?.payload}), {onConfirm: actionChatAdd})(AddChatModal)

export default CAddChatModal