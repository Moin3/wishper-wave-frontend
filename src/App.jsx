import ChattingPage from './pages/ChattingPage';
import { useContext } from 'react';
import { AccountContext } from './context/AccountProvider';
// import SignIn from './pages/SignIn';
import { redirect,useNavigate  } from "react-router-dom";
function App() {
  // const navigate = useNavigate()
  // const { account } = useContext(AccountContext)
  // if (!account) {
  //   return navigate("/signup");
  // }

  return (
    <>
      {/* {account ? <ChattingPage /> :  navigate("/signin")} */}
      <ChattingPage /> 
    </>
  )
}

export default App;
