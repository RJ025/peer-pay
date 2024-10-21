import { LandingPageSectionTwo } from "./LandingPageSectionTwo"
import Navbar from "./Navbar"
import BlurIn from "./ui/blur-in"
import FlickeringGrid from "./ui/flickering-grid"
import WordPullUp from "./ui/word-pull-up"


const LandingPage = () => {
    return (
        <div className="relative overflow-hidden w-full h-full">
            <div className="absolute bg-opacity-0 p-2 right-5">
                 <Navbar/>
            </div>
           
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
            <div className="flex flex-col justify-center items-center">
                <div className="absolute  top-28  my-96 h-10 w-screen sm:w-fit lg:w-[50%] sm:right-10 lg:right-10">
                    <LandingPageSectionTwo/>
                </div>
                <div className="absolute  top-48 sm:top-96 my-64 text-white sm:left-10 lg:left-96 lg:w-64">
                    <WordPullUp
                        className="text-3xl font-bold tracking-[-0.02em] text-white dark:text-white md:text-4xl lg:text-6xl md:leading-[5rem]"
                        words="Lightening Fast Payments"
                    />
                </div>
            </div>
            
        </div>

    
    )
}


export default LandingPage