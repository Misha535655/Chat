import {gql} from "./GQL"
const actionPending   = name            => ({type: 'PROMISE', status: 'PENDING', name})
const actionFulfilled = (name, payload) => ({type: 'PROMISE', status: 'FULFILLED', name, payload})
const actionRejected  = (name, error)   => ({type: 'PROMISE', status: 'REJECTED', name, error})

const actionPromise = (name, promise) =>
    async dispatch => {
        dispatch(actionPending(name))
        try{
            let payload = await promise
            dispatch(actionFulfilled(name, payload))
            return payload
        }
        catch(err){
            dispatch(actionRejected(name, err))
        }
    }


    const actionAuthLogin = (token) => 
    (dispatch, getState) => {
        const oldState = getState().auth
        dispatch({type: 'AUTH_LOGIN', token})
        const newState = getState().auth
        if (newState !== oldState){
            localStorage.authToken = token
        }        
    }

const actionAuthLogout = () => 
    (dispatch) => {        
        dispatch({type: 'AUTH_LOGOUT'})
        localStorage.removeItem('authToken')
    }

const actionFullLogin = (login, password) =>
    async (dispatch) => {
        const gqlQuery = `query log($login:String, $password:String){
            login(login:$login, password:$password)
        }`
        const gqlPromise = gql(gqlQuery, {login, password})
        const action     = actionPromise('login', gqlPromise) 
        const result     = await dispatch(action) 
        dispatch(actionAuthLogin(result))
    }

const actionFullReg = (login, password, userName) => 
    async (dispatch) => {
    const gqlMutation = `mutation reg($login:String, $password:String, $userName:String) {
        UserUpsert(user:{
          login:$login, password:$password, nick:$userName
        }){
          _id
        }
      }`
      const gqlPromise = gql(gqlMutation, {login, password, userName})
      const action     = actionPromise('login', gqlPromise) 
      const result     = await dispatch(action) 
      dispatch(actionAuthLogin(result))
}

const actionChats = (id) => 
      dispatch => {
        //const q = `[{\"_id\": \"${id}\"},{\"limit\":[10]}]`
        const q = JSON.stringify([
          {
            _id: id
          }
        ])
        const gqlQuery = `query MyChats($q:String){
            UserFind(query: $q){
              _id login nick avatar{
                url
              } 
              chats{
                _id title
              }
            }
          }`

          const gqlPromise = gql(gqlQuery,{q})
          const action     = actionPromise('Chats', gqlPromise)  
          dispatch(action) 
    }
  


    // const actionFeedGetFirst = (payload) => 
    //   dispatch => {
    //     dispatch({type: 'GET_ITEMS', payload})
    //   }
    //   const actionFeedGetNext = (payload) => 
    //   dispatch => {
    //     dispatch({type: 'GET_SCROLL_ITEMS', payload})
    //   }
    const actionMesseges = (ID) =>
      async dispatch => {
      //"[{\"chat._id\":{\"$in\":[\"62ed6e2b55e76f7ddb1ea93c\"]}},{\"sort\":[{\"_id\":-1}],\"skip\":[20],\"limit\":[20]}]"  
      const q = JSON.stringify([
          {
            "chat._id" : {$in: [ID]} 
          },
          {
          }
        ])
        const gqlQuery = `query Messeges($q:String){
          MessageFind(query: $q){
            _id text createdAt chat{
              _id
              title
            }
            media{
              url
            }
        }
      }`

        const gqlPromise = gql(gqlQuery, {q})
        const action     = actionPromise('MessageInfo', gqlPromise);
        dispatch(action);
    }

// const actionMessegeUpdate = (message, id, media) => 
//       async dispatch => {
//         const gqlMutation = `mutation Messege($message:String, $id:ID, $media:[MediaInput]){
//                  MessageUpsert(message:{
//                 text:$message, chat: {_id:$id} media:$media

//                 }
//                }){
//                 _id
//               }
//             }`
//       const gqlPromise = gql(gqlMutation, {message, id})
//       const action     = actionPromise('Message', gqlPromise) 
//       await dispatch(action);
//     }
const actionMessegeUpdate = (message, chatId, media) => 
      async dispatch => {

        const gqlMutation = `mutation Messege($msg:MessageInput){
                 MessageUpsert(message:$msg){
                _id
              }
            }`
      const gqlPromise = gql(gqlMutation, {msg:{text:message, chat:{_id: chatId}, media}})
      const action     = actionPromise('Message', gqlPromise) 
      await dispatch(action);
    }
    const actionMessegeFile = (message, chatId, file) => 
      async dispatch => {
        const media = [];
        const result = await dispatch(actionUploadFile("media", file))
        media.push({_id :result._id})
        dispatch(actionMessegeUpdate(message, chatId, media))
    }

