import { Link } from "react-router-dom"
import { RainbowButton } from "./ui/rainbow-button"


const Navbar = () => {
  return (
    <div className="h-10">
        <Link to={'/signup'}>
         <RainbowButton>Login</RainbowButton>
        </Link>
    </div>
  )
}

export default Navbar