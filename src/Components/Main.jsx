import React, {useState} from 'react'
import { CMenu, CChat, CAddChatModal} from './'
import store from '../store/store'
import { Provider } from 'react-redux'
function Main() {
	const [VisibleChatModal, setVisibleChatModal] = useState(false);
	const visibleeModal = () => setVisibleChatModal(!VisibleChatModal)
  return (
		<div className="container-fluid h-100">
			<div className="row justify-content-center h-100">
			<Provider store={store}>
				<CMenu visible={VisibleChatModal} visibleFunc={visibleeModal}/>
				<CChat/>
				{VisibleChatModal && <CAddChatModal close={visibleeModal}/>}
			</Provider>

			</div>
		</div>
	
  )
}

export default Main