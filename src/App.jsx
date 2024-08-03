
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import Auth from './components/auth/Auth'
import { useEffect } from 'react'
import { auth } from './firebase/Firebase'
import { loginUser, setLoading } from './redux/features/userSlice'
import Loader from './components/loader/Loader'
import Layout from './components/pages/layout/Layout'

function App() {

  const dispatch = useDispatch();


  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if(authUser){
        dispatch(loginUser({
          uid: authUser.uid,
          username: authUser.displayName,
          email: authUser.email,
        }));
        dispatch(setLoading(false));
      }else{
        dispatch(setLoading(false));
      }
    })
  }, [dispatch])



  const user = useSelector(state => state.data.user.user)
  const isLoading = useSelector((state) => state.data.user.isLoading);

  return (
    <>
    <div className='overlay'>

      {isLoading ? (<Loader/>) : (<>{user ? (<Layout/>) : (<Auth/>)}</>)}

     </div>

    </>
  )
}

export default App
