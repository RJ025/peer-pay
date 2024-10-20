import { LandingPageSectionTwo } from "./LandingPageSectionTwo"
import { AnimatedList } from "./ui/animated-list"
import BlurIn from "./ui/blur-in"
import FlickeringGrid from "./ui/flickering-grid"


const LandingPage = () => {
    return (
        <div className="relative overflow-hidden">
            <div className="bg-stone-900">
                <FlickeringGrid />
            </div>
            <div className="flex flex-col justify-center items-center">
                 <div className="absolute top-40 left-16 sm:left-60 lg:left-96 lg:ml-96 transform -translate-x-1/2 mt-4 sm:mt-6 md:mt-20 lg:mt-10 xl:mt-12">
                    <BlurIn
                        word="Peer-Pay"
                        className="text-6xl sm:text-6xl md:text-9xl lg:text-9xl xl:text-9xl font-bold text-black dark:text-white"
                    />
                </div>
                <div className="absolute text-white top-60 sm:top-80  left-12 sm:left-80 lg:left-96 lg:ml-96  mt-4 sm:mt-6 md:mt-20 lg:mt-10 xl:mt-12 sm:text-xl md:text-2xl ">
                    Connecting Payments, Connecting People
                </div>
            </div>
            <div className="absolute top-20 bg-opacity-0 bg-red-500 h-screen w-fit">
                <LandingPageSectionTwo/>
            </div>
            
           
        </div>

    
    )
}


export default LandingPage