import ButtonCustom from "./../reuse/ButtonCustom";
import { ReactComponent as CartIcon } from "../../assets/images/icons/cartIcon.svg";

import { ReactComponent as MenuIcon } from "../../assets/images/icons/menuIcon.svg";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import LoggedInMenu from "./LoggedInMenu";
import { useAppSelector } from "../redux/store";
import SearchBar from "../reuse/SearchBar";

interface Props {
  sideBarstate: boolean;
  handleSidebar: (state: boolean) => void;
}

export default function Header({ handleSidebar, sideBarstate }: Props) {
  const [showRightNav, setShowRightNav] = useState(true);
  const [showNav, setShowNav] = useState(true);
  const [home, setHome] = useState(false);

  const location = useLocation();
  const { user } = useAppSelector((state) => state.user);
  const { productParams } = useAppSelector((state) => state.product);

  const regex = /(shop)\/\d/g;

  const okRoute = regex.test(location.pathname);

  useEffect(() => {
    const noNavRoutes = ["/register", "/login"];
    if (
      location.pathname === "/" ||
      location.pathname === "/shop" ||
      noNavRoutes.includes(location.pathname)
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

    console.log(okRoute);
  }, [location.pathname, okRoute]);

  return (
    <header
      className={` ${
        showNav ? `flex` : `hidden`
      } relative inset-0 z-20 h-12 flex-row items-center justify-between px-8 my-5 lg:px-24 ${
        home ? `text-white` : `text-black`
      }`}
    >
      <ul className="flex items-center gap-x-8 whitespace-nowrap break-words md:text-lg lg:text-2xl">
        <li
          className="menuIcon cursor-pointer"
          onClick={(e) => handleSidebar(!sideBarstate)}
        >
          <MenuIcon className="h-6" />
        </li>

        <li className="font-[Fujimaru]">
          <Link to="/">Anime Clans</Link>
        </li>

        {user && user.roles?.includes("Admin") && (
          <li className="">
            <Link to="inventory">Inventory</Link>
          </li>
        )}

        <li className="hidden md:inline-block">
          <Link to="shop">Shop</Link>
        </li>

        <li className="hidden md:inline-block">
          <Link to="about">About Us</Link>
        </li>

        <li className="hidden xl:inline-block">
          <Link to="wishlist">WishList</Link>
        </li>
      </ul>

      {showRightNav && (
        <>
          <div className="flex  items-center mx-3">
            <SearchBar />
          </div>

          <ul className="hidden md:flex items-center">
            <Link to="cart">
              <li className="mx-2">
                <ButtonCustom
                  name="Cart"
                  buttonClass={` ${
                    home
                      ? `bg-white text-red-700 !text-xl `
                      : `bg-red-700 hover:!bg-red-800 focus:!bg-red-700 focus:shadow-lg active:bg-red-900 active:shadow-lg  text-white !text-xl`
                  } flex justify-between p-4`}
                  Logo={CartIcon}
                />
              </li>
            </Link>

            {user === null ? (
              <li className="mx-2">
                <Link to="login" className="decoration-none">
                  <ButtonCustom
                    name="Login"
                    buttonClass={` ${
                      home
                        ? `bg-white text-red-700 !text-xl`
                        : `bg-red-700 hover:!bg-red-800 focus:!bg-red-700 focus:shadow-lg active:bg-red-900 active:shadow-lg  text-white !text-xl`
                    } flex justify-between p-4`}
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
