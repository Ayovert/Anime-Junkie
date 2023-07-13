import { useLocation } from "react-router-dom";

interface Props {
    sideBarstate: boolean;
  }

export default function Hamburger({sideBarstate}:Props){

    const location = useLocation();

    const navs = ['/', '/register', '/login']

    const home = navs.includes(location.pathname) ;
    return(
    
        <div className={`cursor-pointer ml-auto px-4 fixed top-8 left-4`}>
            {[1,2,3].map((_, index)=> {

                return(
                    <div key={index} className={`bar w-6 h-1 my-1 mx-auto transition-all duration-300 ease-in-out ${home ? 'bg-white' : 'bg-[#101010] '} hover:bg-slate-400
                    ${sideBarstate ? "!bg-black" :""}
                    ${sideBarstate && index === 1 ? "opacity-0" : ""}
                    ${sideBarstate && index === 0 ? "translate-y-2 rotate-45" : ""}
                    ${sideBarstate && index === 2 ? "-translate-y-2 -rotate-45" : ""}
                    `}></div>  
                )
                
            })}
          
        </div> 
        
    )
}