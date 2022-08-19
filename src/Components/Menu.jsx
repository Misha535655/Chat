import React, {useEffect, useState} from 'react'
import CProfile from './Profile'
import {FaSearch} from 'react-icons/fa'
import { connect } from 'react-redux'
import { actionChats, actionMesseges, actionChatOne} from '../store/actions'
import socket from './socket'
import store from '../store/store'

const ChatsList = ({chats: {_id, title}}) => <li className="active" onClick={e => {
	store.dispatch(actionChatOne(_id))
	store.dispatch(actionMesseges(_id))}}>
<div className="d-flex bd-highlight">
	<div onClick={() => {}} className="img_cont">
		<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img"/>
		<span className="online_icon"></span>
	</div>
	<div className="user_info">
		<span>{title}</span>
	</div>
</div>
</li>  


socket.on('jwt_ok',   data => store.dispatch(actionChats(data.sub.id)))
const MenuChat = ({chats, status, visibleFunc}) =>  {
		const [Visible, setVisible] = useState(false);
		const [Search, setSearch] = useState('');
		const Profilevisible = () => setVisible(!Visible)
				return (<div className="col-md-4 col-xl-4 chat"><div className="card mb-sm-3 mb-md-0 contacts_card">
								<div className="card-header">
									<div className="input-group">
										<input type="text" placeholder="Search..." value={Search} onChange={(e) => {
											setSearch(e.target.value)
										}} className="form-control search"/>
										<button className='btn btn-info' onClick={() => Profilevisible()}> profile </button>
									</div>
								</div>
								<div className="card-body contacts_body ">
									<ul className="contacts overflow-auto">
									{chats && chats.map((item) => <ChatsList key={item._id} chats={item}/>
										)}
									</ul>
								</div>
								<div className="card-footer d-flex justify-content-center">
									<button className='btn btn-info add_chat' onClick={() => visibleFunc()}>Add Chat</button>
								</div>
							</div>
						{Visible && <CProfile visible={Profilevisible}/>}	
					</div>)
	
}
const CMenu = connect(state => ({chats: state.promise.Chats?.payload[0].chats,
	UserID:state.promise.Chats?.payload[0]._id,
	status: state.promise.Chats?.status}))(MenuChat)

export default CMenu

// onClick={() => visibleFunc()}