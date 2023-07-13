import { Link } from "react-router-dom";
import { ReactComponent as CloseIcon } from "../../assets/images/icons/closeIcon.svg";
import { useAppSelector } from "../redux/store";
import Hamburger from "./Hamburger";
import { ReactComponent as CartIcon } from "../../assets/images/icons/cartIcon.svg";
import ButtonCustom from "../reuse/ButtonCustom";

interface Props {
  handleSidebar: (state: boolean) => void;
  sidebarState: boolean;
  sideMenuRef: React.MutableRefObject<null>;
}

export default function SideMenu({
  handleSidebar,
  sidebarState,
  sideMenuRef,
}: Props) {

  const {user} = useAppSelector((state) => state.user);
  return (
    <>
    <div className="relative">
    <div
          className="menuIcon cursor-pointer z-30 fixed "
          onClick={(e) => handleSidebar(!sidebarState)}
        >
         { /*<MenuIcon className="h-6" />*/}
          <Hamburger sideBarstate={sidebarState}/>
        </div>
    <div
        className={`SideBar fixed inset-0  h-full transition-all  duration-300 box-border bg-white text-black shadow-md z-20 w-80 ${
          sidebarState ? " visible" : "w-0 invisible"
        } `}
        ref={sideMenuRef}
      >
        <div className={` flex my-3 items-center justify-center w-full z-10  ${
            sidebarState ? "visible" : "w-0 z-0 invisible"
          } `}>
             
          <Link to="/" >

            {/**${
            sidebarState ? "flex" : "hidden"
          } */}
            <div onClick={() => handleSidebar(false)} className="w-full hover:text-slate-400 pl-6 py-4">
              <span className="text-2xl px-2 ">Anime Clans</span>
            </div>
          </Link>{" "}

         {/* <CloseIcon
          fill="white"
          className={`pr-4 float-right cursor-pointer hover:fill-[#fa3b0b]  ${
            sidebarState ? "block" : "hidden"
          }`}
          height={25}
            onClick={(e) => handleSidebar(false)}
        />*/}
          </div>

        <div className={`SideBarMenu overflow-y-auto overflow-x-hidden max-h-screen mt-24 text-2xl w-full
         ${
          sidebarState ? "visible" : "w-0 invisible"
        }
        `}>


<Link to="about">
            <div className="menuItem   text-xl  w-full   ">
            
              <h3 className="my-3 py-6 mx-6 px-3 hover:bg-black hover:text-white hover:w-full hover:mx-0 hover:px-6 border-b-2">
                About Anime Clans
              </h3>
            
            </div>
            </Link>


            <Link to="shop">
            <div className="menuItem  text-xl">
            
              <h3 className="my-3 py-6 mx-6 px-3 hover:bg-black hover:text-white hover:w-full hover:mx-0 hover:px-6 border-b-2">
                Pre-Orders
              </h3>
            
            </div>
            </Link>

        <Link to="shop">
          <div className="menuItem  text-xl ">
          
              <h3 className="my-3 py-6 mx-6 px-3 hover:bg-black hover:text-white hover:w-full hover:mx-0 hover:px-6 border-b-2">
                Shop
              </h3>
            

         {/**
          * <ul className="list-none">
              <Link to="shop">
                <li className="px-8 text-xl hover:bg-black">Clothes</li>
              </Link>

              <Link to="shop">
                <li className="px-8 text-xl hover:bg-black">Shoes</li>
              </Link>
              <Link to="shop">
                <li className="px-8 text-xl hover:bg-black">Accessories</li>
              </Link>
            </ul>
          * 
          */}   
          </div>
          </Link>
          
       

          

            <Link to="wishlist">
            <div className="menuItem text-xl">
            
              <h3 className="my-3 py-6 mx-6 px-3 hover:bg-black hover:text-white hover:w-full hover:mx-0 hover:px-6 border-b-2">
                Wishlist
              </h3>
            
            </div>
            </Link>

            <Link to="cart">
          <div className="menuItem  text-xl">

            <div className="flex items-center  py-6 mx-6 px-3 hover:bg-black hover:text-white hover:w-full hover:mx-0 hover:px-6 border-b-2">
            <CartIcon className="h-8 w-8"/>
              <h3 className="ml-2">
                Cart
              </h3>
            </div>
            
            
            </div>
            </Link>


            {" "}
          

          {user === null ? (
            <Link to="login">
            <ButtonCustom
                    name="Login"
                    
                    buttonClass={`
                    mt-4 ml-6
                    bg-black hover:!bg-black focus:!bg-black focus:shadow-lg active:bg-black text-white
                    
                    active:shadow-lg  
                     !text-lg
                    flex justify-between px-12 py-4`}
                  />
            </Link>
            
          ):(
            <Link to="profile">
            <div className="menuItem  text-xl  w-full">
              
                <h3 className="my-3 py-6 mx-6 px-3 hover:bg-black hover:text-white hover:w-full hover:mx-0 hover:px-6 border-b-2">
                  User
                </h3>
  
                </div>
            </Link>
          )}
            

          {/**
           *<ul className="list-none">
              <Link to="login">
                <li className="px-8 text-xl hover:bg-black">Login</li>
              </Link>

              <Link to="register">
                <li className="px-8 text-xl hover:bg-black">Register</li>
              </Link>
            </ul> 
           */}  
         


            {/*<Link to="orders">
            <div className="menuItem my-3 py-3 px-8 hover:bg-[#444343] text-xl  w-full">
            
              <h3 className="">
                Orders
              </h3>
            
            </div>
          </Link>*/}

            
        </div>
        {/*<div className="SideBarText relative -mr-9 -ml-16 left-24 duration-300 rotate-[270deg] py-3 px-5 text-2xl text-white rounded-b-md shadow-md hover:text-black hover:bg-[#FFBB00] hover:cursor-pointer ">MENU</div>*/}
      </div>
    </div>
   
     
    </>
  );
}
