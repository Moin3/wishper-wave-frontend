import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import App from "../App";
import NotFound from "../pages/NotFound";


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
              path: "/*",
              element: <NotFound />,
          },
        
  ]);

export default router