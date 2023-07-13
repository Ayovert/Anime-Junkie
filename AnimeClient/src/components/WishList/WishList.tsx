import { useAppSelector } from "../../shared/redux/store";
import ButtonCustom from "../../shared/reuse/ButtonCustom";
import FiltersSection from "../Shop/FilterSection";
import { ReactComponent as CartIcon } from "../../assets/images/icons/cartIcon.svg";
import { Link } from "react-router-dom";

export default function WishList() {
  const { wishlist } = useAppSelector((state) => state.wish);

  console.log(wishlist);

 /* if(wishlist === null){
    return(
      <div className="w-full flex flex-col items-center justify-center h-[60vh]">
      <img
                src="/images/emptyCart.png"
                alt="empty wishlist"
                className="h-[70%] md:h-full
                xl:h-72
                object-contain "
              />

              <h3 className="text-2xl">Aww. You have no wishes yet!</h3>
              <Link to="/shop">
              <ButtonCustom
                    name="Continue Shopping"
                    buttonClass="text-white !text-xl whitespace-normal break-none w-full  bg-red-700 hover:!bg-red-800 focus:!bg-red-700 focus:shadow-lg active:bg-red-900 active:shadow-lg flex justify-between p-4 my-7"
                  />
                  </Link>

      </div>
    )
  }*/
  return (
    <div className="w-full  mt-24  mx-5 md:h-[60vh]">

     
      {/*<div className="mb-6 block md:hidden">
      <h2 className="text-2xl font-[Fujimaru]">Wish List</h2>

<span className="">
  {wishlist?.items.length ?? 0} products saved
</span>
{wishlist === null && (
      
      <div className="my-12">
<img alt="no products" src="/images/emptyState.png" className="h-36"/>

<p className="my-6">Uh-oh, nothing to see here...yet. Make your first order to view history</p>

<ButtonCustom
name="Explore Products"
className="my-6"
buttonClass={`bg-black hover:!bg-black/80 px-10 text-white  normal-case h-16`}
textClass="justify-center text-base lg:text-lg whitespace-nowrap"/>
</div>
  
  )}

      </div>*/}
      <div
        className="flex flex-col
       md:flex-row justify-end"
      >
       
          <div className=" w-full md:w-1/6 md:mr-8">
            <FiltersSection />
          </div>
      

        <div className="flex flex-col w-full md:w-4/6">
          <div className="mb-6">
            <h2 className="text-2xl font-[Fujimaru]">Wish List</h2>

            <span className="">
              {wishlist?.items.length ?? 0} products saved
            </span>
            {wishlist === null && (
                  
                  <div className="my-12">
        <img alt="no products" src="/images/emptyState.png" className="h-36"/>

        <p className="my-6">Uh-oh, nothing to see here...yet. Make your first order to view history</p>

        <Link to="/shop">
        <ButtonCustom
          name="Explore Products"
          className="my-6"
          buttonClass={`bg-black hover:!bg-black/80 px-10 text-white  normal-case h-16`}
          textClass="justify-center text-base lg:text-lg whitespace-nowrap"/>
        </Link>
        
        </div>
              
              )}
          </div>

          {/**Order details card **/}

          {wishlist?.items.map((item, index) => {
            return (
              <div
                key={index}
                className="flex py-2 px-2 md:px-5 my-3 justify-between w-full md:w-4/5 border border-solid border-slate-200 rounded-[2.75rem] text-base"
              >
                <div className="w-3/12 flex items-center">
                  <img
                    src={item.pictureUrl}
                    className="h-20 md:h-40 object-contain rounded-tl-3xl rounded-bl-3xl"
                    alt="order img"
                  />
                </div>

                <div className="flex flex-col justify-around w-5/12">
                  <div className="flex justify-between my-4 w-4/5 md:w-full">
                    <span className="md:text-3xl"> {item.name}</span>
                  </div>

                  <div className="flex items-center w-fit">
                    <span className="md:text-lg mr-8">N {item.price} </span>
                  </div>
                </div>

                {/**see details */}
                <div className="w-3/12 flex flex-col items-center justify-around ">
                  <ButtonCustom
                    name="Add to Cart"
                    buttonClass="text-white whitespace-normal break-none w-full  bg-red-700 hover:!bg-red-800 focus:!bg-red-700 focus:shadow-lg active:bg-red-900 active:shadow-lg flex justify-between p-4"
                    Logo={CartIcon}
                  />

                  <span className="md:text-lg text-red-400 cursor-pointer">
                    {" "}
                    Remove
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
