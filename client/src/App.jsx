import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice'
import InterviewPage from './pages/InterviewPage'
import InterviewReport from './pages/InterviewReport'
import InterviewHistory from './pages/InterviewHistory'
import Pricing from './pages/Pricing'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './utils/firebase'

export const ServerUrl = 'https://interviewiq-xxgb.onrender.com'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        dispatch(setUserData(null))
        return
      }

      try {
        const result = await axios.get(ServerUrl + '/api/user/current-user', { withCredentials: true })
        dispatch(setUserData(result.data))
      } catch (error) {
        if (error.response?.status !== 401 && error.response?.status !== 400) {
          console.log(error)
          dispatch(setUserData(null))
          return
        }

        try {
          const result = await axios.post(
            ServerUrl + '/api/auth/google',
            { name: firebaseUser.displayName, email: firebaseUser.email },
            { withCredentials: true }
          )
          dispatch(setUserData(result.data))
        } catch (loginError) {
          console.log(loginError)
          dispatch(setUserData(null))
        }
      }
    })

    return unsubscribe
  }, [dispatch])

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/interview' element={<InterviewPage />} />
      <Route path='/report/:id' element={<InterviewReport />} />
      <Route path='/history' element={<InterviewHistory />} />
      <Route path='/pricing' element={<Pricing />} />
    </Routes>
  )
}

export default App
