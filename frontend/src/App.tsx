import { createBrowserRouter, Outlet } from "react-router-dom"
import Signup from "./components/Signup"
import LandingPage from "./components/LandingPage"
import Signin from "./components/Signin"
import Dashboard from "./components/Dashboard"


const appRouter = createBrowserRouter([
  {
    path : "/",
    element : <App/> ,
    children : [
      {
        path : "/",
        element : <LandingPage/>
      },
      {
        path : '/signup',
        element : <Signup/>
      },
      {
        path : '/signin',
        element : <Signin/>
      }, 
      {
        path : '/dashboard',
        element : <Dashboard/>
      }
    ]
  } 
])

function App() {

  return (
    <>
      <Outlet/>
    </>
  )
}

export default appRouter
