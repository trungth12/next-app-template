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
          dispatch.auth.tokenSaved(token)
        } catch (err) {
          console.log(inspect(err))
        }
      }),
      logout: effect(async (dispatch, payload, getState) => {
        cookies.remove('token')
        cookies.remove('role')
        dispatch.auth.resetUser()
      }),
      resetUser: (state, payload) => {
        state.currentRole = null
        state.currentUser = null
      },
      tokenSaved: (state, payload) => {
        state.token = payload
      },
      setRole: (state, payload) => {
        cookies.set('role', payload)
        state.currentRole = payload
      }
    }
  }
}

export default defaultReducer
