import CurvedText from "../../shared/reuse/CurvedText";
import { ReactComponent as AboutText } from "../../assets/images/icons/aboutText.svg";

import { ReactComponent as ShopText } from "../../assets/images/icons/shopText.svg";
import { ReactComponent as LoginText } from "../../assets/images/icons/loginText.svg";
import { ReactComponent as ScrollText } from "../../assets/images/icons/scrollText.svg";
import ButtonCustom from "../../shared/reuse/ButtonCustom";
import { Link } from "react-router-dom";
import Search from "../../shared/reuse/SearchBar";
import HeaderLogo from "./HeaderLogo";
import { useAppSelector } from "../../shared/redux/store";
import { MenuIcon } from "@heroicons/react/solid";

interface Props {
    sideBarstate: boolean;
    handleSidebar: (state: boolean) => void;
  }
  
export default function Home({sideBarstate, handleSidebar}:Props){
    const {productParams} = useAppSelector(state => state.product);
    return(
        <div className="relative">
            {/*<div className="flex items-center absolute inset-0 h-20">
            <div
          className="menuIcon cursor-pointer z-50"
          onClick={(e) => handleSidebar(!sideBarstate)}
        >
          <MenuIcon className="block md:hidden h-8 text-white ml-6" />
        </div>
        <HeaderLogo color="white"/>
            </div>*/}
            
            <div className="bg-hero2 h-screen w-screen bg-center bg-cover bg-no-repeat text-white pt-8">
                <div className="flex flex-col justify-between h-full py-16">
                <div className="hidden md:flex w-full justify-between items-center px-2 md:px-14 h-1/5">

                    {/*<Link to="/about" >
                    <div className="relative h-32">
                        <AboutText className="animate-wobble hover:animate-[none] aboutIcon h-16 hover:h-24"/>
                    </div>
                    </Link>
                    

                    <Link to='/login'>
                    <div className="h-32">
                        <LoginText className="animate-wobbleReverse hover:animate-[none] aboutIcon h-16 hover:h-24"/>
                    </div>
                    </Link>*/}

                    

                </div>


                <div className="flex flex-col w-full justify-center items-center h-full md:h-3/5 whitespace-normal break-words text-center px-2 md:p-0">
                    <h2 className="text-[4rem] font-[Rakkas]">Welcome to the Clan</h2>
                    <h4 className="text-xl mt-4 mb-6"> Purchase your anime clothing and gift items  affordable prices.</h4>

                    <div className="flex items-center w-full md:w-1/2">
                    <Search/>

                    
                    </div>
                    

                </div>

                <div className="hidden md:flex w-full justify-between items-center px-2 md:px-14 h-1/5">
                   {/* <Link to="/shop">
                    <div className="h-32">
                        <ShopText className="animate-wobbleTop hover:animate-[none] shopIcon h-16 hover:h-24"/>
                    </div>
                    </Link>*/}
                    

                    {/*<div className="h-32">
                        <ScrollText className="animate-wobbleTopReverse
                         hover:animate-[none]  h-20 hover:h-24"/>
                    </div>
                */}
                </div>
                </div>

                
               
            </div>
        </div>
    )
}