const actionSearcUsers = (value) =>
      dispatch => {
        //const q = `[{\"$or\":[{\"nick\":\"/${value}/\"}]},{\"limit\":[10]}]`
        const q = JSON.stringify([
          {
            $or: [{nick: `/${value}/`}]
          },
          {
           limit: [10]
          }
        ])
        const gqlQuery = `query Users($q:String){
          UserFind(query: $q){
            _id nick avatar{
              url
            }
            }
          }`
      const gqlPromise = gql(gqlQuery, {q})
      const action     = actionPromise('UsersFind', gqlPromise);
      dispatch(action)
      }
// const actionSearchChat = (value, Id) => 
//       dispatch => {
//         const q = JSON.stringify([
//           {
//             $or: [{nick: `/${value}/`}]
//           },
//           {
//            limit: [10]
//           }
//         ])
//         const gqlQuery = `query Chats($q:String){
//           UserFind(query: $q){
//             chats{
//              _id title
//             }
//             }
//             }
//           `
//           const gqlPromise = gql(gqlQuery, {q})
//           const action     = actionPromise('ChatFind', gqlPromise);
//           dispatch(action)
//       }

  


  
const actionProfileUpsert = (id, login, nick, file) => 
      async dispatch => {
        const avatar = await dispatch(actionUploadFile("media", file))
        const gqlMutation = ` mutation userProfileUpsert($id:ID, $login: String, $nick: String, $avatar:MediaInput){
          UserUpsert(user:{
            _id:$id, login:$login, nick:$nick 
            avatar:$avatar
         }){
            _id 
          }
        }`
const gqlPromise = gql(gqlMutation, {id, login, nick, avatar: {_id: avatar._id}})
const action     = actionPromise('', gqlPromise) 
dispatch(action);
      }

const actionChatOne = (ID) => 
      dispatch => {
        const q = JSON.stringify([
          {
            _id: ID
          },
          {
           limit: [10]
          }
        ])
        const gqlQuery = `query ChatFindOne($q:String){
          ChatFindOne(query: $q){
           _id title
            }
}
          `
const gqlPromise = gql(gqlQuery, {q})
const action     = actionPromise('NowChat', gqlPromise) 
dispatch(action);
      }

 const actionUploadFile = (name, file) => {
    const fd = new FormData()
    fd.append(name, file)
    return actionPromise(
        'uploadFile',
        fetch('http://chat.ed.asmer.org.ua/upload', {
            method: 'POST',
            headers: localStorage.authToken
                ? { Authorization: 'Bearer ' + localStorage.authToken }
                : {},
            body: fd,
        }).then((res) => res.json())
    )
}
// const actionUpdateChatAvatar = (mediaId, chatId) =>
// dispatch => 
//     {actionPromise(
//         'uploadFile',
//         gql(
//             `mutation uploadFile($media: MediaInput) {  
//         MediaUpsert(media: $media) {
//             _id
//             url   
//         }
//     }`,
//             { media: { _id: mediaId, chatAvatars: { _id: chatId } } }
//         )
//     )
    
//   }
  const actionChatAdd = (title, members, file) =>
      async dispatch => {
        // const ava = await dispatch(actionUploadFile('media', file))
        const gqlMutation = gql(` mutation chatUpsert($chat:ChatInput){
             ChatUpsert(chat:$chat){
               _id
             }
           }`,
           { chat: { title, members} }
           )
const action     = actionPromise('NewChat', gqlMutation) 
dispatch(action);
    }
  // const actionChatSetInfo = (name, file, title, members) =>
  //     async dispatch => 
  //     {
  //       const chat = await dispatch(actionChatAdd(title, members))
  //       console.log(chat)
  //       if (file && chat._id) {
  //         const fileObj = await dispatch(actionUploadFile(name, file))
  //         const chatAvatar = await dispatch(
  //             actionUpdateChatAvatar(fileObj?._id, chat._id)
  //         )
  //       }
  //     }
    export { actionMessegeFile, actionFullLogin, actionChatOne, actionAuthLogout, actionPromise, actionFullReg, actionChats,actionMessegeUpdate,actionMesseges, actionSearcUsers,actionChatAdd,actionProfileUpsert}