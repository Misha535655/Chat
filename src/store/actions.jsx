import gql from "./GQL"
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
    const gqlMutation = `mutation reg{
        UserUpsert(user:{
          login:$login, password:$password, nick:$userName
        }){
          _id
        }
      }`
      const gqlPromise = gql(gqlMutation, {login, password, userName})
      const action     = actionPromise('login', gqlPromise); 
      const result     = await dispatch(action);
      dispatch(actionAuthLogin(result))
      
}

    export {actionFullLogin, actionAuthLogout, actionPromise, actionFullReg}