import { effect } from 'easy-peasy'; // 👈 import the helper
import axios from 'axios'
const dev = process.env.NODE_ENV !== 'production'
const apiUrl = dev ? 'http://localhost:3001' : `https://api.${process.env.DOMAIN}`
const defaultReducer = ({
  language,
  token,
  currentUser,
  currentRole,
}) => {
  
  return {
    config: {
      timeout: 2000,
    },
    theme: {
      primaryColor: '#1DA57A'
    },
    layouts: {      
      loading: false,
      inlineCollapsed: true,
      toggleCollapsed: (state, payload) => {
        state.inlineCollapsed = payload
      },
      setLoading: (state, payload) => {
        state.loading = payload
      }
    },
    websocket: {
      status: 'Disconnected',
      setStatus: (state, payload) => {
        state.status = payload
      }
    },
    i18n: {
      supportedLanguages: ["en", "vi"],
      language,
      setLanguage: effect(async (dispatch, payload, getState) => {
        const timeout = getState().config.timeout
        dispatch.layouts.setLoading(true)
        setTimeout(async () => {
          try {
            await axios.post(`${apiUrl}/set_language`, {language: payload}, {
              //AxiosRequestConfig parameter
              withCredentials: true //correct
            })
            //dispatch.auth.tokenSaved(token)
            location.replace('/')
          } catch (err) {          
            dispatch.error.setError(err.toString())
            dispatch.layouts.setLoading(false)
          }
        }, timeout)
        
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
        const timeout = getState().config.timeout
        const {id_token} = payload.tokenObj
        try {
          dispatch.layouts.setLoading(true)
          
          await axios.post(`${apiUrl}/login`, {id_token}, {
            //AxiosRequestConfig parameter
            withCredentials: true //correct
          })
          setTimeout(() => {
            //dispatch.auth.tokenSaved(token)
            location.replace('/')          
          }, timeout)
          
        } catch (err) {
          dispatch.layouts.setLoading(false)
          dispatch.error.setError(err.toString())
        }
      }),
      logout: effect(async (dispatch, payload, getState) => {
        const timeout = getState().config.timeout
        try {
          dispatch.layouts.setLoading(true)
          
          await axios.post(`${apiUrl}/logout`, {}, {
            //AxiosRequestConfig parameter
            withCredentials: true //correct
          })
          setTimeout(() => {
            //dispatch.auth.tokenSaved(token)
            location.replace('/')
          }, timeout)
        } catch (err) {
          dispatch.layouts.setLoading(false)
          dispatch.error.setError(err.toString())
        }
      }),
      setRole: effect(async (dispatch, payload, getState) => {
        const timeout = getState().config.timeout
        try {
          dispatch.layouts.setLoading(true)
          
          await axios.post(`${apiUrl}/set_role`, {role: payload}, {
            //AxiosRequestConfig parameter
            withCredentials: true //correct
          })
          setTimeout(async () => {
            //dispatch.auth.tokenSaved(token)
            location.replace('/')
          }, timeout)
        } catch (err) {
          dispatch.layouts.setLoading(false)
          dispatch.error.setError(err.toString())
        }
      })
    },
    test: {
      data: 'Hello World 1',
      changeText: (state, payload) => {
        state.data = 'Leuleu'
      }
    }
  }
}

export default defaultReducer
