import React, {useState, useEffect, useRef} from 'react'
import {FaTelegramPlane} from 'react-icons/fa'
import {AiOutlinePaperClip} from 'react-icons/ai'
import {CDropZone} from './';
import { actionMesseges, actionMessegeUpdate, } from '../store/actions';
import { connect } from 'react-redux';
import store from '../store/store';

store.subscribe(() => console.log(store.getState()))

const MessegeRender = ({message:{text, createdAt, media}, UserInfo }) => {
const date = new Date(+createdAt);
let DayWeek = '';
switch (+date.getDay()) {
    case 0:
        DayWeek = "Mon"
        break;
    case 1:
        DayWeek = "Tue"
        break;        
    case 2:
        DayWeek = "Wed"
        break;
    case 3:
        DayWeek = "Thu"
        break;
    case 4:
        DayWeek = "Fri"
        break;
    case 5:
        DayWeek = "Sat"
        break;
    case 6:
        DayWeek = "San"
        break;        

    default:
        break;
}
return(<div className="d-flex justify-content-start mb-4">
    <div className="img_cont_msg">
        <img src={UserInfo.avatar.url ? `http://chat.ed.asmer.org.ua/${UserInfo.avatar.url}`:"https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"} className="rounded-circle user_img_msg"/>
    </div>
    <div className="msg_cotainer d-flex flex-column">
    <span className='font-weight-light p-1'>{UserInfo.nick}</span>
        {media && media.map((item) => <img className='w-50 p-2' src={`http://chat.ed.asmer.org.ua/${item.url}`}/>)}
        <span className='text p-3'>{text}</span>
        <span className="msg_time">{`${DayWeek} ${date.getHours()} : ${date.getMinutes()}`}</span>
    </div>
</div>)
}

const CChat = connect(state => ({
    message:state.promise.MessageInfo?.payload, 
    Chat: state.promise.NowChat?.payload,
    User: state.promise.Chats?.payload[0]
}), {onSend: actionMessegeUpdate})(Chat)
 export function Chat({onSend, message, Chat, User}) {
    setTimeout(() =>{
        const el = document.querySelector('#ScrollContainer')
        el.scrollTop = el.scrollHeight - el.clientHeight
        console.log(el.scrollTop)
    }, 1)
    const divRef = useRef(null)
    const [Messege, setMessege] = useState('');
	const [Modal, setModal] = useState(false);
    // const [msgsBlock, setMsgsBlock] = useState(0)
	const modalVisible = () => setModal(!Modal)
    // useEffect(() => {
    //     getMsgs(chatId, msgsBlock, msgsCount)
    // }, [msgsBlock])
  return (				
    <div className="col-md-8 col-xl-6 chat">
    <div className="card">
        <div className="card-header msg_head">
            <div className="d-flex bd-highlight">
                <div className="img_cont">
                    <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img"/>
                    <span className="online_icon"></span>
                </div>
                <div className="user_info">
                    <span>{Chat && Chat.title}</span>
                    <p> {message && message.length} Messages</p>
                </div>
            </div>
        </div>
        <div className="card-body msg_card_body" ref={divRef} id='ScrollContainer' onScroll={(e) => {
                            if (
                               e.target.scrollTop === 0
                            ) {
                               console.log(e)
                            }
                        }}>
        {message && message.map((item) => <MessegeRender key={item._id} message={item} UserInfo={User}/>)}
        </div>
        <div className="card-footer">
            <div className="input-group">
             
                <textarea name="" value={Messege} onChange={(e) => setMessege(e.target.value)} className="form-control type_msg" placeholder="Type your message..."></textarea>
                <div className="input-group-append" >
                    <div className="input-group-append" onClick={() => modalVisible()}>
                    <span className="input-group-text send_btn"><AiOutlinePaperClip/></span>
                    </div>
                    <span className="input-group-text send_btn" onClick={ () => {
                    if(Messege){
                    onSend(Messege, Chat._id);
                    setMessege('')
                    }
                }}><FaTelegramPlane/></span>
                </div>
            </div>
        </div>
        {Modal && <CDropZone visible={modalVisible}/>}
    </div>
</div>
  )
}

export default CChat