import "./App.css";


import Header2 from "./Header2";
import WhatWeDo from "../../components/Home/WhatWeDo";
import OurProducts from "../../components/Home/OurProducts";

import Footer from "./Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import ShopPage from "../../components/Shop/productList";
import ProductDetails from "../../components/Shop/productDetails";
import Login2 from "../../components/Account/Login2";
import SignUp2 from "../../components/Account/SignUp2";
import SideMenu from "./SideMenu";
import { useCallback, useEffect, useRef, useState } from "react";
import CartPage from "../../components/Cart/CartPage";
import { useAppDispatch } from "../redux/store";
import { getCartAsync } from "../../components/Cart/cartSlice";
import ErrorPage from "../../components/Error/ErrorPage";
import CheckoutPage2 from "../../components/Checkout/checkoutPage2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUser } from "../../components/Account/UserSlice";
import LoadingComponent2 from "../reuse/LoadingComponent2";
import OrdersList from "../../components/Orders/ordersList";
import RequireAuth from "./PrivateRoute";
import ConfirmEmail from "../../components/Account/VerifyEmail";
import OrdersDetails from "../../components/Orders/ordersDetails";
import Redirect from "./Redirect";
import InventoryPage from "../../components/Admin/Inventory";
import AboutUs from "../../components/About/AboutUs";
import UserProfile from "../../components/Account/UserProfile/UserProfile";
import WishList from "../../components/WishList/WishList";
import Home from "../../components/Home/NewHome";
import Reviews from "../../components/Home/Reviews";
import { setProductParams } from "../../components/Shop/productSlice";
import NotFound2 from "../../components/Error/NotFound2";
import Header from "./Header";

//[url('/src/assets/images/hero/hero2.png')] bg-hero1 bg-cover

function App() {
  const dispatch = useAppDispatch();
  const location : any = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true);

  const [home , setHome] = useState(true);

  

  const sideMenuRef = useRef(null);
  const isMounted = useRef(true);

 


  function handleSidebar(state: boolean) {
    setShowSidebar(state);
  }

  const initApp = useCallback(async () => {
    try {

      if (location.pathname === "/") {
        setHome(true);
      } else {
        setHome(false);
      }

     




      await dispatch(getCurrentUser());

      await dispatch(getCartAsync());

     /* await agent.User.socialLoginCallback()
      .then(response => {
        console.log(response);
      });*/



      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [dispatch, location.pathname]);

  useEffect(() => {
    try {
      initApp();

      //Assign click handler to listen the click to close the dropdown when clicked outside
      document.addEventListener("click", function (e) {
        const target = e.target as HTMLElement;



        var menuIcon = document.querySelector(".menuIcon");

        var sideBar = document.querySelector(".SideBar");
        var menuItem = document.querySelector("menuItem");
        var sideBarMenu = document.querySelector(".SideBarMenu");
      

        

        if ( e.target !== sideBar && e.target !== menuItem && (e.target !== menuIcon && !menuIcon?.contains(target)) && e.target !== sideBarMenu)  {
          setShowSidebar(false);
        }
      });
      setShowSidebar(false);

      return () => {
        //Remove the listener
        document.removeEventListener("click", function () {
          setShowSidebar(false);
        });
        isMounted.current = false;
      };
    } catch (error) {
      console.log(error);
    }
  }, [initApp]);

  if (loading) return <LoadingComponent2 
  className="!h-screen"
  message="Initializing App... " />;

  return (
    <div className="font-[Inter]">
     {/**
      * h-full w-full flex flex-col flex-nowrap font-[AgencyFB] relative
      *  */} 




     
        <SideMenu
          sidebarState={showSidebar}
          handleSidebar={handleSidebar}
          sideMenuRef={sideMenuRef}
        />

        
        <Routes>
          {/**HomePage */}
          <Route
            path="/"
            element={
              <div id="container" >
                <div id="container2" className="flex w-screen h-screen">
                <Home sideBarstate={showSidebar}
          handleSidebar={handleSidebar} />
                {/*<Banner /> w-screen h-screen flex overflow-x-scroll*/}

                <WhatWeDo />

                <OurProducts />
                <Reviews/>

               {/*

            <ShopByCategories />*/}
          </div>
               
              </div>
            }
          />
          {/**HomePage mt-24 mb-25 py-5*/}

          <Route
            path={"/*"}
            element={
              <div className="h-full">

<div className="">
        <Header sideBarstate={showSidebar} handleSidebar={handleSidebar} />
      </div>
              <Routes>

                <Route path="shop">
                  <Route index element={<ShopPage />} />

                  <Route path=":id" element={<ProductDetails />} />
                </Route>

                <Route path="about" element={<AboutUs />}/>

                <Route path="login" element={<Login2 />} />

                <Route path="register" element={<SignUp2 />} />

                <Route path="profile" element={<UserProfile />} />

               {/**
                * 
                *  <Route
                  path="profile"
                  element={<RequireAuth component={UserProfile} />}
                />
                */}

                <Route
                  path="verifyEmail/:token/:email"
                  element={<ConfirmEmail />}
                />

                <Route path="orders">
                  <Route
                    index
                    element={<RequireAuth component={OrdersList} />}
                  />

                  <Route
                    path=":id"
                    element={<RequireAuth component={OrdersDetails} />}
                  />
                </Route>

                <Route path="cart" element={<CartPage />} />

                <Route path="wishlist" element={<WishList />} />

                <Route
                  path="checkout"
                  element={<RequireAuth component={CheckoutPage2} />}
                />

                <Route
                  path="inventory"
                  element={<RequireAuth
                    roles={['Admin']}
                    component={InventoryPage} />}
                />
                {/*<Route path="checkout" element={<CheckoutPage />} />
                <Route path="orders" element={<OrdersList/>} />*/}

                <Route path="redirect" element={<Redirect />} />

                <Route path="error" element={<ErrorPage />} />
                <Route path="*" element={<NotFound2 />} />
              </Routes>
              </div>
            }
          />
          
        </Routes>
   

      <ToastContainer  className="toastContainer" position="bottom-right"/>
      <div className={`${home ? 'hidden' : 'block'}`}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
//<div className="mb-80"></div>
