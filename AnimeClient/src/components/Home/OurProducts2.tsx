import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { products } from "../../shared/data";
import { useAppDispatch, useAppSelector } from "../../shared/redux/store";
import ButtonCustom from "../../shared/reuse/ButtonCustom";
import { fetchProductsAsync, productSelectors } from "../Shop/productSlice";
import { ReactComponent as CartIcon } from "../../assets/images/icons/cartIcon.svg";
import { ReactComponent as HeartOutline } from "../../assets/images/icons/heartOutline.svg";
import { ReactComponent as HeartSolid } from "../../assets/images/icons/heartSolid.svg";


const prod = [1,2,3,4,5];

export default function OurProducts(){

  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded } = useAppSelector((state) => state.product);

  const {wishlist} = useAppSelector((state) => state.wish);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const mountedRef = useRef(true);

  useEffect(()=>{

    try{
      if (!productsLoaded) dispatch(fetchProductsAsync())
    }catch(error) {
      console.log(error);
    };

    return () => {mountedRef.current = false};

  },[dispatch , productsLoaded])


    return(
        <>
        <div className="text-gray-700 w-full ">
        <div className="flex flex-col justify-center items-center my-14 w-screen">
        <span className="bg-red-100/50 text-red-500 font-bold mb-6 p-2 rounded-2xl my-4 mx-2 w-fit ">OUR PRODUCTS</span>

        
  <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-14">
    <div className="flex flex-wrap -m-1 md:-m-2 justify-center items-center">
        
    
        {/**Card */}
        {products.slice(0,5)
        .map((product) =>{
            return(
              <div className="flex flex-wrap w-full h-full md:w-5/12 xl:w-[30%] justify-center p-0 md:p-6 relative mt-40 mb-28 " key={product.id} >
                <div className="rounded-lg shadow-lg flex flex-col justify-between  bg-white border-1 relative w-80">
                  {/**max-w-[18rem] */}
                  <div className="bg-red-200 h-3 w-full"></div>
                  <div className="inline-block bg-slate-200 w-fit h-fit absolute top-14 right-4 ">

                  {wishlist !== null &&
                        wishlist.items.length > 0 &&
                        wishlist.items.findIndex(
                          (i) => i.productId === product.id
                        ) > -1 ? (
                          <HeartSolid
                            className={` h-8 w-8  cursor-pointer`}
                           
                          />
                        ) : (
                          <HeartOutline
                            className=" h-8 w-8 cursor-pointer"
                           
                          />
                        )}
                  </div>
                  <div className="h-24">
                  <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
      <img className="rounded-t-lg block object-contain object-center w-full h-56 absolute -top-[5rem] left-0 right-0" src={product.pictureUrl} alt=""/>
    </a>

    
                  </div>
    
    <div className="flex flex-col justify-center items-center h-1/3">
     
    <div className="w-3/5 text-center mb-10">
    <h5 className="text-gray-900 text-xl font-medium mb-2 w-full whitespace-nowrap overflow-hidden text-ellipsis">{product.name}</h5>
     {/** <p className="text-gray-700 text-base mb-4 font-bold">
       Clothes
      </p> */}
      <span className="text-lg text-gray-500 font-bold mb-3">N {product.price}</span>


      <div className="flex w-full mt-6">
        <div className="border border-black rounded-xl w-1/3 mx-2">
          <span className="text-3xl">-</span>
        </div>
        <div className="border-b-2 border-black w-1/3 mx-2">
          <span className="text-2xl">1</span>
        </div>
        <div className="border border-black rounded-xl w-1/3 mx-2">
          <span className="text-3xl">+</span>
        </div>
      </div>
    </div>
  
      <div className="flex justify-between items-center w-full bg-black text-white py-3 pr-4 hover:!bg-red-700 focus:!bg-red-700 focus:shadow-lg active:bg-red-800 active:shadow-lg text-base">
      <span className="pl-8"  > Add to Cart </span>

      <CartIcon className="h-8 w-8 p-1  fill-white border rounded-md border-white"/>
      </div>

      
    </div>
  </div>
  </div>
            );
            
})}
  {/**Card */}
</div>

   
  </div>
<Link to="/shop">
<ButtonCustom name="See More" buttonClass="bg-red-500 text-white !px-3 !py-3 hover:!bg-red-700 focus:!bg-red-700 focus:shadow-lg active:bg-red-800 active:shadow-lg text-lg" />
</Link>




  
        </div>
        </div>
        </>
    )
}