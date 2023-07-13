import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../shared/redux/store";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Product } from "../../shared/model/product";
import { ReactComponent as CartIcon } from "../../assets/images/icons/cartIcon.svg";
import { ReactComponent as HeartOutline } from "../../assets/images/icons/heartOutline.svg";
import { ReactComponent as HeartSolid } from "../../assets/images/icons/heartSolid.svg";

import { removeCartItemAsync, addCartItemAsync } from "../Cart/cartSlice";
import { addWishItemAsync, removeWishItemAsync } from "../WishList/WishSlice";
import { ReactComponent as StarIcon } from "../../assets/images/icons/star.svg";


import './product.css'
import { currencyFormat } from "../../shared/util/util";

interface Props {
  product: Product;
  cardClass?: string;
  length: number;
}


const stars = [1, 2, 3, 4, 5];
export default function ProductCard({ product , cardClass, length}: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location: any = useLocation();

  const [zoomAnim, setZoomAnim] = useState({
    index: 0,
    anim: false,
  });
  const { wishlist } = useAppSelector((state) => state.wish);

  const { cart} = useAppSelector((state) => state.cart);


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
    <div className={`flex h-full md:${length <= 1 ? 'w-full' : length === 2 ? 'w-1/2' : length >= 3 ? 'w-[30%]' : ''}  grow md:grow-0 basis-5/12 lg:basis-1/5  justify-center p-0 relative mb-16 ${cardClass}`}>
      
      <div className="rounded-3xl flex flex-col justify-between  bg-white border-2 relative w-60 xl:w-80 ">
        {/**max-w-[18rem] */}
        <div className="inline-block bg-white/80 w-fit h-fit absolute top-5 right-4 z-10">
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
        <div className="relative w-full p-1">
          
          
            <img
              className="imageTag rounded-t-lg block object-contain object-center w-full h-20 md:h-32 xl:h-56"
              src={product.pictureUrl}
              alt=""
            />
          
        </div>

        
       

        <div className="flex flex-col justify-center items-center p-6">

        <div className="w-3/5 text-center mb-3">
            <h5 className="text-gray-900 text-2xl font-medium mb-2 w-full whitespace-nowrap overflow-hidden text-ellipsis">
              {product.name}
            </h5>
            {/** <p className="text-gray-700 text-base mb-4 font-bold">
Clothes
</p> */}
            <span className="text-xl text-green-500 font-bold mb-3">
               {currencyFormat(product.price)}
            </span>

           
          </div>


          <div className="flex flex-wrap gap-x-1 xl:gap-x-3">
                {stars.map((_, index) => {
                  return (
                    <StarIcon
                      key={index}
                      className="h-5 w-5 xl:h-8 md:w-8  fill-yellow-500"
                    />
                  );
                })}
              </div>
          </div>
          </Link>
          
      </div>
    
    </div>
  );
}
