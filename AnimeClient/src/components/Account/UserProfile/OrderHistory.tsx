import { useAppSelector } from "../../../shared/redux/store";
import ButtonCustom from "../../../shared/reuse/ButtonCustom";

export default function OrderHistory() {

  const { orders} = useAppSelector((state) => state.order);
  return (
    <div className="mb-4 w-3/4">
      <h4 className="text-xl mb-6 font-bold">Order History</h4>

      {orders.length < 1 && (
        
         <div className="">
          <img alt="no orders image" src="/images/emptyState.png" className="h-36"/>

          <p className="my-6">Uh-oh, nothing to see here...yet. Make your first order to view history</p>

          <ButtonCustom
            name="View Products"
            className="my-6"
            buttonClass={`bg-black hover:!bg-black/80 px-10 text-white  normal-case h-16`}
            textClass="justify-center text-base lg:text-lg whitespace-nowrap"/>
          </div>
        
      )}


      {/**Order details card **/}
      {orders.length > 0 && (
       orders.map((order) => {
        return(
          <div key={order.id} className="flex py-2 md:px-5 md:justify-between w-full border border-solid border-slate-200 rounded-[2.75rem]">
        <div className="w-2/6 mx-1 flex items-center">
          <img
            src="/images/products/tanjiro1.png"
            className="h-28 md:h-40 object-contain rounded-tl-3xl rounded-bl-3xl"
            alt="order img"
          />
        </div>

        <div className="flex flex-col justify-around w-3/6">
          <div className="flex justify-between">
            <span className="text-base md:text-xl">
              {" "}
              Timimo Demon Slayer Tapestry-Anime Wallpaper
            </span>
          </div>

          <div className="flex items-center w-fit">
            <span className="text-base md:text-xl mr-8"> N6,500 </span>

            <span className="text-sm md:text-lg text-white px-4 bg-green-500">
              {" "}
              Delivered
            </span>
          </div>
        </div>

        {/**see details */}
        <div className=" w-1/6 flex items-center justify-end ">
          <span className="text-sm md:text-lg text-red-400 cursor-pointer">
            {" "}
            SEE DETAILS
          </span>
        </div>
      </div>
          
        )
       })
      )}

      {/**End of  Order details card **/}

      
   

      
    </div>
  );
}
