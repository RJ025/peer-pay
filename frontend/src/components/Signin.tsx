
import { ParticlesBg } from "./ParticleBg"
import { NeonGradientCard } from "./ui/neon-gradient-card"
import { Input } from "./ui/input"
import { RainbowButton } from "./ui/rainbow-button"
import { useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  

const Signin = () => {
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")

    const handleClick = async() => {
        try {
            const response = await axios.post(`http://localhost:5000/api/v1/user/signin` , {
                                            username : email ,
                                            password
                                        })
            if (response.status === 200) {
                console.log(response);
                const token = response.data.token;
                localStorage.setItem('token', token);
                toast.success("Login successful!");
            }
        } catch(err : any) {
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        }
        
    }


    return (
        <div className="relative h-[100vh] w-[100vw] overflow-hidden">
            <div className="absolute h-full w-full overflow-hidden">
                <ParticlesBg/>
            </div>
            <div className="absolute top-[20vh] md:top-[] left-[20vw] md:mx-24 lg:mx-96 md:w-96 lg:h-96">
                <NeonGradientCard className="">
                    <div className="flex flex-col gap-5">
                        <span className="text-white text-center">Signup</span>
                        <div>
                            <Input 
                                type="email" 
                                placeholder="Email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <Input 
                                type="password" 
                                placeholder="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                     <RainbowButton className="relative top-4" onClick={() => handleClick()}>
                        Login
                    </RainbowButton>
                    <ToastContainer/>
                </NeonGradientCard>
               
            </div>
        </div>
        
    )
}

export default Signin
