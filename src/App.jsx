import { useEffect } from 'react';
import { userAuth } from './context/AccountProvider';
import ChattingPage from './pages/ChattingPage';
import {useNavigate} from 'react-router-dom'

function App() {
  const {token,user}=userAuth()
  const navigate=useNavigate()


  useEffect(()=>{
    if(!token || !user){
      navigate('/signin')
    }
  },[token,user,navigate])

  return (
    <>
      <ChattingPage /> 
    </>
  )
}

export default App;
