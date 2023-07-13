import { useCallback, useEffect, useRef, useState } from "react";
import CartPage from "../../components/Cart/CartPage";
import { useAppDispatch } from "../redux/store";
import "./App.css";

import Header2 from "./Header2";
import Footer from "./Footer";
import { Route, Routes } from "react-router-dom";
import ShopPage from "../../components/Shop/productList";
import ProductDetails from "../../components/Shop/productDetails";
import SideMenu from "./SideMenu";

import { getCartAsync } from "../../components/Cart/cartSlice";
import ErrorPage from "../../components/Error/ErrorPage";
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
import Home2 from "../../components/Home/NewHome2";
import NotFound2 from "../../components/Error/NotFound2";
import Login2 from "../../components/Account/Login2";
import SignUp2 from "../../components/Account/SignUp2";
import CheckoutPage2 from "../../components/Checkout/checkoutPage1x";
import { stat } from "fs";
import PreOrder from "../../components/Shop/PreOrder";

//[url('/src/assets/images/hero/hero2.png')] bg-hero1 bg-cover

function App2() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true);

  const sideMenuRef = useRef(null);
  const isMounted = useRef(true);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  var timeOut = useRef<NodeJS.Timeout>();

  const [showHeader, setShowHeader] = useState(false);

  const dispatch = useAppDispatch();

  function handleSidebar(state: boolean) {
    setShowSidebar(state);
  }

  function handleHeader(state: boolean){
    setShowHeader(state);
  }

  const handleMouseMove =useCallback((event: any) => {
    const target = event.target as HTMLElement;

    var modal = document.querySelector(".reModal");
    var reviewForm = document.querySelector(".reviewForm");

    if (
      target !== modal &&
      !modal?.contains(target) &&
      target !== reviewForm &&
      !reviewForm?.contains(target)
    ) {
      const offsetX = event.clientX;
      const offsetY = event.clientY;

     
      if (event.type === "mousemove" && offsetX > 50 && offsetY > 50  ) {
       setShowHeader(true);

       if(typeof timeOut.current != 'undefined'){
        clearTimeout(timeOut.current);
    }
       timeOut.current =  setTimeout(() => {
        handleHeader(false)
      }, 5000);

        
      }

      
    }
  },[]);

  const initApp = useCallback(async () => {
    try {
      await dispatch(getCurrentUser());

      await dispatch(getCartAsync());

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    try {
      initApp();

      //Assign click handler to listen the click to close the dropdown when clicked outside
      document.addEventListener("mousemove", (e) => handleMouseMove(e));
      document.addEventListener("click", function (e) {
        const target = e.target as HTMLElement;

        var menuIcon = document.querySelector(".menuIcon");

        var sideBar = document.querySelector(".SideBar");
        var menuItem = document.querySelector("menuItem");
        var sideBarMenu = document.querySelector(".SideBarMenu");

        if (
          e.target !== sideBar &&
          e.target !== menuItem &&
          e.target !== menuIcon &&
          !menuIcon?.contains(target) &&
          e.target !== sideBarMenu
        ) {
          setShowSidebar(false);
        }
      });
      setShowSidebar(false);

      return () => {
        //Remove the listener
        document.removeEventListener("click", function () {
          setShowSidebar(false);
        });
        document.removeEventListener("mousemove", function(){
          setShowHeader(false);
        }
         
        );
        isMounted.current = false;
      };
    } catch (error) {
      console.log(error);
    }
  }, [initApp, handleMouseMove]);

  if (loading) return <LoadingComponent2 message="Initializing App... " />;

  return (
    <div onMouseMove={(e) => handleMouseMove(e)} className="overflow-x-hidden font-[Inter]">
      <div className="">
        <Header2
          sideBarstate={showSidebar}
          handleSidebar={handleSidebar}
          showHeader={showHeader}
          handleHeader={handleHeader}
        />

        <SideMenu
          sidebarState={showSidebar}
          handleSidebar={handleSidebar}
          sideMenuRef={sideMenuRef}
        />
      </div>

      <Routes>
        {/**HomePage */}
        <Route
          path="/"
          element={
            <div className="flex">
              <Home2 sideBarstate={showSidebar} handleSidebar={handleSidebar} />
              {/*<Banner />*/}

              {/*  <WhatWeDo />

                {/*<OurProducts2 />*

            <ShopByCategories />*/}
            </div>
          }
        />
        {/**HomePage mt-24 mb-25 py-5*/}

        <Route
          path={"/*"}
          element={
            <div className="h-full">
              <Routes>
                <Route path="shop">
                  <Route index element={<ShopPage />} />

                  <Route path=":id" element={<ProductDetails />} />
                </Route>

                <Route path="pre-order" element={<PreOrder />} />
                <Route path="about" element={<AboutUs />} />

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
                  element={
                    <RequireAuth roles={["Admin"]} component={InventoryPage} />
                  }
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

      <ToastContainer position="bottom-right" />
      <div className="">
        <Footer />
      </div>
    </div>
  );
}

export default App2;
//<div className="mb-80"></div>
