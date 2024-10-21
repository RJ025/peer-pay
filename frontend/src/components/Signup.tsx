
import { ParticlesBg } from "./ParticleBg"
import { NeonGradientCard } from "./ui/neon-gradient-card"
import { Input } from "./ui/input"

  

const Signup = () => {

    return (
        <div className="relative  h-full w-full">
            <div className="absolute">
                <ParticlesBg/>
            </div>
            <div className="absolute top-20 left-10">
                <NeonGradientCard className="">
                    <div className="flex flex-col gap-5">
                        <span className="text-white text-center">Signup</span>
                        <div className="">
                            <Input type="email" placeholder="Email" />
                        </div>
                        <div>
                            <Input type="email" placeholder="Email" />
                        </div>
                    </div>
                    
                    
                </NeonGradientCard>
            </div>
        </div>
        
    )
}

export default Signup
