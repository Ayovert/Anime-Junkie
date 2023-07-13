import { useRef, useCallback, useEffect } from "react";
import { productSelectors, fetchProductsAsync, fetchFilters } from "../../components/Shop/productSlice";
import { getWishListAsync } from "../../components/WishList/WishSlice";
import { useAppSelector, useAppDispatch } from "../redux/store";

export default function useProducts(){
    const products = useAppSelector(productSelectors.selectAll);
    const {
      productsLoaded,
      status,
      categories,
      animes,
      filtersLoaded,
      metaData,
      productParams
    } = useAppSelector((state) => state.product);
  
  
  
  
    const dispatch = useAppDispatch();
    const mountedRef = useRef(true);
  
  
  
   const getWIshlist = useCallback(async() => {
    await dispatch(getWishListAsync());
   },[dispatch])
  
    useEffect(() => {
      try {
        if (!productsLoaded){
         
           dispatch(fetchProductsAsync())
          }
      } catch (error) {
        
        console.log(error);
      }
  
      return () => {
        mountedRef.current = false;
      };
    }, [dispatch, productsLoaded]);
  
    useEffect(() => {

      try{
        if (!filtersLoaded) {
          dispatch(fetchFilters());
        getWIshlist();
      }

      }catch(error){
        console.log("fetch filters loaded")
        console.log(error);
      }
      
  
      
  
      return () => {
        mountedRef.current = false;
      };
    }, [dispatch, filtersLoaded, getWIshlist]);


    return{
        products,
        productsLoaded,
        filtersLoaded,
        categories,
        animes,
        status,
        metaData,
        productParams
    }
  
}