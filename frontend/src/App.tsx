import { createBrowserRouter, Outlet } from "react-router-dom"
import Signup from "./components/Signup"
import LandingPage from "./components/LandingPage"


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
