import { effect } from 'easy-peasy'; // 👈 import the helper
import axios from 'axios'
import jwt from 'jsonwebtoken'
const dev = process.env.NODE_ENV !== 'production'
const apiUrl = dev ? 'http://localhost:3001' : `https://api.${process.env.DOMAIN}`
const defaultReducer = ({cookies}) => {
  const currentUser = cookies ? 
    jwt.decode(cookies.token) : null
  const token =  cookies ? cookies.token : null
  const currentRole = cookies ?  cookies.role : null
  const language = cookies && cookies.language ? cookies.language : 'en'

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
      setLanguage: effect(async (dispatch, payload, getState) => {
        try {
          await axios.post(`${apiUrl}/set_language`, {language: payload}, {
            //AxiosRequestConfig parameter
            withCredentials: true //correct
          })
          //dispatch.auth.tokenSaved(token)
          location.replace('/')
        } catch (err) {
          dispatch.error.setError(err)
        }
      })
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
          const resp = await axios.post(`${apiUrl}/login`, {id_token}, {
            //AxiosRequestConfig parameter
            withCredentials: true //correct
          })
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
          await axios.post(`${apiUrl}/logout`, {}, {
            //AxiosRequestConfig parameter
            withCredentials: true //correct
          })
          //dispatch.auth.tokenSaved(token)
          setTimeout(() => {
            location.replace('/')
          }, 3000)
          
        } catch (err) {
          dispatch.error.setError(err)
        }
      }),
      setRole: effect(async (dispatch, payload, getState) => {
        try {
          await axios.post(`${apiUrl}/set_role`, {role: payload}, {
            //AxiosRequestConfig parameter
            withCredentials: true //correct
          })
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
