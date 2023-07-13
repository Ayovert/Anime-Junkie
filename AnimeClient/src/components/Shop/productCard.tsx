import { useAppDispatch, useAppSelector } from "../../shared/redux/store";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Product } from "../../shared/model/product";
import { ReactComponent as CartIcon } from "../../assets/images/icons/cartIcon.svg";
import { ReactComponent as HeartOutline } from "../../assets/images/icons/heartOutline.svg";
import { ReactComponent as HeartSolid } from "../../assets/images/icons/heartSolid.svg";

import { removeCartItemAsync, addCartItemAsync } from "../Cart/cartSlice";
import { addWishItemAsync, removeWishItemAsync } from "../WishList/WishSlice";
import { useState } from "react";

import "./product.css";

interface Props {
  product: Product;
  cardClass?: string;
  length: number;
}

export default function ProductCard({ product, cardClass, length }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location: any = useLocation();

  const [zoomAnim, setZoomAnim] = useState({
    index: 0,
    anim: false,
  });
  const { wishlist } = useAppSelector((state) => state.wish);

  const { cart } = useAppSelector((state) => state.cart);

  const cartItem = cart?.items.find((item) => item.productId === product.id);

  async function addToWIshlist(id: number) {
    await dispatch(addWishItemAsync({ productId: id })).then(
      (response: any) => {
        console.log(response);

        if (response.error) {
          console.log("navigate");
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    );
  }

  return (
    <div
      className={`h-full w-1/2 md:w-1/3 xl:w-1/4 justify-center relative mb-28 ${cardClass}
       rounded-t-3xl shadow-xl flex flex-col grow md:grow-0 basis-5/12 lg:basis-1/4 justify-between items-stretch  bg-white border-2 relative`}
    >
      {/**max-w-[18rem]
       *
       * xl:${length <= 1 ? 'w-full' : length === 2 ? 'w-1/2' : length >= 3 ? 'w-[30%]' : ''}
       *
       */}

      <div className="inline-block bg-white/80 w-fit h-fit absolute top-6 right-4 z-10">
        {wishlist !== null &&
        wishlist.items.length > 0 &&
        wishlist.items.findIndex((i) => i.productId === product.id) > -1 ? (
          <HeartSolid
            className={`fill-red-500 h-8 w-8  cursor-pointer ${
              zoomAnim.anim && zoomAnim.index === product.id && "animate-zoom"
            }`}
            onClick={() => {
              dispatch(removeWishItemAsync({ productId: product.id }));

              setZoomAnim({ index: product.id, anim: true });
            }}
            onAnimationEnd={() => setZoomAnim({ index: 0, anim: false })}
          />
        ) : (
          <HeartOutline
            className={` h-8 w-8 cursor-pointer stroke-black`}
            onClick={() => {
              addToWIshlist(product.id);

              setZoomAnim({ index: product.id, anim: true });
              /* const newArr = [...favorite];
                      
                      newArr.push(index);

                      setFavorite(newArr);*/
            }}
            onAnimationEnd={() => setZoomAnim({ index: 0, anim: false })}
          />
        )}
      </div>
      <Link to={`/shop/${product.id}`}>
        {/*        <div className="h-24 imageDiv">
          
          
            <img
              className="imageTag rounded-t-lg block object-contain object-center w-full h-56 absolute -top-[5rem] left-0 right-0"
              src={product.pictureUrl}
              alt=""
            />
          
            </div>*/}

        <div className=" relative py-4 ">
          <img
            className="rounded-t-lg block object-contain object-center w-full h-24 md:h-32 xl:h-40"
            src={product.pictureUrl}
            alt=""
          />
        </div>

        <div className="flex flex-col justify-center items-center mt-2 w-full text-center md:mb-4 mb-2">
          <h5 className="text-gray-900 text-base md:text-xl font-medium mb-2 w-full whitespace-nowrap overflow-hidden text-ellipsis">
            {product.name}
          </h5>
          {/** <p className="text-gray-700 text-base mb-4 font-bold">
Clothes
</p> */}
          <span className="text-sm md:text-lg text-green-500 font-bold">
            N {product.price}.00
          </span>
        </div>
      </Link>

      <div className="flex flex-col justify-center items-center h-1/3">
        <div
          className="flex justify-center text-center items-center pb-2 md:pb-6 text-base
                          w-full rounded-lg shadow-lg  px-4 xl:px-10 bg-white"
        >
          <div
            className={`border border-black rounded-xl w-10 mx-2 pb-2 text-[2.5rem] font-medium ${
              !cartItem ? "pointer-events-none" : "cursor-pointer "
            }`}
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
            <span className="">-</span>
          </div>
          <div className="border-b-2 border-black w-10 pb-1 mx-2 ">
            <span className="text-2xl">
              {(cartItem && cartItem.quantity) ?? 0}
            </span>
          </div>
          <div
            className="border border-black rounded-xl w-10 mx-2 pb-2 cursor-pointer text-[2.25rem] font-medium"
            onClick={() =>
              dispatch(addCartItemAsync({ productId: product.id }))
            }
          >
            <span className="">+</span>
          </div>
        </div>

        {/**Add to cart  */}
        <div
          className="flex justify-between items-center w-full bg-black text-white py-3 pr-4 hover:!bg-red-700 focus:!bg-red-700 focus:shadow-lg active:bg-red-800 active:shadow-lg text-base
 cursor-pointer
 "
          onClick={() => {
            dispatch(addCartItemAsync({ productId: product.id }));
          }}
          //loading={cartStatus === "pendingAddItem" + product.id}
        >
          <span className="pl-8"> Add to Cart </span>

          <CartIcon className="h-8 w-8 p-1  fill-white border rounded-md border-white" />
        </div>
      </div>
    </div>
  );
}
