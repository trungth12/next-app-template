import { effect } from 'easy-peasy'; // 👈 import the helper
import axios from 'axios'
import jwt from 'jsonwebtoken'
const defaultReducer = ({cookies}) => {
  const currentUser = jwt.decode(cookies.get('token'))
  const token = cookies.get('token')
  const currentRole = cookies.get('role')    
  const language = cookies.get('language')

  return {
    websocket: {
      status: null,
      setStatus: (state, payload) => {
        state.status = payload
      }
    },
    i18n: {
      supportedLanguages: ["en", "vi"],
      language,
      setLanguage: (state, payload) => {
        cookies.set('language', payload, { path: '/' })
        location.reload()
      }
    },
    error: {
      errorMessage: null,
      setError: (state, payload) => {
        state.errorMessage = payload
      }
    },
    auth: {
      token,
      currentUser,
      currentRole,
      login: effect(async (dispatch, payload, getState) => {
        const {id_token} = payload.tokenObj
        try {
          const resp = await axios.post('/api/login', {id_token})
          const {token} = resp.data
          console.log(`Token: ${token}`)
          //dispatch.auth.tokenSaved(token)
          location.replace('/')
        } catch (err) {
          dispatch.error.setError(err)
        }
      }),
      logout: effect(async (dispatch, payload, getState) => {
        try {
          await axios.post('/api/logout')
          //dispatch.auth.tokenSaved(token)
          location.replace('/')
        } catch (err) {
          dispatch.error.setError(err)
        }
      }),
      setRole: effect(async (dispatch, payload, getState) => {
        try {
          await axios.post('/api/switch_role', {role: payload})
          //dispatch.auth.tokenSaved(token)
          location.replace('/')
        } catch (err) {
          dispatch.error.setError(err)
        }
      })
    }
  }
}

export default defaultReducer
