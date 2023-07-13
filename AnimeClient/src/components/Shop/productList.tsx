import { useCallback, useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import LoadingComponent2 from "../../shared/reuse/LoadingComponent2";
import FiltersSection from "./FilterSection";
import { useAppDispatch, useAppSelector } from "../../shared/redux/store";
import useProducts from "../../shared/hooks/useProducts";
import { setProductParams } from "./productSlice";
import { getWishListAsync } from "../WishList/WishSlice";

import AppPagination from "../../shared/reuse/AppPagination";

import ProductCard from "./productCard2";
import ButtonCustom from "../../shared/reuse/ButtonCustom";
import SearchBar from "../../shared/reuse/SearchBar";

export default function ShopPage() {
  const dispatch = useAppDispatch();

  const mountedRef = useRef(true);
  const { products, filtersLoaded, metaData, productParams } = useProducts();

  const { wishlist } = useAppSelector((state) => state.wish);
  console.log(productParams.searchTerm);

  /* const getWishlist = useCallback(async () => {
    if (!wishlist) {
      await dispatch(getWishListAsync());
    }
  }, [dispatch, wishlist]);

  useEffect(() => {
    getWishlist();

    return () => {
      mountedRef.current = false;
    };
  }, [getWishlist]);*/

  if (!filtersLoaded) {
    return <LoadingComponent2 message="Loading Products ..." />;
  }
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full h-60 flex items-center relative bottom-[5.8rem] bg-shopHero2 bg-cover  bg-[center_right_-16rem]  md:bg-center lg:bg-no-repeat"></div>

      {/*  {products.length < 1 ? (
        <div className="w-full flex flex-col items-center justify-center h-[41vh]">
        <img
          src="/images/noProducts.png"
          alt="empty wishlist"
          className="h-[70%] md:h-full
                object-contain "
        />

        <h3 className="text-2xl">Oops. No products Found</h3>
        <Link to="/">
          <ButtonCustom
            name="Go to the Home page"
            buttonClass="text-white !text-xl whitespace-normal break-none w-full  bg-red-700 hover:!bg-red-800 focus:!bg-red-700 focus:shadow-lg active:bg-red-900 active:shadow-lg flex justify-between p-4 my-7"
          />
        </Link>
      </div>
      ):(*/}
      <div className="flex flex-wrap flex-col md:flex-row justify-center mx-4 sm:mx-12 lg:mx-20 xl:mx-32 w-full">
        <div className="w-full md:w-1/4 lg:w-1/6 px-4">
          <FiltersSection />
        </div>

        {/** */}

        <div className="container flex flex-col items-center justify-center md:block  p-1 lg:px-6 md:w-3/4 lg:w-5/6">
          {products.length > 0 ? (
            <>
              {(productParams.searchTerm)   && (
                <div className="mb-16 xl:mb-32">
                  <h4 className="text-3xl">'{productParams.searchTerm}'</h4>
                  <p>
                    {products.length} product{products.length > 1 && "s"} found
                  </p>
                </div>
              )}

              <div className="flex  items-center w-full mx-3">
                <SearchBar />
              </div>

              <div className="flex flex-wrap w-full -m-1 justify-around relative">
                {/**Card */}
                {products.map((product, index) => {
                  console.log(products.length);
                  return (
                    <ProductCard
                      key={index}
                      product={product}
                      length={products.length}
                      cardClass="mt-12 mx-4"
                    />
                  );
                })}
                {/**Card */}
              </div>

              {metaData && (
                <div className="mb-5 md:pt-2">
                  <AppPagination
                    itemsLength={products.length}
                    metaData={metaData}
                    onPageChange={(page: number) =>
                      dispatch(setProductParams({ pageNumber: page }))
                    }
                  />
                </div>
              )}
            </>
          ) : (
            <div className="m-8 md:m-28">
              <span className="text-3xl">No products found</span>

              <div className="my-12">
                <img
                  alt="no products"
                  src="/images/emptyState.png"
                  className="h-36"
                />

                <p className="my-6">Uh-oh, nothing to see here...yet.</p>

                <Link to="/">
                  <ButtonCustom
                    name="Go to Home Page"
                    className="my-6"
                    buttonClass={`bg-black hover:!bg-black/80 px-10 text-white  normal-case h-16`}
                    textClass="justify-center text-base lg:text-lg whitespace-nowrap"
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      {/** )}*/}

      <Outlet />
    </div>
  );
}
