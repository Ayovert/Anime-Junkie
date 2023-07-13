
import { useAppDispatch, useAppSelector } from "../../shared/redux/store";
import { Product } from "../../shared/model/product"
import { ReactComponent as CartIcon } from "../../assets/images/icons/cartIcon.svg";
import { ReactComponent as HeartOutline } from "../../assets/images/icons/heartOutline.svg";
import { ReactComponent as HeartSolid } from "../../assets/images/icons/heartSolid.svg";
import { useState } from "react";
import { removeCartItemAsync, addCartItemAsync } from "../Cart/cartSlice";
import { addWishItemAsync, removeWishItemAsync } from "../WishList/WishSlice";
import { useLocation, useNavigate } from "react-router-dom";


interface Props{
    product: Product;
}

export default function ProductCard2({product}:Props){

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location: any = useLocation();

    const [zoomAnim, setZoomAnim] = useState({
        index: 0,
        anim: false,
      });
    const { wishlist } = useAppSelector((state) => state.wish);


    const { cart, status: cartStatus } = useAppSelector((state) => state.cart);

    const cartItem =  cart?.items.find((item) => item.productId === product.id);


    async function addToWIshlist(id: number) {
        await dispatch(addWishItemAsync({ productId: id })).then(
          (response: any) => {
            console.log(response);
    
            if (response.error && response.payload.error.status === 401) {
              navigate("/login", { state: { from: location }, replace: true });
            }
          }
        );
      }
    return(
        <div
                  className="flex flex-wrap w-full h-full md:w-5/12 xl:w-[30%] justify-center p-0 md:p-6 relative mt-8 mb-28 "
                >
                  <div className="rounded-lg shadow-lg flex flex-col justify-between  bg-white border-1 relative w-80">
                    {/**max-w-[18rem] */}
                    <div className="bg-red-200 h-3 w-full"></div>
                    <div className="inline-block bg-slate-300/50 w-fit h-fit absolute top-14 right-4 z-50">
                      {wishlist !== null &&
                      wishlist.items.length > 0 &&
                      wishlist.items.findIndex((i) => i.productId === product.id) >
                        -1 ? (
                        <HeartSolid
                          className={`fill-black h-8 w-8  cursor-pointer ${
                            zoomAnim.anim &&
                            zoomAnim.index === product.id &&
                            "animate-zoom"
                          }`}
                          onClick={() => {
                            dispatch(
                              removeWishItemAsync({ productId: product.id })
                            );

                            setZoomAnim({ index:product.id, anim: true });
                          }}
                          onAnimationEnd={() =>
                            setZoomAnim({ index: 0, anim: false })
                          }
                        />
                      ) : (
                        <HeartOutline
                          className={` h-8 w-8 cursor-pointer`}
                          onClick={() => {
                            console.log(product.id)
                            addToWIshlist(product.id);

                            setZoomAnim({ index: product.id, anim: true });
                            /* const newArr = [...favorite];
                            
                            newArr.push(index);

                            setFavorite(newArr);*/
                          }}
                          onAnimationEnd={() =>
                            setZoomAnim({ index: 0, anim: false })
                        
                          }
                        />
                      )}
                    </div>
                    <div className="h-24">
                      <a
                        href="#!"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                      >
                        <img
                          className="rounded-t-lg block object-contain object-center w-full h-56 absolute -top-[5rem] left-0 right-0"
                          src={product.pictureUrl}
                          alt=""
                        />
                      </a>
                    </div>

                    <div className="flex flex-col justify-center items-center h-1/3">
                      <div className="w-3/5 text-center mb-10">
                        <h5 className="text-gray-900 text-xl font-medium mb-2 w-full whitespace-nowrap overflow-hidden text-ellipsis">
                          {product.name}
                        </h5>
                        {/** <p className="text-gray-700 text-base mb-4 font-bold">
       Clothes
      </p> */}
                        <span className="text-lg text-gray-500 font-bold mb-3">
                          N {product.price}
                        </span>

                       
                      </div>

                       {/**cart controls */}

                       {cart !== null && cart.items.findIndex((item) => item.productId === product.id) !== -1 && (
                           <div className="flex justify-center text-center items-center pb-6 text-base
                          w-full rounded-lg shadow-lg px-10 bg-white
                           ">
                           <div className="border border-black rounded-xl w-1/3 mx-1 cursor-pointer" 
                           onClick={() =>
                            dispatch(
                              removeCartItemAsync({
                                productId: cartItem!.productId,
                                quantity: 1,
                                name: "rem",
                              })
                            )
                          }
                           >
                             <span className="text-2xl">-</span>
                           </div>
                           <div className="border-b-2 border-black w-1/3 mx-2">
                             <span className="text-xl">{cartItem!.quantity}</span>
                           </div>
                           <div className="border border-black rounded-xl w-1/3 mx-2 cursor-pointer"
                           onClick={() =>
                            dispatch(addCartItemAsync({productId: cartItem!.productId}))
                          }
                           >
                             <span className="text-2xl">+</span>
                           </div>
                         </div>
                        )}
                       
                        {/**cart controls */}

                     
{(cart === null || cart?.items.findIndex((item) => item.productId === product.id) === -1) && 
<>
 {/**Add to cart  */}
 <div className="flex justify-between items-center w-full bg-black text-white py-3 pr-4 hover:!bg-red-700 focus:!bg-red-700 focus:shadow-lg active:bg-red-800 active:shadow-lg text-base
 cursor-pointer
 "
 onClick={() => {
   dispatch(
     addCartItemAsync({ productId: product.id })
   );
 }}
 //loading={cartStatus === "pendingAddItem" + product.id}
 >
   <span className="pl-8"> Add to Cart </span>

   <CartIcon className="h-8 w-8 p-1  fill-white border rounded-md border-white" />
 </div>
  {/**Add to cart  */}
  </>
}

                     
                    </div>
                  </div>
                </div>
    )
}