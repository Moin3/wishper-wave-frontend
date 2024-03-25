import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import App from "../App";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import IntroPage from "../pages/IntroPage";


const router = createBrowserRouter([
   
            {
                path: "/",
                element: <App/>,
              },
              {
                  path: "/signup",
                  element: <SignUp />,
              },
              {
                path: "/signin",
                element: <SignIn />,
            },
            {
              path: "/profile",
              element: <Profile/>,
            },
            {
              path: "/intro",
              element: <IntroPage/>,
            },
            {
            path: "/*",
            element: <NotFound />,
            },
        
  ]);

export default router