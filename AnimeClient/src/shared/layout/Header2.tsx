import ButtonCustom from "./../reuse/ButtonCustom";
import { ReactComponent as CartIcon } from "../../assets/images/icons/cartIcon.svg";

import { Link, useLocation } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import LoggedInMenu from "./LoggedInMenu";
import { useAppSelector } from "../redux/store";
import Dropdown2 from "./Dropdown2";

interface Props {
  sideBarstate: boolean;
  handleSidebar: (state: boolean) => void;
  handleHeader: (state: boolean) => void;
  showHeader : boolean;
}

export default function Header2({ handleSidebar, handleHeader,sideBarstate, showHeader }: Props) {
  const [showRightNav, setShowRightNav] = useState(true);
 // const [showNav, setShowNav] = useState(true);
  const [home, setHome] = useState(false);

  const location = useLocation();
  const { user } = useAppSelector((state) => state.user);
  //const { productParams } = useAppSelector((state) => state.product);
  const [scrolled,setScrolled]= useState(false);
  const isMounted = useRef(true);

  var timeOut = useRef<NodeJS.Timeout>();



  const regex = /(shop)\/\d/g;

  const okRoute = regex.test(location.pathname);

  useEffect(() => {
    const noNavRoutes = ["/register", "/login"];
    if (
      location.pathname === "/" 
      //|| location.pathname === "/shop" 
      ||noNavRoutes.includes(location.pathname)
    ) {
      setHome(true);
    } else {
      setHome(false);
    }

    if (noNavRoutes.includes(location.pathname)) {
      setShowRightNav(false);
    } else {
      setShowRightNav(true);
    }

    //checkNoRoute();

    /*if (okRoute) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }*/

  }, [location.pathname, okRoute]);


 


  const offsetR=window.scrollY;

  
  const handleScroll = useCallback(() => {
    const offset=window.scrollY;

    if(offset > 200 ){
      handleHeader(true);

      if(typeof timeOut.current != 'undefined'){
        clearTimeout(timeOut.current);
    }
       timeOut.current =  setTimeout(() => {
        handleHeader(false)
      }, 5000);

      
    
    }
  }, [handleHeader]);

  

  useEffect(() => {

    window.addEventListener('scroll',handleScroll)
   

    return () => {
      window.removeEventListener("scroll", handleScroll);
      isMounted.current = false;
      
    };
  },[handleScroll])

  //&& offsetR
 
  return (
    <header
   // onMouseEnter={() => showHeader = true}
    //onMouseLeave ={() => showHeader = false}
      className={` flex fixed inset-0 z-20 h-12 flex-row items-center justify-between px-8 py-11 lg:px-24 ${home ? "text-white bg-black/80" : "bg-white/80"}
      ${!showRightNav && "md:bg-slate-50/0 z-20" }
      ${showRightNav && !home && '!text-black' } 

      ${(!showHeader && offsetR > 200 &&  "md:hidden md:z-0 md:h-0")}
      transition-all duration-700 ease-in
      `}

      
    >
      <div
        className="flex items-center justify-center gap-x-6">
        {/*<div
          className="menuIcon cursor-pointer z-20"
          onClick={(e) => handleSidebar(!sideBarstate)}
        >
         { /*<MenuIcon className="h-6" />*}
          <Hamburger sideBarstate={sideBarstate}/>
        </div>*/}
        <div className="font-[Rakkas] ml-12">
          <Link to="/">Anime Clans</Link>
        </div>
      </div>
      

      {showRightNav && (
        <>

<ul className="flex items-center gap-x-8 whitespace-nowrap break-words md:text-lg lg:text-xl">
        

        {user && user.roles?.includes("Admin") && (
          <li className="">
            <Link to="inventory">Inventory</Link>
          </li>
        )}

        <li className="hidden md:inline-block">
          
           <Dropdown2 />
            
        </li>

        <li className="hidden md:inline-block">
          <Link to="about">About Anime Clans</Link>
        </li>

        <li className="hidden md:inline-block">
          <Link to="pre-order">Pre-orders</Link>
        </li>

        <li className="hidden xl:inline-block">
          <Link to="wishlist">WishList</Link>
        </li>
      </ul>
          {/* <div className="flex  items-center mx-3">
            <SearchBar />
          </div>*/}

          <ul className="hidden md:flex items-center">
            <Link to="cart">
              <li className="mx-2">
                <ButtonCustom
                  name="Cart"
                  buttonClass={`${home ? 
                    "hover:!bg-black/90 focus:!bg-black/90 focus:shadow-lg active:!bg-black/90 text-white ":
                    " bg-white hover:!bg-slate-300 focus:!bg-slate-300 focus:shadow-lg active:!bg-slate-300 text-black "} 
                    active:shadow-lg !text-lg  flex justify-between p-4`}
                  Logo={CartIcon}
                />
              </li>
            </Link>

            {user === null ? (
              <li className="mx-2">
                <Link to="login" className="decoration-none">
                  <ButtonCustom
                    name="Login"
                    buttonClass={`  
                    ${home ? "bg-white hover:!bg-white/90 focus:!bg-white/90 focus:shadow-lg active:bg-white/90 text-black" : "bg-black/80 hover:!bg-black focus:!bg-black focus:shadow-lg active:bg-black text-white"}
                    
                    active:shadow-lg  
                     !text-lg
                    flex justify-between p-8`}
                  />
                </Link>
              </li>
            ) : (
              <li className="ml-2 lg:px-4">
                {/*<LoggedInMenu/>*/}
                <LoggedInMenu name={user.username} home={home} />
              </li>
            )}
          </ul>
        </>
      )}
    </header>
  );
}
