import { createBrowserRouter, Outlet } from "react-router-dom"
import Signup from "./components/Signup"
import FlickeringGrid from "./components/ui/flickering-grid"
import LandingPage from "./components/LandingPage"


const appRouter = createBrowserRouter([
  {
    path : "/",
    element : <LandingPage/> ,
    children : [
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
