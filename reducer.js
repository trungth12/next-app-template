import { effect } from 'easy-peasy'; // 👈 import the helper
import axios from 'axios'
import jwt from 'jsonwebtoken'

import {inspect} from 'util'
const defaultReducer = ({cookies}) => {
  const currentUser = jwt.decode(cookies.get('token'))
  if (currentUser) {
    cookies.set('role', "user")
  }

  const token = cookies.get('token')
  const currentRole = cookies.get('role')
  
  if (!cookies.get('language')) {
    cookies.set('language', 'en')
  }

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
        cookies.set('language', payload)
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
      token,
      currentUser,
      currentRole,
      login: effect(async (dispatch, payload, getState) => {
        const {id_token} = payload.tokenObj
        try {
          const resp = await axios.post('/api/login', {id_token})
          const {token} = resp.data
          console.log(`Token: ${token}`)
          cookies.set('token', token)
          //dispatch.auth.tokenSaved(token)
          location.reload()
        } catch (err) {
          console.log(inspect(err))
        }
      }),
      logout: effect(async (dispatch, payload, getState) => {
        cookies.remove('token')
        cookies.remove('role')
        location.reload()
      }),
      resetUser: (state, payload) => {
        state.currentRole = null
        state.currentUser = null
      },
      setRole: (state, payload) => {
        cookies.set('role', payload)
        state.currentRole = payload
      }
    }
  }
}

export default defaultReducer
