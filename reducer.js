import { effect } from 'easy-peasy'; // 👈 import the helper
import axios from 'axios'
import {inspect} from 'util'
const defaultReducer = ({cookies}) => {
  return {
    websocket: {
      status: null,
      setStatus: (state, payload) => {
        state.status = payload
      }
    },
    i18n: {
      language: 'en',
      setLanguage: (state, payload) => {
        state.language = payload
      }
    },
    error: {
      errorMessage: null,
      setError: (state, payload) => {
        state.errorMessage = payload
      }
    },
    auth: {
      token: cookies.get('token'),
      login: effect(async (dispatch, payload, getState) => {
        const {id_token} = payload.tokenObj
        try {
          const resp = await axios.post('/api/login', {id_token})
          const {token} = resp.data
          console.log(`Token: ${token}`)
          cookies.set('token', token)
          dispatch.auth.tokenSaved(token)
        } catch (err) {
          console.log(inspect(err))
        }
      }),
      logout: effect(async (dispatch, payload, getState) => {
        console.log('logging out')
        cookies.remove('token')
        dispatch.auth.tokenSaved(null)
      }),
      tokenSaved: (state, payload) => {
        state.token = payload
      },
    }
  }
}

export default defaultReducer
